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