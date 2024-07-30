/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ShopChatwootInput, ShopErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: ShopChatwootUpdate
// ====================================================

export interface ShopChatwootUpdate_shopChatwootUpdate_errors {
  __typename: "ShopError";
  /**
   * The error code.
   */
  code: ShopErrorCode;
  /**
   * The error message.
   */
  message: string | null;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
}

export interface ShopChatwootUpdate_shopChatwootUpdate {
  __typename: "ShopChatwootUpdate";
  errors: ShopChatwootUpdate_shopChatwootUpdate_errors[];
}

export interface ShopChatwootUpdate {
  /**
   * It updates the company Chatwoot settings.
   */
  shopChatwootUpdate: ShopChatwootUpdate_shopChatwootUpdate | null;
}

export interface ShopChatwootUpdateVariables {
  input: ShopChatwootInput;
}
