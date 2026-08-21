import hotelService from "./hotel.service.js";

const createHotel = async (
  req,
  res,
  next
) => {
  try {
    const hotel =
      await hotelService.createHotel({
        ...req.body,
        ownerId: req.user.id,
      });

    return res.status(201).json({
      success: true,
      message: "Hotel created successfully",
      data: hotel,
    });
  } catch (error) {
    next(error);
  }
};

const getHotelById = async (req, res, next) => {
  try {
    const hotel = await hotelService.getHotelById(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      data: hotel,
    });
  } catch (error) {
    next(error);
  }
};

const getHotels = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await hotelService.getHotels(
        req.query
      );

    return res.status(200).json({
      success: true,
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

const updateHotel = async (
  req,
  res,
  next
) => {
  try {
    const hotel =
      await hotelService.updateHotel(
        req.params.id,
        req.body,
        req.user
      );

    return res.status(200).json({
      success: true,
      message: "Hotel updated successfully",
      data: hotel,
    });
  } catch (error) {
    next(error);
  }
};

const deleteHotel = async (
  req,
  res,
  next
) => {
  try {
    await hotelService.deleteHotel(
      req.params.id,
      req.user
    );

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const createOwnerHotel = async (
  req,
  res,
  next
) => {
  try {
    const hotel =
      await hotelService.createOwnerHotel(
        req.body,
        req.user
      );

    return res.status(201).json({
      success: true,
      message:
        "Hotel created successfully",
      data: hotel,
    });
  } catch (error) {
    next(error);
  }
};

const getOwnerHotels = async (
  req,
  res,
  next
) => {
  try {
    const hotels =
      await hotelService.getOwnerHotels(
        req.user
      );

    return res.status(200).json({
      success: true,
      data: hotels,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createHotel,
  getHotelById,
  getHotels,
  updateHotel,
  deleteHotel,
  createOwnerHotel,
  getOwnerHotels
};