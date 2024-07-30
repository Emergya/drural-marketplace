import useAppState from "@saleor/hooks/useAppState";
import React from "react";
import ErrorBoundary from "react-error-boundary";
import { useIntl } from "react-intl";
import { Route, Switch } from "react-router-dom";

import AppsSection from "./apps";
import { appsSection } from "./apps/urls";
import AttributeSection from "./attributes";
import { attributeSection } from "./attributes/urls";
import Auth from "./auth";
import { useAuth } from "./auth/AuthProvider";
import LoginLoading from "./auth/components/LoginLoading/LoginLoading";
import SectionRoute from "./auth/components/SectionRoute";
import { hasPermission } from "./auth/misc";
import BookableResources from "./bookableResources";
import { BusinessSection } from "./business";
import CategorySection from "./categories";
import ChannelsSection from "./channels";
import { channelsSection } from "./channels/urls";
import ChatwootSection from "./chatwoot/index";
import { chatwootSection } from "./chatwoot/urls";
import CollectionSection from "./collections";
import AppLayout from "./components/AppLayout";
import useAppChannel from "./components/AppLayout/AppChannelContext";
import { BusinessProvider } from "./components/BusinessProvider";
import { BusinessSelectorCheck } from "./components/BusinessSelectedCheck";
import { WindowTitle } from "./components/WindowTitle";
import ConfigurationSection, { createConfigurationMenu } from "./configuration";
import ControlPanelSection from "./controlPanel";
import { controlPanelSection } from "./controlPanel/url";
import { CustomerSection } from "./customers";
import { CustomizationSection } from "./customization";
import { customizationSection } from "./customization/url";
import HomePage from "./home";
import { commonMessages } from "./intl";
import NavigationSection from "./navigation";
import { navigationSection } from "./navigation/urls";
import { NotFound } from "./NotFound";
import OrdersSection from "./orders";
import PageSection from "./pages";
import PageTypesSection from "./pageTypes";
import PermissionGroupSection from "./permissionGroups";
import PluginsSection from "./plugins";
import ProductSection from "./products";
import ProductTypesSection from "./productTypes";
import errorTracker from "./services/errorTracking";
// import ShippingSection from "./shipping";
import SiteSettingsSection from "./siteSettings";
import StaffSection from "./staff";
import TaxesSection from "./taxes";
import TranslationsSection from "./translations";
import { PermissionEnum } from "./types/globalTypes";
// import WarehouseSection from "./warehouses";
// import { warehouseSection } from "./warehouses/urls";

export const Routes: React.FC<{ tokenRefreshLinkError: boolean }> = ({
  tokenRefreshLinkError
}) => {
  const intl = useIntl();
  const [, dispatchAppState] = useAppState();
  const {
    hasToken,
    isAuthenticated,
    tokenAuthLoading,
    tokenRefreshLoading,
    tokenVerifyLoading,
    user
  } = useAuth();
  const { channel } = useAppChannel(false);

  const channelLoaded = typeof channel !== "undefined";

  const homePageLoaded =
    channelLoaded &&
    isAuthenticated &&
    !tokenAuthLoading &&
    !tokenRefreshLoading &&
    !tokenVerifyLoading &&
    !tokenRefreshLinkError;

  const homePageLoading =
    (isAuthenticated && !channelLoaded) ||
    (hasToken && (tokenRefreshLoading || tokenVerifyLoading)) ||
    tokenRefreshLinkError;

  return (
    <>
      <WindowTitle title={intl.formatMessage(commonMessages.dashboard)} />
      {homePageLoaded ? (
        <BusinessProvider>
          <BusinessSelectorCheck>
            <AppLayout>
              <ErrorBoundary
                onError={e => {
                  const errorId = errorTracker.captureException(e);

                  dispatchAppState({
                    payload: {
                      error: "unhandled",
                      errorId
                    },
                    type: "displayError"
                  });
                }}
              >
                <Switch>
                  <SectionRoute exact path="/" component={HomePage} />
                  <SectionRoute
                    permissions={[PermissionEnum.MANAGE_PRODUCTS]}
                    path="/bookable-resources"
                    component={BookableResources}
                  />
                  <SectionRoute
                    permissions={[PermissionEnum.MANAGE_CATEGORIES]}
                    path="/categories"
                    component={CategorySection}
                  />
                  <SectionRoute
                    permissions={[PermissionEnum.MANAGE_COLLECTIONS]}
                    path="/collections"
                    component={CollectionSection}
                  />
                  <SectionRoute path="/business" component={BusinessSection} />
                  <SectionRoute
                    permissions={[PermissionEnum.MANAGE_USERS]}
                    path="/customers"
                    component={CustomerSection}
                  />

                  {/* <SectionRoute
                    permissions={[PermissionEnum.MANAGE_DISCOUNTS]}
                    path="/discounts"
                    component={DiscountSection}
                  /> */}

                  <SectionRoute
                    permissions={[PermissionEnum.MANAGE_PAGES]}
                    path="/pages"
                    component={PageSection}
                  />
                  <SectionRoute
                    permissions={[PermissionEnum.MANAGE_PAGES]}
                    path="/page-types"
                    component={PageTypesSection}
                  />
                  <SectionRoute
                    permissions={[PermissionEnum.MANAGE_PLUGINS]}
                    path="/plugins"
                    component={PluginsSection}
                  />
                  <SectionRoute
                    permissions={[PermissionEnum.MANAGE_ORDERS]}
                    path="/orders"
                    component={OrdersSection}
                  />
                  <SectionRoute
                    permissions={[PermissionEnum.MANAGE_PRODUCTS]}
                    path="/products"
                    component={ProductSection}
                  />
                  <SectionRoute
                    permissions={[
                      PermissionEnum.MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES
                    ]}
                    path="/product-types"
                    component={ProductTypesSection}
                  />
                  <Route exact path="/staff" component={StaffSection} />
                  <Route path="/staff/:id" component={StaffSection} />
                  <SectionRoute
                    permissions={[PermissionEnum.MANAGE_STAFF]}
                    path="/permission-groups"
                    component={PermissionGroupSection}
                  />
                  <SectionRoute
                    permissions={[PermissionEnum.MANAGE_SETTINGS]}
                    path="/site-settings"
                    component={SiteSettingsSection}
                  />
                  <SectionRoute
                    permissions={[PermissionEnum.MANAGE_SETTINGS]}
                    path="/taxes"
                    component={TaxesSection}
                  />
                  {/* <SectionRoute
                    permissions={[PermissionEnum.MANAGE_SHIPPING]}
                    path="/shipping"
                    component={ShippingSection}
                  /> */}
                  <SectionRoute
                    permissions={[PermissionEnum.MANAGE_TRANSLATIONS]}
                    path="/translations"
                    component={TranslationsSection}
                  />
                  <SectionRoute
                    permissions={[PermissionEnum.MANAGE_MENUS]}
                    path={navigationSection}
                    component={NavigationSection}
                  />
                  <SectionRoute
                    permissions={[
                      PermissionEnum.MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES
                    ]}
                    path={attributeSection}
                    component={AttributeSection}
                  />
                  <SectionRoute
                    permissions={[PermissionEnum.MANAGE_APPS]}
                    path={appsSection}
                    component={AppsSection}
                  />
                  {/* <SectionRoute
                    permissions={[PermissionEnum.MANAGE_PRODUCTS]}
                    path={warehouseSection}
                    component={WarehouseSection}
                  /> */}
                  <SectionRoute
                    permissions={[PermissionEnum.MANAGE_CHANNELS]}
                    path={channelsSection}
                    component={ChannelsSection}
                  />
                  <SectionRoute
                    permissions={[PermissionEnum.MANAGE_SETTINGS]}
                    path={customizationSection}
                    component={CustomizationSection}
                  />
                  <SectionRoute
                    permissions={[PermissionEnum.MANAGE_SETTINGS]}
                    path={chatwootSection}
                    component={ChatwootSection}
                  />
                  <SectionRoute
                    permissions={[
                      PermissionEnum.MANAGE_COMPANY_STATS,
                      PermissionEnum.MANAGE_USER_STATS,
                      PermissionEnum.MANAGE_PRODUCT_STATS
                    ]}
                    path={controlPanelSection}
                    component={ControlPanelSection}
                  />
                  {createConfigurationMenu(intl).filter(menu =>
                    menu.menuItems.map(item =>
                      hasPermission(item.permission, user)
                    )
                  ).length > 0 && (
                    <SectionRoute
                      exact
                      path="/configuration"
                      component={ConfigurationSection}
                    />
                  )}
                  <Route component={NotFound} />
                </Switch>
              </ErrorBoundary>
            </AppLayout>
          </BusinessSelectorCheck>
        </BusinessProvider>
      ) : homePageLoading ? (
        <LoginLoading />
      ) : (
        <Auth />
      )}
    </>
  );
};
