import {
  FileValidationError,
  FileValidator,
  GetFileFromCanvas,
  GetFileUrlAction
} from "@saleor/utils/_types/files";

export const cleanFileInputValue = (
  event: React.MouseEvent<HTMLInputElement>
) => {
  if (event.target) {
    (event.target as any).value = null;
  }
};

export const getFileFromCanvas: GetFileFromCanvas = async (
  canvas,
  fileName,
  fileType,
  notify
) => {
  try {
    const blobPromise = new Promise<Blob>(resolve => {
      canvas.toBlob(blob => resolve(blob), fileType, 1);
    });
    const blob = await blobPromise;
    return new File([blob], fileName, {
      type: fileType
    });
  } catch (_error) {
    notify({
      status: "error",
      text: "Error while generating the cropped image"
    });
  }
};

export const getFileUrl: GetFileUrlAction = (file, notify) => {
  try {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise<string>(resolve => {
      reader.onload = event => resolve(event.target?.result as string);
    });
  } catch (_error) {
    notify({
      status: "error",
      text: "Error while reading the file"
    });
  }
};

export const fileValidator: FileValidator = (
  file,
  fileUrl,
  validations,
  notify
) => {
  try {
    const { dimesions, maxSize } = validations;

    const image = new Image();
    image.src = fileUrl;

    return new Promise<FileValidationError | undefined>(resolve => {
      image.onload = () => {
        // 1. Size validation
        const passSizeValidation = file.size <= maxSize;
        if (!passSizeValidation) {
          resolve(FileValidationError.SIZE);
          return;
        }

        if (dimesions) {
          const { height, width } = dimesions;

          // 2. Dimensions min validation
          const isEqualOrGreaterThanMin =
            image.naturalHeight >= height.min &&
            image.naturalWidth >= width.min;
          if (!isEqualOrGreaterThanMin) {
            resolve(FileValidationError.MIN_DIMENSIONS);
            return;
          }

          // 3. Dimensions max validation
          const isEqualOrLowerThanMax =
            (height.max ? image.naturalHeight <= height.max : true) &&
            (width.max ? image.naturalWidth <= width.max : true);
          if (!isEqualOrLowerThanMax) {
            resolve(FileValidationError.MAX_DIMENSIONS);
            return;
          }
        }

        resolve(undefined);
      };
    });
  } catch (_error) {
    notify({
      status: "error",
      text: "Error while validating the file"
    });
  }
};
