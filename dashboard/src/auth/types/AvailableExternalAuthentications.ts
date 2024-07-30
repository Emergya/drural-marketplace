/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AvailableExternalAuthentications
// ====================================================

export interface AvailableExternalAuthentications_shop_availableExternalAuthentications {
  __typename: "ExternalAuthentication";
  /**
   * ID of external authentication plugin.
   */
  id: string;
  /**
   * Name of external authentication plugin.
   */
  name: string | null;
}

export interface AvailableExternalAuthentications_shop {
  __typename: "Shop";
  /**
   * List of available external authentications.
   */
  availableExternalAuthentications: AvailableExternalAuthentications_shop_availableExternalAuthentications[];
}

export interface AvailableExternalAuthentications {
  /**
   * Return information about the shop.
   */
  shop: AvailableExternalAuthentications_shop;
}
