/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CategoryTranslationFragment
// ====================================================

export interface CategoryTranslationFragment_translation_language {
  __typename: "LanguageDisplay";
  /**
   * Full name of the language.
   */
  language: string;
}

export interface CategoryTranslationFragment_translation {
  __typename: "CategoryTranslation";
  /**
   * The ID of the object.
   */
  id: string;
  description: any | null;
  /**
   * Translation language.
   */
  language: CategoryTranslationFragment_translation_language;
  name: string | null;
  seoDescription: string | null;
  seoTitle: string | null;
}

export interface CategoryTranslationFragment_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  description: any | null;
  seoDescription: string | null;
  seoTitle: string | null;
}

export interface CategoryTranslationFragment {
  __typename: "CategoryTranslatableContent";
  /**
   * Returns translated category fields for the given language code.
   */
  translation: CategoryTranslationFragment_translation | null;
  /**
   * Represents a single category of products.
   */
  category: CategoryTranslationFragment_category | null;
}
