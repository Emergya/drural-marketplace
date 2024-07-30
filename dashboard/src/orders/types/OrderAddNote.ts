/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderAddNoteInput, OrderErrorCode, AddressTypeEnum, OrderEventsEmailsEnum, DiscountValueTypeEnum, OrderEventsEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: OrderAddNote
// ====================================================

export interface OrderAddNote_orderAddNote_errors {
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

export interface OrderAddNote_orderAddNote_order_events_discount_amount {
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

export interface OrderAddNote_orderAddNote_order_events_discount_oldAmount {
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

export interface OrderAddNote_orderAddNote_order_events_discount {
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
  amount: OrderAddNote_orderAddNote_order_events_discount_amount | null;
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
  oldAmount: OrderAddNote_orderAddNote_order_events_discount_oldAmount | null;
}

export interface OrderAddNote_orderAddNote_order_events_relatedOrder {
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

export interface OrderAddNote_orderAddNote_order_events_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface OrderAddNote_orderAddNote_order_events_lines_discount_amount {
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

export interface OrderAddNote_orderAddNote_order_events_lines_discount_oldAmount {
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

export interface OrderAddNote_orderAddNote_order_events_lines_discount {
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
  amount: OrderAddNote_orderAddNote_order_events_lines_discount_amount | null;
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
  oldAmount: OrderAddNote_orderAddNote_order_events_lines_discount_oldAmount | null;
}

export interface OrderAddNote_orderAddNote_order_events_lines_orderLine {
  __typename: "OrderLine";
  /**
   * The ID of the object.
   */
  id: string;
  productName: string;
  variantName: string;
}

export interface OrderAddNote_orderAddNote_order_events_lines {
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
  discount: OrderAddNote_orderAddNote_order_events_lines_discount | null;
  /**
   * The order line.
   */
  orderLine: OrderAddNote_orderAddNote_order_events_lines_orderLine | null;
}

export interface OrderAddNote_orderAddNote_order_events {
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
  discount: OrderAddNote_orderAddNote_order_events_discount | null;
  /**
   * The order which is related to this order.
   */
  relatedOrder: OrderAddNote_orderAddNote_order_events_relatedOrder | null;
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
  user: OrderAddNote_orderAddNote_order_events_user | null;
  /**
   * The concerned lines.
   */
  lines: (OrderAddNote_orderAddNote_order_events_lines | null)[] | null;
}

export interface OrderAddNote_orderAddNote_order {
  __typename: "Order";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of events associated with the order.
   */
  events: (OrderAddNote_orderAddNote_order_events | null)[] | null;
}

export interface OrderAddNote_orderAddNote {
  __typename: "OrderAddNote";
  errors: OrderAddNote_orderAddNote_errors[];
  /**
   * Order with the note added.
   */
  order: OrderAddNote_orderAddNote_order | null;
}

export interface OrderAddNote {
  /**
   * Adds note to the order.
   */
  orderAddNote: OrderAddNote_orderAddNote | null;
}

export interface OrderAddNoteVariables {
  order: string;
  input: OrderAddNoteInput;
}
