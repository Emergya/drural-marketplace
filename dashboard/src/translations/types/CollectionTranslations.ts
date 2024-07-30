/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LanguageCodeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: CollectionTranslations
// ====================================================

export interface CollectionTranslations_translations_edges_node_ProductTranslatableContent {
  __typename: "ProductTranslatableContent" | "CategoryTranslatableContent" | "AttributeTranslatableContent" | "AttributeValueTranslatableContent" | "ProductVariantTranslatableContent" | "PageTranslatableContent" | "ShippingMethodTranslatableContent" | "SaleTranslatableContent" | "VoucherTranslatableContent" | "MenuItemTranslatableContent";
}

export interface CollectionTranslations_translations_edges_node_CollectionTranslatableContent_collection {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  description: any | null;
  seoDescription: string | null;
  seoTitle: string | null;
}

export interface CollectionTranslations_translations_edges_node_CollectionTranslatableContent_translation_language {
  __typename: "LanguageDisplay";
  /**
   * Full name of the language.
   */
  language: string;
}

export interface CollectionTranslations_translations_edges_node_CollectionTranslatableContent_translation {
  __typename: "CollectionTranslation";
  /**
   * The ID of the object.
   */
  id: string;
  description: any | null;
  /**
   * Translation language.
   */
  language: CollectionTranslations_translations_edges_node_CollectionTranslatableContent_translation_language;
  name: string | null;
  seoDescription: string | null;
  seoTitle: string | null;
}

export interface CollectionTranslations_translations_edges_node_CollectionTranslatableContent {
  __typename: "CollectionTranslatableContent";
  /**
   * Represents a collection of products.
   */
  collection: CollectionTranslations_translations_edges_node_CollectionTranslatableContent_collection | null;
  /**
   * Returns translated collection fields for the given language code.
   */
  translation: CollectionTranslations_translations_edges_node_CollectionTranslatableContent_translation | null;
}

export type CollectionTranslations_translations_edges_node = CollectionTranslations_translations_edges_node_ProductTranslatableContent | CollectionTranslations_translations_edges_node_CollectionTranslatableContent;

export interface CollectionTranslations_translations_edges {
  __typename: "TranslatableItemEdge";
  /**
   * The item at the end of the edge.
   */
  node: CollectionTranslations_translations_edges_node;
}

export interface CollectionTranslations_translations_pageInfo {
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

export interface CollectionTranslations_translations {
  __typename: "TranslatableItemConnection";
  edges: CollectionTranslations_translations_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: CollectionTranslations_translations_pageInfo;
}

export interface CollectionTranslations {
  /**
   * Returns a list of all translatable items of a given kind.
   */
  translations: CollectionTranslations_translations | null;
}

export interface CollectionTranslationsVariables {
  language: LanguageCodeEnum;
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
}
