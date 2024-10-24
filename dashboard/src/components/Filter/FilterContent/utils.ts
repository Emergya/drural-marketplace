import { makeStyles } from "@drural/macaw-ui";
import { FilterReducerAction } from "@saleor/components/Filter/reducer";
import { SingleAutocompleteChoiceType } from "@saleor/components/SingleAutocompleteSelectField";
import { joinDateTime, splitDateTime } from "@saleor/misc";
import React from "react";
import { IntlShape } from "react-intl";

import { FilterType, IFilterElement } from "../types";

export const filterTestingContext = "filter-field";

export interface FilterFieldBaseProps<T extends string = string> {
  filter: IFilterElement<T>;
  onFilterPropertyChange: React.Dispatch<FilterReducerAction<T>>;
}

export const useCommonStyles = makeStyles(
  theme => ({
    andLabel: {
      margin: theme.spacing(1, 2, 1, 0)
    },
    arrow: {
      marginRight: theme.spacing(2)
    },
    input: {
      padding: "12px 0 9px 12px"
    },
    inputRange: {
      alignItems: "center",
      display: "flex"
    },
    inputTime: {
      marginLeft: theme.spacing(1),
      width: "150px"
    },
    spacer: {
      paddingRight: theme.spacing(4)
    }
  }),
  { name: "FilterContentBodyCommon" }
);

export function getIsFilterMultipleChoices(
  intl: IntlShape
): SingleAutocompleteChoiceType[] {
  return [
    {
      label: intl.formatMessage({
        defaultMessage: "equal to",
        description: "is filter range or value",
        id: "is filter range equal to value"
      }),
      value: FilterType.SINGULAR
    },
    {
      label: intl.formatMessage({
        defaultMessage: "between",
        description: "is filter range or value",
        id: "is filter range between value"
      }),
      value: FilterType.MULTIPLE
    }
  ];
}

export const getDateFilterValue = (
  dateTime: string,
  dateTimeString: string | null,
  dateTimeFormat: boolean
) => {
  const { date } = splitDateTime(dateTime);
  if (!dateTimeFormat) {
    return date;
  }
  const { time } = splitDateTime(dateTimeString);
  return joinDateTime(date, time);
};

export const getDateTimeFilterValue = (
  dateTimeString: string | null,
  timeString: string
) => {
  const { date } = splitDateTime(dateTimeString || new Date().toISOString());
  return joinDateTime(date, timeString);
};
