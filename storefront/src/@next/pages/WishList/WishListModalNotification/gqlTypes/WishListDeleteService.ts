/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: WishListDeleteService
// ====================================================

export interface WishListDeleteService_wishlistRemoveVariant_errors {
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

export interface WishListDeleteService_wishlistRemoveVariant {
  __typename: "WishlistRemoveVariantMutation";
  errors: WishListDeleteService_wishlistRemoveVariant_errors[];
}

export interface WishListDeleteService {
  /**
   * Remove product from the current user's wishlist.
   */
  wishlistRemoveVariant: WishListDeleteService_wishlistRemoveVariant | null;
}

export interface WishListDeleteServiceVariables {
  wishlistId: string;
  variantId: string;
}
