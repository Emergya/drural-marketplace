/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderRefundProductsInput, OrderErrorCode, AddressTypeEnum, DiscountValueTypeEnum, FulfillmentStatus, OrderDiscountType, OrderEventsEmailsEnum, OrderEventsEnum, PaymentChargeStatusEnum, OrderStatus, OrderAction, JobStatusEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: OrderFulfillmentRefundProducts
// ====================================================

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_errors {
  __typename: "OrderError";
  /**
   * The error code.
   */
  code: OrderErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * A type of address that causes the error.
   */
  addressType: AddressTypeEnum | null;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_fulfillment_lines_orderLine_variant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_fulfillment_lines_orderLine_unitDiscount {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_fulfillment_lines_orderLine_undiscountedUnitPrice_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_fulfillment_lines_orderLine_undiscountedUnitPrice_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_fulfillment_lines_orderLine_undiscountedUnitPrice {
  __typename: "TaxedMoney";
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Amount of money including taxes.
   */
  gross: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_fulfillment_lines_orderLine_undiscountedUnitPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_fulfillment_lines_orderLine_undiscountedUnitPrice_net;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_fulfillment_lines_orderLine_unitPrice_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_fulfillment_lines_orderLine_unitPrice_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_fulfillment_lines_orderLine_unitPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_fulfillment_lines_orderLine_unitPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_fulfillment_lines_orderLine_unitPrice_net;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_fulfillment_lines_orderLine_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_fulfillment_lines_orderLine {
  __typename: "OrderLine";
  /**
   * The ID of the object.
   */
  id: string;
  isShippingRequired: boolean;
  /**
   * A purchased product variant. Note: this field may be null if the variant has been removed from stock at all.
   */
  variant: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_fulfillment_lines_orderLine_variant | null;
  productName: string;
  productSku: string;
  quantity: number;
  quantityFulfilled: number;
  /**
   * The discount applied to the single order line.
   */
  unitDiscount: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_fulfillment_lines_orderLine_unitDiscount;
  /**
   * Value of the discount. Can store fixed value or percent value
   */
  unitDiscountValue: any;
  unitDiscountReason: string | null;
  /**
   * Type of the discount: fixed or percent
   */
  unitDiscountType: DiscountValueTypeEnum | null;
  /**
   * Price of the single item in the order line without applied an order line discount.
   */
  undiscountedUnitPrice: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_fulfillment_lines_orderLine_undiscountedUnitPrice;
  /**
   * Price of the single item in the order line.
   */
  unitPrice: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_fulfillment_lines_orderLine_unitPrice;
  /**
   * The main thumbnail for the ordered product.
   */
  thumbnail: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_fulfillment_lines_orderLine_thumbnail | null;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_fulfillment_lines {
  __typename: "FulfillmentLine";
  /**
   * The ID of the object.
   */
  id: string;
  quantity: number;
  orderLine: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_fulfillment_lines_orderLine | null;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_fulfillment_warehouse {
  __typename: "Warehouse";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_fulfillment {
  __typename: "Fulfillment";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of lines for the fulfillment.
   */
  lines: (OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_fulfillment_lines | null)[] | null;
  fulfillmentOrder: number;
  status: FulfillmentStatus;
  trackingNumber: string;
  /**
   * Warehouse from fulfillment was fulfilled.
   */
  warehouse: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_fulfillment_warehouse | null;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_metadata {
  __typename: "MetadataItem";
  /**
   * Key of a metadata item.
   */
  key: string;
  /**
   * Value of a metadata item.
   */
  value: string;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_privateMetadata {
  __typename: "MetadataItem";
  /**
   * Key of a metadata item.
   */
  key: string;
  /**
   * Value of a metadata item.
   */
  value: string;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_billingAddress_country {
  __typename: "CountryDisplay";
  /**
   * Country code.
   */
  code: string;
  /**
   * Country name.
   */
  country: string;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_billingAddress {
  __typename: "Address";
  city: string;
  cityArea: string;
  companyName: string;
  /**
   * Shop's default country.
   */
  country: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_billingAddress_country;
  countryArea: string;
  firstName: string;
  /**
   * The ID of the object.
   */
  id: string;
  lastName: string;
  phone: string | null;
  postalCode: string;
  streetAddress1: string;
  streetAddress2: string;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_booking_bookableResource {
  __typename: "BookableResource";
  name: string;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_booking {
  __typename: "Booking";
  bookableResource: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_booking_bookableResource | null;
  startDate: any | null;
  endDate: any | null;
  /**
   * UUID of the booking.
   */
  bookingReference: any | null;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_discounts_amount {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_discounts {
  __typename: "OrderDiscount";
  /**
   * The ID of the object.
   */
  id: string;
  type: OrderDiscountType;
  /**
   * Type of the discount: fixed or percent
   */
  calculationMode: DiscountValueTypeEnum;
  /**
   * Value of the discount. Can store fixed value or percent value
   */
  value: any;
  /**
   * Explanation for the applied discount.
   */
  reason: string | null;
  /**
   * Returns amount of discount.
   */
  amount: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_discounts_amount;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_events_discount_amount {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_events_discount_oldAmount {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_events_discount {
  __typename: "OrderEventDiscountObject";
  /**
   * Type of the discount: fixed or percent.
   */
  valueType: DiscountValueTypeEnum;
  /**
   * Value of the discount. Can store fixed value or percent value.
   */
  value: any;
  /**
   * Explanation for the applied discount.
   */
  reason: string | null;
  /**
   * Returns amount of discount.
   */
  amount: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_events_discount_amount | null;
  /**
   * Type of the discount: fixed or percent.
   */
  oldValueType: DiscountValueTypeEnum | null;
  /**
   * Value of the discount. Can store fixed value or percent value.
   */
  oldValue: any | null;
  /**
   * Returns amount of discount.
   */
  oldAmount: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_events_discount_oldAmount | null;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_events_relatedOrder {
  __typename: "Order";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * User-friendly number of an order.
   */
  number: string | null;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_events_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_events_lines_discount_amount {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_events_lines_discount_oldAmount {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_events_lines_discount {
  __typename: "OrderEventDiscountObject";
  /**
   * Type of the discount: fixed or percent.
   */
  valueType: DiscountValueTypeEnum;
  /**
   * Value of the discount. Can store fixed value or percent value.
   */
  value: any;
  /**
   * Explanation for the applied discount.
   */
  reason: string | null;
  /**
   * Returns amount of discount.
   */
  amount: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_events_lines_discount_amount | null;
  /**
   * Type of the discount: fixed or percent.
   */
  oldValueType: DiscountValueTypeEnum | null;
  /**
   * Value of the discount. Can store fixed value or percent value.
   */
  oldValue: any | null;
  /**
   * Returns amount of discount.
   */
  oldAmount: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_events_lines_discount_oldAmount | null;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_events_lines_orderLine {
  __typename: "OrderLine";
  /**
   * The ID of the object.
   */
  id: string;
  productName: string;
  variantName: string;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_events_lines {
  __typename: "OrderEventOrderLineObject";
  /**
   * The variant quantity.
   */
  quantity: number | null;
  /**
   * The variant name.
   */
  itemName: string | null;
  /**
   * The discount applied to the order line.
   */
  discount: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_events_lines_discount | null;
  /**
   * The order line.
   */
  orderLine: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_events_lines_orderLine | null;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_events {
  __typename: "OrderEvent";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Amount of money.
   */
  amount: number | null;
  /**
   * Define if shipping costs were included to the refund.
   */
  shippingCostsIncluded: boolean | null;
  /**
   * Date when event happened at in ISO 8601 format.
   */
  date: any | null;
  /**
   * Email of the customer.
   */
  email: string | null;
  /**
   * Type of an email sent to the customer.
   */
  emailType: OrderEventsEmailsEnum | null;
  /**
   * Number of an invoice related to the order.
   */
  invoiceNumber: string | null;
  /**
   * The discount applied to the order.
   */
  discount: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_events_discount | null;
  /**
   * The order which is related to this order.
   */
  relatedOrder: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_events_relatedOrder | null;
  /**
   * Content of the event.
   */
  message: string | null;
  /**
   * Number of items.
   */
  quantity: number | null;
  /**
   * The transaction reference of captured payment.
   */
  transactionReference: string | null;
  /**
   * Order event type.
   */
  type: OrderEventsEnum | null;
  /**
   * User who performed the action.
   */
  user: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_events_user | null;
  /**
   * The concerned lines.
   */
  lines: (OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_events_lines | null)[] | null;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_fulfillments_lines_orderLine_variant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_fulfillments_lines_orderLine_unitDiscount {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_fulfillments_lines_orderLine_undiscountedUnitPrice_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_fulfillments_lines_orderLine_undiscountedUnitPrice_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_fulfillments_lines_orderLine_undiscountedUnitPrice {
  __typename: "TaxedMoney";
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Amount of money including taxes.
   */
  gross: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_fulfillments_lines_orderLine_undiscountedUnitPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_fulfillments_lines_orderLine_undiscountedUnitPrice_net;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_fulfillments_lines_orderLine_unitPrice_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_fulfillments_lines_orderLine_unitPrice_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_fulfillments_lines_orderLine_unitPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_fulfillments_lines_orderLine_unitPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_fulfillments_lines_orderLine_unitPrice_net;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_fulfillments_lines_orderLine_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_fulfillments_lines_orderLine {
  __typename: "OrderLine";
  /**
   * The ID of the object.
   */
  id: string;
  isShippingRequired: boolean;
  /**
   * A purchased product variant. Note: this field may be null if the variant has been removed from stock at all.
   */
  variant: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_fulfillments_lines_orderLine_variant | null;
  productName: string;
  productSku: string;
  quantity: number;
  quantityFulfilled: number;
  /**
   * The discount applied to the single order line.
   */
  unitDiscount: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_fulfillments_lines_orderLine_unitDiscount;
  /**
   * Value of the discount. Can store fixed value or percent value
   */
  unitDiscountValue: any;
  unitDiscountReason: string | null;
  /**
   * Type of the discount: fixed or percent
   */
  unitDiscountType: DiscountValueTypeEnum | null;
  /**
   * Price of the single item in the order line without applied an order line discount.
   */
  undiscountedUnitPrice: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_fulfillments_lines_orderLine_undiscountedUnitPrice;
  /**
   * Price of the single item in the order line.
   */
  unitPrice: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_fulfillments_lines_orderLine_unitPrice;
  /**
   * The main thumbnail for the ordered product.
   */
  thumbnail: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_fulfillments_lines_orderLine_thumbnail | null;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_fulfillments_lines {
  __typename: "FulfillmentLine";
  /**
   * The ID of the object.
   */
  id: string;
  quantity: number;
  orderLine: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_fulfillments_lines_orderLine | null;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_fulfillments_warehouse {
  __typename: "Warehouse";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_fulfillments {
  __typename: "Fulfillment";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of lines for the fulfillment.
   */
  lines: (OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_fulfillments_lines | null)[] | null;
  fulfillmentOrder: number;
  status: FulfillmentStatus;
  trackingNumber: string;
  /**
   * Warehouse from fulfillment was fulfilled.
   */
  warehouse: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_fulfillments_warehouse | null;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_lines_variant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_lines_unitDiscount {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_lines_undiscountedUnitPrice_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_lines_undiscountedUnitPrice_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_lines_undiscountedUnitPrice {
  __typename: "TaxedMoney";
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Amount of money including taxes.
   */
  gross: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_lines_undiscountedUnitPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_lines_undiscountedUnitPrice_net;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_lines_unitPrice_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_lines_unitPrice_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_lines_unitPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_lines_unitPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_lines_unitPrice_net;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_lines_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_lines {
  __typename: "OrderLine";
  /**
   * The ID of the object.
   */
  id: string;
  isShippingRequired: boolean;
  /**
   * A purchased product variant. Note: this field may be null if the variant has been removed from stock at all.
   */
  variant: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_lines_variant | null;
  productName: string;
  productSku: string;
  quantity: number;
  quantityFulfilled: number;
  /**
   * The discount applied to the single order line.
   */
  unitDiscount: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_lines_unitDiscount;
  /**
   * Value of the discount. Can store fixed value or percent value
   */
  unitDiscountValue: any;
  unitDiscountReason: string | null;
  /**
   * Type of the discount: fixed or percent
   */
  unitDiscountType: DiscountValueTypeEnum | null;
  /**
   * Price of the single item in the order line without applied an order line discount.
   */
  undiscountedUnitPrice: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_lines_undiscountedUnitPrice;
  /**
   * Price of the single item in the order line.
   */
  unitPrice: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_lines_unitPrice;
  /**
   * The main thumbnail for the ordered product.
   */
  thumbnail: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_lines_thumbnail | null;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_shippingAddress_country {
  __typename: "CountryDisplay";
  /**
   * Country code.
   */
  code: string;
  /**
   * Country name.
   */
  country: string;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_shippingAddress {
  __typename: "Address";
  city: string;
  cityArea: string;
  companyName: string;
  /**
   * Shop's default country.
   */
  country: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_shippingAddress_country;
  countryArea: string;
  firstName: string;
  /**
   * The ID of the object.
   */
  id: string;
  lastName: string;
  phone: string | null;
  postalCode: string;
  streetAddress1: string;
  streetAddress2: string;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_shippingMethod {
  __typename: "ShippingMethod";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_shippingPrice_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_shippingPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_shippingPrice_gross;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_subtotal_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_subtotal_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_subtotal {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_subtotal_gross;
  /**
   * Amount of money without taxes.
   */
  net: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_subtotal_net;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_total_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_total_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_total_tax {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_total {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_total_gross;
  /**
   * Amount of money without taxes.
   */
  net: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_total_net;
  /**
   * Amount of taxes.
   */
  tax: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_total_tax;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_totalAuthorized {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_totalCaptured {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_undiscountedTotal_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_undiscountedTotal_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_undiscountedTotal {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_undiscountedTotal_net;
  /**
   * Amount of money including taxes.
   */
  gross: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_undiscountedTotal_gross;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  email: string;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_availableShippingMethods_price {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_availableShippingMethods {
  __typename: "ShippingMethod";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * The price of the cheapest variant (including discounts).
   */
  price: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_availableShippingMethods_price | null;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_invoices {
  __typename: "Invoice";
  /**
   * The ID of the object.
   */
  id: string;
  number: string | null;
  /**
   * Created date time of job in ISO 8601 format.
   */
  createdAt: any;
  /**
   * URL to download an invoice.
   */
  url: string | null;
  /**
   * Job status.
   */
  status: JobStatusEnum;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_channel {
  __typename: "Channel";
  isActive: boolean;
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  currencyCode: string;
  slug: string;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order {
  __typename: "Order";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_metadata | null)[];
  /**
   * List of private metadata items.Requires proper staff permissions to access.
   */
  privateMetadata: (OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_privateMetadata | null)[];
  billingAddress: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_billingAddress | null;
  /**
   * Booking of the order
   */
  booking: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_booking | null;
  /**
   * Returns True, if order requires shipping.
   */
  isShippingRequired: boolean;
  /**
   * Informs whether a draft order can be finalized(turned into a regular order).
   */
  canFinalize: boolean;
  created: any;
  customerNote: string;
  /**
   * List of all discounts assigned to the order.
   */
  discounts: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_discounts[] | null;
  /**
   * List of events associated with the order.
   */
  events: (OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_events | null)[] | null;
  /**
   * List of shipments for the order.
   */
  fulfillments: (OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_fulfillments | null)[];
  /**
   * List of order lines.
   */
  lines: (OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_lines | null)[];
  /**
   * User-friendly number of an order.
   */
  number: string | null;
  /**
   * Internal payment status.
   */
  paymentStatus: PaymentChargeStatusEnum;
  shippingAddress: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_shippingAddress | null;
  shippingMethod: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_shippingMethod | null;
  shippingMethodName: string | null;
  /**
   * Total price of shipping.
   */
  shippingPrice: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_shippingPrice;
  status: OrderStatus;
  /**
   * The sum of line prices not including shipping.
   */
  subtotal: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_subtotal;
  /**
   * Total amount of the order.
   */
  total: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_total;
  /**
   * List of actions that can be performed in the current state of an order.
   */
  actions: (OrderAction | null)[];
  /**
   * Amount authorized for the order.
   */
  totalAuthorized: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_totalAuthorized;
  /**
   * Amount captured by payment.
   */
  totalCaptured: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_totalCaptured;
  /**
   * Undiscounted total amount of the order.
   */
  undiscountedTotal: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_undiscountedTotal;
  user: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_user | null;
  /**
   * Email address of the customer.
   */
  userEmail: string | null;
  /**
   * Shipping methods that can be used with this order.
   */
  availableShippingMethods: (OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_availableShippingMethods | null)[] | null;
  /**
   * List of order invoices.
   */
  invoices: (OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_invoices | null)[] | null;
  channel: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order_channel;
  /**
   * Informs if an order is fully paid.
   */
  isPaid: boolean;
}

export interface OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts {
  __typename: "FulfillmentRefundProducts";
  errors: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_errors[];
  /**
   * A refunded fulfillment.
   */
  fulfillment: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_fulfillment | null;
  /**
   * Order which fulfillment was refunded.
   */
  order: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts_order | null;
}

export interface OrderFulfillmentRefundProducts {
  /**
   * Refund products.
   */
  orderFulfillmentRefundProducts: OrderFulfillmentRefundProducts_orderFulfillmentRefundProducts | null;
}

export interface OrderFulfillmentRefundProductsVariables {
  input: OrderRefundProductsInput;
  order: string;
}
