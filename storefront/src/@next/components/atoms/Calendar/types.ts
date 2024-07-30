import { Moment } from "moment-timezone";
import { CalendarProps, CalendarTileProperties } from "react-calendar";

import { ISlot } from "@components/molecules/BookingTiles/types";
import { BookingProductDetailsQuery_product_bookableResources_edges_node } from "@pages/BookingPage/gqlTypes/BookingProductDetailsQuery";
import { ResourceCalendarAvailability_resourceCalendarAvailability } from "@pages/BookingPage/gqlTypes/ResourceCalendarAvailability";

// 1. Component types
export interface IDayLabel {
  caption: string;
  status: "success" | "error";
}

export enum DayAvailabilityEnum {
  AVAILABLE = "available",
  UNAVAILABLE = "unavailable",
  BOOKED = "booked",
}

export interface IProps extends CalendarProps {
  loading?: boolean;
  dayCaptions?: IDayLabel[];
  tileClassName?:
    | DayAvailabilityEnum
    | DayAvailabilityEnum[]
    | ((
        props: CalendarTileProperties
      ) => DayAvailabilityEnum | DayAvailabilityEnum[] | null)
    | undefined;
}

// 2. Utils types
export type GetIsDayAvailable = (
  calendarAvailability: (ResourceCalendarAvailability_resourceCalendarAvailability | null)[],
  day: Moment
) => boolean;

export type GetBookableResourceWeekAvailability = (
  boolableResource: BookingProductDetailsQuery_product_bookableResources_edges_node
) => number[];

export type GetIsDayBooked = (
  bookableResourceWeekAbailability: number[],
  weekDay: number
) => boolean;

export type GetIsWithinMonth = (
  day: Moment,
  startMonthDay: Moment,
  endMonthDay: Moment
) => boolean;

export type GetIsSameOrAfterToday = (day: Moment, today: Moment) => boolean;

export type GetIsSameDay = (dayOne: Moment, dayTwo: Moment) => boolean;

export type GetDayAvailability = (
  loading: boolean,
  date: Date,
  activeStartDate: Date,
  bookableResourceWeekAbailability: number[],
  calendarAvailability: (ResourceCalendarAvailability_resourceCalendarAvailability | null)[]
) => DayAvailabilityEnum;

export type OnCalendarChange = (
  loading: boolean,
  date: Date,
  activeDay: Moment,
  calendarAvailability: (ResourceCalendarAvailability_resourceCalendarAvailability | null)[],
  onDayChange: (day: Moment) => void,
  onSlotChange: (slot: ISlot) => void
) => void;

export type OnMonthChange = (
  activeStartDate: Date,
  onMonthChange: (month: Moment) => void
) => void;
