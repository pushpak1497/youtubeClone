import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  secure: true,
});

const uploadOnCloudinary = async (localFilePath) => {
  //console.log(localFilePath);
  try {
    if (!localFilePath) return null;
    //steps to upload files on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      use_filename: true,
      overwrite: true,
    });

    //steps after successful upload

    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // used to remove temp file stored in local when upload is failed
    return null;
  }
};

export { uploadOnCloudinary };
