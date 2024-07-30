/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LanguageCodeEnum, AttributeInputTypeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: AttributeTranslations
// ====================================================

export interface AttributeTranslations_translations_edges_node_ProductTranslatableContent {
  __typename: "ProductTranslatableContent" | "CollectionTranslatableContent" | "CategoryTranslatableContent" | "AttributeValueTranslatableContent" | "ProductVariantTranslatableContent" | "PageTranslatableContent" | "ShippingMethodTranslatableContent" | "SaleTranslatableContent" | "VoucherTranslatableContent" | "MenuItemTranslatableContent";
}

export interface AttributeTranslations_translations_edges_node_AttributeTranslatableContent_translation {
  __typename: "AttributeTranslation";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface AttributeTranslations_translations_edges_node_AttributeTranslatableContent_attribute {
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
}

export interface AttributeTranslations_translations_edges_node_AttributeTranslatableContent {
  __typename: "AttributeTranslatableContent";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * Returns translated attribute fields for the given language code.
   */
  translation: AttributeTranslations_translations_edges_node_AttributeTranslatableContent_translation | null;
  /**
   * Custom attribute of a product.
   */
  attribute: AttributeTranslations_translations_edges_node_AttributeTranslatableContent_attribute | null;
}

export type AttributeTranslations_translations_edges_node = AttributeTranslations_translations_edges_node_ProductTranslatableContent | AttributeTranslations_translations_edges_node_AttributeTranslatableContent;

export interface AttributeTranslations_translations_edges {
  __typename: "TranslatableItemEdge";
  /**
   * The item at the end of the edge.
   */
  node: AttributeTranslations_translations_edges_node;
}

export interface AttributeTranslations_translations_pageInfo {
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

export interface AttributeTranslations_translations {
  __typename: "TranslatableItemConnection";
  edges: AttributeTranslations_translations_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: AttributeTranslations_translations_pageInfo;
}

export interface AttributeTranslations {
  /**
   * Returns a list of all translatable items of a given kind.
   */
  translations: AttributeTranslations_translations | null;
}

export interface AttributeTranslationsVariables {
  language: LanguageCodeEnum;
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
}
