import bookingRepository from "./booking.repository.js";
import roomRepository from "../rooms/room.repository.js";
import hotelRepository from "../hotels/hotel.repository.js";

const createBooking = async (
  data,
  user
) => {
  const {
    hotelId,
    roomId,
    checkIn,
    checkOut,
    rooms,
    guests,
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

  // 2. Check room
  const room =
    await roomRepository.findById(
      roomId
    );

  if (!room) {
    const error = new Error(
      "Room not found"
    );

    error.statusCode = 404;

    throw error;
  }

  // 3. Make sure room belongs to hotel
  if (
    room.hotelId.toString() !==
    hotelId
  ) {
    const error = new Error(
      "Room does not belong to this hotel"
    );

    error.statusCode = 400;

    throw error;
  }

  // 4. Check room status
  if (room.status !== "active") {
    const error = new Error(
      "Room is currently unavailable"
    );

    error.statusCode = 400;

    throw error;
  }

  // 5. Check capacity
  if (
    guests >
    room.capacity * rooms
  ) {
    const error = new Error(
      "Room capacity exceeded"
    );

    error.statusCode = 400;

    throw error;
  }

  // 6. Find overlapping bookings
  const existingBookings =
    await bookingRepository
      .findOverlappingBookings({
        roomId,
        checkIn,
        checkOut,
      });

  // 7. Calculate booked rooms
  const bookedRooms =
    existingBookings.reduce(
      (total, booking) => {
        return total + booking.rooms;
      },
      0
    );

  // 8. Calculate availability
  const availableRooms =
    room.totalRooms -
    bookedRooms;

  if (rooms > availableRooms) {
    const error = new Error(
      `Only ${availableRooms} room(s) available`
    );

    error.statusCode = 409;

    throw error;
  }

  // 9. Calculate nights
  const checkInDate =
    new Date(checkIn);

  const checkOutDate =
    new Date(checkOut);

  const millisecondsPerDay =
    1000 * 60 * 60 * 24;

  const totalNights = Math.ceil(
    (
      checkOutDate -
      checkInDate
    ) / millisecondsPerDay
  );

  // 10. Calculate price
  const subtotal =
    room.pricePerNight *
    rooms *
    totalNights;

  const taxes =
    subtotal * 0.18;

  const totalAmount =
    subtotal + taxes;

  // 11. Generate booking number
  const bookingNumber =
    `HB-${Date.now()}`;

  // 12. Create booking
  const booking =
    await bookingRepository.create({
      bookingNumber,

      userId: user.id,

      hotelId,
      roomId,

      checkIn: checkInDate,
      checkOut: checkOutDate,

      rooms,
      guests,

      pricePerNight:
        room.pricePerNight,

      totalNights,

      subtotal,
      taxes,
      totalAmount,

      status: "pending",
      paymentStatus: "pending",
    });

  return booking;
};

const getMyBookings = async (userId) => {
  return bookingRepository.findByUserId(
    userId
  );
};

const getBookingById = async (
  bookingId,
  user
) => {
  const booking =
    await bookingRepository.findById(
      bookingId
    );

  if (!booking) {
    const error = new Error(
      "Booking not found"
    );

    error.statusCode = 404;

    throw error;
  }

  const isCustomer =
    booking.userId.toString() ===
    user.id;

  if (
    user.role === "admin" ||
    isCustomer
  ) {
    return booking;
  }

  // Hotel owner check
  if (
    user.role === "hotel_owner"
  ) {
    const hotel =
      await hotelRepository.findById(
        booking.hotelId._id
      );

    if (
      hotel &&
      hotel.ownerId.toString() ===
        user.id
    ) {
      return booking;
    }
  }

  const error = new Error(
    "You are not allowed to view this booking"
  );

  error.statusCode = 403;

  throw error;
};

const cancelBooking = async (
  bookingId,
  user
) => {
  const booking =
    await bookingRepository.findById(
      bookingId
    );

  // 1. Booking not found
  if (!booking) {
    const error = new Error(
      "Booking not found"
    );

    error.statusCode = 404;

    throw error;
  }

  // 2. Check ownership
  const isOwner =
    booking.userId.toString() ===
    user.id;

  const isAdmin =
    user.role === "admin";

  if (!isOwner && !isAdmin) {
    const error = new Error(
      "You are not allowed to cancel this booking"
    );

    error.statusCode = 403;

    throw error;
  }

  // 3. Already cancelled
  if (
    booking.status ===
    "cancelled"
  ) {
    const error = new Error(
      "Booking is already cancelled"
    );

    error.statusCode = 400;

    throw error;
  }

  // 4. Completed booking
  if (
    booking.status ===
    "completed"
  ) {
    const error = new Error(
      "Completed booking cannot be cancelled"
    );

    error.statusCode = 400;

    throw error;
  }

  // 5. Check-in date has passed
  const now = new Date();

  if (
    new Date(booking.checkIn) <= now
  ) {
    const error = new Error(
      "Booking cannot be cancelled after check-in date"
    );

    error.statusCode = 400;

    throw error;
  }

  // 6. Cancel booking
  booking.status = "cancelled";

  await booking.save();

  return booking;
};

const getOwnerBookings = async (
  user,
  query
) => {
  const {
    status,
    hotelId,
    page,
    limit,
  } = query;

  let hotelIds;

  if (user.role === "admin") {
    const hotels =
      await Hotel.find({})
        .select("_id");

    hotelIds =
      hotels.map(
        (hotel) => hotel._id
      );
  } else {
    const hotels =
      await hotelRepository.findByOwnerId(
        user.id
      );

    hotelIds =
      hotels.map(
        (hotel) => hotel._id
      );
  }

  // If owner doesn't have any hotels
  if (!hotelIds.length) {
    return {
      bookings: [],
      pagination: {
        page,
        limit,
        total: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage:
          page > 1,
      },
    };
  }

  // If hotelId is provided,
  // make sure it belongs to this owner.
  if (
    hotelId &&
    !hotelIds.some(
      (id) =>
        id.toString() === hotelId
    )
  ) {
    const error = new Error(
      "You are not allowed to access this hotel"
    );

    error.statusCode = 403;

    throw error;
  }

  return bookingRepository.findByHotelIds({
    hotelIds,
    status,
    hotelId,
    page,
    limit,
  });
};

export default {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
  getOwnerBookings
};