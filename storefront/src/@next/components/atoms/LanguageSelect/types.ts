import { ILanguageObject } from "./utils";

export interface IProps {
  value: ILanguageObject | undefined;
  onChange: (value: string) => void;
  options?: Array<ILanguageObject>;
  menuIsOpen?: boolean;
  customStyles?: any;
  optionValueKey?: string;
  optionLabelKey?: string;
  menuPlacement?: "auto" | "bottom" | "top";
}
