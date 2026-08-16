import express from "express";

import authController from "./auth.controller.js";

import validate from "../../middleware/validation.middleware.js";

import {
  registerSchema,
  loginSchema,
} from "./auth.schema.js";

const router = express.Router();

router.post(
  "/register",
  validate(registerSchema),
  authController.register
);

router.post(
  "/login",
  validate(loginSchema),
  authController.login
);

export default router;