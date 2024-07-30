import { IntlShape } from "react-intl";

import { Locale } from "@temp/components/Locale/types";
import { getLocaleMessage } from "@temp/components/Locale/utils";

export interface ILanguageObject {
  label: string;
  value: string;
}

export const mapLocalesWithLanguage = (
  locales: string[] | undefined,
  intl: IntlShape
) => {
  const options = {
    optionLabelKey: "label",
    optionValueKey: "value",
    options: [] as ILanguageObject[],
  };

  locales?.map(locale => {
    options.options.push({
      value: locale,
      label: getLocaleMessage(locale as Locale, intl),
    });
  });

  return options;
};

export const getLanguageObject = (
  locale: string | undefined,
  intl: IntlShape
) => ({
  value: locale as Locale,
  label: getLocaleMessage(locale as Locale, intl),
});
