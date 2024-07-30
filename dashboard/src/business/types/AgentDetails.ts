/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PaymentChargeStatusEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: AgentDetails
// ====================================================

export interface AgentDetails_agentUserDetails_metadata {
  __typename: "MetadataItem";
  /**
   * Key of a metadata item.
   */
  key: string;
  /**
   * Value of a metadata item.
   */
  value: string;
}

export interface AgentDetails_agentUserDetails_privateMetadata {
  __typename: "MetadataItem";
  /**
   * Key of a metadata item.
   */
  key: string;
  /**
   * Value of a metadata item.
   */
  value: string;
}

export interface AgentDetails_agentUserDetails_addresses_country {
  __typename: "CountryDisplay";
  /**
   * Country code.
   */
  code: string;
  /**
   * Country name.
   */
  country: string;
}

export interface AgentDetails_agentUserDetails_addresses {
  __typename: "Address";
  city: string;
  cityArea: string;
  companyName: string;
  /**
   * Shop's default country.
   */
  country: AgentDetails_agentUserDetails_addresses_country;
  countryArea: string;
  firstName: string;
  /**
   * The ID of the object.
   */
  id: string;
  lastName: string;
  phone: string | null;
  postalCode: string;
  streetAddress1: string;
  streetAddress2: string;
}

export interface AgentDetails_agentUserDetails_defaultShippingAddress_country {
  __typename: "CountryDisplay";
  /**
   * Country code.
   */
  code: string;
  /**
   * Country name.
   */
  country: string;
}

export interface AgentDetails_agentUserDetails_defaultShippingAddress {
  __typename: "Address";
  city: string;
  cityArea: string;
  companyName: string;
  /**
   * Shop's default country.
   */
  country: AgentDetails_agentUserDetails_defaultShippingAddress_country;
  countryArea: string;
  firstName: string;
  /**
   * The ID of the object.
   */
  id: string;
  lastName: string;
  phone: string | null;
  postalCode: string;
  streetAddress1: string;
  streetAddress2: string;
}

export interface AgentDetails_agentUserDetails_defaultBillingAddress_country {
  __typename: "CountryDisplay";
  /**
   * Country code.
   */
  code: string;
  /**
   * Country name.
   */
  country: string;
}

export interface AgentDetails_agentUserDetails_defaultBillingAddress {
  __typename: "Address";
  city: string;
  cityArea: string;
  companyName: string;
  /**
   * Shop's default country.
   */
  country: AgentDetails_agentUserDetails_defaultBillingAddress_country;
  countryArea: string;
  firstName: string;
  /**
   * The ID of the object.
   */
  id: string;
  lastName: string;
  phone: string | null;
  postalCode: string;
  streetAddress1: string;
  streetAddress2: string;
}

export interface AgentDetails_agentUserDetails_orders_edges_node_total_gross {
  __typename: "Money";
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Amount of money.
   */
  amount: number;
}

export interface AgentDetails_agentUserDetails_orders_edges_node_total {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: AgentDetails_agentUserDetails_orders_edges_node_total_gross;
}

export interface AgentDetails_agentUserDetails_orders_edges_node {
  __typename: "Order";
  /**
   * The ID of the object.
   */
  id: string;
  created: any;
  /**
   * User-friendly number of an order.
   */
  number: string | null;
  /**
   * Internal payment status.
   */
  paymentStatus: PaymentChargeStatusEnum;
  /**
   * Total amount of the order.
   */
  total: AgentDetails_agentUserDetails_orders_edges_node_total;
}

export interface AgentDetails_agentUserDetails_orders_edges {
  __typename: "OrderCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: AgentDetails_agentUserDetails_orders_edges_node;
}

export interface AgentDetails_agentUserDetails_orders {
  __typename: "OrderCountableConnection";
  edges: AgentDetails_agentUserDetails_orders_edges[];
}

export interface AgentDetails_agentUserDetails_lastPlacedOrder_edges_node {
  __typename: "Order";
  /**
   * The ID of the object.
   */
  id: string;
  created: any;
}

export interface AgentDetails_agentUserDetails_lastPlacedOrder_edges {
  __typename: "OrderCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: AgentDetails_agentUserDetails_lastPlacedOrder_edges_node;
}

export interface AgentDetails_agentUserDetails_lastPlacedOrder {
  __typename: "OrderCountableConnection";
  edges: AgentDetails_agentUserDetails_lastPlacedOrder_edges[];
}

export interface AgentDetails_agentUserDetails {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (AgentDetails_agentUserDetails_metadata | null)[];
  /**
   * List of private metadata items.Requires proper staff permissions to access.
   */
  privateMetadata: (AgentDetails_agentUserDetails_privateMetadata | null)[];
  dateJoined: any;
  lastLogin: any | null;
  /**
   * List of all user's addresses.
   */
  addresses: (AgentDetails_agentUserDetails_addresses | null)[] | null;
  defaultShippingAddress: AgentDetails_agentUserDetails_defaultShippingAddress | null;
  defaultBillingAddress: AgentDetails_agentUserDetails_defaultBillingAddress | null;
  /**
   * A note about the customer.
   */
  note: string | null;
  isActive: boolean;
  /**
   * List of user's orders.
   */
  orders: AgentDetails_agentUserDetails_orders | null;
  /**
   * List of user's orders.
   */
  lastPlacedOrder: AgentDetails_agentUserDetails_lastPlacedOrder | null;
}

export interface AgentDetails {
  /**
   * Look up a user by ID or email address.
   */
  agentUserDetails: AgentDetails_agentUserDetails | null;
}

export interface AgentDetailsVariables {
  id: string;
}
