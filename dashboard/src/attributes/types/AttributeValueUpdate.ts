/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AttributeValueCreateInput, AttributeErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: AttributeValueUpdate
// ====================================================

export interface AttributeValueUpdate_attributeValueUpdate_attribute_choices_pageInfo {
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

export interface AttributeValueUpdate_attributeValueUpdate_attribute_choices_edges_node_file {
  __typename: "File";
  /**
   * The URL of the file.
   */
  url: string;
  /**
   * Content type of the file.
   */
  contentType: string | null;
}

export interface AttributeValueUpdate_attributeValueUpdate_attribute_choices_edges_node {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of a value (unique per attribute).
   */
  slug: string | null;
  /**
   * Represents file URL and content type (if attribute value is a file).
   */
  file: AttributeValueUpdate_attributeValueUpdate_attribute_choices_edges_node_file | null;
  /**
   * The ID of the attribute reference.
   */
  reference: string | null;
  /**
   * Represents the text (JSON) of the attribute value.
   */
  richText: any | null;
  /**
   * Represents the boolean value of the attribute value.
   */
  boolean: boolean | null;
  /**
   * Represents the date value of the attribute value.
   */
  date: any | null;
  /**
   * Represents the date time value of the attribute value.
   */
  dateTime: any | null;
}

export interface AttributeValueUpdate_attributeValueUpdate_attribute_choices_edges {
  __typename: "AttributeValueCountableEdge";
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
  /**
   * The item at the end of the edge.
   */
  node: AttributeValueUpdate_attributeValueUpdate_attribute_choices_edges_node;
}

export interface AttributeValueUpdate_attributeValueUpdate_attribute_choices {
  __typename: "AttributeValueCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: AttributeValueUpdate_attributeValueUpdate_attribute_choices_pageInfo;
  edges: AttributeValueUpdate_attributeValueUpdate_attribute_choices_edges[];
}

export interface AttributeValueUpdate_attributeValueUpdate_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of attribute's values.
   */
  choices: AttributeValueUpdate_attributeValueUpdate_attribute_choices | null;
}

export interface AttributeValueUpdate_attributeValueUpdate_errors {
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

export interface AttributeValueUpdate_attributeValueUpdate {
  __typename: "AttributeValueUpdate";
  /**
   * The updated attribute.
   */
  attribute: AttributeValueUpdate_attributeValueUpdate_attribute | null;
  errors: AttributeValueUpdate_attributeValueUpdate_errors[];
}

export interface AttributeValueUpdate {
  /**
   * Updates value of an attribute.
   */
  attributeValueUpdate: AttributeValueUpdate_attributeValueUpdate | null;
}

export interface AttributeValueUpdateVariables {
  id: string;
  input: AttributeValueCreateInput;
  firstValues?: number | null;
  afterValues?: string | null;
  lastValues?: number | null;
  beforeValues?: string | null;
}
