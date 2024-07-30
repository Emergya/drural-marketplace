/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LanguageCodeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: CategoryTranslationDetails
// ====================================================

export interface CategoryTranslationDetails_translation_ProductTranslatableContent {
  __typename: "ProductTranslatableContent" | "CollectionTranslatableContent" | "AttributeTranslatableContent" | "AttributeValueTranslatableContent" | "ProductVariantTranslatableContent" | "PageTranslatableContent" | "ShippingMethodTranslatableContent" | "SaleTranslatableContent" | "VoucherTranslatableContent" | "MenuItemTranslatableContent";
}

export interface CategoryTranslationDetails_translation_CategoryTranslatableContent_translation_language {
  __typename: "LanguageDisplay";
  /**
   * Full name of the language.
   */
  language: string;
}

export interface CategoryTranslationDetails_translation_CategoryTranslatableContent_translation {
  __typename: "CategoryTranslation";
  /**
   * The ID of the object.
   */
  id: string;
  description: any | null;
  /**
   * Translation language.
   */
  language: CategoryTranslationDetails_translation_CategoryTranslatableContent_translation_language;
  name: string | null;
  seoDescription: string | null;
  seoTitle: string | null;
}

export interface CategoryTranslationDetails_translation_CategoryTranslatableContent_category {
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

export interface CategoryTranslationDetails_translation_CategoryTranslatableContent {
  __typename: "CategoryTranslatableContent";
  /**
   * Returns translated category fields for the given language code.
   */
  translation: CategoryTranslationDetails_translation_CategoryTranslatableContent_translation | null;
  /**
   * Represents a single category of products.
   */
  category: CategoryTranslationDetails_translation_CategoryTranslatableContent_category | null;
}

export type CategoryTranslationDetails_translation = CategoryTranslationDetails_translation_ProductTranslatableContent | CategoryTranslationDetails_translation_CategoryTranslatableContent;

export interface CategoryTranslationDetails {
  translation: CategoryTranslationDetails_translation | null;
}

export interface CategoryTranslationDetailsVariables {
  id: string;
  language: LanguageCodeEnum;
}
