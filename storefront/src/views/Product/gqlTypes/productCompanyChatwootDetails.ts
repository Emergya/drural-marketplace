/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: productCompanyChatwootDetails
// ====================================================

export interface productCompanyChatwootDetails_product_company_chatwootCredentials {
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

export interface productCompanyChatwootDetails_product_company {
  __typename: "CompanyType";
  chatwootCredentials: productCompanyChatwootDetails_product_company_chatwootCredentials | null;
}

export interface productCompanyChatwootDetails_product {
  __typename: "Product";
  company: productCompanyChatwootDetails_product_company;
}

export interface productCompanyChatwootDetails {
  /**
   * Look up a product by ID.
   */
  product: productCompanyChatwootDetails_product | null;
}

export interface productCompanyChatwootDetailsVariables {
  id: string;
  channel?: string | null;
}
