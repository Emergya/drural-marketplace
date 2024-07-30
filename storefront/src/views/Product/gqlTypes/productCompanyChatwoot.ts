/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: productCompanyChatwoot
// ====================================================

export interface productCompanyChatwoot_product_company_chatwootCredentials {
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

export interface productCompanyChatwoot_product_company {
  __typename: "CompanyType";
  chatwootCredentials: productCompanyChatwoot_product_company_chatwootCredentials | null;
}

export interface productCompanyChatwoot_product {
  __typename: "Product";
  company: productCompanyChatwoot_product_company;
}

export interface productCompanyChatwoot {
  /**
   * Look up a product by ID.
   */
  product: productCompanyChatwoot_product | null;
}

export interface productCompanyChatwootVariables {
  id: string;
  channel?: string | null;
}
