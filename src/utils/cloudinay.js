import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) return null;
    //steps to upload files on cloudinary
    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
    //steps after successful upload
    console.log("file uploaded successfully to cloudinary", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(filePath); // used to remove temp file stored in local when upload is failed
    return null;
  }
};

export { uploadOnCloudinary };
