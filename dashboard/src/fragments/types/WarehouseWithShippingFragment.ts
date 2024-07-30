/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: WarehouseWithShippingFragment
// ====================================================

export interface WarehouseWithShippingFragment_shippingZones_edges_node {
  __typename: "ShippingZone";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface WarehouseWithShippingFragment_shippingZones_edges {
  __typename: "ShippingZoneCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: WarehouseWithShippingFragment_shippingZones_edges_node;
}

export interface WarehouseWithShippingFragment_shippingZones {
  __typename: "ShippingZoneCountableConnection";
  edges: WarehouseWithShippingFragment_shippingZones_edges[];
}

export interface WarehouseWithShippingFragment {
  __typename: "Warehouse";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  shippingZones: WarehouseWithShippingFragment_shippingZones;
}
