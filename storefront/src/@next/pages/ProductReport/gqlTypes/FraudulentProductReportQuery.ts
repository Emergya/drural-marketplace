/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FraudulentProductReportQuery
// ====================================================

export interface FraudulentProductReportQuery_product_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
  /**
   * Alt text for an image.
   */
  alt: string | null;
}

export interface FraudulentProductReportQuery_product_thumbnail2x {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface FraudulentProductReportQuery_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  slug: string;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: FraudulentProductReportQuery_product_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: FraudulentProductReportQuery_product_thumbnail2x | null;
}

export interface FraudulentProductReportQuery {
  /**
   * Look up a product by ID.
   */
  product: FraudulentProductReportQuery_product | null;
}

export interface FraudulentProductReportQueryVariables {
  slug?: string | null;
}
