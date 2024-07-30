/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DraftOrderCreateInput, OrderErrorCode, AddressTypeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: OrderDraftCreate
// ====================================================

export interface OrderDraftCreate_draftOrderCreate_errors {
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

export interface OrderDraftCreate_draftOrderCreate_order {
  __typename: "Order";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface OrderDraftCreate_draftOrderCreate {
  __typename: "DraftOrderCreate";
  errors: OrderDraftCreate_draftOrderCreate_errors[];
  order: OrderDraftCreate_draftOrderCreate_order | null;
}

export interface OrderDraftCreate {
  /**
   * Creates a new draft order.
   */
  draftOrderCreate: OrderDraftCreate_draftOrderCreate | null;
}

export interface OrderDraftCreateVariables {
  input: DraftOrderCreateInput;
}
