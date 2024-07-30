/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LanguageCodeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL fragment: ShippingMethodTranslationFragment
// ====================================================

export interface ShippingMethodTranslationFragment_shippingMethod {
  __typename: "ShippingMethod";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface ShippingMethodTranslationFragment_translation_language {
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

export interface ShippingMethodTranslationFragment_translation {
  __typename: "ShippingMethodTranslation";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Translation language.
   */
  language: ShippingMethodTranslationFragment_translation_language;
  name: string | null;
  description: any | null;
}

export interface ShippingMethodTranslationFragment {
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
  shippingMethod: ShippingMethodTranslationFragment_shippingMethod | null;
  /**
   * Returns translated shipping method fields for the given language code.
   */
  translation: ShippingMethodTranslationFragment_translation | null;
}
