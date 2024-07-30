/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: ProductVariantSetDefault
// ====================================================

export interface ProductVariantSetDefault_productVariantSetDefault_errors {
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

export interface ProductVariantSetDefault_productVariantSetDefault_product_defaultVariant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface ProductVariantSetDefault_productVariantSetDefault_product_variants {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface ProductVariantSetDefault_productVariantSetDefault_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  defaultVariant: ProductVariantSetDefault_productVariantSetDefault_product_defaultVariant | null;
  /**
   * List of variants for the product.
   */
  variants: (ProductVariantSetDefault_productVariantSetDefault_product_variants | null)[] | null;
}

export interface ProductVariantSetDefault_productVariantSetDefault {
  __typename: "ProductVariantSetDefault";
  errors: ProductVariantSetDefault_productVariantSetDefault_errors[];
  product: ProductVariantSetDefault_productVariantSetDefault_product | null;
}

export interface ProductVariantSetDefault {
  /**
   * Set default variant for a product. Mutation triggers PRODUCT_UPDATED webhook.
   */
  productVariantSetDefault: ProductVariantSetDefault_productVariantSetDefault | null;
}

export interface ProductVariantSetDefaultVariables {
  productId: string;
  variantId: string;
}
