/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LanguageCodeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: PageTranslationDetails
// ====================================================

export interface PageTranslationDetails_translation_ProductTranslatableContent {
  __typename: "ProductTranslatableContent" | "CollectionTranslatableContent" | "CategoryTranslatableContent" | "AttributeTranslatableContent" | "AttributeValueTranslatableContent" | "ProductVariantTranslatableContent" | "ShippingMethodTranslatableContent" | "SaleTranslatableContent" | "VoucherTranslatableContent" | "MenuItemTranslatableContent";
}

export interface PageTranslationDetails_translation_PageTranslatableContent_page {
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

export interface PageTranslationDetails_translation_PageTranslatableContent_translation_language {
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

export interface PageTranslationDetails_translation_PageTranslatableContent_translation {
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
  language: PageTranslationDetails_translation_PageTranslatableContent_translation_language;
}

export interface PageTranslationDetails_translation_PageTranslatableContent_attributeValues_attributeValue {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface PageTranslationDetails_translation_PageTranslatableContent_attributeValues_translation_language {
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

export interface PageTranslationDetails_translation_PageTranslatableContent_attributeValues_translation {
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
  language: PageTranslationDetails_translation_PageTranslatableContent_attributeValues_translation_language;
}

export interface PageTranslationDetails_translation_PageTranslatableContent_attributeValues {
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
  attributeValue: PageTranslationDetails_translation_PageTranslatableContent_attributeValues_attributeValue | null;
  /**
   * Returns translated attribute value fields for the given language code.
   */
  translation: PageTranslationDetails_translation_PageTranslatableContent_attributeValues_translation | null;
}

export interface PageTranslationDetails_translation_PageTranslatableContent {
  __typename: "PageTranslatableContent";
  /**
   * ('A static page that can be manually added by a shop operator ', 'through the dashboard.')
   */
  page: PageTranslationDetails_translation_PageTranslatableContent_page | null;
  /**
   * Returns translated page fields for the given language code.
   */
  translation: PageTranslationDetails_translation_PageTranslatableContent_translation | null;
  /**
   * List of page content attribute values that can be translated.
   */
  attributeValues: PageTranslationDetails_translation_PageTranslatableContent_attributeValues[];
}

export type PageTranslationDetails_translation = PageTranslationDetails_translation_ProductTranslatableContent | PageTranslationDetails_translation_PageTranslatableContent;

export interface PageTranslationDetails {
  translation: PageTranslationDetails_translation | null;
}

export interface PageTranslationDetailsVariables {
  id: string;
  language: LanguageCodeEnum;
}
