import crypto from "crypto";
import { User } from "../models/user.modal.js";
import { ApiError } from "./ApiError.js";

export const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Error generating access and refresh token");
  }
};

export const cookiesOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
};

export const generateOtp = (length = 6) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let otpNumber = "";
  const randomBytes = crypto.randomBytes(length);

  for (let i = 0; i < length; i++) {
    otpNumber += chars[randomBytes[i] % chars.length];
  }

  const otpExpiry = new Date(Date.now() + 2 * 60 * 1000); // 2 min

  return { otpNumber, otpExpiry };
};
