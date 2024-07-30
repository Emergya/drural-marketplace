/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CollectionSortingInput, CollectionFilterInput } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: FeaturedTotalCount
// ====================================================

export interface FeaturedTotalCount_collections_edges_node_products {
  __typename: "ProductCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
}

export interface FeaturedTotalCount_collections_edges_node {
  __typename: "Collection";
  /**
   * List of products in this collection.
   */
  products: FeaturedTotalCount_collections_edges_node_products | null;
}

export interface FeaturedTotalCount_collections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: FeaturedTotalCount_collections_edges_node;
}

export interface FeaturedTotalCount_collections {
  __typename: "CollectionCountableConnection";
  edges: FeaturedTotalCount_collections_edges[];
}

export interface FeaturedTotalCount {
  /**
   * List of the shop's collections.
   */
  collections: FeaturedTotalCount_collections | null;
}

export interface FeaturedTotalCountVariables {
  first?: number | null;
  sort?: CollectionSortingInput | null;
  filter?: CollectionFilterInput | null;
}
