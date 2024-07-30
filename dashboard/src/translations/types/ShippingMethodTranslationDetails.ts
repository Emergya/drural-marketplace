/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LanguageCodeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: ShippingMethodTranslationDetails
// ====================================================

export interface ShippingMethodTranslationDetails_translation_ProductTranslatableContent {
  __typename: "ProductTranslatableContent" | "CollectionTranslatableContent" | "CategoryTranslatableContent" | "AttributeTranslatableContent" | "AttributeValueTranslatableContent" | "ProductVariantTranslatableContent" | "PageTranslatableContent" | "SaleTranslatableContent" | "VoucherTranslatableContent" | "MenuItemTranslatableContent";
}

export interface ShippingMethodTranslationDetails_translation_ShippingMethodTranslatableContent_shippingMethod {
  __typename: "ShippingMethod";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface ShippingMethodTranslationDetails_translation_ShippingMethodTranslatableContent_translation_language {
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

export interface ShippingMethodTranslationDetails_translation_ShippingMethodTranslatableContent_translation {
  __typename: "ShippingMethodTranslation";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Translation language.
   */
  language: ShippingMethodTranslationDetails_translation_ShippingMethodTranslatableContent_translation_language;
  name: string | null;
  description: any | null;
}

export interface ShippingMethodTranslationDetails_translation_ShippingMethodTranslatableContent {
  __typename: "ShippingMethodTranslatableContent";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  description: any | null;
  /**
   * Shipping method are the methods you'll use to get customer's orders  to them. They are directly exposed to the customers.
   */
  shippingMethod: ShippingMethodTranslationDetails_translation_ShippingMethodTranslatableContent_shippingMethod | null;
  /**
   * Returns translated shipping method fields for the given language code.
   */
  translation: ShippingMethodTranslationDetails_translation_ShippingMethodTranslatableContent_translation | null;
}

export type ShippingMethodTranslationDetails_translation = ShippingMethodTranslationDetails_translation_ProductTranslatableContent | ShippingMethodTranslationDetails_translation_ShippingMethodTranslatableContent;

export interface ShippingMethodTranslationDetails {
  translation: ShippingMethodTranslationDetails_translation | null;
}

export interface ShippingMethodTranslationDetailsVariables {
  id: string;
  language: LanguageCodeEnum;
}
