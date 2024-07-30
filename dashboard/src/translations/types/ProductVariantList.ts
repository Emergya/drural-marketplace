/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductVariantList
// ====================================================

export interface ProductVariantList_product_variants {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  sku: string;
}

export interface ProductVariantList_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of variants for the product.
   */
  variants: (ProductVariantList_product_variants | null)[] | null;
}

export interface ProductVariantList {
  /**
   * Look up a product by ID.
   */
  product: ProductVariantList_product | null;
}

export interface ProductVariantListVariables {
  id: string;
}
