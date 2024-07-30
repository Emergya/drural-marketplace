/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ShopSettingsInput, ShopErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: CustomizationUpdate
// ====================================================

export interface CustomizationUpdate_shopSettingsUpdate_shop_logo {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
  /**
   * Alt text for an image.
   */
  alt: string | null;
}

export interface CustomizationUpdate_shopSettingsUpdate_shop_dashboardBanner {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
  /**
   * Alt text for an image.
   */
  alt: string | null;
}

export interface CustomizationUpdate_shopSettingsUpdate_shop_storefrontBanner {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
  /**
   * Alt text for an image.
   */
  alt: string | null;
}

export interface CustomizationUpdate_shopSettingsUpdate_shop {
  __typename: "Shop";
  /**
   * Primary color of the marketplace.
   */
  primaryColor: string | null;
  /**
   * Secondary color of the marketplace.
   */
  secondaryColor: string | null;
  logo: CustomizationUpdate_shopSettingsUpdate_shop_logo | null;
  dashboardBanner: CustomizationUpdate_shopSettingsUpdate_shop_dashboardBanner | null;
  storefrontBanner: CustomizationUpdate_shopSettingsUpdate_shop_storefrontBanner | null;
}

export interface CustomizationUpdate_shopSettingsUpdate_errors {
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

export interface CustomizationUpdate_shopSettingsUpdate {
  __typename: "ShopSettingsUpdate";
  /**
   * Updated shop.
   */
  shop: CustomizationUpdate_shopSettingsUpdate_shop | null;
  errors: CustomizationUpdate_shopSettingsUpdate_errors[];
}

export interface CustomizationUpdate {
  /**
   * Updates shop settings.
   */
  shopSettingsUpdate: CustomizationUpdate_shopSettingsUpdate | null;
}

export interface CustomizationUpdateVariables {
  input: ShopSettingsInput;
}
