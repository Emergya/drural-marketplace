import { IFilter } from "@saleor/components/Filter";
import { createDateField, createTextField } from "@saleor/utils/filters/fields";
import { IntlShape } from "react-intl";

import { commonMessages } from "../../../intl";
import { BookingFilterKeys, BookingListFilterOpts } from "./types";

export function createFilterStructure(
  intl: IntlShape,
  opts: BookingListFilterOpts
): IFilter<BookingFilterKeys> {
  return [
    {
      ...createDateField(
        BookingFilterKeys.bookingDate,
        intl.formatMessage(commonMessages.date),
        opts.bookingDate.value
      ),
      active: opts.bookingDate.active
    },
    {
      ...createTextField(
        BookingFilterKeys.bookableResource,
        intl.formatMessage(commonMessages.resource),
        opts.bookableResource.value
      ),
      active: opts.bookableResource.active
    },
    {
      ...createTextField(
        BookingFilterKeys.customer,
        intl.formatMessage(commonMessages.customer),
        opts.customer.value
      ),
      active: opts.customer.active
    }
  ];
}
