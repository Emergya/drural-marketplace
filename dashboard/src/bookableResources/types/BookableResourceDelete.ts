/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BookableResourceErrorCode, BookableResourceDayEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: BookableResourceDelete
// ====================================================

export interface BookableResourceDelete_bookableResourceDelete_errors {
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

export interface BookableResourceDelete_bookableResourceDelete_bookableResource_calendar_timePeriods {
  __typename: "Slot";
  /**
   * The ID of the object.
   */
  id: string;
  startTime: any;
  endTime: any;
}

export interface BookableResourceDelete_bookableResourceDelete_bookableResource_calendar {
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
  timePeriods: (BookableResourceDelete_bookableResourceDelete_bookableResource_calendar_timePeriods | null)[] | null;
}

export interface BookableResourceDelete_bookableResourceDelete_bookableResource {
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
  calendar: (BookableResourceDelete_bookableResourceDelete_bookableResource_calendar | null)[] | null;
}

export interface BookableResourceDelete_bookableResourceDelete {
  __typename: "BookableResourceDelete";
  errors: BookableResourceDelete_bookableResourceDelete_errors[];
  bookableResource: BookableResourceDelete_bookableResourceDelete_bookableResource | null;
}

export interface BookableResourceDelete {
  /**
   * Deletes a bookable resource.
   */
  bookableResourceDelete: BookableResourceDelete_bookableResourceDelete | null;
}

export interface BookableResourceDeleteVariables {
  id: string;
}
