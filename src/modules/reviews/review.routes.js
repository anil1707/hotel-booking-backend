import express from "express";

import reviewController from "./review.controller.js";

import authenticate from "../../middleware/auth.middleware.js";
import validate from "../../middleware/validation.middleware.js";

import {
  hotelIdSchema,
  reviewIdSchema,
  createReviewSchema,
  updateReviewSchema,
} from "./review.schema.js";

const router = express.Router();

router.post(
  "/hotels/:hotelId/reviews",
  authenticate,
  validate(
    hotelIdSchema,
    "params"
  ),
  validate(
    createReviewSchema
  ),
  reviewController.createReview
);

router.get(
  "/hotels/:hotelId/reviews",
  validate(
    hotelIdSchema,
    "params"
  ),
  reviewController.getHotelReviews
);

router.patch(
  "/reviews/:id",
  authenticate,
  validate(
    reviewIdSchema,
    "params"
  ),
  validate(
    updateReviewSchema
  ),
  reviewController.updateReview
);

router.delete(
  "/reviews/:id",
  authenticate,
  validate(
    reviewIdSchema,
    "params"
  ),
  reviewController.deleteReview
);

export default router