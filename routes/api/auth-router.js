import express from "express";

import authController from "../../controllers/auth-controller.js";

import { authenticate, isEmptyBody, upload } from "../../middlewares/index.js";

import { validateBody } from "../../decorators/index.js";

import {
  userSignupSchema,
  userSigninSchema,
  userEmailSchema,
} from "../../models/User.js";

const userSignupValidate = validateBody(userSignupSchema);
const userSigninValidate = validateBody(userSigninSchema);
const userEmailValidate = validateBody(userEmailSchema);

const authRouter = express.Router();

authRouter.post(
  "/register",
  isEmptyBody,
  userSignupValidate,
  authController.signup
);

authRouter.get("/verify/:verificationToken", authController.verify);

authRouter.post(
  "/verify",
  isEmptyBody,
  userEmailValidate,
  authController.resendVerifyEmail
);

authRouter.post(
  "/login",
  isEmptyBody,
  userSigninValidate,
  authController.signin
);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authController.updateAvatar
);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.signout);

export default authRouter;
