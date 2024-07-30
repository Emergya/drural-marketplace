/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CategoryDetailsFragment
// ====================================================

export interface CategoryDetailsFragment_metadata {
  __typename: "MetadataItem";
  /**
   * Key of a metadata item.
   */
  key: string;
  /**
   * Value of a metadata item.
   */
  value: string;
}

export interface CategoryDetailsFragment_privateMetadata {
  __typename: "MetadataItem";
  /**
   * Key of a metadata item.
   */
  key: string;
  /**
   * Value of a metadata item.
   */
  value: string;
}

export interface CategoryDetailsFragment_parent {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface CategoryDetailsFragment {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (CategoryDetailsFragment_metadata | null)[];
  /**
   * List of private metadata items.Requires proper staff permissions to access.
   */
  privateMetadata: (CategoryDetailsFragment_privateMetadata | null)[];
  name: string;
  slug: string;
  description: any | null;
  seoDescription: string | null;
  seoTitle: string | null;
  iconId: string | null;
  parent: CategoryDetailsFragment_parent | null;
}
