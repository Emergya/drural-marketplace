import { BookingDetails_booking } from "@pages/CheckoutPage/gqlTypes/BookingDetails";
import { IAddress, IFormError } from "@types";

export interface IProps {
  loading?: boolean;
  bookingDetails?: BookingDetails_booking | null;
  shippingAddress?: IAddress | null;
  billingAddress?: IAddress | null;
  shippingMethodName?: string;
  paymentMethodName?: string;
  email?: string;
  errors?: IFormError[];
}
