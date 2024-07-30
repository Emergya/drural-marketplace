/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { NameTranslationInput, LanguageCodeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateProductVariantTranslations
// ====================================================

export interface UpdateProductVariantTranslations_productVariantTranslate_errors {
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

export interface UpdateProductVariantTranslations_productVariantTranslate_productVariant_translation_language {
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

export interface UpdateProductVariantTranslations_productVariantTranslate_productVariant_translation {
  __typename: "ProductVariantTranslation";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * Translation language.
   */
  language: UpdateProductVariantTranslations_productVariantTranslate_productVariant_translation_language;
}

export interface UpdateProductVariantTranslations_productVariantTranslate_productVariant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * Returns translated product variant fields for the given language code.
   */
  translation: UpdateProductVariantTranslations_productVariantTranslate_productVariant_translation | null;
}

export interface UpdateProductVariantTranslations_productVariantTranslate {
  __typename: "ProductVariantTranslate";
  errors: UpdateProductVariantTranslations_productVariantTranslate_errors[];
  productVariant: UpdateProductVariantTranslations_productVariantTranslate_productVariant | null;
}

export interface UpdateProductVariantTranslations {
  /**
   * Creates/updates translations for a product variant.
   */
  productVariantTranslate: UpdateProductVariantTranslations_productVariantTranslate | null;
}

export interface UpdateProductVariantTranslationsVariables {
  id: string;
  input: NameTranslationInput;
  language: LanguageCodeEnum;
}
