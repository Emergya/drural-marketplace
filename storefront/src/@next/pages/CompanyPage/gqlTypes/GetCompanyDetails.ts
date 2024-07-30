/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCompanyDetails
// ====================================================

export interface GetCompanyDetails_company_banner {
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

export interface GetCompanyDetails_company_address {
  __typename: "CompanyAddressType";
  street: string | null;
  streetSecondLine: string | null;
}

export interface GetCompanyDetails_company_publishedProducts {
  __typename: "ProductCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
}

export interface GetCompanyDetails_company_chatwootCredentials {
  __typename: "ChatwootCredentialsType";
  /**
   * HMAC of inbox.
   */
  hmac: string | null;
  /**
   * Website token of inbox.
   */
  websiteToken: string | null;
}

export interface GetCompanyDetails_company {
  __typename: "CompanyType";
  /**
   * The ID of the object.
   */
  id: string;
  publicName: string;
  description: string;
  rating: number;
  imageUrl: string | null;
  banner: GetCompanyDetails_company_banner | null;
  address: GetCompanyDetails_company_address | null;
  /**
   * List of the shop's products.
   */
  publishedProducts: GetCompanyDetails_company_publishedProducts | null;
  chatwootCredentials: GetCompanyDetails_company_chatwootCredentials | null;
}

export interface GetCompanyDetails {
  /**
   * Look up a company by ID
   */
  company: GetCompanyDetails_company | null;
}

export interface GetCompanyDetailsVariables {
  id: string;
  channel?: string | null;
}
