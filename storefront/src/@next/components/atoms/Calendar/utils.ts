import moment from "moment-timezone";

import { initialSlot } from "@pages/BookingPage/fixures";
import { dateFormat } from "@utils/date";

import {
  DayAvailabilityEnum,
  GetBookableResourceWeekAvailability,
  GetDayAvailability,
  GetIsDayAvailable,
  GetIsDayBooked,
  GetIsSameDay,
  GetIsSameOrAfterToday,
  GetIsWithinMonth,
  OnCalendarChange,
  OnMonthChange,
} from "./types";

const getIsDayAvailable: GetIsDayAvailable = (calendarAvailability, day) => {
  const matchDay = calendarAvailability.find(
    calendarDay => calendarDay && calendarDay.date === day.format(dateFormat)
  );

  return (matchDay && matchDay.available) || false;
};

export const getBookableResourceWeekAvailability: GetBookableResourceWeekAvailability = boolableResource => {
  if (boolableResource.calendar) {
    return boolableResource.calendar.map(date => {
      if (date && date.day) {
        return moment().day(date.day).weekday();
      }
      return NaN;
    });
  }
  return [];
};

const getIsDayBooked: GetIsDayBooked = (
  bookableResourceWeekAbailability,
  weekDay
) =>
  !!bookableResourceWeekAbailability?.find(
    weekDayAvailable => weekDayAvailable === weekDay
  );

const getIsWithinMonth: GetIsWithinMonth = (day, startMonthDay, endMonthDay) =>
  day.isSameOrAfter(startMonthDay) && day.isSameOrBefore(endMonthDay);

const getIsSameOrAfterToday: GetIsSameOrAfterToday = (day, today) => {
  return moment(day.format(dateFormat)).isSameOrAfter(today.format(dateFormat));
};

const getIsSameDay: GetIsSameDay = (dayOne, dayTwo) =>
  dayOne.date() === dayTwo.date();

export const getDayAvailability: GetDayAvailability = (
  loading,
  date,
  activeStartDate,
  bookableResourceWeekAbailability,
  calendarAvailability
) => {
  if (!loading) {
    const day = moment(date);
    const today = moment();
    const weekDay = day.weekday();
    const startMonthDay = moment(activeStartDate);
    const endMonthDay = moment(activeStartDate).endOf("month");

    const isDayAvailable = getIsDayAvailable(calendarAvailability, day);
    const isBookedDay = getIsDayBooked(
      bookableResourceWeekAbailability,
      weekDay
    );

    const isWithinMonth = getIsWithinMonth(day, startMonthDay, endMonthDay);
    const isSameOrAfterToday = getIsSameOrAfterToday(day, today);

    if (isWithinMonth && isSameOrAfterToday) {
      if (isDayAvailable) {
        return DayAvailabilityEnum.AVAILABLE;
      }
      if (isBookedDay) {
        return DayAvailabilityEnum.BOOKED;
      }
    }
  }
  return DayAvailabilityEnum.UNAVAILABLE;
};

export const onCalendarChange: OnCalendarChange = (
  loading,
  date,
  activeDay,
  calendarAvailability,
  onDayChange,
  onSlotChange
) => {
  if (!loading) {
    const selectedDay = moment(date);
    const today = moment();

    const isSameOrAfterToday = getIsSameOrAfterToday(selectedDay, today);
    const isDayAvailable = getIsDayAvailable(calendarAvailability, selectedDay);
    const isSameDay = getIsSameDay(selectedDay, activeDay);

    if (isSameOrAfterToday && isDayAvailable && !isSameDay) {
      onDayChange(selectedDay);
      onSlotChange(initialSlot);
    }
  }
};

export const onCalendarMonthChange: OnMonthChange = (
  activeStartDate,
  onMonthChange
) => {
  onMonthChange(moment(activeStartDate));
};
