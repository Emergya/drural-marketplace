import { IMessageContext } from "@saleor/components/messages";

export interface IMinMax {
  min: number;
  max?: number;
}

export interface IFileDimensions {
  height: IMinMax;
  width: IMinMax;
}

export interface IFileValidations {
  dimesions?: IFileDimensions;
  maxSize: number;
}

export enum FileValidationError {
  SIZE = "SIZE",
  MIN_DIMENSIONS = "MIN_DIMENSIONS",
  MAX_DIMENSIONS = "MAX_DIMENSIONS"
}

export type FileValidator = (
  file: File,
  fileUrl: string,
  validations: IFileValidations,
  notify: IMessageContext
) => Promise<FileValidationError | undefined>;

export type GetFileFromCanvas = (
  canvas: HTMLCanvasElement,
  fileName: string,
  fileType: string,
  notify: IMessageContext
) => Promise<File | undefined>;

export type GetFileUrlAction = (
  file: File,
  notify: IMessageContext
) => Promise<string | undefined>;
