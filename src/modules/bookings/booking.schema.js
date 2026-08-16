import * as yup from "yup";

const objectIdRegex =
  /^[0-9a-fA-F]{24}$/;

const objectId = yup
  .string()
  .matches(
    objectIdRegex,
    "Invalid ID"
  )
  .required();

export const createBookingSchema =
  yup.object({
    hotelId: objectId,

    roomId: objectId,

    checkIn: yup
      .date()
      .typeError(
        "Invalid check-in date"
      )
      .required(
        "Check-in date is required"
      ),

    checkOut: yup
      .date()
      .typeError(
        "Invalid check-out date"
      )
      .required(
        "Check-out date is required"
      )
      .test(
        "after-check-in",
        "Check-out must be after check-in",
        function (checkOut) {
          const { checkIn } =
            this.parent;

          if (
            !checkIn ||
            !checkOut
          ) {
            return true;
          }

          return (
            new Date(checkOut) >
            new Date(checkIn)
          );
        }
      ),

    rooms: yup
      .number()
      .integer()
      .min(
        1,
        "At least one room is required"
      )
      .max(
        20,
        "Maximum 20 rooms allowed"
      )
      .required(
        "Number of rooms is required"
      ),

    guests: yup
      .number()
      .integer()
      .min(
        1,
        "At least one guest is required"
      )
      .required(
        "Number of guests is required"
      ),
  });

  export const bookingIdSchema =
  yup.object({
    id: yup
      .string()
      .matches(
        /^[0-9a-fA-F]{24}$/,
        "Invalid booking ID"
      )
      .required(
        "Booking ID is required"
      ),
  });

  export const ownerBookingQuerySchema =
  yup.object({
    status: yup
      .string()
      .oneOf([
        "pending",
        "confirmed",
        "cancelled",
        "completed",
      ])
      .optional(),

    hotelId: yup
      .string()
      .matches(
        /^[0-9a-fA-F]{24}$/,
        "Invalid hotel ID"
      )
      .optional(),

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
  });