/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReorderInput, ProductErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: ProductVariantReorder
// ====================================================

export interface ProductVariantReorder_productVariantReorder_errors {
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

export interface ProductVariantReorder_productVariantReorder_product_variants {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface ProductVariantReorder_productVariantReorder_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of variants for the product.
   */
  variants: (ProductVariantReorder_productVariantReorder_product_variants | null)[] | null;
}

export interface ProductVariantReorder_productVariantReorder {
  __typename: "ProductVariantReorder";
  errors: ProductVariantReorder_productVariantReorder_errors[];
  product: ProductVariantReorder_productVariantReorder_product | null;
}

export interface ProductVariantReorder {
  /**
   * Reorder the variants of a product. Mutation updates updated_at on product and triggers PRODUCT_UPDATED webhook.
   */
  productVariantReorder: ProductVariantReorder_productVariantReorder | null;
}

export interface ProductVariantReorderVariables {
  move: ReorderInput;
  productId: string;
}
