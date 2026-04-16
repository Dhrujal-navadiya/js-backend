import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePatch) => {
  try {
    if (!localFilePatch) return null;

    // upload the file to cloudinary
    const response = await cloudinary.uploader.upload(localFilePatch, {
      resource_type: "auto",
    });

    // file has been uploaded successfully
    if (response) {
      fs.unlinkSync(localFilePatch);
      return response;
    }
  } catch (error) {
    fs.unlinkSync(localFilePatch);
    console.log("Error uploading file on Cloudinary", error);
    return null;
  }
};

export { uploadOnCloudinary };
