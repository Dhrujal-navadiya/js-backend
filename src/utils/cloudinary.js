import { v2 as cloudinary } from "cloudinary";

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
      console.log("File is uploaded on cloudinary", response);
      return response;
    }
  } catch (error) {
    fs.unlinkSync(localFilePatch);
    console.log("Error uploading file on cloudinary", error);
    return null;
  }
};
