/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LanguageCodeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL fragment: ProductTranslationFragment
// ====================================================

export interface ProductTranslationFragment_product {
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

export interface ProductTranslationFragment_translation_language {
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

export interface ProductTranslationFragment_translation {
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
  language: ProductTranslationFragment_translation_language;
}

export interface ProductTranslationFragment_attributeValues_attributeValue {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface ProductTranslationFragment_attributeValues_translation_language {
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

export interface ProductTranslationFragment_attributeValues_translation {
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
  language: ProductTranslationFragment_attributeValues_translation_language;
}

export interface ProductTranslationFragment_attributeValues {
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
  attributeValue: ProductTranslationFragment_attributeValues_attributeValue | null;
  /**
   * Returns translated attribute value fields for the given language code.
   */
  translation: ProductTranslationFragment_attributeValues_translation | null;
}

export interface ProductTranslationFragment {
  __typename: "ProductTranslatableContent";
  /**
   * Represents an individual item for sale in the storefront.
   */
  product: ProductTranslationFragment_product | null;
  /**
   * Returns translated product fields for the given language code.
   */
  translation: ProductTranslationFragment_translation | null;
  /**
   * List of product attribute values that can be translated.
   */
  attributeValues: ProductTranslationFragment_attributeValues[];
}
