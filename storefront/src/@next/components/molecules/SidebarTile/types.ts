import { ISource } from "../Thumbnail/types";

export interface IProps {
  boxShadow?: string;
  title?: string;
  image?: ISource;
  itemName: React.ReactNode;
  mobilePadding?: string;
  padding?: string;
  duration?: number | null;
}
