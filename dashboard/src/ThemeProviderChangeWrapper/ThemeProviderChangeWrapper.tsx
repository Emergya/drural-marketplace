import { ThemeProvider } from "@drural/macaw-ui";
import { shopCustomization } from "@saleor/customization/queries";
import { ShopCustomization } from "@saleor/customization/types/ShopCustomization";
import useLocalStorage from "@saleor/hooks/useLocalStorage";
import { LogoBrandProvider } from "@saleor/LogoBrandProvider/LogoBrandProvider";
import { dRuralPalette } from "@saleor/theme/overrides/palettes";
import dRuralThemeOverrides from "@saleor/theme/overrides/themeOverrides";
import React from "react";
import { useQuery } from "react-apollo";

export const ThemeProviderChangeWrapper: React.FC = ({ children }) => {
  const [newTheme, setNewTheme] = useLocalStorage<Record<string, string>>(
    "newTheme",
    undefined
  );

  const { data } = useQuery<ShopCustomization>(shopCustomization);

  React.useEffect(() => {
    if (data?.shop?.primaryColor || data?.shop?.secondaryColor) {
      const updatedTheme = {
        primary: data?.shop?.primaryColor || dRuralPalette.light.primary,
        secondary: data?.shop?.secondaryColor || dRuralPalette.light.secondary
      };

      if (!(JSON.stringify(updatedTheme) === JSON.stringify(newTheme))) {
        setNewTheme(updatedTheme);
      }
    }
  }, [data]);

  return (
    <ThemeProvider
      overrides={dRuralThemeOverrides(newTheme)}
      palettes={{
        ...dRuralPalette,
        light: {
          ...dRuralPalette.light,
          ...newTheme
        }
      }}
    >
      <LogoBrandProvider> {children}</LogoBrandProvider>
    </ThemeProvider>
  );
};
