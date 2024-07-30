/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TranslationInput, LanguageCodeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateCategoryTranslations
// ====================================================

export interface UpdateCategoryTranslations_categoryTranslate_errors {
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

export interface UpdateCategoryTranslations_categoryTranslate_category_translation_language {
  __typename: "LanguageDisplay";
  /**
   * Full name of the language.
   */
  language: string;
}

export interface UpdateCategoryTranslations_categoryTranslate_category_translation {
  __typename: "CategoryTranslation";
  /**
   * The ID of the object.
   */
  id: string;
  description: any | null;
  /**
   * Translation language.
   */
  language: UpdateCategoryTranslations_categoryTranslate_category_translation_language;
  name: string | null;
  seoDescription: string | null;
  seoTitle: string | null;
}

export interface UpdateCategoryTranslations_categoryTranslate_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  description: any | null;
  seoDescription: string | null;
  seoTitle: string | null;
  /**
   * Returns translated category fields for the given language code.
   */
  translation: UpdateCategoryTranslations_categoryTranslate_category_translation | null;
}

export interface UpdateCategoryTranslations_categoryTranslate {
  __typename: "CategoryTranslate";
  errors: UpdateCategoryTranslations_categoryTranslate_errors[];
  category: UpdateCategoryTranslations_categoryTranslate_category | null;
}

export interface UpdateCategoryTranslations {
  /**
   * Creates/updates translations for a category.
   */
  categoryTranslate: UpdateCategoryTranslations_categoryTranslate | null;
}

export interface UpdateCategoryTranslationsVariables {
  id: string;
  input: TranslationInput;
  language: LanguageCodeEnum;
}
