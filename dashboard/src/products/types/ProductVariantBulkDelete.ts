/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: ProductVariantBulkDelete
// ====================================================

export interface ProductVariantBulkDelete_productVariantBulkDelete_errors {
  __typename: "ProductError";
  /**
   * The error code.
   */
  code: ProductErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
}

export interface ProductVariantBulkDelete_productVariantBulkDelete {
  __typename: "ProductVariantBulkDelete";
  errors: ProductVariantBulkDelete_productVariantBulkDelete_errors[];
}

export interface ProductVariantBulkDelete {
  /**
   * Deletes product variants.
   */
  productVariantBulkDelete: ProductVariantBulkDelete_productVariantBulkDelete | null;
}

export interface ProductVariantBulkDeleteVariables {
  ids: string[];
}
