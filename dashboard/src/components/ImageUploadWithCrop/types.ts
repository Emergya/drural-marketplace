import { IFileValidations } from "@saleor/utils/_types/files";
import { MediaShapeEnum, MediaSizeEnum } from "@saleor/utils/_types/media";
import React from "react";

export interface IImageWithCropProps {
  title: string;
  validations: IFileValidations;
  description: string;
  image: string;
  setImage: React.Dispatch<React.SetStateAction<File>>;
  onImageDelete: () => void;
  shape?: MediaShapeEnum;
  size?: MediaSizeEnum;
  setUploadLinkRef?: React.Dispatch<
    React.SetStateAction<React.MutableRefObject<HTMLInputElement>>
  >;
  uploadButton?: boolean;
  withCropper?: boolean;
  bannerAspect?: number;
  minBannerHeight?: number;
  fileAcceptedFormats?: string;
}
