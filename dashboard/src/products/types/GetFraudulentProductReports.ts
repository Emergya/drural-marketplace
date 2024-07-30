/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetFraudulentProductReports
// ====================================================

export interface GetFraudulentProductReports_fraudulentProductReports_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: boolean;
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor: string | null;
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
}

export interface GetFraudulentProductReports_fraudulentProductReports_edges_node_user_avatar {
  __typename: "Image";
  /**
   * Alt text for an image.
   */
  alt: string | null;
  /**
   * The URL of the image.
   */
  url: string;
}

export interface GetFraudulentProductReports_fraudulentProductReports_edges_node_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isStaff: boolean;
  avatar: GetFraudulentProductReports_fraudulentProductReports_edges_node_user_avatar | null;
}

export interface GetFraudulentProductReports_fraudulentProductReports_edges_node_product_thumbnail {
  __typename: "Image";
  /**
   * Alt text for an image.
   */
  alt: string | null;
  /**
   * The URL of the image.
   */
  url: string;
}

export interface GetFraudulentProductReports_fraudulentProductReports_edges_node_product_company {
  __typename: "CompanyType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface GetFraudulentProductReports_fraudulentProductReports_edges_node_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: GetFraudulentProductReports_fraudulentProductReports_edges_node_product_thumbnail | null;
  company: GetFraudulentProductReports_fraudulentProductReports_edges_node_product_company;
}

export interface GetFraudulentProductReports_fraudulentProductReports_edges_node_media {
  __typename: "FraudulentProductReportMedia";
  /**
   * The ID of the object.
   */
  id: string;
  alt: string;
  oembedData: any;
  /**
   * The URL of the media.
   */
  url: string;
}

export interface GetFraudulentProductReports_fraudulentProductReports_edges_node {
  __typename: "FraudulentProductReport";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * User who make the report.
   */
  user: GetFraudulentProductReports_fraudulentProductReports_edges_node_user;
  /**
   * Product that will be reported.
   */
  product: GetFraudulentProductReports_fraudulentProductReports_edges_node_product | null;
  /**
   * Date when report happened at in ISO 8601 format.
   */
  date: any | null;
  /**
   * Reason of the report.
   */
  reason: string;
  /**
   * Phone number of the user who reports the product.
   */
  phone: string;
  /**
   * List of media for the report.
   */
  media: GetFraudulentProductReports_fraudulentProductReports_edges_node_media[] | null;
}

export interface GetFraudulentProductReports_fraudulentProductReports_edges {
  __typename: "FraudulentProductReportCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetFraudulentProductReports_fraudulentProductReports_edges_node;
}

export interface GetFraudulentProductReports_fraudulentProductReports {
  __typename: "FraudulentProductReportCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: GetFraudulentProductReports_fraudulentProductReports_pageInfo;
  edges: GetFraudulentProductReports_fraudulentProductReports_edges[];
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
}

export interface GetFraudulentProductReports {
  fraudulentProductReports: GetFraudulentProductReports_fraudulentProductReports | null;
}

export interface GetFraudulentProductReportsVariables {
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
}
