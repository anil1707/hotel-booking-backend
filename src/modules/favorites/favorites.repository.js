import Favorite from "./favorites.model.js";

const create = async (data) => {
  return Favorite.create(data);
};

const findByUserAndHotel = async (
  userId,
  hotelId
) => {
  return Favorite.findOne({
    userId,
    hotelId,
  });
};

const findByUserId = async (
  userId
) => {
  return Favorite.find({
    userId,
  })
    .populate(
      "hotelId",
      "name location rating reviewCount images"
    )
    .sort({
      createdAt: -1,
    });
};

const deleteByUserAndHotel = async (
  userId,
  hotelId
) => {
  return Favorite.findOneAndDelete({
    userId,
    hotelId,
  });
};

export default {
  create,
  findByUserAndHotel,
  findByUserId,
  deleteByUserAndHotel,
};