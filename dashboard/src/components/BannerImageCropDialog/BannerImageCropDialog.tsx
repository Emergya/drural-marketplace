import useNotifier from "@saleor/hooks/useNotifier";
import React, { useRef, useState } from "react";
import { Crop, PixelCrop } from "react-image-crop";

import { centerAspectCrop, createClientCrop } from "../ImageCrop/utils";
import ImageCropDialog from "../ImageCropDialog";
import { IBannerImageCropDialogProps } from "./types";

export const BannerImageCropDialog: React.FC<IBannerImageCropDialogProps> = ({
  imageSrc,
  open,
  onClose,
  onComplete,
  bannerAspect,
  minBannerHeight,
  bannerFileValitations
}) => {
  // 1. Variables
  const notify = useNotifier();

  const imageRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completeCrop, setCompleteCrop] = useState<PixelCrop>();
  const [minCropHeight, setMinCropHeight] = useState<number>();

  // 2. Events
  const onImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    if (bannerAspect) {
      const { width, height, naturalHeight } = event.currentTarget;
      const scaleY = height / naturalHeight;
      const inicialMinCropHeight = minBannerHeight * scaleY;
      setMinCropHeight(inicialMinCropHeight);
      setCrop(
        centerAspectCrop(inicialMinCropHeight, width, height, bannerAspect)
      );
    }
  };

  const onSave = async () => {
    const file = await createClientCrop(
      imageRef.current,
      completeCrop,
      notify,
      bannerFileValitations.dimesions
    );

    if (file) {
      onComplete(file);
    } else {
      notify({
        status: "error",
        text: "Error while saving the cropped image"
      });
    }
  };

  // 3. Render
  return (
    <ImageCropDialog
      aspect={bannerAspect}
      crop={crop}
      imageRef={imageRef}
      imageSrc={imageSrc}
      keepSelection
      minHeight={minCropHeight}
      open={open}
      ruleOfThirds
      onClose={onClose}
      onChange={(_crop, prixelCrop) => setCrop(prixelCrop)}
      onComplete={crop => setCompleteCrop(crop)}
      onImageLoad={onImageLoad}
      onSave={onSave}
    />
  );
};

export default BannerImageCropDialog;
