import Hotel from "./hotel.model.js";

const create = async (data) => {
  return Hotel.create(data);
};

const findById = async (id) => {
  return Hotel.findById(id);
};

const findAll = async ({
  filters,
  sort,
  page,
  limit,
}) => {
  const {
    search,
    location,
    minPrice,
    maxPrice,
    rating,
    amenities,
  } = filters;

  const query = {};

  // Search by hotel name
  if (search) {
    query.name = {
      $regex: search,
      $options: "i",
    };
  }

  // Location filter
  if (location) {
    query["location.city"] = {
      $regex: location,
      $options: "i",
    };
  }

  // Rating filter
  if (rating !== undefined) {
    query.rating = {
      $gte: rating,
    };
  }

  // Price filter
  if (
    minPrice !== undefined ||
    maxPrice !== undefined
  ) {
    query.minPrice = {};

    if (minPrice !== undefined) {
      query.minPrice.$gte = minPrice;
    }

    if (maxPrice !== undefined) {
      query.minPrice.$lte = maxPrice;
    }
  }

  // Amenities
  if (amenities) {
    const amenityList =
      amenities.split(",");

    query.amenities = {
      $all: amenityList,
    };
  }

  // Sorting
  let sortOption = {
    createdAt: -1,
  };

  if (sort === "price_asc") {
    sortOption = {
      minPrice: 1,
    };
  }

  if (sort === "price_desc") {
    sortOption = {
      minPrice: -1,
    };
  }

  if (sort === "rating_desc") {
    sortOption = {
      rating: -1,
    };
  }

  // Pagination
  const skip =
    (page - 1) * limit;

  const [hotels, total] =
    await Promise.all([
      Hotel.find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(limit),

      Hotel.countDocuments(query),
    ]);

  return {
    data: hotels,

    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(
        total / limit
      ),
      hasNextPage:
        page < Math.ceil(total / limit),
      hasPreviousPage:
        page > 1,
    },
  };
};

const updateById = async (id, data) => {
  return Hotel.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );
};

const deleteById = async (id) => {
  return Hotel.findByIdAndDelete(id);
};

const findByOwnerId = async (ownerId) => {
  return Hotel.find({
    ownerId,
  }).sort({
    createdAt: -1,
  });
};

export default {
  create,
  findById,
  findAll,
  updateById,
  deleteById,
  findByOwnerId,
  findByOwnerId,
};