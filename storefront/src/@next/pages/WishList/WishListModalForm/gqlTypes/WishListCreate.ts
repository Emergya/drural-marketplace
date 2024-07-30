/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: WishListCreate
// ====================================================

export interface WishListCreate_wishlistCreate_errors {
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

export interface WishListCreate_wishlistCreate_wishlist {
  __typename: "Wishlist";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface WishListCreate_wishlistCreate {
  __typename: "WishlistCreate";
  errors: WishListCreate_wishlistCreate_errors[];
  wishlist: WishListCreate_wishlistCreate_wishlist | null;
}

export interface WishListCreate {
  /**
   * Creates a new wishlist
   */
  wishlistCreate: WishListCreate_wishlistCreate | null;
}

export interface WishListCreateVariables {
  name: string;
}
