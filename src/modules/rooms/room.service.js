import roomRepository from "./room.repository.js";
import hotelRepository from "../hotels/hotel.repository.js";

const createRoom = async (
  hotelId,
  data,
  user
) => {
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

  const isOwner =
    hotel.ownerId.toString() ===
    user.id;

  const isAdmin =
    user.role === "admin";

  if (!isOwner && !isAdmin) {
    const error = new Error(
      "You are not allowed to manage this hotel"
    );

    error.statusCode = 403;

    throw error;
  }

  return roomRepository.create({
    ...data,
    hotelId,
  });
};

const getRoomsByHotel = async (
  hotelId
) => {
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

  return roomRepository.findByHotelId(
    hotelId
  );
};

const getRoomById = async (
  id
) => {
  const room =
    await roomRepository.findById(id);

  if (!room) {
    const error = new Error(
      "Room not found"
    );

    error.statusCode = 404;

    throw error;
  }

  return room;
};

const updateRoom = async (
  id,
  data,
  user
) => {
  const room =
    await roomRepository.findById(id);

  if (!room) {
    const error = new Error(
      "Room not found"
    );

    error.statusCode = 404;

    throw error;
  }

  const hotel =
    await hotelRepository.findById(
      room.hotelId
    );

  if (!hotel) {
    const error = new Error(
      "Hotel not found"
    );

    error.statusCode = 404;

    throw error;
  }

  const isOwner =
    hotel.ownerId.toString() ===
    user.id;

  const isAdmin =
    user.role === "admin";

  if (!isOwner && !isAdmin) {
    const error = new Error(
      "You are not allowed to update this room"
    );

    error.statusCode = 403;

    throw error;
  }

  return roomRepository.updateById(
    id,
    data
  );
};

const deleteRoom = async (
  id,
  user
) => {
  const room =
    await roomRepository.findById(id);

  if (!room) {
    const error = new Error(
      "Room not found"
    );

    error.statusCode = 404;

    throw error;
  }

  const hotel =
    await hotelRepository.findById(
      room.hotelId
    );

  if (!hotel) {
    const error = new Error(
      "Hotel not found"
    );

    error.statusCode = 404;

    throw error;
  }

  const isOwner =
    hotel.ownerId.toString() ===
    user.id;

  const isAdmin =
    user.role === "admin";

  if (!isOwner && !isAdmin) {
    const error = new Error(
      "You are not allowed to delete this room"
    );

    error.statusCode = 403;

    throw error;
  }

  await roomRepository.deleteById(id);
};

export default {
  createRoom,
  getRoomsByHotel,
  getRoomById,
  updateRoom,
  deleteRoom,
};