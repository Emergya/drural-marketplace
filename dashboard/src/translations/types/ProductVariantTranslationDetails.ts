/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LanguageCodeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: ProductVariantTranslationDetails
// ====================================================

export interface ProductVariantTranslationDetails_translation_ProductTranslatableContent {
  __typename: "ProductTranslatableContent" | "CollectionTranslatableContent" | "CategoryTranslatableContent" | "AttributeTranslatableContent" | "AttributeValueTranslatableContent" | "PageTranslatableContent" | "ShippingMethodTranslatableContent" | "SaleTranslatableContent" | "VoucherTranslatableContent" | "MenuItemTranslatableContent";
}

export interface ProductVariantTranslationDetails_translation_ProductVariantTranslatableContent_productVariant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface ProductVariantTranslationDetails_translation_ProductVariantTranslatableContent_translation_language {
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

export interface ProductVariantTranslationDetails_translation_ProductVariantTranslatableContent_translation {
  __typename: "ProductVariantTranslation";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * Translation language.
   */
  language: ProductVariantTranslationDetails_translation_ProductVariantTranslatableContent_translation_language;
}

export interface ProductVariantTranslationDetails_translation_ProductVariantTranslatableContent_attributeValues_attributeValue {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface ProductVariantTranslationDetails_translation_ProductVariantTranslatableContent_attributeValues_translation_language {
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

export interface ProductVariantTranslationDetails_translation_ProductVariantTranslatableContent_attributeValues_translation {
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
  language: ProductVariantTranslationDetails_translation_ProductVariantTranslatableContent_attributeValues_translation_language;
}

export interface ProductVariantTranslationDetails_translation_ProductVariantTranslatableContent_attributeValues {
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
  attributeValue: ProductVariantTranslationDetails_translation_ProductVariantTranslatableContent_attributeValues_attributeValue | null;
  /**
   * Returns translated attribute value fields for the given language code.
   */
  translation: ProductVariantTranslationDetails_translation_ProductVariantTranslatableContent_attributeValues_translation | null;
}

export interface ProductVariantTranslationDetails_translation_ProductVariantTranslatableContent {
  __typename: "ProductVariantTranslatableContent";
  /**
   * Represents a version of a product such as different size or color.
   */
  productVariant: ProductVariantTranslationDetails_translation_ProductVariantTranslatableContent_productVariant | null;
  name: string;
  /**
   * Returns translated product variant fields for the given language code.
   */
  translation: ProductVariantTranslationDetails_translation_ProductVariantTranslatableContent_translation | null;
  /**
   * List of product variant attribute values that can be translated.
   */
  attributeValues: ProductVariantTranslationDetails_translation_ProductVariantTranslatableContent_attributeValues[];
}

export type ProductVariantTranslationDetails_translation = ProductVariantTranslationDetails_translation_ProductTranslatableContent | ProductVariantTranslationDetails_translation_ProductVariantTranslatableContent;

export interface ProductVariantTranslationDetails {
  translation: ProductVariantTranslationDetails_translation | null;
}

export interface ProductVariantTranslationDetailsVariables {
  id: string;
  language: LanguageCodeEnum;
}
