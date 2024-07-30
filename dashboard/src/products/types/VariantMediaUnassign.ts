/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductErrorCode, ProductMediaType } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: VariantMediaUnassign
// ====================================================

export interface VariantMediaUnassign_variantMediaUnassign_errors {
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

export interface VariantMediaUnassign_variantMediaUnassign_productVariant_media {
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

export interface VariantMediaUnassign_variantMediaUnassign_productVariant_product_media {
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

export interface VariantMediaUnassign_variantMediaUnassign_productVariant_product_variants_media {
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

export interface VariantMediaUnassign_variantMediaUnassign_productVariant_product_variants {
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
  media: VariantMediaUnassign_variantMediaUnassign_productVariant_product_variants_media[] | null;
}

export interface VariantMediaUnassign_variantMediaUnassign_productVariant_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of media for the product.
   */
  media: VariantMediaUnassign_variantMediaUnassign_productVariant_product_media[] | null;
  /**
   * List of variants for the product.
   */
  variants: (VariantMediaUnassign_variantMediaUnassign_productVariant_product_variants | null)[] | null;
}

export interface VariantMediaUnassign_variantMediaUnassign_productVariant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of media for the product variant.
   */
  media: VariantMediaUnassign_variantMediaUnassign_productVariant_media[] | null;
  product: VariantMediaUnassign_variantMediaUnassign_productVariant_product;
}

export interface VariantMediaUnassign_variantMediaUnassign {
  __typename: "VariantMediaUnassign";
  errors: VariantMediaUnassign_variantMediaUnassign_errors[];
  productVariant: VariantMediaUnassign_variantMediaUnassign_productVariant | null;
}

export interface VariantMediaUnassign {
  /**
   * Unassign an media from a product variant.
   */
  variantMediaUnassign: VariantMediaUnassign_variantMediaUnassign | null;
}

export interface VariantMediaUnassignVariables {
  variantId: string;
  mediaId: string;
}
