/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderStatus } from "./../../../../types/globalTypes";

// ====================================================
// GraphQL query operation: CheckIfOrderExists
// ====================================================

export interface CheckIfOrderExists_order {
  __typename: "Order";
  /**
   * The ID of the object.
   */
  id: string;
  status: OrderStatus;
}

export interface CheckIfOrderExists {
  /**
   * Look up an order by ID.
   */
  order: CheckIfOrderExists_order | null;
}

export interface CheckIfOrderExistsVariables {
  id: string;
}
