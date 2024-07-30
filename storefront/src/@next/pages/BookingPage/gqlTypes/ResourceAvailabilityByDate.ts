/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ResourceAvailabilityByDate
// ====================================================

export interface ResourceAvailabilityByDate_resourceAvailabilityByDate {
  __typename: "BookableResourceAvalabilityByPeriods";
  /**
   * Start time of period in slot
   */
  startTime: any | null;
  /**
   * End time of period in slot
   */
  endTime: any | null;
}

export interface ResourceAvailabilityByDate {
  resourceAvailabilityByDate: (ResourceAvailabilityByDate_resourceAvailabilityByDate | null)[] | null;
}

export interface ResourceAvailabilityByDateVariables {
  bookableResource: string;
  productVariant: string;
  date: any;
}
