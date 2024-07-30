/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ShopChatwootCreateInput, ShopErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: ShopChatwootCreate
// ====================================================

export interface ShopChatwootCreate_shopChatwootCreate_errors {
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

export interface ShopChatwootCreate_shopChatwootCreate {
  __typename: "ShopChatwootCreate";
  errors: ShopChatwootCreate_shopChatwootCreate_errors[];
}

export interface ShopChatwootCreate {
  /**
   * It enables the chat between sellers and administrators.
   */
  shopChatwootCreate: ShopChatwootCreate_shopChatwootCreate | null;
}

export interface ShopChatwootCreateVariables {
  input: ShopChatwootCreateInput;
}
