import favoriteService from "./favorites.service.js";

const addFavorite = async (
  req,
  res,
  next
) => {
  try {
    const favorite =
      await favoriteService.addFavorite(
        req.params.hotelId,
        req.user
      );

    return res.status(201).json({
      success: true,
      message:
        "Hotel added to favorites",
      data: favorite,
    });
  } catch (error) {
    next(error);
  }
};

const getFavorites = async (
  req,
  res,
  next
) => {
  try {
    const favorites =
      await favoriteService.getFavorites(
        req.user
      );

    return res.status(200).json({
      success: true,
      data: favorites,
    });
  } catch (error) {
    next(error);
  }
};

const removeFavorite = async (
  req,
  res,
  next
) => {
  try {
    await favoriteService.removeFavorite(
      req.params.hotelId,
      req.user
    );

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export default {
  addFavorite,
  getFavorites,
  removeFavorite,
};