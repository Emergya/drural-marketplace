import { FormikProps } from "formik";

import { IImageToUpload } from "@pages";

export interface IFormError {
  message: string | null;
  field: string | null;
}

export interface IProps {
  formik: FormikProps<{
    reason: string;
    phone: string;
  }>;
  error?: IFormError[];
}

export interface ImageTileProps {
  imagesToUpload: IImageToUpload[];
  setImagesToUpload: (
    prevImagesToUpload: React.SetStateAction<IImageToUpload[]>
  ) => void;
}
