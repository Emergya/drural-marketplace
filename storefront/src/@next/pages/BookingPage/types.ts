import { Moment } from "moment-timezone";

import { IOption, ISlot } from "@components/molecules/BookingTiles/types";

import {
  BookingProductDetailsQuery_product,
  BookingProductDetailsQuery_product_bookableResources_edges_node,
} from "./gqlTypes/BookingProductDetailsQuery";
import { ResourceAvailabilityByDate_resourceAvailabilityByDate } from "./gqlTypes/ResourceAvailabilityByDate";
import { ResourceCalendarAvailability_resourceCalendarAvailability } from "./gqlTypes/ResourceCalendarAvailability";

export interface IBookingPageProps {
  activeDay: Moment;
  activeSlot: { startTime: string; endTime: string };
  bookableResource:
    | BookingProductDetailsQuery_product_bookableResources_edges_node
    | undefined;
  bookableResources: BookingProductDetailsQuery_product_bookableResources_edges_node[];
  calendarAvailability: (ResourceCalendarAvailability_resourceCalendarAvailability | null)[];
  calendarAvailabilityLoading: boolean;
  loading: boolean;
  product: BookingProductDetailsQuery_product;
  selectedBookableResource: IOption;
  slotsAvailability: (ResourceAvailabilityByDate_resourceAvailabilityByDate | null)[];

  onBookableResourceChange: (bookableResource: IOption) => void;
  onDayChange: (day: Moment) => void;
  onMonthChange: (month: Moment) => void;
  onModalChange: (value: boolean) => void;
  onSlotChange: (slot: ISlot) => void;
}
