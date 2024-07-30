/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LanguageCodeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL fragment: ProductVariantTranslationFragment
// ====================================================

export interface ProductVariantTranslationFragment_productVariant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface ProductVariantTranslationFragment_translation_language {
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

export interface ProductVariantTranslationFragment_translation {
  __typename: "ProductVariantTranslation";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * Translation language.
   */
  language: ProductVariantTranslationFragment_translation_language;
}

export interface ProductVariantTranslationFragment_attributeValues_attributeValue {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface ProductVariantTranslationFragment_attributeValues_translation_language {
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

export interface ProductVariantTranslationFragment_attributeValues_translation {
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
  language: ProductVariantTranslationFragment_attributeValues_translation_language;
}

export interface ProductVariantTranslationFragment_attributeValues {
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
  attributeValue: ProductVariantTranslationFragment_attributeValues_attributeValue | null;
  /**
   * Returns translated attribute value fields for the given language code.
   */
  translation: ProductVariantTranslationFragment_attributeValues_translation | null;
}

export interface ProductVariantTranslationFragment {
  __typename: "ProductVariantTranslatableContent";
  /**
   * Represents a version of a product such as different size or color.
   */
  productVariant: ProductVariantTranslationFragment_productVariant | null;
  name: string;
  /**
   * Returns translated product variant fields for the given language code.
   */
  translation: ProductVariantTranslationFragment_translation | null;
  /**
   * List of product variant attribute values that can be translated.
   */
  attributeValues: ProductVariantTranslationFragment_attributeValues[];
}
