/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ExternalRefreshToken
// ====================================================

export interface ExternalRefreshToken_externalRefresh {
  __typename: "ExternalRefresh";
  /**
   * The token, required to authenticate.
   */
  token: string | null;
}

export interface ExternalRefreshToken {
  /**
   * Refresh user's access by custom plugin.
   */
  externalRefresh: ExternalRefreshToken_externalRefresh | null;
}

export interface ExternalRefreshTokenVariables {
  pluginId: string;
  input: any;
}
