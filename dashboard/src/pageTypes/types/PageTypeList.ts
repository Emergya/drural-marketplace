/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PageTypeFilterInput, PageTypeSortingInput } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: PageTypeList
// ====================================================

export interface PageTypeList_pageTypes_edges_node {
  __typename: "PageType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * Whether page type has pages assigned.
   */
  hasPages: boolean | null;
}

export interface PageTypeList_pageTypes_edges {
  __typename: "PageTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: PageTypeList_pageTypes_edges_node;
}

export interface PageTypeList_pageTypes_pageInfo {
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

export interface PageTypeList_pageTypes {
  __typename: "PageTypeCountableConnection";
  edges: PageTypeList_pageTypes_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: PageTypeList_pageTypes_pageInfo;
}

export interface PageTypeList {
  /**
   * List of the page types.
   */
  pageTypes: PageTypeList_pageTypes | null;
}

export interface PageTypeListVariables {
  after?: string | null;
  before?: string | null;
  first?: number | null;
  last?: number | null;
  filter?: PageTypeFilterInput | null;
  sort?: PageTypeSortingInput | null;
}
