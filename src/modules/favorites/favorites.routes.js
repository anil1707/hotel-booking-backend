import express from "express";

import favoriteController from "./favorites.controller.js";

import authenticate from "../../middleware/auth.middleware.js";
import validate from "../../middleware/validation.middleware.js";

import {
  hotelIdSchema,
} from "./favorites.schema.js";

const router = express.Router();

router.post(
  "/users/me/favorites/:hotelId",
  authenticate,
  validate(
    hotelIdSchema,
    "params"
  ),
  favoriteController.addFavorite
);

router.get(
  "/users/me/favorites",
  authenticate,
  favoriteController.getFavorites
);

router.delete(
  "/users/me/favorites/:hotelId",
  authenticate,
  validate(
    hotelIdSchema,
    "params"
  ),
  favoriteController.removeFavorite
);

export default router;