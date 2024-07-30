/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Wishlist
// ====================================================

export interface Wishlist_wishlist_items_edges_node_variant_media {
  __typename: "ProductMedia";
  /**
   * The URL of the media.
   */
  url: string;
}

export interface Wishlist_wishlist_items_edges_node_variant_product {
  __typename: "Product";
  slug: string;
}

export interface Wishlist_wishlist_items_edges_node_variant {
  __typename: "ProductVariant";
  name: string;
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of media for the product variant.
   */
  media: Wishlist_wishlist_items_edges_node_variant_media[] | null;
  product: Wishlist_wishlist_items_edges_node_variant_product;
}

export interface Wishlist_wishlist_items_edges_node {
  __typename: "WishlistItem";
  /**
   * A purchased product variant. Note: this field may be null if the variant has been removed from stock at all.
   */
  variant: Wishlist_wishlist_items_edges_node_variant | null;
}

export interface Wishlist_wishlist_items_edges {
  __typename: "WishlistItemCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: Wishlist_wishlist_items_edges_node;
}

export interface Wishlist_wishlist_items {
  __typename: "WishlistItemCountableConnection";
  edges: Wishlist_wishlist_items_edges[];
}

export interface Wishlist_wishlist {
  __typename: "Wishlist";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  image: string;
  items: Wishlist_wishlist_items;
}

export interface Wishlist {
  /**
   * Look up a wishlist by ID
   */
  wishlist: Wishlist_wishlist | null;
}

export interface WishlistVariables {
  id: string;
}
