import { Locale } from "@saleor/components/Locale";
import { languageMessages } from "@saleor/intl";
import { IntlShape } from "react-intl";

import { ILanguageOption } from "./types";

export const getLocaleOptions = (intl: IntlShape): ILanguageOption[] =>
  Object.values(Locale).map(locale => ({
    label: getLocaleMessage(locale, intl),
    value: locale
  }));

export const getLocaleMessage = (locale: Locale, intl: IntlShape) => {
  switch (locale) {
    case Locale.EN:
      return intl.formatMessage(languageMessages.english);
    case Locale.ES:
      return intl.formatMessage(languageMessages.spanish);
    case Locale.HR:
      return intl.formatMessage(languageMessages.croatian);
    case Locale.NL:
      return intl.formatMessage(languageMessages.dutch);
    case Locale.SV:
      return intl.formatMessage(languageMessages.swedish);
    default:
      return intl.formatMessage(languageMessages.english);
  }
};
