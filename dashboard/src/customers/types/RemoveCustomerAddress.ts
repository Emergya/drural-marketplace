/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountErrorCode, AddressTypeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: RemoveCustomerAddress
// ====================================================

export interface RemoveCustomerAddress_addressDelete_errors {
  __typename: "AccountError";
  /**
   * The error code.
   */
  code: AccountErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * A type of address that causes the error.
   */
  addressType: AddressTypeEnum | null;
}

export interface RemoveCustomerAddress_addressDelete_user_addresses_country {
  __typename: "CountryDisplay";
  /**
   * Country code.
   */
  code: string;
  /**
   * Country name.
   */
  country: string;
}

export interface RemoveCustomerAddress_addressDelete_user_addresses {
  __typename: "Address";
  city: string;
  cityArea: string;
  companyName: string;
  /**
   * Shop's default country.
   */
  country: RemoveCustomerAddress_addressDelete_user_addresses_country;
  countryArea: string;
  firstName: string;
  /**
   * The ID of the object.
   */
  id: string;
  lastName: string;
  phone: string | null;
  postalCode: string;
  streetAddress1: string;
  streetAddress2: string;
}

export interface RemoveCustomerAddress_addressDelete_user_defaultBillingAddress {
  __typename: "Address";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface RemoveCustomerAddress_addressDelete_user_defaultShippingAddress {
  __typename: "Address";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface RemoveCustomerAddress_addressDelete_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  /**
   * List of all user's addresses.
   */
  addresses: (RemoveCustomerAddress_addressDelete_user_addresses | null)[] | null;
  defaultBillingAddress: RemoveCustomerAddress_addressDelete_user_defaultBillingAddress | null;
  defaultShippingAddress: RemoveCustomerAddress_addressDelete_user_defaultShippingAddress | null;
}

export interface RemoveCustomerAddress_addressDelete {
  __typename: "AddressDelete";
  errors: RemoveCustomerAddress_addressDelete_errors[];
  /**
   * A user instance for which the address was deleted.
   */
  user: RemoveCustomerAddress_addressDelete_user | null;
}

export interface RemoveCustomerAddress {
  /**
   * Deletes an address.
   */
  addressDelete: RemoveCustomerAddress_addressDelete | null;
}

export interface RemoveCustomerAddressVariables {
  id: string;
}
