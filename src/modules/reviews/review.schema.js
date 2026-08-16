import * as yup from "yup";

const objectIdRegex =
  /^[0-9a-fA-F]{24}$/;

export const hotelIdSchema =
  yup.object({
    hotelId: yup
      .string()
      .matches(
        objectIdRegex,
        "Invalid hotel ID"
      )
      .required(
        "Hotel ID is required"
      ),
  });

export const reviewIdSchema =
  yup.object({
    id: yup
      .string()
      .matches(
        objectIdRegex,
        "Invalid review ID"
      )
      .required(
        "Review ID is required"
      ),
  });

  export const createReviewSchema =
  yup.object({
    bookingId: yup
      .string()
      .matches(
        objectIdRegex,
        "Invalid booking ID"
      )
      .required(
        "Booking ID is required"
      ),

    rating: yup
      .number()
      .integer()
      .min(1)
      .max(5)
      .required(
        "Rating is required"
      ),

    comment: yup
      .string()
      .trim()
      .min(
        5,
        "Comment must be at least 5 characters"
      )
      .max(
        1000,
        "Comment cannot exceed 1000 characters"
      )
      .required(
        "Comment is required"
      ),
  });

  export const updateReviewSchema =
  yup.object({
    rating: yup
      .number()
      .integer()
      .min(1)
      .max(5)
      .optional(),

    comment: yup
      .string()
      .trim()
      .min(5)
      .max(1000)
      .optional(),
  });