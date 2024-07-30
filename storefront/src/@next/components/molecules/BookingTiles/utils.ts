import moment from "moment-timezone";

import { dateFormat } from "@utils/date";

import {
  GetAvailableSlots,
  GetBookableResourceOptions,
  GetIsSameSlot,
} from "./types";

export const getBookableResourceOptions: GetBookableResourceOptions = bookableResources =>
  bookableResources.map(bookableResource => ({
    label: bookableResource.name,
    value: bookableResource.id,
  }));

export const getAvailableSlots: GetAvailableSlots = (slots, activeDay) => {
  const today = moment();
  const todayFormatted = today.format(dateFormat);
  const activeDayFormatted = activeDay.format(dateFormat);
  const isActiveDaySameToday = moment(activeDayFormatted).isSame(
    todayFormatted
  );

  if (isActiveDaySameToday) {
    return slots.filter(slot =>
      moment(`${activeDayFormatted} ${slot?.startTime}`).isSameOrAfter(today)
    );
  }
  return slots;
};

export const getIsSameSlot: GetIsSameSlot = (availableSlot, activeSlot) => {
  if (availableSlot && activeSlot) {
    return (
      availableSlot.startTime === activeSlot.startTime &&
      availableSlot.endTime === activeSlot.endTime
    );
  }
  return false;
};
