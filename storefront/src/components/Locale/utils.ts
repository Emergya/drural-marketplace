import { IntlShape } from "react-intl";

import { DEFAULT_LOCALE } from "@temp/constants";
import { languageMessages } from "@temp/intl";

import { LOCALE_CACHE, localeData } from "./constants";
import { getDefaultMessages } from "./messageJson";
import { Locale } from "./types";

export const loadMessagesJson = async (
  locale: Locale | undefined = DEFAULT_LOCALE as Locale
) => {
  const filename = localeData[locale];
  let localeJson = LOCALE_CACHE[locale];

  if (!localeJson && filename !== undefined) {
    try {
      localeJson = await import(
        `../../../content/compiled-locales/${filename}.json`
      );
      LOCALE_CACHE[locale] = localeJson;
    } catch (error) {
      localeJson = getDefaultMessages(DEFAULT_LOCALE);
    }
  }

  return localeJson;
};

export const getLocaleMessage = (
  locale: Locale | undefined,
  intl: IntlShape
) => {
  if (locale) {
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
  }
  return intl.formatMessage(languageMessages.english);
};
