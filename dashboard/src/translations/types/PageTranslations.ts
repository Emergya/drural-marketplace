/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LanguageCodeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: PageTranslations
// ====================================================

export interface PageTranslations_translations_edges_node_ProductTranslatableContent {
  __typename: "ProductTranslatableContent" | "CollectionTranslatableContent" | "CategoryTranslatableContent" | "AttributeTranslatableContent" | "AttributeValueTranslatableContent" | "ProductVariantTranslatableContent" | "ShippingMethodTranslatableContent" | "SaleTranslatableContent" | "VoucherTranslatableContent" | "MenuItemTranslatableContent";
}

export interface PageTranslations_translations_edges_node_PageTranslatableContent_page {
  __typename: "Page";
  /**
   * The ID of the object.
   */
  id: string;
  content: any | null;
  seoDescription: string | null;
  seoTitle: string | null;
  title: string;
}

export interface PageTranslations_translations_edges_node_PageTranslatableContent_translation_language {
  __typename: "LanguageDisplay";
  /**
   * ISO 639 representation of the language name.
   */
  code: LanguageCodeEnum;
  /**
   * Full name of the language.
   */
  language: string;
}

export interface PageTranslations_translations_edges_node_PageTranslatableContent_translation {
  __typename: "PageTranslation";
  /**
   * The ID of the object.
   */
  id: string;
  content: any | null;
  seoDescription: string | null;
  seoTitle: string | null;
  title: string | null;
  /**
   * Translation language.
   */
  language: PageTranslations_translations_edges_node_PageTranslatableContent_translation_language;
}

export interface PageTranslations_translations_edges_node_PageTranslatableContent_attributeValues_attributeValue {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface PageTranslations_translations_edges_node_PageTranslatableContent_attributeValues_translation_language {
  __typename: "LanguageDisplay";
  /**
   * ISO 639 representation of the language name.
   */
  code: LanguageCodeEnum;
  /**
   * Full name of the language.
   */
  language: string;
}

export interface PageTranslations_translations_edges_node_PageTranslatableContent_attributeValues_translation {
  __typename: "AttributeValueTranslation";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  richText: any | null;
  /**
   * Translation language.
   */
  language: PageTranslations_translations_edges_node_PageTranslatableContent_attributeValues_translation_language;
}

export interface PageTranslations_translations_edges_node_PageTranslatableContent_attributeValues {
  __typename: "AttributeValueTranslatableContent";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  richText: any | null;
  /**
   * Represents a value of an attribute.
   */
  attributeValue: PageTranslations_translations_edges_node_PageTranslatableContent_attributeValues_attributeValue | null;
  /**
   * Returns translated attribute value fields for the given language code.
   */
  translation: PageTranslations_translations_edges_node_PageTranslatableContent_attributeValues_translation | null;
}

export interface PageTranslations_translations_edges_node_PageTranslatableContent {
  __typename: "PageTranslatableContent";
  /**
   * ('A static page that can be manually added by a shop operator ', 'through the dashboard.')
   */
  page: PageTranslations_translations_edges_node_PageTranslatableContent_page | null;
  /**
   * Returns translated page fields for the given language code.
   */
  translation: PageTranslations_translations_edges_node_PageTranslatableContent_translation | null;
  /**
   * List of page content attribute values that can be translated.
   */
  attributeValues: PageTranslations_translations_edges_node_PageTranslatableContent_attributeValues[];
}

export type PageTranslations_translations_edges_node = PageTranslations_translations_edges_node_ProductTranslatableContent | PageTranslations_translations_edges_node_PageTranslatableContent;

export interface PageTranslations_translations_edges {
  __typename: "TranslatableItemEdge";
  /**
   * The item at the end of the edge.
   */
  node: PageTranslations_translations_edges_node;
}

export interface PageTranslations_translations_pageInfo {
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

export interface PageTranslations_translations {
  __typename: "TranslatableItemConnection";
  edges: PageTranslations_translations_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: PageTranslations_translations_pageInfo;
}

export interface PageTranslations {
  /**
   * Returns a list of all translatable items of a given kind.
   */
  translations: PageTranslations_translations | null;
}

export interface PageTranslationsVariables {
  language: LanguageCodeEnum;
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
}
