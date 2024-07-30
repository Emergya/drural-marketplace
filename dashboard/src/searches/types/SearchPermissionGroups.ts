/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchPermissionGroups
// ====================================================

export interface SearchPermissionGroups_search_edges_node {
  __typename: "Group";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * True, if the currently authenticated user has rights to manage a group.
   */
  userCanManage: boolean;
}

export interface SearchPermissionGroups_search_edges {
  __typename: "GroupCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SearchPermissionGroups_search_edges_node;
}

export interface SearchPermissionGroups_search_pageInfo {
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

export interface SearchPermissionGroups_search {
  __typename: "GroupCountableConnection";
  edges: SearchPermissionGroups_search_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: SearchPermissionGroups_search_pageInfo;
}

export interface SearchPermissionGroups {
  /**
   * List of permission groups.
   */
  search: SearchPermissionGroups_search | null;
}

export interface SearchPermissionGroupsVariables {
  after?: string | null;
  first: number;
  query: string;
}
