import { LanguageCodeEnum } from "@drural/sdk";
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
  }
  return intl.formatMessage(languageMessages.english);
};

export const localeToLanguageCode = (
  locale: Locale | undefined
): LanguageCodeEnum => {
  const upperCaseLocale = locale?.toUpperCase();
  return LanguageCodeEnum[upperCaseLocale];
};

export const languageCodeToLocale = (
  languageCode: LanguageCodeEnum | undefined
): Locale => {
  const lowerCaseLanguageCode = languageCode?.toUpperCase();
  return Locale[lowerCaseLanguageCode];
};
