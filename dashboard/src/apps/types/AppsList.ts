/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AppSortingInput, AppFilterInput, AppTypeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: AppsList
// ====================================================

export interface AppsList_apps_pageInfo {
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

export interface AppsList_apps_edges_node {
  __typename: "App";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of the app.
   */
  name: string | null;
  /**
   * Determine if app will be set active or not.
   */
  isActive: boolean | null;
  /**
   * Type of the app.
   */
  type: AppTypeEnum | null;
}

export interface AppsList_apps_edges {
  __typename: "AppCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: AppsList_apps_edges_node;
}

export interface AppsList_apps {
  __typename: "AppCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: AppsList_apps_pageInfo;
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: AppsList_apps_edges[];
}

export interface AppsList {
  /**
   * List of the apps.
   */
  apps: AppsList_apps | null;
}

export interface AppsListVariables {
  before?: string | null;
  after?: string | null;
  first?: number | null;
  last?: number | null;
  sort?: AppSortingInput | null;
  filter?: AppFilterInput | null;
}
