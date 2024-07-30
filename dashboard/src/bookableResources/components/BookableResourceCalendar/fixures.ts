import { BookableResourceDayEnum, SlotInput } from "@saleor/types/globalTypes";

export const weekDays = [
  BookableResourceDayEnum.MONDAY,
  BookableResourceDayEnum.TUESDAY,
  BookableResourceDayEnum.WEDNESDAY,
  BookableResourceDayEnum.THURSDAY,
  BookableResourceDayEnum.FRIDAY,
  BookableResourceDayEnum.SATURDAY,
  BookableResourceDayEnum.SUNDAY
];

export const defaultSlot: SlotInput = {
  startTime: null,
  endTime: null
};

export const allDaySlot: SlotInput = {
  startTime: "00:00:00",
  endTime: "23:45:00"
};
