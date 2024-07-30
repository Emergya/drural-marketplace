/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: VariantDelete
// ====================================================

export interface VariantDelete_productVariantDelete_errors {
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

export interface VariantDelete_productVariantDelete_productVariant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface VariantDelete_productVariantDelete {
  __typename: "ProductVariantDelete";
  errors: VariantDelete_productVariantDelete_errors[];
  productVariant: VariantDelete_productVariantDelete_productVariant | null;
}

export interface VariantDelete {
  /**
   * Deletes a product variant.
   */
  productVariantDelete: VariantDelete_productVariantDelete | null;
}

export interface VariantDeleteVariables {
  id: string;
}
