/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CustomerInput, AccountErrorCode, AddressTypeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateCustomer
// ====================================================

export interface UpdateCustomer_customerUpdate_errors {
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

export interface UpdateCustomer_customerUpdate_user_metadata {
  __typename: "MetadataItem";
  /**
   * Key of a metadata item.
   */
  key: string;
  /**
   * Value of a metadata item.
   */
  value: string;
}

export interface UpdateCustomer_customerUpdate_user_privateMetadata {
  __typename: "MetadataItem";
  /**
   * Key of a metadata item.
   */
  key: string;
  /**
   * Value of a metadata item.
   */
  value: string;
}

export interface UpdateCustomer_customerUpdate_user_addresses_country {
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

export interface UpdateCustomer_customerUpdate_user_addresses {
  __typename: "Address";
  city: string;
  cityArea: string;
  companyName: string;
  /**
   * Shop's default country.
   */
  country: UpdateCustomer_customerUpdate_user_addresses_country;
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

export interface UpdateCustomer_customerUpdate_user_defaultShippingAddress_country {
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

export interface UpdateCustomer_customerUpdate_user_defaultShippingAddress {
  __typename: "Address";
  city: string;
  cityArea: string;
  companyName: string;
  /**
   * Shop's default country.
   */
  country: UpdateCustomer_customerUpdate_user_defaultShippingAddress_country;
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

export interface UpdateCustomer_customerUpdate_user_defaultBillingAddress_country {
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

export interface UpdateCustomer_customerUpdate_user_defaultBillingAddress {
  __typename: "Address";
  city: string;
  cityArea: string;
  companyName: string;
  /**
   * Shop's default country.
   */
  country: UpdateCustomer_customerUpdate_user_defaultBillingAddress_country;
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

export interface UpdateCustomer_customerUpdate_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (UpdateCustomer_customerUpdate_user_metadata | null)[];
  /**
   * List of private metadata items.Requires proper staff permissions to access.
   */
  privateMetadata: (UpdateCustomer_customerUpdate_user_privateMetadata | null)[];
  dateJoined: any;
  lastLogin: any | null;
  /**
   * List of all user's addresses.
   */
  addresses: (UpdateCustomer_customerUpdate_user_addresses | null)[] | null;
  defaultShippingAddress: UpdateCustomer_customerUpdate_user_defaultShippingAddress | null;
  defaultBillingAddress: UpdateCustomer_customerUpdate_user_defaultBillingAddress | null;
  /**
   * A note about the customer.
   */
  note: string | null;
  isActive: boolean;
}

export interface UpdateCustomer_customerUpdate {
  __typename: "CustomerUpdate";
  errors: UpdateCustomer_customerUpdate_errors[];
  user: UpdateCustomer_customerUpdate_user | null;
}

export interface UpdateCustomer {
  /**
   * Updates an existing customer.
   */
  customerUpdate: UpdateCustomer_customerUpdate | null;
}

export interface UpdateCustomerVariables {
  id: string;
  input: CustomerInput;
}
