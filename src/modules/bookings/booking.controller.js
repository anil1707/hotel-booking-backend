import mongoose from "mongoose";
import bookingService from "./booking.service.js";
import Room from "../rooms/room.model.js";
import Booking from "./booking.model.js";

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

export const checkAvailability = async (
  req,
  res
) => {
  try {
    const {
      hotelId,
      roomId,
      checkIn,
      checkOut,
      guests,
      rooms,
    } = req.body;

    // -----------------------------
    // Validate ObjectIds
    // -----------------------------

    if (
      !mongoose.Types.ObjectId.isValid(
        hotelId
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid hotel ID",
      });
    }

    if (
      !mongoose.Types.ObjectId.isValid(
        roomId
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid room ID",
      });
    }

    // -----------------------------
    // Find room
    // -----------------------------

    const room = await Room.findOne({
      _id: roomId,
      hotelId,
      status: "active",
    });

    if (!room) {
      return res.status(404).json({
        success: false,
        message:
          "Room not found or inactive",
      });
    }

    // -----------------------------
    // Guest capacity
    // -----------------------------

    const totalCapacity =
      room.capacity * rooms;

    if (guests > totalCapacity) {
      return res.status(400).json({
        success: false,
        message:
          `This room can accommodate maximum ${totalCapacity} guests.`,
      });
    }

    // -----------------------------
    // Find overlapping bookings
    // -----------------------------

    const existingBookings =
      await Booking.find({
        roomId,

        status: {
          $in: [
            "pending",
            "confirmed",
          ],
        },

        checkIn: {
          $lt: new Date(checkOut),
        },

        checkOut: {
          $gt: new Date(checkIn),
        },
      });

    // -----------------------------
    // Calculate booked rooms
    // -----------------------------

    const bookedRooms =
      existingBookings.reduce(
        (total, booking) => {
          return (
            total +
            booking.rooms
          );
        },
        0
      );

    // -----------------------------
    // Available rooms
    // -----------------------------

    const availableRooms =
      room.totalRooms -
      bookedRooms;

    const isAvailable =
      availableRooms >= rooms;

    if (!isAvailable) {
      return res.status(409).json({
        success: false,
        message:
          "Room is not available for the selected dates.",
        data: {
          available: false,
          availableRooms,
        },
      });
    }

    // -----------------------------
    // Calculate nights
    // -----------------------------

    const checkInDate =
      new Date(checkIn);

    const checkOutDate =
      new Date(checkOut);

    const totalNights = Math.ceil(
      (
        checkOutDate.getTime() -
        checkInDate.getTime()
      ) /
        (1000 * 60 * 60 * 24)
    );

    // -----------------------------
    // Calculate price
    // -----------------------------

    const pricePerNight =
      room.pricePerNight;

    const subtotal =
      pricePerNight *
      totalNights *
      rooms;

    // Temporary tax
    // We'll move this to a
    // proper configuration later.
    const taxRate = 0.18;

    const taxes =
      subtotal * taxRate;

    const totalAmount =
      subtotal + taxes;

    // -----------------------------
    // Response
    // -----------------------------

    return res.status(200).json({
      success: true,
      message:
        "Room is available",
      data: {
        available: true,

        hotelId,
        roomId,

        checkIn,
        checkOut,

        guests,
        rooms,

        availableRooms,

        pricePerNight,

        totalNights,

        subtotal,

        taxes,

        totalAmount,
      },
    });
  } catch (error) {
    console.error(
      "Check availability error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to check room availability",
    });
  }
};

export default {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
  getOwnerBookings,
  checkAvailability
};