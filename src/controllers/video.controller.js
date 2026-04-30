import { Video } from "../models/video.modal.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const videoCreate = asyncHandler(async (req, res) => {
  let videoLocalPath;
  let thumbnailLocalPath;

  const { title, description, duration } = req.body;
  const fields = { title, description, duration };

  for (const [key, value] of Object.entries(fields)) {
    if (!value || value.trim() === "") {
      throw new ApiError(400, `${key} is required`);
    }
  }

  if (
    req.files &&
    Array.isArray(req.files.videoFile) &&
    req.files.videoFile.length > 0
  ) {
    videoLocalPath = req.files.videoFile[0].path;
  }

  if (
    req.files &&
    Array.isArray(req.files.thumbnail) &&
    req.files.thumbnail.length > 0
  ) {
    thumbnailLocalPath = req.files.thumbnail[0].path;
  }

  if (!videoLocalPath) {
    throw new ApiError(400, "Video file is required");
  }

  if (!thumbnailLocalPath) {
    throw new ApiError(400, "Thumbnail is required");
  }

  const [videoUpload, thumbnailUpload] = await Promise.all([
    uploadOnCloudinary(videoLocalPath),
    uploadOnCloudinary(thumbnailLocalPath),
  ]);

  if (!videoUpload?.url) {
    throw new ApiError(500, "Error uploading video");
  }

  if (!thumbnailUpload?.url) {
    throw new ApiError(500, "Error uploading thumbnail");
  }

  const video = await Video.create({
    videoFile: videoUpload.url,
    thumbnail: thumbnailUpload.url,
    title,
    description,
    duration,
    owner: req.user._id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Video created successfully", video));
});

const getAllVideos = asyncHandler(async (req, res) => {
  const { search = "", page = 1, limit = 10 } = req.query;

  const skip = (page - 1) * limit;

  const query = {
    isPublished: true,
    title: { $regex: search, $options: "i" },
  };

  const videos = await Video.find(query)
    .sort({ createdAt: -1 })
    .skip(Number(skip))
    .limit(Number(limit));

  const totalVideos = await Video.countDocuments(query);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        videos,
        totalVideos,
        currentPage: Number(page),
        totalPages: Math.ceil(totalVideos / limit),
      },
      "Videos fetched successfully"
    )
  );
});

export { videoCreate };
