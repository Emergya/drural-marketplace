/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LanguageCodeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: SaleTranslations
// ====================================================

export interface SaleTranslations_translations_edges_node_ProductTranslatableContent {
  __typename: "ProductTranslatableContent" | "CollectionTranslatableContent" | "CategoryTranslatableContent" | "AttributeTranslatableContent" | "AttributeValueTranslatableContent" | "ProductVariantTranslatableContent" | "PageTranslatableContent" | "ShippingMethodTranslatableContent" | "VoucherTranslatableContent" | "MenuItemTranslatableContent";
}

export interface SaleTranslations_translations_edges_node_SaleTranslatableContent_sale {
  __typename: "Sale";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface SaleTranslations_translations_edges_node_SaleTranslatableContent_translation_language {
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

export interface SaleTranslations_translations_edges_node_SaleTranslatableContent_translation {
  __typename: "SaleTranslation";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Translation language.
   */
  language: SaleTranslations_translations_edges_node_SaleTranslatableContent_translation_language;
  name: string | null;
}

export interface SaleTranslations_translations_edges_node_SaleTranslatableContent {
  __typename: "SaleTranslatableContent";
  /**
   * Sales allow creating discounts for categories, collections or products and are visible to all the customers.
   */
  sale: SaleTranslations_translations_edges_node_SaleTranslatableContent_sale | null;
  /**
   * Returns translated sale fields for the given language code.
   */
  translation: SaleTranslations_translations_edges_node_SaleTranslatableContent_translation | null;
}

export type SaleTranslations_translations_edges_node = SaleTranslations_translations_edges_node_ProductTranslatableContent | SaleTranslations_translations_edges_node_SaleTranslatableContent;

export interface SaleTranslations_translations_edges {
  __typename: "TranslatableItemEdge";
  /**
   * The item at the end of the edge.
   */
  node: SaleTranslations_translations_edges_node;
}

export interface SaleTranslations_translations_pageInfo {
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

export interface SaleTranslations_translations {
  __typename: "TranslatableItemConnection";
  edges: SaleTranslations_translations_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: SaleTranslations_translations_pageInfo;
}

export interface SaleTranslations {
  /**
   * Returns a list of all translatable items of a given kind.
   */
  translations: SaleTranslations_translations | null;
}

export interface SaleTranslationsVariables {
  language: LanguageCodeEnum;
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
}
