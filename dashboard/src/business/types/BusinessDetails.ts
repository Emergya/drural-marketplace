/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CompanyStatus, LanguageCodeEnum, CompanyAddressCountry } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: BusinessDetails
// ====================================================

export interface BusinessDetails_company_banner {
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

export interface BusinessDetails_company_address {
  __typename: "CompanyAddressType";
  /**
   * The ID of the object.
   */
  id: string;
  street: string | null;
  streetSecondLine: string | null;
  postalCode: string | null;
  locality: string | null;
  region: string | null;
  country: CompanyAddressCountry | null;
  longitude: number | null;
  latitude: number | null;
}

export interface BusinessDetails_company_chatwootCredentials {
  __typename: "ChatwootCredentialsType";
  /**
   * The ID of the object.
   */
  id: string;
  isActive: boolean;
}

export interface BusinessDetails_company_stripeCredentials {
  __typename: "StripeCredentialsType";
  accountId: string | null;
  isEnabled: boolean;
}

export interface BusinessDetails_company {
  __typename: "CompanyType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  publicName: string;
  cif: string;
  phone: string;
  email: string;
  status: CompanyStatus;
  isEnabled: boolean;
  imageUrl: string | null;
  banner: BusinessDetails_company_banner | null;
  description: string;
  created: any;
  modified: any;
  /**
   * Company language code.
   */
  languageCode: LanguageCodeEnum;
  address: BusinessDetails_company_address | null;
  chatwootCredentials: BusinessDetails_company_chatwootCredentials | null;
  stripeCredentials: BusinessDetails_company_stripeCredentials | null;
}

export interface BusinessDetails {
  /**
   * Look up a company by ID
   */
  company: BusinessDetails_company | null;
}

export interface BusinessDetailsVariables {
  id: string;
}
