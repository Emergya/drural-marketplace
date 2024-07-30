import { IImageToUpload } from "@pages";
import { IFormError } from "@types";

export interface IProps {
  imagesToUpload: IImageToUpload[];
  maxImages?: number;
  onImageSelect: (files: FileList) => void;
  onImageDelete: (id: string) => void;
  errors: IFormError[];
}
