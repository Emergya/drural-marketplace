/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CompanySortingInput, CompanyFilterInput } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: BusinessesTotalCount
// ====================================================

export interface BusinessesTotalCount_companies {
  __typename: "CompanyTypeCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
}

export interface BusinessesTotalCount {
  /**
   * List of companies
   */
  companies: BusinessesTotalCount_companies | null;
}

export interface BusinessesTotalCountVariables {
  after?: string | null;
  before?: string | null;
  first?: number | null;
  last?: number | null;
  sort?: CompanySortingInput | null;
  filter?: CompanyFilterInput | null;
}
