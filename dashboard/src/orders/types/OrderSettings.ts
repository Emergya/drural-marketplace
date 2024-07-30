/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: OrderSettings
// ====================================================

export interface OrderSettings_orderSettings {
  __typename: "OrderSettings";
  automaticallyConfirmAllNewOrders: boolean;
}

export interface OrderSettings {
  /**
   * Order related settings from site settings.
   */
  orderSettings: OrderSettings_orderSettings | null;
}
