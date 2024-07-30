/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BookResourceInput, OrderStatus } from "./../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: BookResource
// ====================================================

export interface BookResource_bookResource_booking_variant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface BookResource_bookResource_booking_bookableResource {
  __typename: "BookableResource";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  isActive: boolean;
}

export interface BookResource_bookResource_booking_order {
  __typename: "Order";
  /**
   * The ID of the object.
   */
  id: string;
  token: string;
  /**
   * User-friendly number of an order.
   */
  number: string | null;
  status: OrderStatus;
}

export interface BookResource_bookResource_booking {
  __typename: "Booking";
  /**
   * The ID of the object.
   */
  id: string;
  startDate: any | null;
  endDate: any | null;
  resourceName: string | null;
  variantName: string | null;
  companyName: string | null;
  /**
   * A purchased product variant. Note: this field may be null if the variant has been removed from stock at all.
   */
  variant: BookResource_bookResource_booking_variant | null;
  bookableResource: BookResource_bookResource_booking_bookableResource | null;
  order: BookResource_bookResource_booking_order | null;
}

export interface BookResource_bookResource_errors {
  __typename: "BookingError";
  /**
   * The error message.
   */
  message: string | null;
}

export interface BookResource_bookResource {
  __typename: "BookResource";
  booking: BookResource_bookResource_booking | null;
  errors: BookResource_bookResource_errors[];
}

export interface BookResource {
  /**
   * Book a source of a company to consume a product.
   */
  bookResource: BookResource_bookResource | null;
}

export interface BookResourceVariables {
  input: BookResourceInput;
}
