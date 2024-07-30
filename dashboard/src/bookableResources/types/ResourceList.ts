/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BookableResourceFilterInput, BookableResourceSortingInput } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: ResourceList
// ====================================================

export interface ResourceList_bookableResources_pageInfo {
  __typename: "PageInfo";
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
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
}

export interface ResourceList_bookableResources_edges_node_company {
  __typename: "CompanyType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface ResourceList_bookableResources_edges_node {
  __typename: "BookableResource";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  quantity: number;
  quantityInfinite: boolean;
  isActive: boolean;
  company: ResourceList_bookableResources_edges_node_company;
}

export interface ResourceList_bookableResources_edges {
  __typename: "BookableResourceCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ResourceList_bookableResources_edges_node;
}

export interface ResourceList_bookableResources {
  __typename: "BookableResourceCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: ResourceList_bookableResources_pageInfo;
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: ResourceList_bookableResources_edges[];
}

export interface ResourceList {
  /**
   * List of the bookable resouces.
   */
  bookableResources: ResourceList_bookableResources | null;
}

export interface ResourceListVariables {
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
  filter?: BookableResourceFilterInput | null;
  company?: string | null;
  sort?: BookableResourceSortingInput | null;
}
