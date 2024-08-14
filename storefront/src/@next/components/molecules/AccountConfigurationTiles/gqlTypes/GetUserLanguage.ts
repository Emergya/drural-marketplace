/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LanguageCodeEnum } from "./../../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: GetUserLanguage
// ====================================================

export interface GetUserLanguage_me {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * User language code.
   */
  languageCode: LanguageCodeEnum;
}

export interface GetUserLanguage {
  /**
   * Return the currently authenticated user.
   */
  me: GetUserLanguage_me | null;
}
