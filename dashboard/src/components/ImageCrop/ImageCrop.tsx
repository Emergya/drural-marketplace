import "react-image-crop/dist/ReactCrop.css";

import React from "react";
import ReactCrop from "react-image-crop";

import { IImageCropProps } from "./types";

export const ImageCrop: React.FC<IImageCropProps> = ({
  imageRef,
  imageSrc,
  onImageLoad,
  ...props
}) =>
  Boolean(imageSrc) && (
    <ReactCrop {...props}>
      <img ref={imageRef} src={imageSrc} onLoad={onImageLoad} />
    </ReactCrop>
  );
export default ImageCrop;
