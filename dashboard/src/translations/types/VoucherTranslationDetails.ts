/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LanguageCodeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: VoucherTranslationDetails
// ====================================================

export interface VoucherTranslationDetails_translation_ProductTranslatableContent {
  __typename: "ProductTranslatableContent" | "CollectionTranslatableContent" | "CategoryTranslatableContent" | "AttributeTranslatableContent" | "AttributeValueTranslatableContent" | "ProductVariantTranslatableContent" | "PageTranslatableContent" | "ShippingMethodTranslatableContent" | "SaleTranslatableContent" | "MenuItemTranslatableContent";
}

export interface VoucherTranslationDetails_translation_VoucherTranslatableContent_voucher {
  __typename: "Voucher";
  /**
   * The ID of the object.
   */
  id: string;
  name: string | null;
}

export interface VoucherTranslationDetails_translation_VoucherTranslatableContent_translation_language {
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

export interface VoucherTranslationDetails_translation_VoucherTranslatableContent_translation {
  __typename: "VoucherTranslation";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Translation language.
   */
  language: VoucherTranslationDetails_translation_VoucherTranslatableContent_translation_language;
  name: string | null;
}

export interface VoucherTranslationDetails_translation_VoucherTranslatableContent {
  __typename: "VoucherTranslatableContent";
  name: string | null;
  /**
   * Vouchers allow giving discounts to particular customers on categories,
   * collections or specific products. They can be used during checkout by
   * providing valid voucher codes.
   */
  voucher: VoucherTranslationDetails_translation_VoucherTranslatableContent_voucher | null;
  /**
   * Returns translated voucher fields for the given language code.
   */
  translation: VoucherTranslationDetails_translation_VoucherTranslatableContent_translation | null;
}

export type VoucherTranslationDetails_translation = VoucherTranslationDetails_translation_ProductTranslatableContent | VoucherTranslationDetails_translation_VoucherTranslatableContent;

export interface VoucherTranslationDetails {
  translation: VoucherTranslationDetails_translation | null;
}

export interface VoucherTranslationDetailsVariables {
  id: string;
  language: LanguageCodeEnum;
}
