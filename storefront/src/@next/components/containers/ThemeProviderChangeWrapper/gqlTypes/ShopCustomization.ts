/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ShopCustomization
// ====================================================

export interface ShopCustomization_shop_logo {
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

export interface ShopCustomization_shop_storefrontBanner {
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

export interface ShopCustomization_shop {
  __typename: "Shop";
  /**
   * Primary color of the marketplace.
   */
  primaryColor: string | null;
  /**
   * Secondary color of the marketplace.
   */
  secondaryColor: string | null;
  logo: ShopCustomization_shop_logo | null;
  storefrontBanner: ShopCustomization_shop_storefrontBanner | null;
}

export interface ShopCustomization {
  /**
   * Return information about the shop.
   */
  shop: ShopCustomization_shop;
}
