/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserCreateInput, AccountErrorCode, AddressTypeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateCustomer
// ====================================================

export interface CreateCustomer_customerCreate_errors {
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

export interface CreateCustomer_customerCreate_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface CreateCustomer_customerCreate {
  __typename: "CustomerCreate";
  errors: CreateCustomer_customerCreate_errors[];
  user: CreateCustomer_customerCreate_user | null;
}

export interface CreateCustomer {
  /**
   * Creates a new customer.
   */
  customerCreate: CreateCustomer_customerCreate | null;
}

export interface CreateCustomerVariables {
  input: UserCreateInput;
}
