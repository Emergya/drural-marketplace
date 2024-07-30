import { IImage, ITaxedMoney } from "@types";

export interface IProps {
  index?: number;
  bookingId: string;
  name: string;
  quantity: number;
  price: ITaxedMoney;
  thumbnail?: IImage;
}
