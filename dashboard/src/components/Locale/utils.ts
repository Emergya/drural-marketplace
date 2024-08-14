import { Locale } from "@saleor/components/Locale";
import { languageMessages } from "@saleor/intl";
import { IntlShape } from "react-intl";

import { ILanguageOption } from "./types";

export const getLocaleOptions = (intl: IntlShape): ILanguageOption[] =>
  Object.values(Locale)
    .map(locale => ({
      label: getLocaleMessage(locale, intl),
      value: locale
    }))
    .sort((a, b) => a?.label.localeCompare(b?.label));

export const getLocaleMessage = (locale: Locale, intl: IntlShape) => {
  switch (locale) {
    case Locale.CS:
      return intl.formatMessage(languageMessages.czech);
    case Locale.EL:
      return intl.formatMessage(languageMessages.greek);
    case Locale.EN:
      return intl.formatMessage(languageMessages.english);
    case Locale.ES:
      return intl.formatMessage(languageMessages.spanish);
    case Locale.FR:
      return intl.formatMessage(languageMessages.french);
    case Locale.HR:
      return intl.formatMessage(languageMessages.croatian);
    case Locale.NL:
      return intl.formatMessage(languageMessages.dutch);
    case Locale.PL:
      return intl.formatMessage(languageMessages.polish);
    case Locale.PT:
      return intl.formatMessage(languageMessages.portuguese);
    case Locale.SL:
      return intl.formatMessage(languageMessages.slovenian);
    case Locale.SR:
      return intl.formatMessage(languageMessages.serbian);
    case Locale.SV:
      return intl.formatMessage(languageMessages.swedish);
    default:
      return intl.formatMessage(languageMessages.english);
  }
};
