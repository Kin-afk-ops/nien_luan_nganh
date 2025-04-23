import { ImageUploadInterface } from "@/interfaces/imageUpload";
import axiosInstance from "../api/config";

const uploadImage = async (
  file: File | null
): Promise<ImageUploadInterface | null> => {
  let imageData: ImageUploadInterface = {
    path: "/",
    publicId: "/",
  };
  if (!file) {
    return null;
  } else {
    try {
      const uploadData = new FormData();
      uploadData.append("file", file, "file");
      const resImg = await axiosInstance.post("/image/upload", uploadData);

      imageData = {
        path: await resImg.data.file.path,
        publicId: await resImg.data.file.filename,
      };
    } catch (error) {
      console.log(error);
    }
    return imageData;
  }
};

export default uploadImage;
