/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountErrorCode, AddressTypeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: ChangeStaffPassword
// ====================================================

export interface ChangeStaffPassword_passwordChange_errors {
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

export interface ChangeStaffPassword_passwordChange {
  __typename: "PasswordChange";
  errors: ChangeStaffPassword_passwordChange_errors[];
}

export interface ChangeStaffPassword {
  /**
   * Change the password of the logged in user.
   */
  passwordChange: ChangeStaffPassword_passwordChange | null;
}

export interface ChangeStaffPasswordVariables {
  newPassword: string;
  newPasswordRepeat: string;
  oldPassword: string;
}
