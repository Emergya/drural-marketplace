/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CompanySortingInput, CompanyFilterInput, CompanyStatus } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: BusinessesList
// ====================================================

export interface BusinessesList_companies_edges_node_address {
  __typename: "CompanyAddressType";
  /**
   * The ID of the object.
   */
  id: string;
  locality: string | null;
  postalCode: string | null;
}

export interface BusinessesList_companies_edges_node {
  __typename: "CompanyType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  publicName: string;
  status: CompanyStatus;
  isEnabled: boolean;
  modified: any;
  email: string;
  phone: string;
  address: BusinessesList_companies_edges_node_address | null;
  imageUrl: string | null;
}

export interface BusinessesList_companies_edges {
  __typename: "CompanyTypeCountableEdge";
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
  /**
   * The item at the end of the edge.
   */
  node: BusinessesList_companies_edges_node;
}

export interface BusinessesList_companies_pageInfo {
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

export interface BusinessesList_companies {
  __typename: "CompanyTypeCountableConnection";
  edges: BusinessesList_companies_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: BusinessesList_companies_pageInfo;
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
}

export interface BusinessesList {
  /**
   * List of companies
   */
  companies: BusinessesList_companies | null;
}

export interface BusinessesListVariables {
  after?: string | null;
  before?: string | null;
  first?: number | null;
  last?: number | null;
  sort?: CompanySortingInput | null;
  filter?: CompanyFilterInput | null;
}
