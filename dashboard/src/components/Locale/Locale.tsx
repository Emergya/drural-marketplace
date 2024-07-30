import useLocalStorage from "@saleor/hooks/useLocalStorage";
import React from "react";
import { useQuery } from "react-apollo";
import { IntlProvider, ReactIntlErrorCode } from "react-intl";

import English from "../../../locale/defaultMessages.json";
import { shopDefaultLanguage } from "./query";
import { ShopDefaultLanguage } from "./types/ShopDefaultLanguage";
export enum Locale {
  // AR = "ar",
  // AZ = "az",
  // BG = "bg",
  // BN = "bn",
  // CA = "ca",
  // CS = "cs",
  // DA = "da",
  // DE = "de",
  // EL = "el",
  EN = "en",
  ES = "es",
  // ES_CO = "es-CO",
  // ET = "et",
  // FA = "fa",
  // FR = "fr",
  // HI = "hi",
  HR = "hr",
  // HU = "hu",
  // HY = "hy",
  // ID = "id",
  // IS = "is",
  // IT = "it",
  // JA = "ja",
  // KO = "ko",
  // MN = "mn",
  // NB = "nb",
  NL = "nl",
  // PL = "pl",
  // PT = "pt",
  // PT_BR = "pt-BR",
  // RO = "ro",
  // RU = "ru",
  // SK = "sk",
  // SL = "sl",
  // SQ = "sq",
  // SR = "sr",
  SV = "sv"
  // TH = "th",
  // TR = "tr",
  // UK = "uk",
  // VI = "vi",
  // ZH_HANS = "zh-Hans",
  // ZH_HANT = "zh-Hant"
}

interface StructuredMessage {
  context?: string;
  string: string;
}
type LocaleMessages = Record<string, StructuredMessage>;

export const localeNames: Record<Locale, string> = {
  // [Locale.AR]: "العربيّة",
  // [Locale.AZ]: "Azərbaycanca",
  // [Locale.BG]: "български",
  // [Locale.BN]: "বাংলা",
  // [Locale.CA]: "català",
  // [Locale.CS]: "česky",
  // [Locale.DA]: "dansk",
  // [Locale.DE]: "Deutsch",
  // [Locale.EL]: "Ελληνικά",
  [Locale.EN]: "English",
  [Locale.ES]: "Español",
  // [Locale.ES_CO]: "español de Colombia",
  // [Locale.ET]: "eesti",
  // [Locale.FA]: "فارسی",
  // [Locale.FR]: "français",
  // [Locale.HI]: "Hindi",
  [Locale.HR]: "Hrvatski",
  // [Locale.HU]: "Magyar",
  // [Locale.HY]: "հայերեն",
  // [Locale.ID]: "Bahasa Indonesia",
  // [Locale.IS]: "Íslenska",
  // [Locale.IT]: "italiano",
  // [Locale.JA]: "日本語",
  // [Locale.KO]: "한국어",
  // [Locale.MN]: "Mongolian",
  // [Locale.NB]: "norsk (bokmål)",
  [Locale.NL]: "Netherlands",
  // [Locale.PL]: "polski",
  // [Locale.PT]: "Português",
  // [Locale.PT_BR]: "Português Brasileiro",
  // [Locale.RO]: "Română",
  // [Locale.RU]: "Русский",
  // [Locale.SK]: "Slovensky",
  // [Locale.SL]: "Slovenščina",
  // [Locale.SQ]: "shqip",
  // [Locale.SR]: "српски",
  [Locale.SV]: "Svenska"
  // [Locale.TH]: "ภาษาไทย",
  // [Locale.TR]: "Türkçe",
  // [Locale.UK]: "Українська",
  // [Locale.VI]: "Tiếng Việt",
  // [Locale.ZH_HANS]: "简体中文",
  // [Locale.ZH_HANT]: "繁體中文"
};

const dotSeparator = "_dot_";
const sepRegExp = new RegExp(dotSeparator, "g");

function getKeyValueJson(messages: LocaleMessages): Record<string, string> {
  if (messages) {
    const keyValueMessages: Record<string, string> = {};
    return Object.entries(messages).reduce((acc, [id, msg]) => {
      acc[id.replace(sepRegExp, ".")] = msg.string;
      return acc;
    }, keyValueMessages);
  }
}

export function getMatchingLocale(languages: readonly string[]): Locale {
  const localeEntries = Object.entries(Locale);

  for (const preferredLocale of languages) {
    for (const localeEntry of localeEntries) {
      if (localeEntry[1].toLowerCase() === preferredLocale.toLowerCase()) {
        return Locale[localeEntry[0]];
      }
    }
  }

  return undefined;
}

const defaultLocale = Locale.EN;

export interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}
export const LocaleContext = React.createContext<LocaleContextType>({
  locale: defaultLocale,
  setLocale: () => undefined
});

const { Consumer: LocaleConsumer, Provider: RawLocaleProvider } = LocaleContext;

const LocaleProvider: React.FC = ({ children }) => {
  const [locale, setLocale] = useLocalStorage("locale", undefined);
  const [defaultLanguage, setDefaultLanguage] = useLocalStorage(
    "defaultLanguage",
    undefined
  );
  const [messages, setMessages] = React.useState(undefined);
  const { data, loading: shopLoading } = useQuery<ShopDefaultLanguage>(
    shopDefaultLanguage
  );

  React.useEffect(() => {
    async function changeLocale() {
      if (locale) {
        // It seems like Webpack is unable to use aliases for lazy imports
        let mod;
        if (locale === Locale.EN) {
          mod = await import(`../../../locale/defaultMessages.json`);
        } else {
          mod = await import(`../../../locale/${locale}.json`);
        }
        setLocale(locale);
        setMessages(mod.default);
      }
      if (
        data?.shop?.defaultLanguage &&
        data?.shop?.defaultLanguage !== defaultLanguage
      ) {
        setDefaultLanguage(data.shop.defaultLanguage);
      }
      if (!locale && data?.shop?.defaultLanguage) {
        let mod;
        if (data.shop.defaultLanguage === Locale.EN) {
          mod = await import(`../../../locale/defaultMessages.json`);
        } else {
          mod = await import(
            `../../../locale/${data.shop.defaultLanguage}.json`
          );
        }

        setMessages(mod.default);
      }
    }
    if (!shopLoading) {
      changeLocale();
    }
  }, [locale, data?.shop?.defaultLanguage, shopLoading]);

  return (
    <IntlProvider
      defaultLocale={defaultLocale}
      locale={locale || defaultLanguage || defaultLocale}
      messages={getKeyValueJson(messages) || getKeyValueJson(English)}
      onError={err => {
        if (!(err.code === ReactIntlErrorCode.MISSING_TRANSLATION)) {
          console.error(err);
        }
      }}
      key={locale}
    >
      <RawLocaleProvider
        value={{
          locale: locale || defaultLanguage || defaultLocale,
          setLocale
        }}
      >
        {children}
      </RawLocaleProvider>
    </IntlProvider>
  );
};

export { LocaleConsumer, LocaleProvider, RawLocaleProvider };
