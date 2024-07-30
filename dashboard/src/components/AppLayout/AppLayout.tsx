import druralShrunkLogo from "@assets/images/dRuralLogos/Icon-Positive.svg";
import druralLogo from "@assets/images/dRuralLogos/Logo-Horizontal-Positive.svg";
import {
  SaleorTheme,
  Sidebar,
  SidebarDrawer,
  useBacklink,
  useSavebar,
  useTheme
} from "@drural/macaw-ui";
import { LinearProgress, useMediaQuery } from "@material-ui/core";
import { ChatwootWidget } from "@saleor/chatwoot/components/ChatwootWidget";
import { useShopChatwoot } from "@saleor/chatwoot/queries";
import useAppState from "@saleor/hooks/useAppState";
import useNavigator from "@saleor/hooks/useNavigator";
import useUser from "@saleor/hooks/useUser";
import { LogoBrandContext } from "@saleor/LogoBrandProvider/LogoBrandProvider";
import { staffMemberDetailsUrl } from "@saleor/staff/urls";
import { mapBusinessEdgesToPublicNames } from "@saleor/utils/maps";
import classNames from "classnames";
import React from "react";
import SVG from "react-inlinesvg";
import { useIntl } from "react-intl";
import useRouter from "use-react-router";

import { BusinessContext } from "../BusinessProvider";
import { BusinessSelector } from "../BusinessSelector";
import Container from "../Container";
import ErrorPage from "../ErrorPage";
import Navigator from "../Navigator";
// import NavigatorButton from "../NavigatorButton/NavigatorButton";
import UserChip from "../UserChip";
import useAppChannel from "./AppChannelContext";
import AppChannelSelect from "./AppChannelSelect";
import createMenuStructure from "./menuStructure";
import { useStyles } from "./styles";
import { AppLayoutProps } from "./types";
import { isMenuActive } from "./utils";

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  // 1. Hooks
  const classes = useStyles({});
  const { themeType, setTheme } = useTheme();
  const { anchor: appActionAnchor, docked } = useSavebar();
  const appHeaderAnchor = useBacklink();
  const { logout, user } = useUser();
  const navigate = useNavigator();
  const intl = useIntl();
  const [appState, dispatchAppState] = useAppState();
  const { location } = useRouter();
  const [isNavigatorVisible, setNavigatorVisibility] = React.useState(false);
  const isMdUp = useMediaQuery((theme: SaleorTheme) =>
    theme.breakpoints.up("md")
  );
  const { businessList, activeBusiness, setActiveBusiness } = React.useContext(
    BusinessContext
  );
  const brand = React.useContext(LogoBrandContext);
  const {
    availableChannels,
    channel,
    isPickerActive,
    setChannel
  } = useAppChannel(false);
  const [showChannelSelector] = React.useState(false);

  const { data: chatwootData } = useShopChatwoot({});
  const { chatwootCredentials } = chatwootData?.shop || {};
  const { hmac: hmacToken, websiteToken } = chatwootCredentials || {};

  // 2. Variables
  const menuStructure = createMenuStructure(intl, user);
  const activeMenu = menuStructure.find(menuItem =>
    isMenuActive(location.pathname, menuItem)
  )?.id;

  const isDark = themeType === "dark";
  const toggleTheme = () => setTheme(isDark ? "light" : "dark");
  const logo = <SVG src={brand?.logo || druralLogo} className={classes.logo} />;
  const shrunkLogo = (
    <SVG src={druralShrunkLogo} className={classes.shrunkLogo} />
  );

  // 3. Events
  const handleErrorBack = () => {
    navigate("/");
    dispatchAppState({
      payload: {
        error: null
      },
      type: "displayError"
    });
  };

  // 4. Render
  return (
    <>
      <Navigator
        visible={isNavigatorVisible}
        setVisibility={setNavigatorVisibility}
      />
      <div className={classes.root}>
        {isMdUp && (activeBusiness || user.isStaff) && (
          <Sidebar
            active={activeMenu}
            logo={logo}
            shrunkLogo={shrunkLogo}
            menuItems={menuStructure}
            onMenuItemClick={navigate}
          />
        )}
        <div className={classes.content}>
          {appState.loading ? (
            <LinearProgress className={classes.appLoader} color="primary" />
          ) : (
            <div className={classes.appLoaderPlaceholder} />
          )}
          <div className={classes.viewContainer}>
            <div>
              <Container>
                <div className={classes.header}>
                  <div className={classes.headerAnchor} ref={appHeaderAnchor} />
                  <div className={classes.headerToolbar}>
                    {!isMdUp && (activeBusiness || user.isStaff) && (
                      <SidebarDrawer
                        logo={logo}
                        menuItems={menuStructure}
                        onMenuItemClick={navigate}
                      />
                    )}
                    <div className={classes.spacer} />
                    <div className={classes.userBar}>
                      {/* <NavigatorButton
                        isMac={navigator.platform.toLowerCase().includes("mac")}
                        onClick={() => setNavigatorVisibility(true)}
                      /> */}
                      {isPickerActive && showChannelSelector && (
                        <AppChannelSelect
                          channels={availableChannels}
                          selectedChannelId={channel.id}
                          onChannelSelect={setChannel}
                        />
                      )}
                      {activeBusiness && !user.isStaff && (
                        <BusinessSelector
                          activeItemName={activeBusiness.active.node.publicName}
                          activeItemImage={
                            activeBusiness.active.node.imageUrl &&
                            activeBusiness.active.node.imageUrl
                          }
                          activeItemIndex={activeBusiness.index}
                          onLastItemClick={navigate}
                          lastItemUrl="/business"
                          onActiveItem={setActiveBusiness}
                          listTitle={intl.formatMessage({
                            defaultMessage: "My shops"
                          })}
                          itemList={mapBusinessEdgesToPublicNames(businessList)}
                          lastItemName={intl.formatMessage({
                            defaultMessage: "See all my shops"
                          })}
                        />
                      )}
                      <UserChip
                        isDarkThemeEnabled={isDark}
                        user={user}
                        onLogout={logout}
                        onProfileClick={() =>
                          navigate(staffMemberDetailsUrl(user.id))
                        }
                        onThemeToggle={toggleTheme}
                      />
                    </div>
                  </div>
                </div>
              </Container>
            </div>
            <main className={classes.view}>
              {appState.error
                ? appState.error.type === "unhandled" && (
                    <ErrorPage
                      id={appState.error.id}
                      onBack={handleErrorBack}
                    />
                  )
                : children}
            </main>
          </div>
          <div
            className={classNames(classes.appAction, {
              [classes.appActionDocked]: docked
            })}
            ref={appActionAnchor}
          />
        </div>
        {user.isSeller && websiteToken && hmacToken && (
          <ChatwootWidget hmacToken={hmacToken} websiteToken={websiteToken} />
        )}
      </div>
    </>
  );
};

export default AppLayout;
