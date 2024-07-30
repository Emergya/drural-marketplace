/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LanguageCodeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: SaleTranslationDetails
// ====================================================

export interface SaleTranslationDetails_translation_ProductTranslatableContent {
  __typename: "ProductTranslatableContent" | "CollectionTranslatableContent" | "CategoryTranslatableContent" | "AttributeTranslatableContent" | "AttributeValueTranslatableContent" | "ProductVariantTranslatableContent" | "PageTranslatableContent" | "ShippingMethodTranslatableContent" | "VoucherTranslatableContent" | "MenuItemTranslatableContent";
}

export interface SaleTranslationDetails_translation_SaleTranslatableContent_sale {
  __typename: "Sale";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface SaleTranslationDetails_translation_SaleTranslatableContent_translation_language {
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

export interface SaleTranslationDetails_translation_SaleTranslatableContent_translation {
  __typename: "SaleTranslation";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Translation language.
   */
  language: SaleTranslationDetails_translation_SaleTranslatableContent_translation_language;
  name: string | null;
}

export interface SaleTranslationDetails_translation_SaleTranslatableContent {
  __typename: "SaleTranslatableContent";
  /**
   * Sales allow creating discounts for categories, collections or products and are visible to all the customers.
   */
  sale: SaleTranslationDetails_translation_SaleTranslatableContent_sale | null;
  /**
   * Returns translated sale fields for the given language code.
   */
  translation: SaleTranslationDetails_translation_SaleTranslatableContent_translation | null;
}

export type SaleTranslationDetails_translation = SaleTranslationDetails_translation_ProductTranslatableContent | SaleTranslationDetails_translation_SaleTranslatableContent;

export interface SaleTranslationDetails {
  translation: SaleTranslationDetails_translation | null;
}

export interface SaleTranslationDetailsVariables {
  id: string;
  language: LanguageCodeEnum;
}
