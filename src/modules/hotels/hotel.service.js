import hotelRepository from "./hotel.repository.js";

const createHotel = async (data) => {
  const hotel = await hotelRepository.create(data);

  return hotel;
};

const getHotelById = async (id) => {
  const hotel = await hotelRepository.findById(id);

  if (!hotel) {
    const error = new Error("Hotel not found");
    error.statusCode = 404;

    throw error;
  }

  return hotel;
};

const getHotels = async (query) => {
  const {
    search,
    location,
    minPrice,
    maxPrice,
    rating,
    amenities,
    sort,
    page,
    limit,
  } = query;

  const filters = {
    search,
    location,
    minPrice,
    maxPrice,
    rating,
    amenities,
  };

  return hotelRepository.findAll({
    filters,
    sort,
    page,
    limit,
  });
};

const updateHotel = async (
  id,
  data,
  user
) => {
  const hotel =
    await hotelRepository.findById(id);

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
      "You are not allowed to update this hotel"
    );

    error.statusCode = 403;

    throw error;
  }

  return hotelRepository.updateById(
    id,
    data
  );
};

const deleteHotel = async (
  id,
  user
) => {
  const hotel =
    await hotelRepository.findById(id);

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
      "You are not allowed to delete this hotel"
    );

    error.statusCode = 403;

    throw error;
  }

  await hotelRepository.deleteById(id);
};

export default {
  createHotel,
  getHotelById,
  getHotels,
  updateHotel,
  deleteHotel,
};