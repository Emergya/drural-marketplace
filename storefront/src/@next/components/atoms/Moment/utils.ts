import moment from "moment-timezone";

import { tz } from "@temp/constants";

export const momentSetStaticTz = (date: string): moment.Moment => {
  if (tz) {
    return moment.tz(date, tz);
  }
  return moment(date);
};
