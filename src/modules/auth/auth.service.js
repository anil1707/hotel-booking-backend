import bcrypt from "bcryptjs";

import userRepository from "../users/user.repository.js";
import { generateToken } from "../../utils/jwt.js";

const register = async (data) => {
  const existingUser =
    await userRepository.findByEmail(
      data.email
    );

  if (existingUser) {
    const error = new Error(
      "Email already registered"
    );

    error.statusCode = 409;

    throw error;
  }

  const hashedPassword =
    await bcrypt.hash(data.password, 12);

  const user =
    await userRepository.create({
      ...data,
      password: hashedPassword,
    });

  const token = generateToken(user);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      roles: user.roles,
    },
    token,
  };
};

const login = async (email, password) => {
  const user =
    await userRepository.findByEmail(email);

  if (!user) {
    const error = new Error(
      "Invalid email or password"
    );

    error.statusCode = 401;

    throw error;
  }

  const isPasswordValid =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!isPasswordValid) {
    const error = new Error(
      "Invalid email or password"
    );

    error.statusCode = 401;

    throw error;
  }

  if (!user.isActive) {
    const error = new Error(
      "User account is inactive"
    );

    error.statusCode = 403;

    throw error;
  }

  const token = generateToken(user);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      roles: user.roles,
    },
    token,
  };
};

export default {
  register,
  login,
};