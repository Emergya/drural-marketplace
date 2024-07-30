import { ProductErrorFragment } from "@saleor/fragments/types/ProductErrorFragment";
import { Moment } from "moment-timezone";

export interface ProductDurationProps {
  disabled: boolean;
  duration: Moment;
  errors: ProductErrorFragment[];
  onDurationChange: (hours: number, minutes: number) => void;
}
