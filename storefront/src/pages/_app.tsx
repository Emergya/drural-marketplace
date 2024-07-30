import { SaleorProvider } from "@drural/sdk";
import { ConfigInput } from "@drural/sdk/lib/types";
import { Integrations as ApmIntegrations } from "@sentry/apm";
import * as Sentry from "@sentry/browser";
import type {
  AppContext as NextAppContext,
  AppProps as NextAppProps,
} from "next/app";
import NextApp from "next/app";
import Head from "next/head";
import * as React from "react";
import { positions, Provider as AlertProvider } from "react-alert";
import TagManager from "react-gtm-module";

import { NotificationTemplate } from "@components/atoms";
import { ServiceWorkerProvider } from "@components/containers";
import { LogoBrandProvider } from "@components/containers/LogoBrandProvider/LogoBrandProvider";
import { ThemeProviderChangeWrapper } from "@components/containers/ThemeProviderChangeWrapper";
import { GlobalStyle } from "@styles";
import { NextQueryParamProvider } from "@temp/components";
import { getSaleorApi, getShopConfig, ShopConfig } from "@utils/ssr";

import { version } from "../../package.json";
import { App as StorefrontApp } from "../app";
import { LocaleProvider } from "../components/Locale";
import {
  apiUrl,
  channelSlug,
  sentryDsn,
  sentrySampleRate,
  serviceWorkerTimeout,
  ssrMode,
} from "../constants";

declare global {
  interface Window {
    __APOLLO_CLIENT__: any;
  }
}
const attachClient = async () => {
  const { apolloClient } = await getSaleorApi();
  window.__APOLLO_CLIENT__ = apolloClient;
};

if (!ssrMode) {
  window.version = version;
  if (process.env.NEXT_PUBLIC_ENABLE_APOLLO_DEVTOOLS === "true") attachClient();
}

if (process.env.GTM_ID) {
  TagManager.initialize({ gtmId: process.env.GTM_ID });
}

if (sentryDsn) {
  Sentry.init({
    dsn: sentryDsn,
    // @ts-ignore
    integrations: [new ApmIntegrations.Tracing()],
    tracesSampleRate: sentrySampleRate,
  });
}

const saleorConfig: ConfigInput = { apiUrl, channel: channelSlug };

const notificationConfig = { position: positions.BOTTOM_RIGHT, timeout: 2500 };

type AppProps = NextAppProps & ShopConfig;

const App = ({ Component, pageProps, shopConfig }: AppProps) => (
  <>
    <Head>
      <title>PWA Storefront – dRural Marketplace</title>
      <link rel="preconnect" href={apiUrl} />
      <link href="https://rsms.me/inter/inter.css" rel="stylesheet" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="manifest" href="/manifest.json" />
    </Head>
    <SaleorProvider config={saleorConfig}>
      <ThemeProviderChangeWrapper>
        <AlertProvider
          template={NotificationTemplate as any}
          {...notificationConfig}
        >
          <ServiceWorkerProvider timeout={serviceWorkerTimeout}>
            <LocaleProvider>
              <GlobalStyle />
              <NextQueryParamProvider>
                <LogoBrandProvider>
                  <StorefrontApp shopConfig={shopConfig}>
                    <Component {...pageProps} />
                  </StorefrontApp>
                </LogoBrandProvider>
              </NextQueryParamProvider>
            </LocaleProvider>
          </ServiceWorkerProvider>
        </AlertProvider>
      </ThemeProviderChangeWrapper>
    </SaleorProvider>
  </>
);

// Fetch shop config only once and cache it.
let shopConfig: ShopConfig | null = null;

App.getInitialProps = async (appContext: NextAppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);

  try {
    if (ssrMode) {
      if (!shopConfig) {
        shopConfig = await getShopConfig();
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  return { ...appProps, ...shopConfig };
};

export default App;
