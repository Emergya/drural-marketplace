import { FormChange } from "@saleor/hooks/useForm";
import { BookableResourceDayEnum, SlotInput } from "@saleor/types/globalTypes";

export enum BookableResourceStateEnum {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE"
}

export interface WeekDay {
  day: BookableResourceDayEnum;
  isActive: boolean;
  slots: SlotInput[];
}

export interface BookableResourceFormData {
  allDay: boolean;
  calendar: WeekDay[];
  isActive: string;
  name: string;
  quantity: string;
  quantityInfinite: boolean;
}

export interface BookableResourceHandlers
  extends Record<"addSlot", (index: number) => void>,
    Record<"changeDay", (index: number) => void>,
    Record<
      "changeSlot",
      (dayIndex: number, slotIndex: number, value: [string, string]) => void
    >,
    Record<"copySlot", (index: number) => void>,
    Record<"deleteSlot", (dayIndex: number, slotIndex: number) => void>,
    Record<"toggleAllDays", (event: boolean) => void> {}

export interface UseBookableResourceFormResult {
  change: FormChange;
  data: BookableResourceFormData;
  disabled: boolean;
  handlers: BookableResourceHandlers;
  hasChanged: boolean;
  submit: () => Promise<boolean>;
}
