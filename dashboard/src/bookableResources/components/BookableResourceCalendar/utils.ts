import {
  BookableResourceFormData,
  WeekDay
} from "@saleor/bookableResources/forms/types";
import { weekDayMesagges } from "@saleor/intl";
import {
  BookableResourceDailyCalendarInput,
  BookableResourceDayEnum,
  SlotInput
} from "@saleor/types/globalTypes";
import moment, { Moment } from "moment-timezone";
import { IntlShape } from "react-intl";

export const getWeekDayName = (
  weekDay: BookableResourceDayEnum,
  intl: IntlShape
): string => {
  switch (weekDay) {
    case BookableResourceDayEnum.MONDAY:
      return intl.formatMessage(weekDayMesagges.monday);
    case BookableResourceDayEnum.TUESDAY:
      return intl.formatMessage(weekDayMesagges.tuesday);
    case BookableResourceDayEnum.WEDNESDAY:
      return intl.formatMessage(weekDayMesagges.wednesday);
    case BookableResourceDayEnum.THURSDAY:
      return intl.formatMessage(weekDayMesagges.thursday);
    case BookableResourceDayEnum.FRIDAY:
      return intl.formatMessage(weekDayMesagges.friday);
    case BookableResourceDayEnum.SATURDAY:
      return intl.formatMessage(weekDayMesagges.saturday);
    case BookableResourceDayEnum.SUNDAY:
      return intl.formatMessage(weekDayMesagges.sunday);
  }
};

export const isSlotActive = (slot: SlotInput): boolean =>
  !!(slot.startTime && slot.endTime);

export const validateCalendar = (calendar: WeekDay[], allDay: boolean) => {
  const activeDays = calendar.filter(day => day.isActive);

  let isValid = false;

  activeDays.forEach(day => {
    if (allDay) {
      isValid = true;
      return;
    }

    if (day.slots.find(slot => isSlotActive(slot))) {
      isValid = true;
      return;
    }
  });

  return isValid;
};

export const getCalendarData = (
  formData: BookableResourceFormData,
  allDaySlot: SlotInput
): BookableResourceDailyCalendarInput[] => {
  const { allDay, calendar } = formData;

  return calendar
    .filter(day => {
      if (day.isActive) {
        return allDay || !!day.slots.find(slot => isSlotActive(slot));
      }
    })
    .map(({ day, slots }) => ({
      day,
      timePeriods: allDay
        ? [allDaySlot]
        : slots
            .filter(slot => isSlotActive(slot))
            .map(slot => ({
              startTime: slot.startTime,
              endTime: slot.endTime
            }))
    }));
};

export const getSlotMomentValue = (
  slot: SlotInput,
  defaultDay: string
): [Moment, Moment] => {
  if (slot.startTime && slot.endTime) {
    return [
      moment(`${defaultDay} ${slot.startTime}`),
      moment(`${defaultDay} ${slot.endTime}`)
    ];
  }
};

export const getPrevFulfillSlot = (
  index: number,
  slots: SlotInput[],
  defaultDay: string
): Moment => {
  const prevSlots = slots.slice(0, index).filter(slot => isSlotActive(slot));

  if (prevSlots.length) {
    const prevSlot = prevSlots[prevSlots.length - 1];
    return moment(`${defaultDay} ${prevSlot.endTime}`);
  }
};

export const getNextFulfillSlot = (
  index: number,
  slots: SlotInput[],
  defaultDay: string
): Moment => {
  const nextSlots = slots
    .slice(index + 1, slots.length)
    .filter(slot => isSlotActive(slot));

  if (nextSlots.length) {
    const nextSlot = nextSlots[0];
    return moment(`${defaultDay} ${nextSlot.startTime}`);
  }
};

export const isSlotBeforeLimit = (
  defaultDay: string,
  startTime: string,
  endTime: string
): boolean =>
  moment(`${defaultDay} ${startTime}`).isBefore(`${defaultDay} ${endTime}`);

export const isSlotAfterLimit = (
  defaultDay: string,
  endTime: string,
  startTime: string
): boolean =>
  moment(`${defaultDay} ${endTime}`).isAfter(`${defaultDay} ${startTime}`);

export const getDisabledHours = (
  prevTime: Moment,
  nextTime: Moment
): number[] => {
  if (prevTime) {
    const disabledHours: number[] = [];

    if (prevTime) {
      const prevHours = prevTime?.hour();
      const prevMinutes = prevTime?.minute();
      const prevLimit = prevMinutes < 45 ? prevHours : prevHours + 1;

      for (let i = 0; i < prevLimit; i++) {
        disabledHours.push(i);
      }
    }

    if (nextTime) {
      const nextHours = nextTime?.hour();
      const nextMinutes = nextTime?.minute();
      const nextLimit = nextMinutes ? nextHours : nextHours - 1;

      for (let i = nextLimit; i < 23; i++) {
        disabledHours.push(i);
      }
    }

    return disabledHours;
  }
  return [];
};

export const getAllDaysSelected = (calendar: WeekDay[]) =>
  calendar.every(day => day.isActive);
