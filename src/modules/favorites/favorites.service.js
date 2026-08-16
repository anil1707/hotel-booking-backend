import favoriteRepository from "./favorites.repository.js";
import hotelRepository from "../hotels/hotel.repository.js";

const addFavorite = async (
  hotelId,
  user
) => {
  // Check hotel
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

  // Check existing favorite
  const existing =
    await favoriteRepository
      .findByUserAndHotel(
        user.id,
        hotelId
      );

  if (existing) {
    const error = new Error(
      "Hotel is already in your favorites"
    );

    error.statusCode = 409;

    throw error;
  }

  return favoriteRepository.create({
    userId: user.id,
    hotelId,
  });
};

const getFavorites = async (user) => {
  return favoriteRepository.findByUserId(
    user.id
  );
};

const removeFavorite = async (
  hotelId,
  user
) => {
  const favorite =
    await favoriteRepository
      .deleteByUserAndHotel(
        user.id,
        hotelId
      );

  if (!favorite) {
    const error = new Error(
      "Hotel is not in your favorites"
    );

    error.statusCode = 404;

    throw error;
  }

  return favorite;
};

export default {
  addFavorite,
  getFavorites,
  removeFavorite,
};