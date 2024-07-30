/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GridAttributes
// ====================================================

export interface GridAttributes_grid_edges_node {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
}

export interface GridAttributes_grid_edges {
  __typename: "AttributeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: GridAttributes_grid_edges_node;
}

export interface GridAttributes_grid {
  __typename: "AttributeCountableConnection";
  edges: GridAttributes_grid_edges[];
}

export interface GridAttributes {
  /**
   * List of the shop's attributes.
   */
  grid: GridAttributes_grid | null;
}

export interface GridAttributesVariables {
  ids: string[];
}
