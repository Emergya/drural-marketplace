/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddressInput, AccountErrorCode, AddressTypeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateCustomerAddress
// ====================================================

export interface CreateCustomerAddress_addressCreate_errors {
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

export interface CreateCustomerAddress_addressCreate_address_country {
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

export interface CreateCustomerAddress_addressCreate_address {
  __typename: "Address";
  city: string;
  cityArea: string;
  companyName: string;
  /**
   * Shop's default country.
   */
  country: CreateCustomerAddress_addressCreate_address_country;
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

export interface CreateCustomerAddress_addressCreate_user_addresses_country {
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

export interface CreateCustomerAddress_addressCreate_user_addresses {
  __typename: "Address";
  city: string;
  cityArea: string;
  companyName: string;
  /**
   * Shop's default country.
   */
  country: CreateCustomerAddress_addressCreate_user_addresses_country;
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

export interface CreateCustomerAddress_addressCreate_user_defaultBillingAddress {
  __typename: "Address";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface CreateCustomerAddress_addressCreate_user_defaultShippingAddress {
  __typename: "Address";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface CreateCustomerAddress_addressCreate_user {
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
  addresses: (CreateCustomerAddress_addressCreate_user_addresses | null)[] | null;
  defaultBillingAddress: CreateCustomerAddress_addressCreate_user_defaultBillingAddress | null;
  defaultShippingAddress: CreateCustomerAddress_addressCreate_user_defaultShippingAddress | null;
}

export interface CreateCustomerAddress_addressCreate {
  __typename: "AddressCreate";
  errors: CreateCustomerAddress_addressCreate_errors[];
  address: CreateCustomerAddress_addressCreate_address | null;
  /**
   * A user instance for which the address was created.
   */
  user: CreateCustomerAddress_addressCreate_user | null;
}

export interface CreateCustomerAddress {
  /**
   * Creates user address.
   */
  addressCreate: CreateCustomerAddress_addressCreate | null;
}

export interface CreateCustomerAddressVariables {
  id: string;
  input: AddressInput;
}
