/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BookableResourceCreateInput, BookableResourceErrorCode, BookableResourceDayEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: BookableResourceCreate
// ====================================================

export interface BookableResourceCreate_bookableResourceCreate_errors {
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

export interface BookableResourceCreate_bookableResourceCreate_bookableResource_company {
  __typename: "CompanyType";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface BookableResourceCreate_bookableResourceCreate_bookableResource_calendar_timePeriods {
  __typename: "Slot";
  startTime: any;
  endTime: any;
}

export interface BookableResourceCreate_bookableResourceCreate_bookableResource_calendar {
  __typename: "BookableResourceDailyCalendar";
  /**
   * Day of the week.
   */
  day: BookableResourceDayEnum | null;
  /**
   * Diferents periods of time of availability.
   */
  timePeriods: (BookableResourceCreate_bookableResourceCreate_bookableResource_calendar_timePeriods | null)[] | null;
}

export interface BookableResourceCreate_bookableResourceCreate_bookableResource {
  __typename: "BookableResource";
  /**
   * The ID of the object.
   */
  id: string;
  company: BookableResourceCreate_bookableResourceCreate_bookableResource_company;
  name: string;
  isActive: boolean;
  quantity: number;
  quantityInfinite: boolean;
  /**
   * The weekly calendar of the resource.
   */
  calendar: (BookableResourceCreate_bookableResourceCreate_bookableResource_calendar | null)[] | null;
}

export interface BookableResourceCreate_bookableResourceCreate {
  __typename: "BookableResourceCreate";
  errors: BookableResourceCreate_bookableResourceCreate_errors[];
  bookableResource: BookableResourceCreate_bookableResourceCreate_bookableResource | null;
}

export interface BookableResourceCreate {
  /**
   * Create a bookable resource.
   */
  bookableResourceCreate: BookableResourceCreate_bookableResourceCreate | null;
}

export interface BookableResourceCreateVariables {
  input: BookableResourceCreateInput;
}
