/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CategoryDetails
// ====================================================

export interface CategoryDetails_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
  seoDescription: string | null;
  seoTitle: string | null;
  description: any | null;
}

export interface CategoryDetails {
  /**
   * Look up a category by ID or slug.
   */
  category: CategoryDetails_category | null;
}

export interface CategoryDetailsVariables {
  id?: string | null;
  slug?: string | null;
}
