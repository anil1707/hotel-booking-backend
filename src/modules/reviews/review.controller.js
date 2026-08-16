import reviewService from "./review.service.js";

const createReview = async (
  req,
  res,
  next
) => {
  try {
    const review =
      await reviewService.createReview(
        req.params.hotelId,
        req.body,
        req.user
      );

    return res.status(201).json({
      success: true,
      message:
        "Review created successfully",
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

const getHotelReviews = async (
  req,
  res,
  next
) => {
  try {
    const reviews =
      await reviewService.getHotelReviews(
        req.params.hotelId
      );

    return res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

const updateReview = async (
  req,
  res,
  next
) => {
  try {
    const review =
      await reviewService.updateReview(
        req.params.id,
        req.body,
        req.user
      );

    return res.status(200).json({
      success: true,
      message:
        "Review updated successfully",
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

const deleteReview = async (
  req,
  res,
  next
) => {
  try {
    await reviewService.deleteReview(
      req.params.id,
      req.user
    );

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export default {
  createReview,
  getHotelReviews,
  updateReview,
  deleteReview,
};