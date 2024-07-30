/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserLocation
// ====================================================

export interface GetUserLocation_me {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  isLocationAllowed: boolean;
  distance: number | null;
}

export interface GetUserLocation {
  /**
   * Return the currently authenticated user.
   */
  me: GetUserLocation_me | null;
}
