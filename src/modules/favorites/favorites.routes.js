import express from "express";

import favoriteController from "./favorites.controller.js";

import authenticate from "../../middleware/auth.middleware.js";
import validate from "../../middleware/validation.middleware.js";

import {
  hotelIdSchema,
} from "./favorites.schema.js";

const router = express.Router();

router.post(
  "/favorites/:hotelId",
  authenticate,
  validate(
    hotelIdSchema,
    "params"
  ),
  favoriteController.addFavorite
);

router.get(
  "/favorites",
  authenticate,
  favoriteController.getFavorites
);

router.delete(
  "/favorites/:hotelId",
  authenticate,
  validate(
    hotelIdSchema,
    "params"
  ),
  favoriteController.removeFavorite
);

export default router;