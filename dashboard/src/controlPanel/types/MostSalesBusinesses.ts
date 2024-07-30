/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CompanySortingInput, CompanyFilterInput } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: MostSalesBusinesses
// ====================================================

export interface MostSalesBusinesses_companies_edges_node {
  __typename: "CompanyType";
  /**
   * The ID of the object.
   */
  id: string;
  publicName: string;
  imageUrl: string | null;
}

export interface MostSalesBusinesses_companies_edges {
  __typename: "CompanyTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: MostSalesBusinesses_companies_edges_node;
}

export interface MostSalesBusinesses_companies {
  __typename: "CompanyTypeCountableConnection";
  edges: MostSalesBusinesses_companies_edges[];
}

export interface MostSalesBusinesses {
  /**
   * List of companies
   */
  companies: MostSalesBusinesses_companies | null;
}

export interface MostSalesBusinessesVariables {
  first?: number | null;
  sortBy?: CompanySortingInput | null;
  filter?: CompanyFilterInput | null;
}
