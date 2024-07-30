/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LanguageCodeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: ShippingMethodTranslations
// ====================================================

export interface ShippingMethodTranslations_translations_edges_node_ProductTranslatableContent {
  __typename: "ProductTranslatableContent" | "CollectionTranslatableContent" | "CategoryTranslatableContent" | "AttributeTranslatableContent" | "AttributeValueTranslatableContent" | "ProductVariantTranslatableContent" | "PageTranslatableContent" | "SaleTranslatableContent" | "VoucherTranslatableContent" | "MenuItemTranslatableContent";
}

export interface ShippingMethodTranslations_translations_edges_node_ShippingMethodTranslatableContent_shippingMethod {
  __typename: "ShippingMethod";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface ShippingMethodTranslations_translations_edges_node_ShippingMethodTranslatableContent_translation_language {
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

export interface ShippingMethodTranslations_translations_edges_node_ShippingMethodTranslatableContent_translation {
  __typename: "ShippingMethodTranslation";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Translation language.
   */
  language: ShippingMethodTranslations_translations_edges_node_ShippingMethodTranslatableContent_translation_language;
  name: string | null;
  description: any | null;
}

export interface ShippingMethodTranslations_translations_edges_node_ShippingMethodTranslatableContent {
  __typename: "ShippingMethodTranslatableContent";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  description: any | null;
  /**
   * Shipping method are the methods you'll use to get customer's orders  to them. They are directly exposed to the customers.
   */
  shippingMethod: ShippingMethodTranslations_translations_edges_node_ShippingMethodTranslatableContent_shippingMethod | null;
  /**
   * Returns translated shipping method fields for the given language code.
   */
  translation: ShippingMethodTranslations_translations_edges_node_ShippingMethodTranslatableContent_translation | null;
}

export type ShippingMethodTranslations_translations_edges_node = ShippingMethodTranslations_translations_edges_node_ProductTranslatableContent | ShippingMethodTranslations_translations_edges_node_ShippingMethodTranslatableContent;

export interface ShippingMethodTranslations_translations_edges {
  __typename: "TranslatableItemEdge";
  /**
   * The item at the end of the edge.
   */
  node: ShippingMethodTranslations_translations_edges_node;
}

export interface ShippingMethodTranslations_translations_pageInfo {
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

export interface ShippingMethodTranslations_translations {
  __typename: "TranslatableItemConnection";
  edges: ShippingMethodTranslations_translations_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: ShippingMethodTranslations_translations_pageInfo;
}

export interface ShippingMethodTranslations {
  /**
   * Returns a list of all translatable items of a given kind.
   */
  translations: ShippingMethodTranslations_translations | null;
}

export interface ShippingMethodTranslationsVariables {
  language: LanguageCodeEnum;
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
}
