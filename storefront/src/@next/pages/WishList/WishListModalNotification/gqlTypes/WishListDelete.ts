/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: WishListDelete
// ====================================================

export interface WishListDelete_wishlistDelete_errors {
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

export interface WishListDelete_wishlistDelete {
  __typename: "WishlistDelete";
  errors: WishListDelete_wishlistDelete_errors[];
}

export interface WishListDelete {
  /**
   * Deletes a wishlist.
   */
  wishlistDelete: WishListDelete_wishlistDelete | null;
}

export interface WishListDeleteVariables {
  id: string;
}
