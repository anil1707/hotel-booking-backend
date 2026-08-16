import * as yup from "yup";

export const createRoomSchema =
  yup.object({
    name: yup
      .string()
      .trim()
      .min(
        2,
        "Room name must be at least 2 characters"
      )
      .max(
        100,
        "Room name cannot exceed 100 characters"
      )
      .required("Room name is required"),

    type: yup
      .string()
      .oneOf([
        "standard",
        "deluxe",
        "premium",
        "suite",
        "family",
      ])
      .required("Room type is required"),

    description: yup
      .string()
      .trim()
      .max(
        1000,
        "Description cannot exceed 1000 characters"
      )
      .optional(),

    pricePerNight: yup
      .number()
      .min(
        0,
        "Price cannot be negative"
      )
      .required(
        "Price per night is required"
      ),

    capacity: yup
      .number()
      .integer()
      .min(1)
      .required(
        "Capacity is required"
      ),

    beds: yup
      .number()
      .integer()
      .min(1)
      .required(
        "Number of beds is required"
      ),

    amenities: yup
      .array()
      .of(
        yup.string().trim().min(1)
      )
      .default([]),

    images: yup
      .array()
      .of(
        yup.string().url()
      )
      .default([]),

    totalRooms: yup
      .number()
      .integer()
      .min(1)
      .required(
        "Total rooms is required"
      ),
  });

  export const updateRoomSchema =
  yup.object({
    name: yup
      .string()
      .trim()
      .min(2)
      .max(100)
      .optional(),

    type: yup
      .string()
      .oneOf([
        "standard",
        "deluxe",
        "premium",
        "suite",
        "family",
      ])
      .optional(),

    description: yup
      .string()
      .trim()
      .max(1000)
      .optional(),

    pricePerNight: yup
      .number()
      .min(0)
      .optional(),

    capacity: yup
      .number()
      .integer()
      .min(1)
      .optional(),

    beds: yup
      .number()
      .integer()
      .min(1)
      .optional(),

    amenities: yup
      .array()
      .of(
        yup.string().trim().min(1)
      )
      .optional(),

    images: yup
      .array()
      .of(
        yup.string().url()
      )
      .optional(),

    totalRooms: yup
      .number()
      .integer()
      .min(1)
      .optional(),

    status: yup
      .string()
      .oneOf([
        "active",
        "inactive",
      ])
      .optional(),
  });

  export const hotelIdSchema =
  yup.object({
    hotelId: yup
      .string()
      .matches(
        /^[0-9a-fA-F]{24}$/,
        "Invalid hotel ID"
      )
      .required(
        "Hotel ID is required"
      ),
  });

export const roomIdSchema =
  yup.object({
    id: yup
      .string()
      .matches(
        /^[0-9a-fA-F]{24}$/,
        "Invalid room ID"
      )
      .required(
        "Room ID is required"
      ),
  });