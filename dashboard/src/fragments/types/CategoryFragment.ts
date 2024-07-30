/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CategoryFragment
// ====================================================

export interface CategoryFragment_children {
  __typename: "CategoryCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
}

export interface CategoryFragment_products {
  __typename: "ProductCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
}

export interface CategoryFragment {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * List of children of the category.
   */
  children: CategoryFragment_children | null;
  /**
   * List of products in the category.
   */
  products: CategoryFragment_products | null;
}
