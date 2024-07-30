/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ShopChatwoot
// ====================================================

export interface ShopChatwoot_shop_chatwootCredentials {
  __typename: "ShopChatwootCredentialsType";
  isActive: boolean;
  /**
   * Website token of inbox.
   */
  websiteToken: string | null;
  /**
   * HMAC of inbox.
   */
  hmac: string | null;
}

export interface ShopChatwoot_shop {
  __typename: "Shop";
  /**
   * chatwoot_credentials.
   */
  chatwootCredentials: ShopChatwoot_shop_chatwootCredentials | null;
}

export interface ShopChatwoot {
  /**
   * Return information about the shop.
   */
  shop: ShopChatwoot_shop;
}
