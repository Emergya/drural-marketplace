/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPaymentMethods
// ====================================================

export interface GetPaymentMethods_paymentMethods_edges_node {
  __typename: "PaymentMethod";
  /**
   * The ID of the object.
   */
  id: string;
  identifier: string;
  name: string;
  isActive: boolean;
}

export interface GetPaymentMethods_paymentMethods_edges {
  __typename: "PaymentMethodCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetPaymentMethods_paymentMethods_edges_node;
}

export interface GetPaymentMethods_paymentMethods {
  __typename: "PaymentMethodCountableConnection";
  edges: GetPaymentMethods_paymentMethods_edges[];
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
}

export interface GetPaymentMethods {
  /**
   * List of payment methods.
   */
  paymentMethods: GetPaymentMethods_paymentMethods | null;
}

export interface GetPaymentMethodsVariables {
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
}
