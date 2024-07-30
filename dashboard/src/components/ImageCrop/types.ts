import { IFileDimensions } from "@saleor/utils/_types/files";
import { Crop, ReactCropProps } from "react-image-crop";

import { IMessageContext } from "../messages";

export interface IImageCropProps extends ReactCropProps {
  imageSrc: string;
  imageRef: React.MutableRefObject<HTMLImageElement>;
  onImageLoad: (event: React.SyntheticEvent<HTMLImageElement>) => void;
}

export type DrawCanvasImage = (
  image: HTMLImageElement,
  crop: Crop,
  notify: IMessageContext,
  restrictions?: IFileDimensions,
  scale?: number,
  rotate?: number
) => HTMLCanvasElement | undefined;

export type CreateClientCrop = (
  image: HTMLImageElement,
  crop: Crop,
  notify: IMessageContext,
  restrictions?: IFileDimensions
) => Promise<File | undefined>;
