/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LanguageCodeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL fragment: SaleTranslationFragment
// ====================================================

export interface SaleTranslationFragment_sale {
  __typename: "Sale";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface SaleTranslationFragment_translation_language {
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

export interface SaleTranslationFragment_translation {
  __typename: "SaleTranslation";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Translation language.
   */
  language: SaleTranslationFragment_translation_language;
  name: string | null;
}

export interface SaleTranslationFragment {
  __typename: "SaleTranslatableContent";
  /**
   * Sales allow creating discounts for categories, collections or products and are visible to all the customers.
   */
  sale: SaleTranslationFragment_sale | null;
  /**
   * Returns translated sale fields for the given language code.
   */
  translation: SaleTranslationFragment_translation | null;
}
