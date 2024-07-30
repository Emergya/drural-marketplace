import React from "react";
import { FormattedMessage } from "react-intl";

export type SortOptions = {
  label: string | JSX.Element;
  value: string;
}[];

export const SORT_REVIEW_OPTIONS: SortOptions = [
  {
    label: <FormattedMessage defaultMessage="Most recent" />,
    value: "-DATE",
  },
  {
    label: <FormattedMessage defaultMessage="Best reviewed" />,
    value: "-RATING",
  },
];

export type FilterOptions = {
  label: string | JSX.Element;
  value: number | undefined;
}[];

export const STARS_REVIEW_OPTIONS: FilterOptions = [
  {
    label: <FormattedMessage defaultMessage="All stars" />,
    value: undefined,
  },
  {
    label: <FormattedMessage defaultMessage="5 stars" />,
    value: 5,
  },
  {
    label: <FormattedMessage defaultMessage="4 stars" />,
    value: 4,
  },
  {
    label: <FormattedMessage defaultMessage="3 stars" />,
    value: 3,
  },
  {
    label: <FormattedMessage defaultMessage="2 stars" />,
    value: 2,
  },
  {
    label: <FormattedMessage defaultMessage="1 stars" />,
    value: 1,
  },
];
