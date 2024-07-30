/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CustomerFilterInput, UserSortingInput } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: ListCustomers
// ====================================================

export interface ListCustomers_customers_edges_node_orders {
  __typename: "OrderCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
}

export interface ListCustomers_customers_edges_node {
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
  orders: ListCustomers_customers_edges_node_orders | null;
  /**
   * Determines if an user is seller
   */
  isSeller: boolean | null;
  dateJoined: any;
}

export interface ListCustomers_customers_edges {
  __typename: "UserCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ListCustomers_customers_edges_node;
}

export interface ListCustomers_customers_pageInfo {
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

export interface ListCustomers_customers {
  __typename: "UserCountableConnection";
  edges: ListCustomers_customers_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: ListCustomers_customers_pageInfo;
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
}

export interface ListCustomers {
  /**
   * List of the shop's customers.
   */
  customers: ListCustomers_customers | null;
}

export interface ListCustomersVariables {
  after?: string | null;
  before?: string | null;
  first?: number | null;
  last?: number | null;
  filter?: CustomerFilterInput | null;
  sort?: UserSortingInput | null;
}
