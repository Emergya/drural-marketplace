/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: ProductMediaReorder
// ====================================================

export interface ProductMediaReorder_productMediaReorder_errors {
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

export interface ProductMediaReorder_productMediaReorder_product_media {
  __typename: "ProductMedia";
  /**
   * The ID of the object.
   */
  id: string;
  alt: string;
  sortOrder: number | null;
  /**
   * The URL of the media.
   */
  url: string;
}

export interface ProductMediaReorder_productMediaReorder_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of media for the product.
   */
  media: ProductMediaReorder_productMediaReorder_product_media[] | null;
}

export interface ProductMediaReorder_productMediaReorder {
  __typename: "ProductMediaReorder";
  errors: ProductMediaReorder_productMediaReorder_errors[];
  product: ProductMediaReorder_productMediaReorder_product | null;
}

export interface ProductMediaReorder {
  /**
   * Changes ordering of the product media.
   */
  productMediaReorder: ProductMediaReorder_productMediaReorder | null;
}

export interface ProductMediaReorderVariables {
  productId: string;
  mediaIds: (string | null)[];
}
