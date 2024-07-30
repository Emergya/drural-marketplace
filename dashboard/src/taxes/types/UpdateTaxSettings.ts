/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ShopSettingsInput } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateTaxSettings
// ====================================================

export interface UpdateTaxSettings_shopSettingsUpdate_errors {
  __typename: "ShopError";
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
}

export interface UpdateTaxSettings_shopSettingsUpdate_shop {
  __typename: "Shop";
  /**
   * Charge taxes on shipping.
   */
  chargeTaxesOnShipping: boolean;
  /**
   * Include taxes in prices.
   */
  includeTaxesInPrices: boolean;
  /**
   * Display prices with tax in store.
   */
  displayGrossPrices: boolean;
}

export interface UpdateTaxSettings_shopSettingsUpdate {
  __typename: "ShopSettingsUpdate";
  errors: UpdateTaxSettings_shopSettingsUpdate_errors[];
  /**
   * Updated shop.
   */
  shop: UpdateTaxSettings_shopSettingsUpdate_shop | null;
}

export interface UpdateTaxSettings {
  /**
   * Updates shop settings.
   */
  shopSettingsUpdate: UpdateTaxSettings_shopSettingsUpdate | null;
}

export interface UpdateTaxSettingsVariables {
  input: ShopSettingsInput;
}
