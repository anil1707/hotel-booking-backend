import Room from "./room.model.js";

const create = async (data) => {
  return Room.create(data);
};

const findById = async (id) => {
  return Room.findById(id);
};

const findByHotelId = async (
  hotelId
) => {
  return Room.find({
    hotelId,
  }).sort({
    createdAt: -1,
  });
};

const updateById = async (
  id,
  data
) => {
  return Room.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );
};

const deleteById = async (id) => {
  return Room.findByIdAndDelete(id);
};

export default {
  create,
  findById,
  findByHotelId,
  updateById,
  deleteById,
};