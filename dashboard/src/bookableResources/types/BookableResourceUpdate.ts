/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BookableResourceInput, BookableResourceErrorCode, BookableResourceDayEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: BookableResourceUpdate
// ====================================================

export interface BookableResourceUpdate_bookableResourceUpdate_errors {
  __typename: "BookableResourceError";
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
  /**
   * The error code.
   */
  code: BookableResourceErrorCode;
}

export interface BookableResourceUpdate_bookableResourceUpdate_bookableResource_calendar_timePeriods {
  __typename: "Slot";
  /**
   * The ID of the object.
   */
  id: string;
  startTime: any;
  endTime: any;
}

export interface BookableResourceUpdate_bookableResourceUpdate_bookableResource_calendar {
  __typename: "BookableResourceDailyCalendar";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Day of the week.
   */
  day: BookableResourceDayEnum | null;
  /**
   * Diferents periods of time of availability.
   */
  timePeriods: (BookableResourceUpdate_bookableResourceUpdate_bookableResource_calendar_timePeriods | null)[] | null;
}

export interface BookableResourceUpdate_bookableResourceUpdate_bookableResource {
  __typename: "BookableResource";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  isActive: boolean;
  quantity: number;
  quantityInfinite: boolean;
  /**
   * The weekly calendar of the resource.
   */
  calendar: (BookableResourceUpdate_bookableResourceUpdate_bookableResource_calendar | null)[] | null;
}

export interface BookableResourceUpdate_bookableResourceUpdate {
  __typename: "BookableResourceUpdate";
  errors: BookableResourceUpdate_bookableResourceUpdate_errors[];
  bookableResource: BookableResourceUpdate_bookableResourceUpdate_bookableResource | null;
}

export interface BookableResourceUpdate {
  /**
   * Create a bookable resource.
   */
  bookableResourceUpdate: BookableResourceUpdate_bookableResourceUpdate | null;
}

export interface BookableResourceUpdateVariables {
  id: string;
  input: BookableResourceInput;
}
