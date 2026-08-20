import express from "express";

import bookingController, { checkAvailability } from "./booking.controller.js";

import authenticate from "../../middleware/auth.middleware.js";
import authorize from "../../middleware/authorize.middleware.js";
import validate from "../../middleware/validation.middleware.js";

import {
  createBookingSchema,
  bookingIdSchema,
  ownerBookingQuerySchema,
} from "./booking.schema.js";

const router = express.Router();

// Create booking
router.post(
  "/",
  authenticate,
  authorize("customer"),
  validate(
    createBookingSchema
  ),
  bookingController.createBooking
);

// My bookings
router.get(
  "/",
  authenticate,
  bookingController.getMyBookings
);

// Single booking
router.get(
  "/:id",
  authenticate,
  validate(
    bookingIdSchema,
    "params"
  ),
  bookingController.getBookingById
);

// Cancel booking
router.patch(
  "/:id/cancel",
  authenticate,
  validate(
    bookingIdSchema,
    "params"
  ),
  bookingController.cancelBooking
);

router.get(
  "/owner/bookings",
  authenticate,
  authorize(
    "hotel_owner",
    "admin"
  ),
  validate(
    ownerBookingQuerySchema,
    "query"
  ),
  bookingController.getOwnerBookings
);

router.post(
  "/check-availability",
  checkAvailability
);

export default router;