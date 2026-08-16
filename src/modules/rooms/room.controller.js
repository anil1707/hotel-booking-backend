import roomService from "./room.service.js";

const createRoom = async (
  req,
  res,
  next
) => {
  try {
    const room =
      await roomService.createRoom(
        req.params.hotelId,
        req.body,
        req.user
      );

    return res.status(201).json({
      success: true,
      message: "Room created successfully",
      data: room,
    });
  } catch (error) {
    next(error);
  }
};

const getRoomsByHotel = async (
  req,
  res,
  next
) => {
  try {
    const rooms =
      await roomService.getRoomsByHotel(
        req.params.hotelId
      );

    return res.status(200).json({
      success: true,
      data: rooms,
    });
  } catch (error) {
    next(error);
  }
};

const getRoomById = async (
  req,
  res,
  next
) => {
  try {
    const room =
      await roomService.getRoomById(
        req.params.id
      );

    return res.status(200).json({
      success: true,
      data: room,
    });
  } catch (error) {
    next(error);
  }
};

const updateRoom = async (
  req,
  res,
  next
) => {
  try {
    const room =
      await roomService.updateRoom(
        req.params.id,
        req.body,
        req.user
      );

    return res.status(200).json({
      success: true,
      message: "Room updated successfully",
      data: room,
    });
  } catch (error) {
    next(error);
  }
};

const deleteRoom = async (
  req,
  res,
  next
) => {
  try {
    await roomService.deleteRoom(
      req.params.id,
      req.user
    );

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export default {
  createRoom,
  getRoomsByHotel,
  getRoomById,
  updateRoom,
  deleteRoom,
};