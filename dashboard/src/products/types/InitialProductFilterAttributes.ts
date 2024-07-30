/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AttributeInputTypeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: InitialProductFilterAttributes
// ====================================================

export interface InitialProductFilterAttributes_attributes_edges_node {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * The input type to use for entering attribute values in the dashboard.
   */
  inputType: AttributeInputTypeEnum | null;
  /**
   * Internal representation of an attribute name.
   */
  slug: string | null;
}

export interface InitialProductFilterAttributes_attributes_edges {
  __typename: "AttributeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: InitialProductFilterAttributes_attributes_edges_node;
}

export interface InitialProductFilterAttributes_attributes {
  __typename: "AttributeCountableConnection";
  edges: InitialProductFilterAttributes_attributes_edges[];
}

export interface InitialProductFilterAttributes {
  /**
   * List of the shop's attributes.
   */
  attributes: InitialProductFilterAttributes_attributes | null;
}
