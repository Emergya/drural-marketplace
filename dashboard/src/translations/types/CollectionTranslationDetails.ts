/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LanguageCodeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: CollectionTranslationDetails
// ====================================================

export interface CollectionTranslationDetails_translation_ProductTranslatableContent {
  __typename: "ProductTranslatableContent" | "CategoryTranslatableContent" | "AttributeTranslatableContent" | "AttributeValueTranslatableContent" | "ProductVariantTranslatableContent" | "PageTranslatableContent" | "ShippingMethodTranslatableContent" | "SaleTranslatableContent" | "VoucherTranslatableContent" | "MenuItemTranslatableContent";
}

export interface CollectionTranslationDetails_translation_CollectionTranslatableContent_collection {
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

export interface CollectionTranslationDetails_translation_CollectionTranslatableContent_translation_language {
  __typename: "LanguageDisplay";
  /**
   * Full name of the language.
   */
  language: string;
}

export interface CollectionTranslationDetails_translation_CollectionTranslatableContent_translation {
  __typename: "CollectionTranslation";
  /**
   * The ID of the object.
   */
  id: string;
  description: any | null;
  /**
   * Translation language.
   */
  language: CollectionTranslationDetails_translation_CollectionTranslatableContent_translation_language;
  name: string | null;
  seoDescription: string | null;
  seoTitle: string | null;
}

export interface CollectionTranslationDetails_translation_CollectionTranslatableContent {
  __typename: "CollectionTranslatableContent";
  /**
   * Represents a collection of products.
   */
  collection: CollectionTranslationDetails_translation_CollectionTranslatableContent_collection | null;
  /**
   * Returns translated collection fields for the given language code.
   */
  translation: CollectionTranslationDetails_translation_CollectionTranslatableContent_translation | null;
}

export type CollectionTranslationDetails_translation = CollectionTranslationDetails_translation_ProductTranslatableContent | CollectionTranslationDetails_translation_CollectionTranslatableContent;

export interface CollectionTranslationDetails {
  translation: CollectionTranslationDetails_translation | null;
}

export interface CollectionTranslationDetailsVariables {
  id: string;
  language: LanguageCodeEnum;
}
