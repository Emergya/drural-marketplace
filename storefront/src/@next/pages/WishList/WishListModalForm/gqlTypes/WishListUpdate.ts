/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: WishListUpdate
// ====================================================

export interface WishListUpdate_wishlistUpdate_errors {
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

export interface WishListUpdate_wishlistUpdate_wishlist {
  __typename: "Wishlist";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface WishListUpdate_wishlistUpdate {
  __typename: "WishlistUpdate";
  errors: WishListUpdate_wishlistUpdate_errors[];
  wishlist: WishListUpdate_wishlistUpdate_wishlist | null;
}

export interface WishListUpdate {
  /**
   * Updates an existing wishlist.
   */
  wishlistUpdate: WishListUpdate_wishlistUpdate | null;
}

export interface WishListUpdateVariables {
  id: string;
  name: string;
}
