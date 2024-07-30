import { Moment } from "moment-timezone";
import { MutationFunctionOptions } from "react-apollo";

import {
  BookingProductDetailsQuery_product,
  BookingProductDetailsQuery_product_bookableResources_edges_node,
} from "@pages/BookingPage/gqlTypes/BookingProductDetailsQuery";
import {
  BookResource,
  BookResourceVariables,
} from "@pages/BookingPage/gqlTypes/BookResource";
import { ResourceAvailabilityByDate_resourceAvailabilityByDate } from "@pages/BookingPage/gqlTypes/ResourceAvailabilityByDate";
import { ResourceCalendarAvailability_resourceCalendarAvailability } from "@pages/BookingPage/gqlTypes/ResourceCalendarAvailability";

export interface IOption {
  label: string;
  value: string;
}

export interface ISlot {
  startTime: string;
  endTime: string;
}

export interface IBookableResourceSelectTileProps {
  options: IOption[];
  value: IOption;
  onSelectChange: (value: IOption) => void;
}

export interface ICalendarTileProps {
  bookableResource: BookingProductDetailsQuery_product_bookableResources_edges_node;
  calendarAvailability: (ResourceCalendarAvailability_resourceCalendarAvailability | null)[];
  loading: boolean;
  activeDay: Moment;
  onDayChange: (day: Moment) => void;
  onMonthChange: (month: Moment) => void;
  onSlotChange: (slot: ISlot) => void;
}

export interface ISlotsTileProps {
  activeDay: Moment;
  activeSlot: ISlot;
  slots: (ResourceAvailabilityByDate_resourceAvailabilityByDate | null)[];
  onSlotChange: (slot: ISlot) => void;
}

export interface IBookingConfirmationOverlayProps {
  bookableResource: BookingProductDetailsQuery_product_bookableResources_edges_node;
  product: BookingProductDetailsQuery_product;
  activeDay: Moment;
  activeSlot: ISlot;
  bookResource: (
    options?:
      | MutationFunctionOptions<BookResource, BookResourceVariables>
      | undefined
  ) => void;
  hide: () => void;
}

export type GetAvailableSlots = (
  slots: (ResourceAvailabilityByDate_resourceAvailabilityByDate | null)[],
  activeDay: Moment
) => (ResourceAvailabilityByDate_resourceAvailabilityByDate | null)[];

export type GetBookableResourceOptions = (
  bookableResources: BookingProductDetailsQuery_product_bookableResources_edges_node[]
) => IOption[];

export type GetIsSameSlot = (
  availableSlot: ResourceAvailabilityByDate_resourceAvailabilityByDate | null,
  activeSlot: ISlot
) => boolean;
