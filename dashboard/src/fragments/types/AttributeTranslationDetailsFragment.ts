/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AttributeInputTypeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL fragment: AttributeTranslationDetailsFragment
// ====================================================

export interface AttributeTranslationDetailsFragment_translation {
  __typename: "AttributeTranslation";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface AttributeTranslationDetailsFragment_attribute_choices_pageInfo {
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

export interface AttributeTranslationDetailsFragment_attribute_choices_edges_node_translation {
  __typename: "AttributeValueTranslation";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  richText: any | null;
}

export interface AttributeTranslationDetailsFragment_attribute_choices_edges_node {
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
   * Represents the text (JSON) of the attribute value.
   */
  richText: any | null;
  /**
   * The input type to use for entering attribute values in the dashboard.
   */
  inputType: AttributeInputTypeEnum | null;
  /**
   * Returns translated attribute value fields for the given language code.
   */
  translation: AttributeTranslationDetailsFragment_attribute_choices_edges_node_translation | null;
}

export interface AttributeTranslationDetailsFragment_attribute_choices_edges {
  __typename: "AttributeValueCountableEdge";
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
  /**
   * The item at the end of the edge.
   */
  node: AttributeTranslationDetailsFragment_attribute_choices_edges_node;
}

export interface AttributeTranslationDetailsFragment_attribute_choices {
  __typename: "AttributeValueCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: AttributeTranslationDetailsFragment_attribute_choices_pageInfo;
  edges: AttributeTranslationDetailsFragment_attribute_choices_edges[];
}

export interface AttributeTranslationDetailsFragment_attribute {
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
   * Flag indicating that attribute has predefined choices.
   */
  withChoices: boolean;
  /**
   * List of attribute's values.
   */
  choices: AttributeTranslationDetailsFragment_attribute_choices | null;
}

export interface AttributeTranslationDetailsFragment {
  __typename: "AttributeTranslatableContent";
  /**
   * Returns translated attribute fields for the given language code.
   */
  translation: AttributeTranslationDetailsFragment_translation | null;
  /**
   * Custom attribute of a product.
   */
  attribute: AttributeTranslationDetailsFragment_attribute | null;
}
