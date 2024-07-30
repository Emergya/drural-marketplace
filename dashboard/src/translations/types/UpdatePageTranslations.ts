/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PageTranslationInput, LanguageCodeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdatePageTranslations
// ====================================================

export interface UpdatePageTranslations_pageTranslate_errors {
  __typename: "TranslationError";
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
}

export interface UpdatePageTranslations_pageTranslate_page_page {
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

export interface UpdatePageTranslations_pageTranslate_page_translation_language {
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

export interface UpdatePageTranslations_pageTranslate_page_translation {
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
  language: UpdatePageTranslations_pageTranslate_page_translation_language;
}

export interface UpdatePageTranslations_pageTranslate_page_attributeValues_attributeValue {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface UpdatePageTranslations_pageTranslate_page_attributeValues_translation_language {
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

export interface UpdatePageTranslations_pageTranslate_page_attributeValues_translation {
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
  language: UpdatePageTranslations_pageTranslate_page_attributeValues_translation_language;
}

export interface UpdatePageTranslations_pageTranslate_page_attributeValues {
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
  attributeValue: UpdatePageTranslations_pageTranslate_page_attributeValues_attributeValue | null;
  /**
   * Returns translated attribute value fields for the given language code.
   */
  translation: UpdatePageTranslations_pageTranslate_page_attributeValues_translation | null;
}

export interface UpdatePageTranslations_pageTranslate_page {
  __typename: "PageTranslatableContent";
  /**
   * ('A static page that can be manually added by a shop operator ', 'through the dashboard.')
   */
  page: UpdatePageTranslations_pageTranslate_page_page | null;
  /**
   * Returns translated page fields for the given language code.
   */
  translation: UpdatePageTranslations_pageTranslate_page_translation | null;
  /**
   * List of page content attribute values that can be translated.
   */
  attributeValues: UpdatePageTranslations_pageTranslate_page_attributeValues[];
}

export interface UpdatePageTranslations_pageTranslate {
  __typename: "PageTranslate";
  errors: UpdatePageTranslations_pageTranslate_errors[];
  page: UpdatePageTranslations_pageTranslate_page | null;
}

export interface UpdatePageTranslations {
  /**
   * Creates/updates translations for a page.
   */
  pageTranslate: UpdatePageTranslations_pageTranslate | null;
}

export interface UpdatePageTranslationsVariables {
  id: string;
  input: PageTranslationInput;
  language: LanguageCodeEnum;
}
