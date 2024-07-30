/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CompanyPublishedProductsCountQuery
// ====================================================

export interface CompanyPublishedProductsCountQuery_products {
  __typename: "ProductCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
}

export interface CompanyPublishedProductsCountQuery {
  /**
   * List of the shop's products.
   */
  products: CompanyPublishedProductsCountQuery_products | null;
}

export interface CompanyPublishedProductsCountQueryVariables {
  channel?: string | null;
  company?: string | null;
}
