/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountErrorCode, AddressTypeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: BulkRemoveCustomers
// ====================================================

export interface BulkRemoveCustomers_customerBulkDelete_errors {
  __typename: "AccountError";
  /**
   * The error code.
   */
  code: AccountErrorCode;
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

export interface BulkRemoveCustomers_customerBulkDelete {
  __typename: "CustomerBulkDelete";
  errors: BulkRemoveCustomers_customerBulkDelete_errors[];
}

export interface BulkRemoveCustomers {
  /**
   * Deletes customers.
   */
  customerBulkDelete: BulkRemoveCustomers_customerBulkDelete | null;
}

export interface BulkRemoveCustomersVariables {
  ids: (string | null)[];
}
