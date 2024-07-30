/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LanguageCodeEnum, AttributeInputTypeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: AttributeTranslationDetails
// ====================================================

export interface AttributeTranslationDetails_translation_ProductTranslatableContent {
  __typename: "ProductTranslatableContent" | "CollectionTranslatableContent" | "CategoryTranslatableContent" | "AttributeValueTranslatableContent" | "ProductVariantTranslatableContent" | "PageTranslatableContent" | "ShippingMethodTranslatableContent" | "SaleTranslatableContent" | "VoucherTranslatableContent" | "MenuItemTranslatableContent";
}

export interface AttributeTranslationDetails_translation_AttributeTranslatableContent_translation {
  __typename: "AttributeTranslation";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface AttributeTranslationDetails_translation_AttributeTranslatableContent_attribute_choices_pageInfo {
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

export interface AttributeTranslationDetails_translation_AttributeTranslatableContent_attribute_choices_edges_node_translation {
  __typename: "AttributeValueTranslation";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  richText: any | null;
}

export interface AttributeTranslationDetails_translation_AttributeTranslatableContent_attribute_choices_edges_node {
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
  translation: AttributeTranslationDetails_translation_AttributeTranslatableContent_attribute_choices_edges_node_translation | null;
}

export interface AttributeTranslationDetails_translation_AttributeTranslatableContent_attribute_choices_edges {
  __typename: "AttributeValueCountableEdge";
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
  /**
   * The item at the end of the edge.
   */
  node: AttributeTranslationDetails_translation_AttributeTranslatableContent_attribute_choices_edges_node;
}

export interface AttributeTranslationDetails_translation_AttributeTranslatableContent_attribute_choices {
  __typename: "AttributeValueCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: AttributeTranslationDetails_translation_AttributeTranslatableContent_attribute_choices_pageInfo;
  edges: AttributeTranslationDetails_translation_AttributeTranslatableContent_attribute_choices_edges[];
}

export interface AttributeTranslationDetails_translation_AttributeTranslatableContent_attribute {
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
  choices: AttributeTranslationDetails_translation_AttributeTranslatableContent_attribute_choices | null;
}

export interface AttributeTranslationDetails_translation_AttributeTranslatableContent {
  __typename: "AttributeTranslatableContent";
  /**
   * Returns translated attribute fields for the given language code.
   */
  translation: AttributeTranslationDetails_translation_AttributeTranslatableContent_translation | null;
  /**
   * Custom attribute of a product.
   */
  attribute: AttributeTranslationDetails_translation_AttributeTranslatableContent_attribute | null;
}

export type AttributeTranslationDetails_translation = AttributeTranslationDetails_translation_ProductTranslatableContent | AttributeTranslationDetails_translation_AttributeTranslatableContent;

export interface AttributeTranslationDetails {
  translation: AttributeTranslationDetails_translation | null;
}

export interface AttributeTranslationDetailsVariables {
  id: string;
  language: LanguageCodeEnum;
  firstValues?: number | null;
  afterValues?: string | null;
  lastValues?: number | null;
  beforeValues?: string | null;
}
