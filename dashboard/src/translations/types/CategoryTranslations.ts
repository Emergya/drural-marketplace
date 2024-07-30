/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LanguageCodeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: CategoryTranslations
// ====================================================

export interface CategoryTranslations_translations_edges_node_ProductTranslatableContent {
  __typename: "ProductTranslatableContent" | "CollectionTranslatableContent" | "AttributeTranslatableContent" | "AttributeValueTranslatableContent" | "ProductVariantTranslatableContent" | "PageTranslatableContent" | "ShippingMethodTranslatableContent" | "SaleTranslatableContent" | "VoucherTranslatableContent" | "MenuItemTranslatableContent";
}

export interface CategoryTranslations_translations_edges_node_CategoryTranslatableContent_translation_language {
  __typename: "LanguageDisplay";
  /**
   * Full name of the language.
   */
  language: string;
}

export interface CategoryTranslations_translations_edges_node_CategoryTranslatableContent_translation {
  __typename: "CategoryTranslation";
  /**
   * The ID of the object.
   */
  id: string;
  description: any | null;
  /**
   * Translation language.
   */
  language: CategoryTranslations_translations_edges_node_CategoryTranslatableContent_translation_language;
  name: string | null;
  seoDescription: string | null;
  seoTitle: string | null;
}

export interface CategoryTranslations_translations_edges_node_CategoryTranslatableContent_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  description: any | null;
  seoDescription: string | null;
  seoTitle: string | null;
}

export interface CategoryTranslations_translations_edges_node_CategoryTranslatableContent {
  __typename: "CategoryTranslatableContent";
  /**
   * Returns translated category fields for the given language code.
   */
  translation: CategoryTranslations_translations_edges_node_CategoryTranslatableContent_translation | null;
  /**
   * Represents a single category of products.
   */
  category: CategoryTranslations_translations_edges_node_CategoryTranslatableContent_category | null;
}

export type CategoryTranslations_translations_edges_node = CategoryTranslations_translations_edges_node_ProductTranslatableContent | CategoryTranslations_translations_edges_node_CategoryTranslatableContent;

export interface CategoryTranslations_translations_edges {
  __typename: "TranslatableItemEdge";
  /**
   * The item at the end of the edge.
   */
  node: CategoryTranslations_translations_edges_node;
}

export interface CategoryTranslations_translations_pageInfo {
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

export interface CategoryTranslations_translations {
  __typename: "TranslatableItemConnection";
  edges: CategoryTranslations_translations_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: CategoryTranslations_translations_pageInfo;
}

export interface CategoryTranslations {
  /**
   * Returns a list of all translatable items of a given kind.
   */
  translations: CategoryTranslations_translations | null;
}

export interface CategoryTranslationsVariables {
  language: LanguageCodeEnum;
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
}
