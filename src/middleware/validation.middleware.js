const validate = (
  schema,
  source = "body"
) => {
  return async (req, res, next) => {
    try {
      const validatedData =
        await schema.validate(
          req[source],
          {
            abortEarly: false,
            stripUnknown: true,
          }
        );

      req.validated = req.validated || {};

      req.validated[source] =
        validatedData;

      next();
    } catch (error) {
      const errors =
        error?.inner?.map(
          (validationError) => ({
            field:
              validationError.path,
            message:
              validationError.message,
          })
        ) ?? [];

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }
  };
};

export default validate;