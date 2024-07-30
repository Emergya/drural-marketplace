/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CompanyAddressCountry, CompanyErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: CompanyAddressUpdate
// ====================================================

export interface CompanyAddressUpdate_companyAddressUpdate_companyAddress {
  __typename: "CompanyAddressType";
  street: string | null;
  streetSecondLine: string | null;
  postalCode: string | null;
  locality: string | null;
  region: string | null;
  country: CompanyAddressCountry | null;
  latitude: number | null;
  longitude: number | null;
}

export interface CompanyAddressUpdate_companyAddressUpdate_errors {
  __typename: "CompanyError";
  /**
   * The error code.
   */
  code: CompanyErrorCode;
  /**
   * The error message.
   */
  message: string | null;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
}

export interface CompanyAddressUpdate_companyAddressUpdate {
  __typename: "CompanyAddressUpdate";
  companyAddress: CompanyAddressUpdate_companyAddressUpdate_companyAddress | null;
  errors: CompanyAddressUpdate_companyAddressUpdate_errors[];
}

export interface CompanyAddressUpdate {
  /**
   * Updates a company address
   */
  companyAddressUpdate: CompanyAddressUpdate_companyAddressUpdate | null;
}

export interface CompanyAddressUpdateVariables {
  id: string;
  street?: string | null;
  postalCode?: string | null;
  locality?: string | null;
  region?: string | null;
  country?: string | null;
  streetSecondLine?: string | null;
  latitude: number;
  longitude: number;
}
