// CSS global inports
import "antd/dist/antd.css";
import "react-datepicker/dist/react-datepicker.css";
// Emial images
import "@saleor/emails/images/index";

import React, { useState } from "react";
import { ApolloProvider } from "react-apollo";
import { render } from "react-dom";
import TagManager from "react-gtm-module";
import { BrowserRouter } from "react-router-dom";

import AuthProvider from "./auth/AuthProvider";
import { AppChannelProvider } from "./components/AppLayout/AppChannelContext";
import { DateProvider } from "./components/Date";
import { LocaleProvider } from "./components/Locale";
import MessageManagerProvider from "./components/messages";
import { ShopProvider } from "./components/Shop";
import { APP_MOUNT_URI, GTM_ID } from "./config";
import AppStateProvider from "./containers/AppState";
import BackgroundTasksProvider from "./containers/BackgroundTasks";
import { Routes } from "./Routes";
import { apolloClient } from "./services/apollo/apolloClient";
import errorTracker from "./services/errorTracking";
import { ThemeProviderChangeWrapper } from "./ThemeProviderChangeWrapper/ThemeProviderChangeWrapper";

if (process.env.GTM_ID) {
  TagManager.initialize({ gtmId: GTM_ID });
}

errorTracker.init();

const App: React.FC = () => {
  const [tokenRefreshLinkError, setTokenRefreshLinkError] = useState(false);

  const onTokenRefreshLinkError = () => {
    setTokenRefreshLinkError(true);
  };

  const cleanTokenRefreshLinkError = () => {
    setTokenRefreshLinkError(false);
  };

  return (
    <ApolloProvider
      client={apolloClient(tokenRefreshLinkError, onTokenRefreshLinkError)}
    >
      <BrowserRouter basename={APP_MOUNT_URI}>
        <ThemeProviderChangeWrapper>
          <DateProvider>
            <LocaleProvider>
              <MessageManagerProvider>
                <BackgroundTasksProvider>
                  <AppStateProvider>
                    <ShopProvider>
                      <AuthProvider
                        tokenRefreshLinkError={tokenRefreshLinkError}
                        cleanTokenRefreshLinkError={cleanTokenRefreshLinkError}
                      >
                        <AppChannelProvider>
                          <Routes
                            tokenRefreshLinkError={tokenRefreshLinkError}
                          />
                        </AppChannelProvider>
                      </AuthProvider>
                    </ShopProvider>
                  </AppStateProvider>
                </BackgroundTasksProvider>
              </MessageManagerProvider>
            </LocaleProvider>
          </DateProvider>
        </ThemeProviderChangeWrapper>
      </BrowserRouter>
    </ApolloProvider>
  );
};

render(<App />, document.querySelector("#dashboard-app"));
