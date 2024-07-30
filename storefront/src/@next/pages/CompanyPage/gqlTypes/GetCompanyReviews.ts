/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductRatingFilterInput, ProductRatingSortingInput } from "./../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: GetCompanyReviews
// ====================================================

export interface GetCompanyReviews_company_reviewPercentages {
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

export interface GetCompanyReviews_company_reviews_edges_node_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface GetCompanyReviews_company_reviews_edges_node {
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
  product: GetCompanyReviews_company_reviews_edges_node_product;
}

export interface GetCompanyReviews_company_reviews_edges {
  __typename: "ProductRatingCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetCompanyReviews_company_reviews_edges_node;
}

export interface GetCompanyReviews_company_reviews_pageInfo {
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

export interface GetCompanyReviews_company_reviews {
  __typename: "ProductRatingCountableConnection";
  edges: GetCompanyReviews_company_reviews_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: GetCompanyReviews_company_reviews_pageInfo;
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
}

export interface GetCompanyReviews_company {
  __typename: "CompanyType";
  /**
   * The ID of the object.
   */
  id: string;
  rating: number;
  /**
   * Pergentages for all possible number of stars
   */
  reviewPercentages: (GetCompanyReviews_company_reviewPercentages | null)[] | null;
  /**
   * Reviews of the company's products by users.
   */
  reviews: GetCompanyReviews_company_reviews | null;
}

export interface GetCompanyReviews {
  /**
   * Look up a company by ID
   */
  company: GetCompanyReviews_company | null;
}

export interface GetCompanyReviewsVariables {
  id: string;
  first: number;
  after?: string | null;
  filter?: ProductRatingFilterInput | null;
  sortBy?: ProductRatingSortingInput | null;
}
