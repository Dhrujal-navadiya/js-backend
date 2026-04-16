import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.modal.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const registerUser = asyncHandler(async (req, res) => {
  // get data
  // validate data - not empty
  // check user already exists with check user and email
  // check images or avatar - upload cloudinary
  // create user object
  // remove password and refresh token field from response
  // check user creation
  // return response

  const fields = { fullName, username, email, password };

  for (const [key, value] of Object.entries(fields)) {
    if (!value || value.trim() === "") {
      throw new ApiError(400, `${key} is required`);
    }
  }

  if (!emailRegex.test(email)) {
    throw new ApiError(400, "Invalid email format");
  }

  const exisitedUser = User.findOne({
    $or: [{ username }, { email }],
  });

  if (exisitedUser) {
    throw new ApiError(409, "User already exists");
  }

  console.log("Request file data", req.files);

  const avatarLocalPath = req?.files?.avatar[0]?.path;
  const coverImageLocalPath = req?.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const converImage = await uploadOnCloudinary(coverImageLocalPath);

  if (avatar) {
    throw new ApiError(400, "Avatar is required");
  }

  const user = await User.create({
    email,
    password,
    fullName,
    username: username.toLowerCase(),
    avatar: avatar.url,
    coverImage: converImage?.url || "",
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Error creating user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User created successfully"));
});

export { registerUser };
