import { IFileDimensions } from "@saleor/utils/_types/files";
import { bannerFileName, bannerFileType } from "@saleor/utils/files/constants";
import { getFileFromCanvas } from "@saleor/utils/files/files";
import { centerCrop, makeAspectCrop } from "react-image-crop";

import { CreateClientCrop, DrawCanvasImage } from "./types";

const TO_RADIANS = Math.PI / 180;

export const centerAspectCrop = (
  cropHieght: number,
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) =>
  centerCrop(
    makeAspectCrop(
      {
        unit: "px",
        height: cropHieght
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );

export const getCanvasSize = (
  dimensionName: "width" | "height",
  size: number,
  dimensions: IFileDimensions
) => {
  const { min, max } = dimensions[dimensionName];
  if (min > size) {
    size = min;
  }
  if (max && max < size) {
    size = max;
  }
  return size;
};

export const drawCanvasImage: DrawCanvasImage = (
  image,
  crop,
  notify,
  restrictions,
  scale = 1,
  rotate = 0
) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    notify({
      status: "error",
      text: "Error while drawing the cropped image"
    });
    return;
  }

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  // devicePixelRatio slightly increases sharpness on retina devices
  // at the expense of slightly slower render times and needing to
  // size the image back down if you want to download/upload and be
  // true to the images natural size.
  // const pixelRatio = window.devicePixelRatio;
  const pixelRatio = 1; // in mobile could turn to 2.

  canvas.width = getCanvasSize(
    "width",
    crop.width * scaleX * pixelRatio,
    restrictions
  );
  canvas.height = getCanvasSize(
    "height",
    crop.height * scaleY * pixelRatio,
    restrictions
  );

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = "high";

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  const rotateRads = rotate * TO_RADIANS;
  const centerX = image.naturalWidth / 2;
  const centerY = image.naturalHeight / 2;

  ctx.save();

  // 5) Move the crop origin to the canvas origin (0,0)
  ctx.translate(-cropX, -cropY);
  // 4) Move the origin to the center of the original position
  ctx.translate(centerX, centerY);
  // 3) Rotate around the origin
  ctx.rotate(rotateRads);
  // 2) Scale the image
  ctx.scale(scale, scale);
  // 1) Move the center of the image to the origin (0,0)
  ctx.translate(-centerX, -centerY);
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight
  );

  ctx.restore();

  return canvas;
};

export const createClientCrop: CreateClientCrop = async (
  image,
  crop,
  notify,
  restrictions
) => {
  if (image && crop?.width && crop?.height) {
    const canvasImage = drawCanvasImage(image, crop, notify, restrictions);

    if (canvasImage) {
      const result = await getFileFromCanvas(
        canvasImage,
        bannerFileName,
        bannerFileType,
        notify
      );
      return result;
    }
  }
};
