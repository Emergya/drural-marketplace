/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: ProductMediaDelete
// ====================================================

export interface ProductMediaDelete_productMediaDelete_errors {
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

export interface ProductMediaDelete_productMediaDelete_product_media {
  __typename: "ProductMedia";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface ProductMediaDelete_productMediaDelete_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of media for the product.
   */
  media: ProductMediaDelete_productMediaDelete_product_media[] | null;
}

export interface ProductMediaDelete_productMediaDelete {
  __typename: "ProductMediaDelete";
  errors: ProductMediaDelete_productMediaDelete_errors[];
  product: ProductMediaDelete_productMediaDelete_product | null;
}

export interface ProductMediaDelete {
  /**
   * Deletes a product media.
   */
  productMediaDelete: ProductMediaDelete_productMediaDelete | null;
}

export interface ProductMediaDeleteVariables {
  id: string;
}
