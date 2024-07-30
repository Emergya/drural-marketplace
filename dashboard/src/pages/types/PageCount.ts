/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PageFilterInput } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: PageCount
// ====================================================

export interface PageCount_pages {
  __typename: "PageCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
}

export interface PageCount {
  /**
   * List of the shop's pages.
   */
  pages: PageCount_pages | null;
}

export interface PageCountVariables {
  filter?: PageFilterInput | null;
}
