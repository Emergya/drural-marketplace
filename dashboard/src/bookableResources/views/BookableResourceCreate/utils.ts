import { allDaySlot } from "@saleor/bookableResources/components/BookableResourceCalendar/fixures";
import { getCalendarData } from "@saleor/bookableResources/components/BookableResourceCalendar/utils";
import { BookableResourceFormData } from "@saleor/bookableResources/forms/types";
import { BookableResourceCreateVariables } from "@saleor/bookableResources/types/BookableResourceCreate";
import { getIsActiveData } from "@saleor/bookableResources/utils";

export const getMutationData = (
  companyId: string,
  formData: BookableResourceFormData
) => {
  const bookableResourceVariables: BookableResourceCreateVariables = {
    input: {
      company: companyId,
      name: formData.name,
      isActive: getIsActiveData(formData.isActive),
      quantity: parseFloat(formData.quantity),
      quantityInfinite: formData.quantityInfinite,
      calendar: getCalendarData(formData, allDaySlot)
    }
  };
  return bookableResourceVariables;
};
