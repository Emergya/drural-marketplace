/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LanguageCodeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL fragment: PageTranslationFragment
// ====================================================

export interface PageTranslationFragment_page {
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

export interface PageTranslationFragment_translation_language {
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

export interface PageTranslationFragment_translation {
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
  language: PageTranslationFragment_translation_language;
}

export interface PageTranslationFragment_attributeValues_attributeValue {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface PageTranslationFragment_attributeValues_translation_language {
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

export interface PageTranslationFragment_attributeValues_translation {
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
  language: PageTranslationFragment_attributeValues_translation_language;
}

export interface PageTranslationFragment_attributeValues {
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
  attributeValue: PageTranslationFragment_attributeValues_attributeValue | null;
  /**
   * Returns translated attribute value fields for the given language code.
   */
  translation: PageTranslationFragment_attributeValues_translation | null;
}

export interface PageTranslationFragment {
  __typename: "PageTranslatableContent";
  /**
   * ('A static page that can be manually added by a shop operator ', 'through the dashboard.')
   */
  page: PageTranslationFragment_page | null;
  /**
   * Returns translated page fields for the given language code.
   */
  translation: PageTranslationFragment_translation | null;
  /**
   * List of page content attribute values that can be translated.
   */
  attributeValues: PageTranslationFragment_attributeValues[];
}
