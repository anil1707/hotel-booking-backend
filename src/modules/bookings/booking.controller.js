import bookingService from "./booking.service.js";

const createBooking = async (
  req,
  res,
  next
) => {
  try {
    const booking =
      await bookingService.createBooking(
        req.body,
        req.user
      );

    return res.status(201).json({
      success: true,
      message:
        "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

const getMyBookings = async (
  req,
  res,
  next
) => {
  try {
    const bookings =
      await bookingService.getMyBookings(
        req.user.id
      );

    return res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

const getBookingById = async (
  req,
  res,
  next
) => {
  try {
    const booking =
      await bookingService.getBookingById(
        req.params.id,
        req.user
      );

    return res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

const cancelBooking = async (
  req,
  res,
  next
) => {
  try {
    const booking =
      await bookingService.cancelBooking(
        req.params.id,
        req.user
      );

    return res.status(200).json({
      success: true,
      message:
        "Booking cancelled successfully",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

const getOwnerBookings = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await bookingService.getOwnerBookings(
        req.user,
        req.query
      );

    return res.status(200).json({
      success: true,
      data: result.bookings,
      pagination:
        result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
  getOwnerBookings,
};