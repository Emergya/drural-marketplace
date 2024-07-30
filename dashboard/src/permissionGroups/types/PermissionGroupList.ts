/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PermissionGroupFilterInput, PermissionGroupSortingInput } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: PermissionGroupList
// ====================================================

export interface PermissionGroupList_permissionGroups_edges_node_users {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
}

export interface PermissionGroupList_permissionGroups_edges_node {
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
  /**
   * List of group users
   */
  users: (PermissionGroupList_permissionGroups_edges_node_users | null)[] | null;
}

export interface PermissionGroupList_permissionGroups_edges {
  __typename: "GroupCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: PermissionGroupList_permissionGroups_edges_node;
}

export interface PermissionGroupList_permissionGroups_pageInfo {
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

export interface PermissionGroupList_permissionGroups {
  __typename: "GroupCountableConnection";
  edges: PermissionGroupList_permissionGroups_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: PermissionGroupList_permissionGroups_pageInfo;
}

export interface PermissionGroupList {
  /**
   * List of permission groups.
   */
  permissionGroups: PermissionGroupList_permissionGroups | null;
}

export interface PermissionGroupListVariables {
  after?: string | null;
  before?: string | null;
  first?: number | null;
  last?: number | null;
  filter?: PermissionGroupFilterInput | null;
  sort?: PermissionGroupSortingInput | null;
}
