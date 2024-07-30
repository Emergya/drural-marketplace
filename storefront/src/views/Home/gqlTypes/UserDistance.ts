/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserDistance
// ====================================================

export interface UserDistance_me {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  distance: number | null;
}

export interface UserDistance {
  /**
   * Return the currently authenticated user.
   */
  me: UserDistance_me | null;
}
