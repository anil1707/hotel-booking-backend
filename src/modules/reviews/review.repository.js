import Review from "./review.model.js";

const create = async (data) => {
  return Review.create(data);
};

const findByHotelId = async (hotelId) => {
  return Review.find({
    hotelId,
  })
    .populate(
      "userId",
      "name"
    )
    .sort({
      createdAt: -1,
    });
};

const findById = async (id) => {
  return Review.findById(id);
};

const findByUserAndHotel = async (
  userId,
  hotelId
) => {
  return Review.findOne({
    userId,
    hotelId,
  });
};

const updateById = async (
  id,
  data
) => {
  return Review.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );
};

const deleteById = async (id) => {
  return Review.findByIdAndDelete(id);
};


const findCompletedBookingForReview =
  async ({
    bookingId,
    userId,
    hotelId,
  }) => {
    return Booking.findOne({
      _id: bookingId,
      userId,
      hotelId,
      status: "completed",
    });
  };


export default {
  create,
  findByHotelId,
  findById,
  findByUserAndHotel,
  updateById,
  deleteById,
  findCompletedBookingForReview
};