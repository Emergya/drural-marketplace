/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountErrorCode, AddressTypeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: ExternalAuthenticationUrl
// ====================================================

export interface ExternalAuthenticationUrl_externalAuthenticationUrl_errors {
  __typename: "AccountError";
  /**
   * The error code.
   */
  code: AccountErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * A type of address that causes the error.
   */
  addressType: AddressTypeEnum | null;
}

export interface ExternalAuthenticationUrl_externalAuthenticationUrl {
  __typename: "ExternalAuthenticationUrl";
  /**
   * The data returned by authentication plugin.
   */
  authenticationData: any | null;
  errors: ExternalAuthenticationUrl_externalAuthenticationUrl_errors[];
}

export interface ExternalAuthenticationUrl {
  /**
   * Prepare external authentication url for user by custom plugin.
   */
  externalAuthenticationUrl: ExternalAuthenticationUrl_externalAuthenticationUrl | null;
}

export interface ExternalAuthenticationUrlVariables {
  pluginId: string;
  input: any;
}
