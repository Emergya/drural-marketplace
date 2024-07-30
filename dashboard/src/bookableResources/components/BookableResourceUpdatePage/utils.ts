import {
  BookableResourceFormData,
  BookableResourceStateEnum
} from "@saleor/bookableResources/forms/types";
import { BookableResourceDetails_bookableResource } from "@saleor/bookableResources/types/BookableResourceDetails";
import { maybe } from "@saleor/misc";

import {
  allDaySlot,
  defaultSlot,
  weekDays
} from "../BookableResourceCalendar/fixures";

export const getBookableResourceUpdateFormData = (
  bookableResource: BookableResourceDetails_bookableResource
): BookableResourceFormData => ({
  // 1. Details data
  name: maybe(() => bookableResource.name, ""),
  isActive: maybe(() =>
    bookableResource.isActive
      ? BookableResourceStateEnum.ACTIVE
      : BookableResourceStateEnum.INACTIVE
  ),
  quantity: maybe(() => `${bookableResource.quantity}`, ""),
  quantityInfinite: maybe(() => bookableResource.quantityInfinite, false),
  // 2. Calendar data
  allDay: maybe(
    () =>
      bookableResource.calendar.every(
        day =>
          day.timePeriods.length === 1 &&
          day.timePeriods[0].startTime === allDaySlot.startTime &&
          day.timePeriods[0].endTime === allDaySlot.endTime
      ),
    false
  ),
  calendar: maybe(
    () =>
      weekDays.map(weekDay => {
        const dayMatch = bookableResource.calendar.find(
          ({ day }) => day === weekDay
        );

        if (dayMatch) {
          return {
            day: dayMatch.day,
            isActive: true,
            slots: dayMatch.timePeriods.map(slot => ({
              startTime: slot.startTime,
              endTime: slot.endTime
            }))
          };
        }
        return {
          day: weekDay,
          isActive: false,
          slots: [defaultSlot]
        };
      }),
    []
  )
});
