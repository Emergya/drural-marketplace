/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LanguageCodeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: VoucherTranslations
// ====================================================

export interface VoucherTranslations_translations_edges_node_ProductTranslatableContent {
  __typename: "ProductTranslatableContent" | "CollectionTranslatableContent" | "CategoryTranslatableContent" | "AttributeTranslatableContent" | "AttributeValueTranslatableContent" | "ProductVariantTranslatableContent" | "PageTranslatableContent" | "ShippingMethodTranslatableContent" | "SaleTranslatableContent" | "MenuItemTranslatableContent";
}

export interface VoucherTranslations_translations_edges_node_VoucherTranslatableContent_voucher {
  __typename: "Voucher";
  /**
   * The ID of the object.
   */
  id: string;
  name: string | null;
}

export interface VoucherTranslations_translations_edges_node_VoucherTranslatableContent_translation_language {
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

export interface VoucherTranslations_translations_edges_node_VoucherTranslatableContent_translation {
  __typename: "VoucherTranslation";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Translation language.
   */
  language: VoucherTranslations_translations_edges_node_VoucherTranslatableContent_translation_language;
  name: string | null;
}

export interface VoucherTranslations_translations_edges_node_VoucherTranslatableContent {
  __typename: "VoucherTranslatableContent";
  name: string | null;
  /**
   * Vouchers allow giving discounts to particular customers on categories,
   * collections or specific products. They can be used during checkout by
   * providing valid voucher codes.
   */
  voucher: VoucherTranslations_translations_edges_node_VoucherTranslatableContent_voucher | null;
  /**
   * Returns translated voucher fields for the given language code.
   */
  translation: VoucherTranslations_translations_edges_node_VoucherTranslatableContent_translation | null;
}

export type VoucherTranslations_translations_edges_node = VoucherTranslations_translations_edges_node_ProductTranslatableContent | VoucherTranslations_translations_edges_node_VoucherTranslatableContent;

export interface VoucherTranslations_translations_edges {
  __typename: "TranslatableItemEdge";
  /**
   * The item at the end of the edge.
   */
  node: VoucherTranslations_translations_edges_node;
}

export interface VoucherTranslations_translations_pageInfo {
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

export interface VoucherTranslations_translations {
  __typename: "TranslatableItemConnection";
  edges: VoucherTranslations_translations_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: VoucherTranslations_translations_pageInfo;
}

export interface VoucherTranslations {
  /**
   * Returns a list of all translatable items of a given kind.
   */
  translations: VoucherTranslations_translations | null;
}

export interface VoucherTranslationsVariables {
  language: LanguageCodeEnum;
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
}
