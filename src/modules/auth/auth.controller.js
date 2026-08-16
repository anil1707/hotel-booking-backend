import authService from "./auth.service.js";

const register = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await authService.register(
        req.body
      );

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (
  req,
  res,
  next
) => {
  try {
    const { email, password } =
      req.body;

    const result =
      await authService.login(
        email,
        password
      );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login,
};