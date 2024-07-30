/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: InitialProductFilterCollections
// ====================================================

export interface InitialProductFilterCollections_collections_edges_node {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface InitialProductFilterCollections_collections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: InitialProductFilterCollections_collections_edges_node;
}

export interface InitialProductFilterCollections_collections {
  __typename: "CollectionCountableConnection";
  edges: InitialProductFilterCollections_collections_edges[];
}

export interface InitialProductFilterCollections {
  /**
   * List of the shop's collections.
   */
  collections: InitialProductFilterCollections_collections | null;
}

export interface InitialProductFilterCollectionsVariables {
  collections?: string[] | null;
}
