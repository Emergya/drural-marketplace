/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: StaffMemberDelete
// ====================================================

export interface StaffMemberDelete_staffDelete_errors {
  __typename: "StaffError";
  /**
   * The error code.
   */
  code: AccountErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
}

export interface StaffMemberDelete_staffDelete {
  __typename: "StaffDelete";
  errors: StaffMemberDelete_staffDelete_errors[];
}

export interface StaffMemberDelete {
  /**
   * Deletes a staff user.
   */
  staffDelete: StaffMemberDelete_staffDelete | null;
}

export interface StaffMemberDeleteVariables {
  id: string;
}
