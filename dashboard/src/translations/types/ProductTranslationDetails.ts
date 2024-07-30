/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LanguageCodeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: ProductTranslationDetails
// ====================================================

export interface ProductTranslationDetails_translation_CollectionTranslatableContent {
  __typename: "CollectionTranslatableContent" | "CategoryTranslatableContent" | "AttributeTranslatableContent" | "AttributeValueTranslatableContent" | "ProductVariantTranslatableContent" | "PageTranslatableContent" | "ShippingMethodTranslatableContent" | "SaleTranslatableContent" | "VoucherTranslatableContent" | "MenuItemTranslatableContent";
}

export interface ProductTranslationDetails_translation_ProductTranslatableContent_product {
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

export interface ProductTranslationDetails_translation_ProductTranslatableContent_translation_language {
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

export interface ProductTranslationDetails_translation_ProductTranslatableContent_translation {
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
  language: ProductTranslationDetails_translation_ProductTranslatableContent_translation_language;
}

export interface ProductTranslationDetails_translation_ProductTranslatableContent_attributeValues_attributeValue {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface ProductTranslationDetails_translation_ProductTranslatableContent_attributeValues_translation_language {
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

export interface ProductTranslationDetails_translation_ProductTranslatableContent_attributeValues_translation {
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
  language: ProductTranslationDetails_translation_ProductTranslatableContent_attributeValues_translation_language;
}

export interface ProductTranslationDetails_translation_ProductTranslatableContent_attributeValues {
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
  attributeValue: ProductTranslationDetails_translation_ProductTranslatableContent_attributeValues_attributeValue | null;
  /**
   * Returns translated attribute value fields for the given language code.
   */
  translation: ProductTranslationDetails_translation_ProductTranslatableContent_attributeValues_translation | null;
}

export interface ProductTranslationDetails_translation_ProductTranslatableContent {
  __typename: "ProductTranslatableContent";
  /**
   * Represents an individual item for sale in the storefront.
   */
  product: ProductTranslationDetails_translation_ProductTranslatableContent_product | null;
  /**
   * Returns translated product fields for the given language code.
   */
  translation: ProductTranslationDetails_translation_ProductTranslatableContent_translation | null;
  /**
   * List of product attribute values that can be translated.
   */
  attributeValues: ProductTranslationDetails_translation_ProductTranslatableContent_attributeValues[];
}

export type ProductTranslationDetails_translation = ProductTranslationDetails_translation_CollectionTranslatableContent | ProductTranslationDetails_translation_ProductTranslatableContent;

export interface ProductTranslationDetails {
  translation: ProductTranslationDetails_translation | null;
}

export interface ProductTranslationDetailsVariables {
  id: string;
  language: LanguageCodeEnum;
}
