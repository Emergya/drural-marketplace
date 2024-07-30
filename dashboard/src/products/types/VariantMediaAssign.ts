/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductErrorCode, ProductMediaType } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: VariantMediaAssign
// ====================================================

export interface VariantMediaAssign_variantMediaAssign_errors {
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

export interface VariantMediaAssign_variantMediaAssign_productVariant_media {
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

export interface VariantMediaAssign_variantMediaAssign_productVariant_product_media {
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

export interface VariantMediaAssign_variantMediaAssign_productVariant_product_variants_media {
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

export interface VariantMediaAssign_variantMediaAssign_productVariant_product_variants {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  sku: string;
  /**
   * List of media for the product variant.
   */
  media: VariantMediaAssign_variantMediaAssign_productVariant_product_variants_media[] | null;
}

export interface VariantMediaAssign_variantMediaAssign_productVariant_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of media for the product.
   */
  media: VariantMediaAssign_variantMediaAssign_productVariant_product_media[] | null;
  /**
   * List of variants for the product.
   */
  variants: (VariantMediaAssign_variantMediaAssign_productVariant_product_variants | null)[] | null;
}

export interface VariantMediaAssign_variantMediaAssign_productVariant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of media for the product variant.
   */
  media: VariantMediaAssign_variantMediaAssign_productVariant_media[] | null;
  product: VariantMediaAssign_variantMediaAssign_productVariant_product;
}

export interface VariantMediaAssign_variantMediaAssign {
  __typename: "VariantMediaAssign";
  errors: VariantMediaAssign_variantMediaAssign_errors[];
  productVariant: VariantMediaAssign_variantMediaAssign_productVariant | null;
}

export interface VariantMediaAssign {
  /**
   * Assign an media to a product variant.
   */
  variantMediaAssign: VariantMediaAssign_variantMediaAssign | null;
}

export interface VariantMediaAssignVariables {
  variantId: string;
  mediaId: string;
}
