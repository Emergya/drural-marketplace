import { IImage } from "@saleor/utils/_types/IImage";
import { MediaShapeEnum } from "@saleor/utils/_types/media";

export interface IBusinessMediaProps {
  description?: string;
  image: IImage;
  shape: MediaShapeEnum;
  subTitle?: string;
  title: string;
  onImageDelete?: () => void;
  onImageUpload: (file: File) => void;
}
