/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PageInput, PageErrorCode, AttributeInputTypeEnum, AttributeEntityTypeEnum, MeasurementUnitsEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: PageUpdate
// ====================================================

export interface PageUpdate_pageUpdate_errors {
  __typename: "PageError";
  /**
   * The error code.
   */
  code: PageErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * List of attributes IDs which causes the error.
   */
  attributes: string[] | null;
}

export interface PageUpdate_pageUpdate_page_attributes_attribute_choices_pageInfo {
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

export interface PageUpdate_pageUpdate_page_attributes_attribute_choices_edges_node_file {
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

export interface PageUpdate_pageUpdate_page_attributes_attribute_choices_edges_node {
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
  file: PageUpdate_pageUpdate_page_attributes_attribute_choices_edges_node_file | null;
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

export interface PageUpdate_pageUpdate_page_attributes_attribute_choices_edges {
  __typename: "AttributeValueCountableEdge";
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
  /**
   * The item at the end of the edge.
   */
  node: PageUpdate_pageUpdate_page_attributes_attribute_choices_edges_node;
}

export interface PageUpdate_pageUpdate_page_attributes_attribute_choices {
  __typename: "AttributeValueCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: PageUpdate_pageUpdate_page_attributes_attribute_choices_pageInfo;
  edges: PageUpdate_pageUpdate_page_attributes_attribute_choices_edges[];
}

export interface PageUpdate_pageUpdate_page_attributes_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Internal representation of an attribute name.
   */
  slug: string | null;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * The input type to use for entering attribute values in the dashboard.
   */
  inputType: AttributeInputTypeEnum | null;
  /**
   * The entity type which can be used as a reference.
   */
  entityType: AttributeEntityTypeEnum | null;
  /**
   * Whether the attribute requires values to be passed or not.
   */
  valueRequired: boolean;
  /**
   * The unit of attribute values.
   */
  unit: MeasurementUnitsEnum | null;
  /**
   * List of attribute's values.
   */
  choices: PageUpdate_pageUpdate_page_attributes_attribute_choices | null;
}

export interface PageUpdate_pageUpdate_page_attributes_values_file {
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

export interface PageUpdate_pageUpdate_page_attributes_values {
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
  file: PageUpdate_pageUpdate_page_attributes_values_file | null;
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

export interface PageUpdate_pageUpdate_page_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: PageUpdate_pageUpdate_page_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (PageUpdate_pageUpdate_page_attributes_values | null)[];
}

export interface PageUpdate_pageUpdate_page_pageType_attributes_choices_pageInfo {
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

export interface PageUpdate_pageUpdate_page_pageType_attributes_choices_edges_node_file {
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

export interface PageUpdate_pageUpdate_page_pageType_attributes_choices_edges_node {
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
  file: PageUpdate_pageUpdate_page_pageType_attributes_choices_edges_node_file | null;
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

export interface PageUpdate_pageUpdate_page_pageType_attributes_choices_edges {
  __typename: "AttributeValueCountableEdge";
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
  /**
   * The item at the end of the edge.
   */
  node: PageUpdate_pageUpdate_page_pageType_attributes_choices_edges_node;
}

export interface PageUpdate_pageUpdate_page_pageType_attributes_choices {
  __typename: "AttributeValueCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: PageUpdate_pageUpdate_page_pageType_attributes_choices_pageInfo;
  edges: PageUpdate_pageUpdate_page_pageType_attributes_choices_edges[];
}

export interface PageUpdate_pageUpdate_page_pageType_attributes {
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
   * The entity type which can be used as a reference.
   */
  entityType: AttributeEntityTypeEnum | null;
  /**
   * Whether the attribute requires values to be passed or not.
   */
  valueRequired: boolean;
  /**
   * List of attribute's values.
   */
  choices: PageUpdate_pageUpdate_page_pageType_attributes_choices | null;
}

export interface PageUpdate_pageUpdate_page_pageType {
  __typename: "PageType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * Page attributes of that page type.
   */
  attributes: (PageUpdate_pageUpdate_page_pageType_attributes | null)[] | null;
}

export interface PageUpdate_pageUpdate_page_metadata {
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

export interface PageUpdate_pageUpdate_page_privateMetadata {
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

export interface PageUpdate_pageUpdate_page {
  __typename: "Page";
  /**
   * The ID of the object.
   */
  id: string;
  title: string;
  slug: string;
  isPublished: boolean;
  /**
   * List of attributes assigned to this product.
   */
  attributes: PageUpdate_pageUpdate_page_attributes[];
  pageType: PageUpdate_pageUpdate_page_pageType;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (PageUpdate_pageUpdate_page_metadata | null)[];
  /**
   * List of private metadata items.Requires proper staff permissions to access.
   */
  privateMetadata: (PageUpdate_pageUpdate_page_privateMetadata | null)[];
  content: any | null;
  seoTitle: string | null;
  seoDescription: string | null;
  publicationDate: any | null;
}

export interface PageUpdate_pageUpdate {
  __typename: "PageUpdate";
  errors: PageUpdate_pageUpdate_errors[];
  page: PageUpdate_pageUpdate_page | null;
}

export interface PageUpdate {
  /**
   * Updates an existing page.
   */
  pageUpdate: PageUpdate_pageUpdate | null;
}

export interface PageUpdateVariables {
  id: string;
  input: PageInput;
  firstValues?: number | null;
  afterValues?: string | null;
  lastValues?: number | null;
  beforeValues?: string | null;
}
