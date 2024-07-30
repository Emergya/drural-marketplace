/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductFilterInput } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: ProductCount
// ====================================================

export interface ProductCount_products {
  __typename: "ProductCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
}

export interface ProductCount {
  /**
   * List of the shop's products.
   */
  products: ProductCount_products | null;
}

export interface ProductCountVariables {
  filter?: ProductFilterInput | null;
  channel?: string | null;
}
