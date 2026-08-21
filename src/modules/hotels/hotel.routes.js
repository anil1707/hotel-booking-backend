import express from "express";

import hotelController from "./hotel.controller.js";

import validate from "../../middleware/validation.middleware.js";
import authenticate from "../../middleware/auth.middleware.js";
import authorize from "../../middleware/authorize.middleware.js";


import { createHotelSchema, hotelParamsSchema, updateHotelSchema, hotelQuerySchema } from "./hotel.schema.js";

const router = express.Router();

router.post(
  "/",
  validate(createHotelSchema),
  authenticate,
  authorize("hotel_owner", "admin"),
  hotelController.createOwnerHotel
);

router.get(
  "/",
  validate(
    hotelQuerySchema,
    "query"
  ),
  hotelController.getHotels
);

router.get(
  "/:id",
  validate(
    hotelParamsSchema,
    "params"
  ),
  hotelController.getHotelById
);

router.patch(
  "/:id",
  authenticate,
  authorize("hotel_owner", "admin"),
  validate(
    hotelParamsSchema,
    "params"
  ),
  validate(
    updateHotelSchema,
    "body"
  ),
  hotelController.updateHotel
);

router.delete(
  "/:id",
  authenticate,
  authorize("hotel_owner", "admin"),
  validate(
    hotelParamsSchema,
    "params"
  ),
  hotelController.deleteHotel
);


router.get(
  "/owner/hotels",
  authenticate,
  authorize("hotel_owner", "admin"),
  hotelController.getOwnerHotels
);


export default router;