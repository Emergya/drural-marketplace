/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Page
// ====================================================

export interface Page_page {
  __typename: "Page";
  content: any | null;
  /**
   * The ID of the object.
   */
  id: string;
  seoDescription: string | null;
  seoTitle: string | null;
  slug: string;
  title: string;
}

export interface Page {
  /**
   * Look up a page by ID or slug.
   */
  page: Page_page | null;
}

export interface PageVariables {
  slug: string;
}
