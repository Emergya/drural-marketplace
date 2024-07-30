/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductErrorCode, ProductMediaType } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: ProductMediaCreate
// ====================================================

export interface ProductMediaCreate_productMediaCreate_errors {
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

export interface ProductMediaCreate_productMediaCreate_product_media {
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

export interface ProductMediaCreate_productMediaCreate_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of media for the product.
   */
  media: ProductMediaCreate_productMediaCreate_product_media[] | null;
}

export interface ProductMediaCreate_productMediaCreate {
  __typename: "ProductMediaCreate";
  errors: ProductMediaCreate_productMediaCreate_errors[];
  product: ProductMediaCreate_productMediaCreate_product | null;
}

export interface ProductMediaCreate {
  /**
   * Create a media object (image or video URL) associated with product. For image,
   * this mutation must be sent as a `multipart` request. More detailed specs of
   * the upload format can be found here:
   * https: // github.com/jaydenseric/graphql-multipart-request-spec
   */
  productMediaCreate: ProductMediaCreate_productMediaCreate | null;
}

export interface ProductMediaCreateVariables {
  product: string;
  image?: any | null;
  alt?: string | null;
  mediaUrl?: string | null;
}
