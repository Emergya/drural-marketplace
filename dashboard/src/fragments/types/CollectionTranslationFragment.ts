/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CollectionTranslationFragment
// ====================================================

export interface CollectionTranslationFragment_collection {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  description: any | null;
  seoDescription: string | null;
  seoTitle: string | null;
}

export interface CollectionTranslationFragment_translation_language {
  __typename: "LanguageDisplay";
  /**
   * Full name of the language.
   */
  language: string;
}

export interface CollectionTranslationFragment_translation {
  __typename: "CollectionTranslation";
  /**
   * The ID of the object.
   */
  id: string;
  description: any | null;
  /**
   * Translation language.
   */
  language: CollectionTranslationFragment_translation_language;
  name: string | null;
  seoDescription: string | null;
  seoTitle: string | null;
}

export interface CollectionTranslationFragment {
  __typename: "CollectionTranslatableContent";
  /**
   * Represents a collection of products.
   */
  collection: CollectionTranslationFragment_collection | null;
  /**
   * Returns translated collection fields for the given language code.
   */
  translation: CollectionTranslationFragment_translation | null;
}
