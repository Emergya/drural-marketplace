import moment from "moment-timezone";

export const hourFormat = "HH:mm";
export const dateFormat = "YYYY-MM-DD";
export const fullFormat = "YYYY-MM-DDTHH:mm:ssZ";
export const fullDisplayFormat = "dddd, MMMM DD, YYYY";

export const formatLocaleDate = (
  locale: string,
  date: Date,
  format: string
): string => {
  return moment(date).locale(locale).format(format);
};
