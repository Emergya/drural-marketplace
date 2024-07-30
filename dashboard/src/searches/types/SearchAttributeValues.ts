/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchAttributeValues
// ====================================================

export interface SearchAttributeValues_attribute_choices_edges_node_file {
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

export interface SearchAttributeValues_attribute_choices_edges_node {
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
  file: SearchAttributeValues_attribute_choices_edges_node_file | null;
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

export interface SearchAttributeValues_attribute_choices_edges {
  __typename: "AttributeValueCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SearchAttributeValues_attribute_choices_edges_node;
}

export interface SearchAttributeValues_attribute_choices_pageInfo {
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

export interface SearchAttributeValues_attribute_choices {
  __typename: "AttributeValueCountableConnection";
  edges: SearchAttributeValues_attribute_choices_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: SearchAttributeValues_attribute_choices_pageInfo;
}

export interface SearchAttributeValues_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of attribute's values.
   */
  choices: SearchAttributeValues_attribute_choices | null;
}

export interface SearchAttributeValues {
  /**
   * Look up an attribute by ID.
   */
  attribute: SearchAttributeValues_attribute | null;
}

export interface SearchAttributeValuesVariables {
  id?: string | null;
  after?: string | null;
  first: number;
  query: string;
}
