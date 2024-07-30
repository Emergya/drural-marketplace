/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LanguageCodeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL fragment: VoucherTranslationFragment
// ====================================================

export interface VoucherTranslationFragment_voucher {
  __typename: "Voucher";
  /**
   * The ID of the object.
   */
  id: string;
  name: string | null;
}

export interface VoucherTranslationFragment_translation_language {
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

export interface VoucherTranslationFragment_translation {
  __typename: "VoucherTranslation";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Translation language.
   */
  language: VoucherTranslationFragment_translation_language;
  name: string | null;
}

export interface VoucherTranslationFragment {
  __typename: "VoucherTranslatableContent";
  name: string | null;
  /**
   * Vouchers allow giving discounts to particular customers on categories,
   * collections or specific products. They can be used during checkout by
   * providing valid voucher codes.
   */
  voucher: VoucherTranslationFragment_voucher | null;
  /**
   * Returns translated voucher fields for the given language code.
   */
  translation: VoucherTranslationFragment_translation | null;
}
