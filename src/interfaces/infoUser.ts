import { ImageUploadInterface } from "./imageUpload";

export interface InfoUserInterface {
  avatar: ImageUploadInterface | null;
  name: string;
  gender: string;
  birthday: string;
  introduce: string;
}
