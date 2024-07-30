export interface ProductEmailVariablesProps {
  isBookable: boolean;
}

export interface PurchaseEmailVariable {
  name: string;
  helperText: string;
}

export enum VariablesEnum {
  user_name = "user_name",
  product_name = "product_name",
  price = "price",
  currency = "order.currency",
  billing_address = "order.billing_address",
  booking_reference = "booking.reference",
  bookable_resource_name = "booking.bookable_resource.name",
  booking_start_date = "booking.start_date",
  product_duration = "product_duration"
}
