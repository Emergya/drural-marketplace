/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CompanySortingInput } from "./../../../types/globalTypes";

// ====================================================
// GraphQL query operation: ActiveBusinessesList
// ====================================================

export interface ActiveBusinessesList_companies_edges_node_products {
  __typename: "ProductCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
}

export interface ActiveBusinessesList_companies_edges_node_stripeCredentials {
  __typename: "StripeCredentialsType";
  accountId: string | null;
  isEnabled: boolean;
}

export interface ActiveBusinessesList_companies_edges_node {
  __typename: "CompanyType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  publicName: string;
  imageUrl: string | null;
  /**
   * List of the shop's products.
   */
  products: ActiveBusinessesList_companies_edges_node_products | null;
  stripeCredentials: ActiveBusinessesList_companies_edges_node_stripeCredentials | null;
}

export interface ActiveBusinessesList_companies_edges {
  __typename: "CompanyTypeCountableEdge";
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
  /**
   * The item at the end of the edge.
   */
  node: ActiveBusinessesList_companies_edges_node;
}

export interface ActiveBusinessesList_companies_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: boolean;
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor: string | null;
}

export interface ActiveBusinessesList_companies {
  __typename: "CompanyTypeCountableConnection";
  edges: ActiveBusinessesList_companies_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: ActiveBusinessesList_companies_pageInfo;
}

export interface ActiveBusinessesList {
  /**
   * List of companies
   */
  companies: ActiveBusinessesList_companies | null;
}

export interface ActiveBusinessesListVariables {
  after?: string | null;
  before?: string | null;
  channel?: string | null;
  first?: number | null;
  last?: number | null;
  sortBy?: CompanySortingInput | null;
}
