import { useAuth } from "@drural/sdk";
import { useRouter } from "next/router";
import React from "react";

import { GA4Tag, Loader } from "@components/atoms";
import { isCookieEnabled } from "@components/molecules/CookieWarningModal/utils";
import { CompleteFooter as Footer, CookieWarning } from "@components/organisms";
import { useShopGAQuery } from "@graphql";
import { useDynamicRouteRedirect, useLocalStorage } from "@hooks";
import { cookiePreferencesKey } from "@temp/constants";

/* import { demoMode } from "@temp/constants"; */
import {
  CookieEnum,
  Cookies,
} from "../@next/components/organisms/CookieWarning/types";
import { HeaderComponent } from "../@next/components/organisms/Header";
import { MetaConsumer, OverlayManager, OverlayProvider } from "../components";
import ShopProvider from "../components/ShopProvider";
import Notifications from "./Notifications";
import { AppProps } from "./types";

import "../globalStyles/scss/index-drural.scss";

const App: React.FC<AppProps> = ({ shopConfig, children }) => {
  const { pathname } = useRouter();
  const willRedirect = useDynamicRouteRedirect();
  const { tokenRefreshing, tokenVerifying } = useAuth();
  const { data: shopGAData } = useShopGAQuery();
  const { measurementId: GAMeasurementId, isActive: isGAActive } =
    shopGAData?.shop.googleAnalytics || {};

  const {
    storedValue: cookiePreferences,
    setValue: setCookiePreferences,
  } = useLocalStorage<Cookies>(cookiePreferencesKey);
  const isGACookieEnabled = isCookieEnabled(
    cookiePreferences,
    CookieEnum.GOOGLE_ANALYTICS
  );

  const loading = tokenRefreshing || tokenVerifying || willRedirect;

  return (
    <ShopProvider shopConfig={shopConfig}>
      <OverlayProvider pathname={pathname}>
        <MetaConsumer />
        {/* <MainMenu loading={loading} demoMode={demoMode} menu={mainMenu} /> */}
        <HeaderComponent loading={loading} />
        {loading ? <Loader fullScreen /> : children}
        <Footer />
        <OverlayManager />
        <Notifications />
        <CookieWarning
          cookiePreferences={cookiePreferences}
          setCookiePreferences={setCookiePreferences}
        />
      </OverlayProvider>
      {isGACookieEnabled && isGAActive && GAMeasurementId && (
        <GA4Tag measurementId={GAMeasurementId} />
      )}
    </ShopProvider>
  );
};

export default App;
