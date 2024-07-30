import { IFileValidations } from "@saleor/utils/_types/files";

export const bannerFileName = "banner-cropped-image.jpeg";
export const bannerFileType = "image/jpeg";

export const minBannerWidth = 1440;
export const minBannerHeight = 480;
export const maxBannerWidth = 2550;
export const maxBannerHeight = 850;
export const minDashboardBannerWidth = 520;
export const minDashboardBannerHeight = 1024;
export const minStorefrontBannerWidth = 1440;
export const minStorefrontBannerHeight = 720;
export const bannerAspect = 12 / 4;
export const dashboardBannerAspect = 1 / 2;
export const storefrontBannerAspect = 2 / 1;
export const maxUploadFileSize = 2097152; // 2MG

export const defaultFileAcceptedFormats = ".png, .jpg, .jpeg, .gif";

export const commonFileValidations: IFileValidations = {
  maxSize: maxUploadFileSize
};

export const bannerFileValitations: IFileValidations = {
  ...commonFileValidations,
  dimesions: {
    height: { min: minBannerHeight },
    width: { min: minBannerWidth }
  }
};

export const bannerDashboardFileValitations: IFileValidations = {
  ...commonFileValidations,
  dimesions: {
    height: { min: minDashboardBannerHeight },
    width: { min: minDashboardBannerWidth }
  }
};

export const bannerStorefrontFileValitations: IFileValidations = {
  ...commonFileValidations,
  dimesions: {
    height: { min: minStorefrontBannerHeight },
    width: { min: minStorefrontBannerWidth }
  }
};
