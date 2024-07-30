/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BookableResourceDayEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: BookableResourceDetails
// ====================================================

export interface BookableResourceDetails_bookableResource_calendar_timePeriods {
  __typename: "Slot";
  /**
   * The ID of the object.
   */
  id: string;
  startTime: any;
  endTime: any;
}

export interface BookableResourceDetails_bookableResource_calendar {
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
  timePeriods: (BookableResourceDetails_bookableResource_calendar_timePeriods | null)[] | null;
}

export interface BookableResourceDetails_bookableResource {
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
  calendar: (BookableResourceDetails_bookableResource_calendar | null)[] | null;
}

export interface BookableResourceDetails {
  /**
   * Look up a bookable resouce by ID.
   */
  bookableResource: BookableResourceDetails_bookableResource | null;
}

export interface BookableResourceDetailsVariables {
  id: string;
}
