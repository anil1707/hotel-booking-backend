import express from "express";

import roomController from "./room.controller.js";

import validate from "../../middleware/validation.middleware.js";
import authenticate from "../../middleware/auth.middleware.js";
import authorize from "../../middleware/authorize.middleware.js";

import {
  createRoomSchema,
  hotelIdSchema,
  roomIdSchema,
  updateRoomSchema,
} from "./room.schema.js";


const router = express.Router();

router.post(
  "/hotels/:hotelId/rooms",
  authenticate,
  authorize(
    "hotel_owner",
    "admin"
  ),
  validate(
    hotelIdSchema,
    "params"
  ),
  validate(
    createRoomSchema
  ),
  roomController.createRoom
);

router.get(
  "/hotels/:hotelId/rooms",
  validate(
    hotelIdSchema,
    "params"
  ),
  roomController.getRoomsByHotel
);

router.get(
  "/rooms/:id",
  validate(
    roomIdSchema,
    "params"
  ),
  roomController.getRoomById
);

router.patch(
  "/rooms/:id",
  authenticate,
  authorize(
    "hotel_owner",
    "admin"
  ),
  validate(
    roomIdSchema,
    "params"
  ),
  validate(
    updateRoomSchema
  ),
  roomController.updateRoom
);

router.delete(
  "/rooms/:id",
  authenticate,
  authorize(
    "hotel_owner",
    "admin"
  ),
  validate(
    roomIdSchema,
    "params"
  ),
  roomController.deleteRoom
);

export default router