import { Action } from "@saleor/business/utils";
import { IFileValidations } from "@saleor/utils/_types/files";
import { MediaShapeEnum, MediaSizeEnum } from "@saleor/utils/_types/media";

export interface IBusinessMediaProps {
  actionName: "imageShop" | "banner";
  description: string;
  image?: string;
  shape?: MediaShapeEnum;
  size?: MediaSizeEnum;
  title: string;
  validations: IFileValidations;
  withCropper?: boolean;
  dispatch: React.Dispatch<Action>;
  setImage?: React.Dispatch<React.SetStateAction<string>>;
}
