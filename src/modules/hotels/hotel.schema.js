import * as yup from "yup";

export const createHotelSchema = yup.object({

  name: yup
    .string()
    .trim()
    .min(
      3,
      "Hotel name must be at least 3 characters"
    )
    .max(
      100,
      "Hotel name cannot exceed 100 characters"
    )
    .required("Hotel name is required"),

  description: yup
    .string()
    .trim()
    .min(
      10,
      "Description must be at least 10 characters"
    )
    .max(
      1000,
      "Description cannot exceed 1000 characters"
    )
    .required("Description is required"),

  location: yup
    .object({
      address: yup
        .string()
        .trim()
        .min(3)
        .required("Address is required"),

      city: yup
        .string()
        .trim()
        .min(2)
        .required("City is required"),

      state: yup
        .string()
        .trim()
        .min(2)
        .required("State is required"),

      country: yup
        .string()
        .trim()
        .min(2)
        .required("Country is required"),

      latitude: yup
        .number()
        .min(-90)
        .max(90)
        .optional(),

      longitude: yup
        .number()
        .min(-180)
        .max(180)
        .optional(),
    })
    .required("Location is required"),

  images: yup
    .array()
    .of(yup.string().url("Invalid image URL"))
    .default([]),

  amenities: yup
    .array()
    .of(
      yup
        .string()
        .trim()
        .min(1)
    )
    .default([]),
});

export const hotelParamsSchema = yup.object({
  id: yup
    .string()
    .matches(
      /^[0-9a-fA-F]{24}$/,
      "Invalid hotel ID"
    )
    .required("Hotel ID is required"),
});

export const updateHotelSchema =
  yup.object({
    name: yup
      .string()
      .trim()
      .min(3)
      .max(100)
      .optional(),

    description: yup
      .string()
      .trim()
      .min(10)
      .max(1000)
      .optional(),

    location: yup
      .object({
        address: yup
          .string()
          .trim()
          .min(3)
          .optional(),

        city: yup
          .string()
          .trim()
          .min(2)
          .optional(),

        state: yup
          .string()
          .trim()
          .min(2)
          .optional(),

        country: yup
          .string()
          .trim()
          .min(2)
          .optional(),

        latitude: yup
          .number()
          .min(-90)
          .max(90)
          .optional(),

        longitude: yup
          .number()
          .min(-180)
          .max(180)
          .optional(),
      })
      .optional(),

    images: yup
      .array()
      .of(
        yup.string().url()
      )
      .optional(),

    amenities: yup
      .array()
      .of(
        yup.string().trim().min(1)
      )
      .optional(),
  })
  .noUnknown();


export const hotelQuerySchema = yup
  .object({
    search: yup
      .string()
      .trim()
      .optional(),

    location: yup
      .string()
      .trim()
      .optional(),

    minPrice: yup
      .number()
      .min(
        0,
        "Minimum price cannot be negative"
      )
      .optional(),

    maxPrice: yup
      .number()
      .min(
        0,
        "Maximum price cannot be negative"
      )
      .optional(),

    rating: yup
      .number()
      .min(0)
      .max(5)
      .optional(),

    amenities: yup
      .string()
      .optional(),

    checkIn: yup
      .date()
      .typeError(
        "Invalid check-in date"
      )
      .optional(),

    checkOut: yup
      .date()
      .typeError(
        "Invalid check-out date"
      )
      .optional(),

    guests: yup
      .number()
      .integer()
      .min(
        1,
        "Guests must be at least 1"
      )
      .optional(),

    rooms: yup
      .number()
      .integer()
      .min(
        1,
        "Rooms must be at least 1"
      )
      .optional(),

    sort: yup
      .string()
      .oneOf([
        "price_asc",
        "price_desc",
        "rating_desc",
        "newest",
      ])
      .default("newest"),

    page: yup
      .number()
      .integer()
      .min(1)
      .default(1),

    limit: yup
      .number()
      .integer()
      .min(1)
      .max(100)
      .default(10),
  })
  .test(
    "valid-date-range",
    "Check-out must be after check-in",
    function (value) {
      const {
        checkIn,
        checkOut,
      } = value;

      if (!checkIn || !checkOut) {
        return true;
      }

      return (
        new Date(checkOut) >
        new Date(checkIn)
      );
    }
  );