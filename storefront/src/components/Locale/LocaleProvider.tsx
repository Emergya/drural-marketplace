import router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IntlProvider } from "react-intl";

import { useLocalStorage } from "@hooks/useLocalStorage";
import { DEFAULT_LOCALE } from "@temp/constants";

import { UserPreferredLocaleContext } from "./LocaleContext";
import { getDefaultMessages } from "./messageJson";
import { useShopDefaultLanguageQuery, useUserLanguageQuery } from "./queries";
import { Locale } from "./types";
import {
  languageCodeToLocale,
  loadMessagesJson,
  localeToLanguageCode,
} from "./utils";
import { useMutation } from "react-apollo";
import { accountUpdateMutation } from "@components/molecules/AccountConfigurationTiles/queries";
import { NotificationTemplate } from "@components/atoms";

const LocaleProvider: React.FC = ({ children }) => {
  // 1. Page rendered locale
  const { locale } = useRouter();

  // 2. Shop default locale
  const shopLanguageQuery = useShopDefaultLanguageQuery();
  const shopLanguage = shopLanguageQuery.data?.shop?.defaultLanguage;

  // 3. Logged user preferred locale
  const userLanguageQuery = useUserLanguageQuery();
  const loggedUserLocale = languageCodeToLocale(
    userLanguageQuery.data?.me?.languageCode
  );

  const isDataFetched =
    !shopLanguageQuery.loading && !userLanguageQuery.loading;

  const [updateUserAccout] = useMutation(accountUpdateMutation, {
    onCompleted: () => userLanguageQuery.refetch(),
  });

  // 4. Stored locale - used also for anonymous users
  const { storedValue: userLocale, setValue: setUserLocale } = useLocalStorage<
    string
  >("userPreferredLocale", undefined);

  const [messages, setMessages] = useState(getDefaultMessages(DEFAULT_LOCALE));

  const changeUserLocale = async (locale: Locale) => {
    try {
      if (loggedUserLocale) {
        await updateUserAccout({
          variables: { input: { languageCode: localeToLanguageCode(locale) } },
        });
      }

      setUserLocale(locale);
    } catch (error) {
      console.error("Error on setting the new locale" + error);
    }
  };

  // Sets the user preferred locale based on the following priorities:
  useEffect(() => {
    if (isDataFetched) {
      // priority one - logged user locale
      const mustSetLoggedUserLocale =
        loggedUserLocale && loggedUserLocale !== userLocale;

      // priority two - anonymous user locale
      // Note: not need to do anything if the user locale is already set

      // priority three - shop locale
      const mustSetShopLocale =
        !mustSetLoggedUserLocale &&
        !userLocale &&
        shopLanguage &&
        shopLanguage !== userLocale;

      // proirity four - default locale
      const mustSetDefaultLocale =
        !mustSetLoggedUserLocale &&
        !userLocale &&
        !mustSetShopLocale &&
        DEFAULT_LOCALE !== userLocale;

      console.log("working-1");

      if (mustSetLoggedUserLocale) {
        setUserLocale(loggedUserLocale);
        console.log("working-2");
      }

      if (mustSetShopLocale) {
        setUserLocale(shopLanguage);
        console.log("working-3");
      }

      if (mustSetDefaultLocale) {
        setUserLocale(DEFAULT_LOCALE);
        console.log("working-4");
      }
    }
  }, [isDataFetched, loggedUserLocale, userLocale, shopLanguage]);

  //  Redirects to que preferred locale page
  useEffect(() => {
    console.log("entering-redirect");

    if (userLocale) {
      console.log("redirecting-1");
      router.push(router.asPath, undefined, { locale: userLocale });
    }
  }, [userLocale]);

  //  Provides locale messages
  useEffect(() => {
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
          userPreferredLocale: userLocale,
          setUserPreferredLocale: changeUserLocale,
        }}
      >
        {children}
      </UserPreferredLocaleContext.Provider>
    </IntlProvider>
  );
};

export { LocaleProvider };
