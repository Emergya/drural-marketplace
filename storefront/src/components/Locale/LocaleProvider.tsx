import router, { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-apollo";
import { IntlProvider } from "react-intl";

import { useLocalStorage } from "@hooks/useLocalStorage";
import { DEFAULT_LOCALE } from "@temp/constants";

import { ShopDefaultLanguage } from "./gqlTypes/ShopDefaultLanguage";
import { UserPreferredLocaleContext } from "./LocaleContext";
import { getDefaultMessages } from "./messageJson";
import { shopDefaultLanguage } from "./queries";
import { Locale } from "./types";
import { loadMessagesJson } from "./utils";

const LocaleProvider: React.FC = ({ children }) => {
  const { locale } = useRouter();
  const {
    storedValue: userPreferredLocale,
    setValue: setUserPreferredLocale,
  } = useLocalStorage<string>("userPreferredLocale", undefined);

  const [messages, setMessages] = React.useState(
    getDefaultMessages(DEFAULT_LOCALE)
  );

  const { data, loading: shopLoading } = useQuery<ShopDefaultLanguage>(
    shopDefaultLanguage,
    {
      fetchPolicy: "network-only",
    }
  );

  //  Redirects to que preferred language page: on page load && on preferred language change
  React.useEffect(() => {
    if (userPreferredLocale && locale && userPreferredLocale !== locale) {
      router.push(router.asPath, undefined, { locale: userPreferredLocale });
    } else if (
      !shopLoading &&
      data?.shop?.defaultLanguage &&
      locale &&
      data?.shop?.defaultLanguage !== locale &&
      !userPreferredLocale
    ) {
      router.push(router.asPath, undefined, {
        locale: data.shop.defaultLanguage,
      });
    }
  }, [userPreferredLocale, shopLoading, data?.shop?.defaultLanguage, locale]);

  //  Provides language messages
  React.useEffect(() => {
    const getMessages = async () => {
      const messages = await loadMessagesJson(locale as Locale);
      return messages;
    };
    getMessages().then(messages => setMessages(messages));
  }, [locale]);

  return (
    <IntlProvider
      defaultLocale={DEFAULT_LOCALE}
      locale={locale}
      messages={messages}
      key={locale}
    >
      <UserPreferredLocaleContext.Provider
        value={{
          userPreferredLocale,
          setUserPreferredLocale,
        }}
      >
        {children}
      </UserPreferredLocaleContext.Provider>
    </IntlProvider>
  );
};

export { LocaleProvider };
