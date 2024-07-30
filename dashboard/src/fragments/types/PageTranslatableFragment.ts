/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LanguageCodeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL fragment: PageTranslatableFragment
// ====================================================

export interface PageTranslatableFragment_translation_language {
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

export interface PageTranslatableFragment_translation {
  __typename: "PageTranslation";
  /**
   * The ID of the object.
   */
  id: string;
  content: any | null;
  seoDescription: string | null;
  seoTitle: string | null;
  title: string | null;
  /**
   * Translation language.
   */
  language: PageTranslatableFragment_translation_language;
}

export interface PageTranslatableFragment {
  __typename: "PageTranslatableContent";
  /**
   * The ID of the object.
   */
  id: string;
  content: any | null;
  seoDescription: string | null;
  seoTitle: string | null;
  title: string;
  /**
   * Returns translated page fields for the given language code.
   */
  translation: PageTranslatableFragment_translation | null;
}
