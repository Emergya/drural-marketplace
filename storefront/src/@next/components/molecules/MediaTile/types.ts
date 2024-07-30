import { IImageToUpload } from "@pages";

export interface IProps {
  media: IImageToUpload;
  onDelete?: (id: string) => void;
}
