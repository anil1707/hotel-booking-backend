import reviewRepository from "./review.repository.js";
import bookingRepository from "../bookings/booking.repository.js";
import hotelRepository from "../hotels/hotel.repository.js";

const createReview = async (
  hotelId,
  data,
  user
) => {
  const {
    bookingId,
    rating,
    comment,
  } = data;

  // 1. Check hotel
  const hotel =
    await hotelRepository.findById(
      hotelId
    );

  if (!hotel) {
    const error = new Error(
      "Hotel not found"
    );

    error.statusCode = 404;

    throw error;
  }

  // 2. Check completed booking
  const booking =
    await bookingRepository
      .findCompletedBookingForReview({
        bookingId,
        userId: user.id,
        hotelId,
      });

  if (!booking) {
    const error = new Error(
      "You can review a hotel only after completing a booking"
    );

    error.statusCode = 403;

    throw error;
  }

  // 3. Check existing review
  const existingReview =
    await reviewRepository
      .findByUserAndHotel(
        user.id,
        hotelId
      );

  if (existingReview) {
    const error = new Error(
      "You have already reviewed this hotel"
    );

    error.statusCode = 409;

    throw error;
  }

  // 4. Create review
  return reviewRepository.create({
    userId: user.id,
    hotelId,
    bookingId,
    rating,
    comment,
  });
};

const getHotelReviews = async (
  hotelId
) => {
  const hotel =
    await hotelRepository.findById(
      hotelId
    );

  if (!hotel) {
    const error = new Error(
      "Hotel not found"
    );

    error.statusCode = 404;

    throw error;
  }

  return reviewRepository.findByHotelId(
    hotelId
  );
};

const updateReview = async (
  reviewId,
  data,
  user
) => {
  const review =
    await reviewRepository.findById(
      reviewId
    );

  if (!review) {
    const error = new Error(
      "Review not found"
    );

    error.statusCode = 404;

    throw error;
  }

  if (
    review.userId.toString() !==
    user.id
  ) {
    const error = new Error(
      "You are not allowed to update this review"
    );

    error.statusCode = 403;

    throw error;
  }

  return reviewRepository.updateById(
    reviewId,
    data
  );
};

const deleteReview = async (
  reviewId,
  user
) => {
  const review =
    await reviewRepository.findById(
      reviewId
    );

  if (!review) {
    const error = new Error(
      "Review not found"
    );

    error.statusCode = 404;

    throw error;
  }

  const isOwner =
    review.userId.toString() ===
    user.id;

  const isAdmin =
    user.role === "admin";

  if (!isOwner && !isAdmin) {
    const error = new Error(
      "You are not allowed to delete this review"
    );

    error.statusCode = 403;

    throw error;
  }

  await reviewRepository.deleteById(
    reviewId
  );
};

export default {
  createReview,
  getHotelReviews,
  updateReview,
  deleteReview,
};