/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AgentUserInput, UserSortingInput } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: BusinessAgentList
// ====================================================

export interface BusinessAgentList_agentUsers_edges_node_orders {
  __typename: "OrderCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
}

export interface BusinessAgentList_agentUsers_edges_node {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  /**
   * List of user's orders.
   */
  orders: BusinessAgentList_agentUsers_edges_node_orders | null;
  /**
   * Determines if an user is seller
   */
  isSeller: boolean | null;
  dateJoined: any;
}

export interface BusinessAgentList_agentUsers_edges {
  __typename: "UserCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: BusinessAgentList_agentUsers_edges_node;
}

export interface BusinessAgentList_agentUsers_pageInfo {
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

export interface BusinessAgentList_agentUsers {
  __typename: "UserCountableConnection";
  edges: BusinessAgentList_agentUsers_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: BusinessAgentList_agentUsers_pageInfo;
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
}

export interface BusinessAgentList {
  /**
   * List of the shop's agent users.
   */
  agentUsers: BusinessAgentList_agentUsers | null;
}

export interface BusinessAgentListVariables {
  company: string;
  filter?: AgentUserInput | null;
  sort?: UserSortingInput | null;
  before?: string | null;
  after?: string | null;
  first?: number | null;
  last?: number | null;
}
