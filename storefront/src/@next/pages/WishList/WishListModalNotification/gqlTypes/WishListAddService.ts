/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: WishListAddService
// ====================================================

export interface WishListAddService_wishlistAddVariant_errors {
  __typename: "WishlistError";
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

export interface WishListAddService_wishlistAddVariant {
  __typename: "WishlistAddVariantMutation";
  errors: WishListAddService_wishlistAddVariant_errors[];
}

export interface WishListAddService {
  /**
   * Add variant to the current user's wishlist.
   */
  wishlistAddVariant: WishListAddService_wishlistAddVariant | null;
}

export interface WishListAddServiceVariables {
  wishlistId: string;
  variantId: string;
}
