/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderSettingsUpdateInput, OrderSettingsErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: OrderSettingsUpdate
// ====================================================

export interface OrderSettingsUpdate_orderSettingsUpdate_errors {
  __typename: "OrderSettingsError";
  /**
   * The error code.
   */
  code: OrderSettingsErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
}

export interface OrderSettingsUpdate_orderSettingsUpdate_orderSettings {
  __typename: "OrderSettings";
  automaticallyConfirmAllNewOrders: boolean;
}

export interface OrderSettingsUpdate_orderSettingsUpdate {
  __typename: "OrderSettingsUpdate";
  errors: OrderSettingsUpdate_orderSettingsUpdate_errors[];
  /**
   * Order settings.
   */
  orderSettings: OrderSettingsUpdate_orderSettingsUpdate_orderSettings | null;
}

export interface OrderSettingsUpdate {
  /**
   * Update shop order settings.
   */
  orderSettingsUpdate: OrderSettingsUpdate_orderSettingsUpdate | null;
}

export interface OrderSettingsUpdateVariables {
  input: OrderSettingsUpdateInput;
}
