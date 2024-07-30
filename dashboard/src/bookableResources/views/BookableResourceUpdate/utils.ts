import { allDaySlot } from "@saleor/bookableResources/components/BookableResourceCalendar/fixures";
import { getCalendarData } from "@saleor/bookableResources/components/BookableResourceCalendar/utils";
import { BookableResourceFormData } from "@saleor/bookableResources/forms/types";
import { getIsActiveData } from "@saleor/bookableResources/utils";
import { BookableResourceInput } from "@saleor/types/globalTypes";

export const getMutationData = (formData: BookableResourceFormData) => {
  const bookableResourceVariables: BookableResourceInput = {
    name: formData.name,
    isActive: getIsActiveData(formData.isActive),
    quantity: parseFloat(formData.quantity),
    quantityInfinite: formData.quantityInfinite,
    calendar: getCalendarData(formData, allDaySlot)
  };
  return bookableResourceVariables;
};
