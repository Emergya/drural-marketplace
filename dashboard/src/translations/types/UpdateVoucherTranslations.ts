/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { NameTranslationInput, LanguageCodeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateVoucherTranslations
// ====================================================

export interface UpdateVoucherTranslations_voucherTranslate_errors {
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

export interface UpdateVoucherTranslations_voucherTranslate_voucher_translation_language {
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

export interface UpdateVoucherTranslations_voucherTranslate_voucher_translation {
  __typename: "VoucherTranslation";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Translation language.
   */
  language: UpdateVoucherTranslations_voucherTranslate_voucher_translation_language;
  name: string | null;
}

export interface UpdateVoucherTranslations_voucherTranslate_voucher {
  __typename: "Voucher";
  /**
   * The ID of the object.
   */
  id: string;
  name: string | null;
  /**
   * Returns translated voucher fields for the given language code.
   */
  translation: UpdateVoucherTranslations_voucherTranslate_voucher_translation | null;
}

export interface UpdateVoucherTranslations_voucherTranslate {
  __typename: "VoucherTranslate";
  errors: UpdateVoucherTranslations_voucherTranslate_errors[];
  voucher: UpdateVoucherTranslations_voucherTranslate_voucher | null;
}

export interface UpdateVoucherTranslations {
  /**
   * Creates/updates translations for a voucher.
   */
  voucherTranslate: UpdateVoucherTranslations_voucherTranslate | null;
}

export interface UpdateVoucherTranslationsVariables {
  id: string;
  input: NameTranslationInput;
  language: LanguageCodeEnum;
}
