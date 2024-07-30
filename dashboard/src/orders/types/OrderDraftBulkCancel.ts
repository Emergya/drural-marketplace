/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderErrorCode, AddressTypeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: OrderDraftBulkCancel
// ====================================================

export interface OrderDraftBulkCancel_draftOrderBulkDelete_errors {
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

export interface OrderDraftBulkCancel_draftOrderBulkDelete {
  __typename: "DraftOrderBulkDelete";
  errors: OrderDraftBulkCancel_draftOrderBulkDelete_errors[];
}

export interface OrderDraftBulkCancel {
  /**
   * Deletes draft orders.
   */
  draftOrderBulkDelete: OrderDraftBulkCancel_draftOrderBulkDelete | null;
}

export interface OrderDraftBulkCancelVariables {
  ids: (string | null)[];
}
