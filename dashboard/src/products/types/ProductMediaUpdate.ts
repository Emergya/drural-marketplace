/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductErrorCode, ProductMediaType } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: ProductMediaUpdate
// ====================================================

export interface ProductMediaUpdate_productMediaUpdate_errors {
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

export interface ProductMediaUpdate_productMediaUpdate_product_media {
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
  type: ProductMediaType;
  oembedData: any;
}

export interface ProductMediaUpdate_productMediaUpdate_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of media for the product.
   */
  media: ProductMediaUpdate_productMediaUpdate_product_media[] | null;
}

export interface ProductMediaUpdate_productMediaUpdate {
  __typename: "ProductMediaUpdate";
  errors: ProductMediaUpdate_productMediaUpdate_errors[];
  product: ProductMediaUpdate_productMediaUpdate_product | null;
}

export interface ProductMediaUpdate {
  /**
   * Updates a product media.
   */
  productMediaUpdate: ProductMediaUpdate_productMediaUpdate | null;
}

export interface ProductMediaUpdateVariables {
  id: string;
  alt: string;
}
