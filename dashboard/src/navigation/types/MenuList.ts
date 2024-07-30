/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MenuSortingInput } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: MenuList
// ====================================================

export interface MenuList_menus_edges_node_items {
  __typename: "MenuItem";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface MenuList_menus_edges_node {
  __typename: "Menu";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  items: (MenuList_menus_edges_node_items | null)[] | null;
}

export interface MenuList_menus_edges {
  __typename: "MenuCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: MenuList_menus_edges_node;
}

export interface MenuList_menus_pageInfo {
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

export interface MenuList_menus {
  __typename: "MenuCountableConnection";
  edges: MenuList_menus_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: MenuList_menus_pageInfo;
}

export interface MenuList {
  /**
   * List of the storefront's menus.
   */
  menus: MenuList_menus | null;
}

export interface MenuListVariables {
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
  sort?: MenuSortingInput | null;
}
