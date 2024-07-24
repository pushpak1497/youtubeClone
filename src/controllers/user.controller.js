import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinay.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  //get user details from frontend

  const { email, userName, fullName, password } = req.body;
  console.log(fullName);

  //validation of user details

  if (
    [fullName, email, userName, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  //check if user already exists:with both username and email

  const existedUser = User.findOne({
    $or: [{ email }, { userName }],
  });

  if (existedUser) {
    throw new ApiError(409, "User Already Exists");
  }

  //check for images(avatar required field)

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  if (avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }
  //upload images to cloudinary,check for avatar

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  //create user object - create entry in Db
  const user = await User.create({
    email,
    password,
    fullName,
    userName: userName.toLowerCase(),
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });
  //remove password and refresh token from response
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  //check for user creation
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering User");
  }
  //if created return response
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Registered Successfully"));
});

export { registerUser };
