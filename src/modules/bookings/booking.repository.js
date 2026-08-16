import Booking from "./booking.model.js";

const create = async (data) => {
  return Booking.create(data);
};

const findOverlappingBookings = async ({
  roomId,
  checkIn,
  checkOut,
}) => {
  return Booking.find({
    roomId,

    status: {
      $in: [
        "pending",
        "confirmed",
      ],
    },

    checkIn: {
      $lt: checkOut,
    },

    checkOut: {
      $gt: checkIn,
    },
  });
};

const findById = async (id) => {
  return Booking.findById(id)
    .populate(
      "hotelId",
      "name location"
    )
    .populate(
      "roomId",
      "name type pricePerNight"
    );
};

const findByUserId = async (userId) => {
  return Booking.find({
    userId,
  })
    .populate(
      "hotelId",
      "name location"
    )
    .populate(
      "roomId",
      "name type"
    )
    .sort({
      createdAt: -1,
    });
};

const updateStatus = async (id, status) => {
  return Booking.findByIdAndUpdate(
    id,
    { status },
    {
      new: true,
      runValidators: true,
    }
  );
};

const findByHotelIds = async ({
  hotelIds,
  status,
  hotelId,
  page,
  limit,
}) => {
  const query = {
    hotelId: {
      $in: hotelIds,
    },
  };

  if (status) {
    query.status = status;
  }

  if (hotelId) {
    query.hotelId = hotelId;
  }

  const skip =
    (page - 1) * limit;

  const [bookings, total] =
    await Promise.all([
      Booking.find(query)
        .populate(
          "userId",
          "name email phone"
        )
        .populate(
          "hotelId",
          "name location"
        )
        .populate(
          "roomId",
          "name type pricePerNight"
        )
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit),

      Booking.countDocuments(query),
    ]);

  return {
    bookings,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(
        total / limit
      ),
      hasNextPage:
        page <
        Math.ceil(total / limit),
      hasPreviousPage:
        page > 1,
    },
  };
};

export default {
  create,
  findOverlappingBookings,
  findById,
  findByUserId,
  updateStatus,
  findByHotelIds
};

