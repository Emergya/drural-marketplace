/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: WishLists
// ====================================================

export interface WishLists_me_wishlists_edges_node {
  __typename: "Wishlist";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  image: string;
  imageUrl: string | null;
}

export interface WishLists_me_wishlists_edges {
  __typename: "WishlistCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: WishLists_me_wishlists_edges_node;
}

export interface WishLists_me_wishlists {
  __typename: "WishlistCountableConnection";
  edges: WishLists_me_wishlists_edges[];
}

export interface WishLists_me {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of user's wishlists.
   */
  wishlists: WishLists_me_wishlists | null;
}

export interface WishLists {
  /**
   * Return the currently authenticated user.
   */
  me: WishLists_me | null;
}

export interface WishListsVariables {
  first: number;
}
