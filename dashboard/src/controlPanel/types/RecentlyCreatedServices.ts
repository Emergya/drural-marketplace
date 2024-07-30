/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductFilterInput } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: RecentlyCreatedServices
// ====================================================

export interface RecentlyCreatedServices_products {
  __typename: "ProductCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
}

export interface RecentlyCreatedServices {
  /**
   * List of the shop's products.
   */
  products: RecentlyCreatedServices_products | null;
}

export interface RecentlyCreatedServicesVariables {
  first?: number | null;
  filter?: ProductFilterInput | null;
}
