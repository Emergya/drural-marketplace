/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LanguageCodeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: ProductTranslations
// ====================================================

export interface ProductTranslations_translations_edges_node_CollectionTranslatableContent {
  __typename: "CollectionTranslatableContent" | "CategoryTranslatableContent" | "AttributeTranslatableContent" | "AttributeValueTranslatableContent" | "ProductVariantTranslatableContent" | "PageTranslatableContent" | "ShippingMethodTranslatableContent" | "SaleTranslatableContent" | "VoucherTranslatableContent" | "MenuItemTranslatableContent";
}

export interface ProductTranslations_translations_edges_node_ProductTranslatableContent_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  description: any | null;
  seoDescription: string | null;
  seoTitle: string | null;
}

export interface ProductTranslations_translations_edges_node_ProductTranslatableContent_translation_language {
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

export interface ProductTranslations_translations_edges_node_ProductTranslatableContent_translation {
  __typename: "ProductTranslation";
  /**
   * The ID of the object.
   */
  id: string;
  seoTitle: string | null;
  seoDescription: string | null;
  name: string | null;
  description: any | null;
  /**
   * Translation language.
   */
  language: ProductTranslations_translations_edges_node_ProductTranslatableContent_translation_language;
}

export interface ProductTranslations_translations_edges_node_ProductTranslatableContent_attributeValues_attributeValue {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface ProductTranslations_translations_edges_node_ProductTranslatableContent_attributeValues_translation_language {
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

export interface ProductTranslations_translations_edges_node_ProductTranslatableContent_attributeValues_translation {
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
  language: ProductTranslations_translations_edges_node_ProductTranslatableContent_attributeValues_translation_language;
}

export interface ProductTranslations_translations_edges_node_ProductTranslatableContent_attributeValues {
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
  attributeValue: ProductTranslations_translations_edges_node_ProductTranslatableContent_attributeValues_attributeValue | null;
  /**
   * Returns translated attribute value fields for the given language code.
   */
  translation: ProductTranslations_translations_edges_node_ProductTranslatableContent_attributeValues_translation | null;
}

export interface ProductTranslations_translations_edges_node_ProductTranslatableContent {
  __typename: "ProductTranslatableContent";
  /**
   * Represents an individual item for sale in the storefront.
   */
  product: ProductTranslations_translations_edges_node_ProductTranslatableContent_product | null;
  /**
   * Returns translated product fields for the given language code.
   */
  translation: ProductTranslations_translations_edges_node_ProductTranslatableContent_translation | null;
  /**
   * List of product attribute values that can be translated.
   */
  attributeValues: ProductTranslations_translations_edges_node_ProductTranslatableContent_attributeValues[];
}

export type ProductTranslations_translations_edges_node = ProductTranslations_translations_edges_node_CollectionTranslatableContent | ProductTranslations_translations_edges_node_ProductTranslatableContent;

export interface ProductTranslations_translations_edges {
  __typename: "TranslatableItemEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductTranslations_translations_edges_node;
}

export interface ProductTranslations_translations_pageInfo {
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

export interface ProductTranslations_translations {
  __typename: "TranslatableItemConnection";
  edges: ProductTranslations_translations_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: ProductTranslations_translations_pageInfo;
}

export interface ProductTranslations {
  /**
   * Returns a list of all translatable items of a given kind.
   */
  translations: ProductTranslations_translations | null;
}

export interface ProductTranslationsVariables {
  language: LanguageCodeEnum;
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
}
