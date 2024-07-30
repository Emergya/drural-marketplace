import { darken, lighten } from "@material-ui/core/styles";
import React from "react";
import { useQuery } from "react-apollo";
import { ThemeProvider } from "styled-components";

import { useLocalStorage } from "@hooks/useLocalStorage";
import { dRuralThemeGenerator } from "@styles";

import * as C from "../../../globalStyles/constants-drural";
import { ShopCustomization } from "./gqlTypes/ShopCustomization";
import { shopCustomization } from "./queries";

export const ThemeProviderChangeWrapper: React.FC = ({ children }) => {
  const { storedValue: newTheme, setValue: setNewTheme } = useLocalStorage<
    Record<string, string>
  >("newTheme", undefined);

  const { data } = useQuery<ShopCustomization>(shopCustomization, {
    fetchPolicy: "network-only",
  });

  React.useEffect(() => {
    const defaultTheme: Record<string, string> = {
      primary: C.primary,
      primary100: C.primary_100,
      primary700: C.primary_700,
      primaryDark: C.primary_600,
      primaryLight: C.primary_200,
      primaryTransparent: C.primary_100,
      secondary: C.secondary,
      secondaryDark: C.secondary_600,
      secondaryLight: C.secondary_200,
    };
    if (data?.shop?.primaryColor) {
      defaultTheme.primary = data?.shop?.primaryColor;
      defaultTheme.primary100 = lighten(data.shop.primaryColor, 0.9);
      defaultTheme.primary700 = darken(data.shop.primaryColor, 0.2);
      defaultTheme.primaryDark = darken(data.shop.primaryColor, 0.1);
      defaultTheme.primaryLight = lighten(data.shop.primaryColor, 0.7);
      defaultTheme.primaryTransparent = lighten(data.shop.primaryColor, 0.9);
      defaultTheme.primary_300 = lighten(data.shop.primaryColor, 0.5);
      defaultTheme.primary_400 = lighten(data.shop.primaryColor, 0.3);
      defaultTheme.success = data?.shop?.primaryColor;
      defaultTheme.thumbnailBorder = darken(data.shop.primaryColor, 0.1);
      defaultTheme.activeMenuOption = darken(data.shop.primaryColor, 0.1);
      defaultTheme.bannerLink = darken(data.shop.primaryColor, 0.1);
      defaultTheme.hoverLightBackground = lighten(data.shop.primaryColor, 0.7);
      defaultTheme.listBullet = darken(data.shop.primaryColor, 0.1);
      defaultTheme.tabTitle = darken(data.shop.primaryColor, 0.1);
    }

    if (data?.shop?.secondaryColor) {
      defaultTheme.druralGray = data.shop.secondaryColor;
      defaultTheme.druralGray_100 = lighten(data.shop.secondaryColor, 0.8);
      defaultTheme.druralGray_200 = lighten(data.shop.secondaryColor, 0.6);
      defaultTheme.druralGray_300 = lighten(data.shop.secondaryColor, 0.4);
      defaultTheme.druralGray_400 = lighten(data.shop.secondaryColor, 0.2);
      defaultTheme.borderGray = lighten(data.shop.secondaryColor, 0.8);
      defaultTheme.grayDark = darken(data.shop.secondaryColor, 0.2);
      defaultTheme.grayLight = lighten(data.shop.secondaryColor, 0.8);
      defaultTheme.tableDivider = lighten(data.shop.secondaryColor, 0.8);
      defaultTheme.tabsBorder = lighten(data.shop.secondaryColor, 0.8);
      defaultTheme.autofillSelected = lighten(data.shop.secondaryColor, 0.8);
      defaultTheme.bannerBackground = lighten(data.shop.secondaryColor, 0.95);
      defaultTheme.bannerEdge = lighten(data.shop.secondaryColor, 0.4);
      defaultTheme.baseFontColorSemiTransparent = data.shop.secondaryColor;
      defaultTheme.baseFontColorTransparent = lighten(
        data.shop.secondaryColor,
        0.8
      );
      defaultTheme.dark = darken(data.shop.secondaryColor, 0.4);
      defaultTheme.divider = lighten(data.shop.secondaryColor, 0.95);
      defaultTheme.dividerDark = lighten(data.shop.secondaryColor, 0.6);
      defaultTheme.lightFont = data.shop.secondaryColor;
      defaultTheme.listAttributeName = data.shop.secondaryColor;
    }

    if (data?.shop?.primaryColor || data?.shop?.secondaryColor) {
      if (!(JSON.stringify(defaultTheme) === JSON.stringify(newTheme))) {
        setNewTheme(defaultTheme);
      }
    }
  }, [data]);

  return (
    <ThemeProvider theme={dRuralThemeGenerator(C, newTheme)}>
      <>{children}</>
    </ThemeProvider>
  );
};
