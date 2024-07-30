/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchStaffMembers
// ====================================================

export interface SearchStaffMembers_search_edges_node_avatar {
  __typename: "Image";
  /**
   * Alt text for an image.
   */
  alt: string | null;
  /**
   * The URL of the image.
   */
  url: string;
}

export interface SearchStaffMembers_search_edges_node {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  avatar: SearchStaffMembers_search_edges_node_avatar | null;
}

export interface SearchStaffMembers_search_edges {
  __typename: "UserCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SearchStaffMembers_search_edges_node;
}

export interface SearchStaffMembers_search_pageInfo {
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

export interface SearchStaffMembers_search {
  __typename: "UserCountableConnection";
  edges: SearchStaffMembers_search_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: SearchStaffMembers_search_pageInfo;
}

export interface SearchStaffMembers {
  /**
   * List of the shop's staff users.
   */
  search: SearchStaffMembers_search | null;
}

export interface SearchStaffMembersVariables {
  after?: string | null;
  first: number;
  query: string;
}
