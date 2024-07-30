import { IFileValidations } from "@saleor/utils/_types/files";

export interface IBannerImageCropDialogProps {
  imageSrc: string;
  open: boolean;
  onClose: () => void;
  onComplete: (file: File) => void;
  bannerAspect: number;
  minBannerHeight: number;
  bannerFileValitations: IFileValidations;
}
