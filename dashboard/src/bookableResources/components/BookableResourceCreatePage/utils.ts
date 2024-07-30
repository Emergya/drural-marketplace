import { BookableResourceFormData } from "@saleor/bookableResources/forms/types";

import { defaultSlot, weekDays } from "../BookableResourceCalendar/fixures";

export const getBookableResourceCreateFormData = (): BookableResourceFormData => ({
  // 1. Details data
  name: "",
  isActive: "",
  quantity: "",
  quantityInfinite: false,
  // 2. Calendar data
  allDay: false,
  calendar: weekDays.map(day => ({
    day,
    isActive: false,
    slots: [defaultSlot]
  }))
});
