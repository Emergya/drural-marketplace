import { IImageCropProps } from "../ImageCrop/types";

export interface IImageCropDialogProps extends IImageCropProps {
  open: boolean;
  onClose: () => void;
  onImageLoad: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  onSave: () => Promise<void>;
}
