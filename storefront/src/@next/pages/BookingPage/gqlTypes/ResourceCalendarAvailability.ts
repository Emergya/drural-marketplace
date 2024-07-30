/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DateRangeInput } from "./../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: ResourceCalendarAvailability
// ====================================================

export interface ResourceCalendarAvailability_resourceCalendarAvailability {
  __typename: "BookableResourceAvalabilityByDay";
  /**
   * Returns the day of the month requested
   */
  date: any | null;
  /**
   * Returns if the day is available to book the service
   */
  available: boolean | null;
}

export interface ResourceCalendarAvailability {
  resourceCalendarAvailability: (ResourceCalendarAvailability_resourceCalendarAvailability | null)[] | null;
}

export interface ResourceCalendarAvailabilityVariables {
  bookableResource: string;
  productVariant: string;
  period: DateRangeInput;
}
