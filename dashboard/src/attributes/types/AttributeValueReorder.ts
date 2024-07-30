/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReorderInput, AttributeErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: AttributeValueReorder
// ====================================================

export interface AttributeValueReorder_attributeReorderValues_attribute_choices_pageInfo {
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

export interface AttributeValueReorder_attributeReorderValues_attribute_choices_edges_node {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface AttributeValueReorder_attributeReorderValues_attribute_choices_edges {
  __typename: "AttributeValueCountableEdge";
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
  /**
   * The item at the end of the edge.
   */
  node: AttributeValueReorder_attributeReorderValues_attribute_choices_edges_node;
}

export interface AttributeValueReorder_attributeReorderValues_attribute_choices {
  __typename: "AttributeValueCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: AttributeValueReorder_attributeReorderValues_attribute_choices_pageInfo;
  edges: AttributeValueReorder_attributeReorderValues_attribute_choices_edges[];
}

export interface AttributeValueReorder_attributeReorderValues_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of attribute's values.
   */
  choices: AttributeValueReorder_attributeReorderValues_attribute_choices | null;
}

export interface AttributeValueReorder_attributeReorderValues_errors {
  __typename: "AttributeError";
  /**
   * The error code.
   */
  code: AttributeErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
}

export interface AttributeValueReorder_attributeReorderValues {
  __typename: "AttributeReorderValues";
  /**
   * Attribute from which values are reordered.
   */
  attribute: AttributeValueReorder_attributeReorderValues_attribute | null;
  errors: AttributeValueReorder_attributeReorderValues_errors[];
}

export interface AttributeValueReorder {
  /**
   * Reorder the values of an attribute.
   */
  attributeReorderValues: AttributeValueReorder_attributeReorderValues | null;
}

export interface AttributeValueReorderVariables {
  id: string;
  move: ReorderInput;
  firstValues?: number | null;
  afterValues?: string | null;
  lastValues?: number | null;
  beforeValues?: string | null;
}
