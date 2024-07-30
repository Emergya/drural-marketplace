import { OrderStatus } from "@drural/sdk";
import { UrlObject } from "url";

export interface IProps {
  orderStatus: OrderStatus;
  orderNumber: string;
  continueShoppingUrl: string | UrlObject;
  orderDetailsUrl: string | UrlObject;

  onButtonClick: (url: string | UrlObject) => void;
}
