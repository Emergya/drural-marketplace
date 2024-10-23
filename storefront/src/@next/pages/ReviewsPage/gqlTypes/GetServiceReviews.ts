/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductRatingFilterInput, ProductRatingSortingInput } from "./../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: GetServiceReviews
// ====================================================

export interface GetServiceReviews_product_thumbnail {
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

export interface GetServiceReviews_product_company {
  __typename: "CompanyType";
  name: string;
}

export interface GetServiceReviews_product_reviewPercentages {
  __typename: "ReviewPercentages";
  /**
   * Rating
   */
  stars: number | null;
  /**
   * Percentage of reviews with that number of stars
   */
  total: number | null;
}

export interface GetServiceReviews_product_myReview {
  __typename: "ProductRating";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Chek if this is my review.
   */
  createdByUser: boolean;
  comment: string;
  rating: number;
  createdAt: any;
  /**
   * Reason of the report.
   */
  user: string;
}

export interface GetServiceReviews_product_reviews_edges_node {
  __typename: "ProductRating";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Chek if this is my review.
   */
  createdByUser: boolean;
  comment: string;
  rating: number;
  createdAt: any;
  /**
   * Reason of the report.
   */
  user: string;
}

export interface GetServiceReviews_product_reviews_edges {
  __typename: "ProductRatingCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetServiceReviews_product_reviews_edges_node;
}

export interface GetServiceReviews_product_reviews_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
}

export interface GetServiceReviews_product_reviews {
  __typename: "ProductRatingCountableConnection";
  edges: GetServiceReviews_product_reviews_edges[];
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  /**
   * Pagination data for this connection.
   */
  pageInfo: GetServiceReviews_product_reviews_pageInfo;
}

export interface GetServiceReviews_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  description: any | null;
  rating: number;
  /**
   * True if the product has been consumed by user
   */
  consumedByUser: boolean | null;
  slug: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: GetServiceReviews_product_thumbnail | null;
  company: GetServiceReviews_product_company;
  /**
   * Pergentages for all possible number of stars
   */
  reviewPercentages: (GetServiceReviews_product_reviewPercentages | null)[] | null;
  /**
   * It shows your review of the product if you made one.
   */
  myReview: GetServiceReviews_product_myReview | null;
  /**
   * Reviews of the products by users.
   */
  reviews: GetServiceReviews_product_reviews | null;

  userPermissions: string | null;
}

export interface GetServiceReviews {
  /**
   * Look up a product by ID.
   */
  product: GetServiceReviews_product | null;
  me: GetServiceReviews_product | null;
}

export interface GetServiceReviewsVariables {
  slug: string;
  first: number;
  after?: string | null;
  filter?: ProductRatingFilterInput | null;
  sortBy?: ProductRatingSortingInput | null;
}
