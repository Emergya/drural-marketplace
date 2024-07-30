import {
  BookableResourceFormData,
  UseBookableResourceFormResult,
  WeekDay
} from "@saleor/bookableResources/forms/types";
import { BookableResourceDetails_bookableResource } from "@saleor/bookableResources/types/BookableResourceDetails";
import useForm, { FormChange } from "@saleor/hooks/useForm";
import { SlotInput } from "@saleor/types/globalTypes";
import React from "react";

import { defaultSlot } from "../../components/BookableResourceCalendar/fixures";
import {
  isSlotActive,
  validateCalendar
} from "../../components/BookableResourceCalendar/utils";
import { getBookableResourceUpdateFormData } from "../../components/BookableResourceUpdatePage/utils";

export interface BookableResourceUpdateFormProps {
  children: (props: UseBookableResourceFormResult) => React.ReactNode;
  bookableResource: BookableResourceDetails_bookableResource;
  onSubmit: (data: BookableResourceFormData) => Promise<boolean>;
}

function useBookableResourceUpdateForm(
  bookableResource: BookableResourceDetails_bookableResource,
  onSubmit: (data: BookableResourceFormData) => Promise<boolean>
): UseBookableResourceFormResult {
  const [changed, setChanged] = React.useState(false);
  const triggerChange = () => setChanged(true);

  const form = useForm(getBookableResourceUpdateFormData(bookableResource));
  const handleChange: FormChange = (event, cb) => {
    form.change(event, cb);
    triggerChange();
  };

  const handleCalendarChange = (value: WeekDay[]) => {
    handleChange({
      target: {
        name: "calendar",
        value
      }
    });
  };

  const handleDayChange = (index: number) => {
    const calendarCopy: WeekDay[] = [...form.data.calendar];

    calendarCopy[index] = {
      ...calendarCopy[index],
      isActive: !calendarCopy[index].isActive
    };

    handleCalendarChange(calendarCopy);
  };

  const toggleAllDays = (selected: boolean) => {
    const data: WeekDay[] = form.data.calendar.map(day => ({
      ...day,
      isActive: selected ? true : false
    }));

    handleCalendarChange(data);
  };

  const handleSlotChange = (
    dayIndex: number,
    slotIndex: number,
    value: [string, string]
  ) => {
    const calendarCopy: WeekDay[] = [...form.data.calendar];
    const slotsCopy: SlotInput[] = [...form.data.calendar[dayIndex].slots];

    slotsCopy[slotIndex] = {
      ...slotsCopy[slotIndex],
      startTime: value[0],
      endTime: value[1]
    };

    calendarCopy[dayIndex] = {
      ...calendarCopy[dayIndex],
      slots: slotsCopy
    };

    handleCalendarChange(calendarCopy);
  };

  const handleSlotAdd = (index: number) => {
    const calendarCopy: WeekDay[] = [...form.data.calendar];

    calendarCopy[index] = {
      ...calendarCopy[index],
      slots: [
        ...calendarCopy[index].slots,
        {
          startTime: null,
          endTime: null
        }
      ]
    };

    handleCalendarChange(calendarCopy);
  };

  const handleSlotDelete = (dayIndex: number, slotIndex: number) => {
    const calendarCopy: WeekDay[] = [...form.data.calendar];
    const slotsCopy: SlotInput[] = [...calendarCopy[dayIndex].slots];
    slotsCopy.splice(slotIndex, 1);

    calendarCopy[dayIndex] = {
      ...calendarCopy[dayIndex],
      slots: slotsCopy
    };

    handleCalendarChange(calendarCopy);
  };

  const handleSlotCopy = (index: number) => {
    const slots = [...form.data.calendar[index].slots].filter(slot =>
      isSlotActive(slot)
    );

    const calendarCopy = form.data.calendar.map(day => ({
      ...day,
      slots: slots.length ? slots : [defaultSlot]
    }));

    handleCalendarChange(calendarCopy);
  };

  const getData = (): BookableResourceFormData => ({
    ...form.data
  });

  const data = getData();

  const submit = () => onSubmit(data);

  // Form validation
  const isValidCalendar = validateCalendar(data.calendar, data.allDay);
  const disabled =
    !data.name ||
    data.isActive === null ||
    (!data.quantity && !data.quantityInfinite) ||
    !isValidCalendar;

  return {
    change: handleChange,
    data,
    disabled,
    handlers: {
      addSlot: handleSlotAdd,
      changeDay: handleDayChange,
      changeSlot: handleSlotChange,
      copySlot: handleSlotCopy,
      deleteSlot: handleSlotDelete,
      toggleAllDays
    },
    hasChanged: changed,
    submit
  };
}

const BookableResourceUpdateForm: React.FC<BookableResourceUpdateFormProps> = ({
  children,
  bookableResource,
  onSubmit
  // ...rest
}) => {
  const props = useBookableResourceUpdateForm(
    bookableResource,
    onSubmit
    //  rest
  );

  return <form onSubmit={props.submit}>{children(props)}</form>;
};

BookableResourceUpdateForm.displayName = "BookableResourceUpdateForm";
export default BookableResourceUpdateForm;
