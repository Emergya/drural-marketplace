import baseStyled, { ThemedStyledInterface } from "styled-components";

import * as C from "./constants-drural";
import { defaultTheme } from "./themes";

export const dRuralThemeGenerator = (
  C: any,
  newTheme?: Record<string, string>
) => ({
  ...defaultTheme,

  // Box Shadows
  boxShadow: {
    light: C.boxShadowLight,
  },

  // Buttons
  button: {
    ...defaultTheme.button,

    border: {
      radius: C.btnBorderRadius,
    },

    colors: {
      ...defaultTheme.button.colors,

      primary: {
        ...defaultTheme.button.colors.primary,
        // Active
        activeBackground: newTheme?.primaryDark || C.theme.primaryDark,
        // Normal
        background: newTheme?.primaryDark || C.theme.primaryDark,
        color: newTheme?.white || C.theme.white,
        // Hover
        hoverBackground: newTheme?.primary || C.theme.primary,
        hoverColor: newTheme?.white || C.theme.white,
        // Disabled
        disabledBackground: newTheme?.disabled || C.theme.disabled,
        disabledColor: newTheme?.white || C.theme.white,
      },

      secondary: {
        ...defaultTheme.button.colors.secondary,
        // Active
        activeBackground: newTheme?.druralGray || C.theme.druralGray,
        // Normal
        background: newTheme?.druralGray || C.theme.druralGray,
        color: newTheme?.white || C.theme.white,
        // Hover
        hoverBackground: newTheme?.primary || C.theme.primary,
        hoverColor: newTheme?.white || C.white,
        // Disabled
        disabledBackground: C.theme.disabled,
        disabledColor: newTheme?.white || C.theme.white,
      },

      ghost: {
        // Active
        activeBackground: newTheme?.white || C.theme.white,
        // Normal
        borderColor: newTheme?.black || C.theme.black,
        background: "transparent",
        color: newTheme?.black || C.theme.black,
        // Hover
        hoverBackground: "transparent",
        hoverBorderColor: newTheme?.primary || C.theme.primary,
        hoverColor: newTheme?.primary || C.theme.primary,
        // Disabled
        disabledBackground: "transparent",
        disabledBorderColor: newTheme?.disabled || C.theme.disabled,
        disabledColor: newTheme?.disabled || C.theme.disabled,
      },

      labelOnly: {
        // Active
        activeBackground: "transparent",
        // Normal
        background: "transparent",
        color: newTheme?.black || C.theme.black,
        // Hover
        hoverBackground: "transparent",
        hoverColor: newTheme?.primary || C.theme.primary,
        // Disabled
        disabledBackground: "transparent",
        disabledColor: newTheme?.disabled || C.theme.disabled,
      },

      labelOnlyPrimary: {
        // Active
        activeBackground: "transparent",
        // Normal
        background: "transparent",
        color: newTheme?.primaryDark || C.theme.primaryDark,
        // Hover
        hoverBackground: "transparent",
        hoverColor: newTheme?.primary || C.theme.primary,
        // Disabled
        disabledBackground: "transparent",
        disabledColor: newTheme?.disabled || C.theme.disabled,
      },
    },

    height: C.xlSize,

    padding: {
      ...defaultTheme.button.padding,
      md: `${C.xsSize} 2.5rem`,
      sm: `${C.xsSize} 2.5rem`,
    },

    typography: {
      ...defaultTheme.button.typography,
      fontSize: C.p16FontSize,
      smallFontSize: C.p14FontSize,
      fontWeight: C.boldFontWeight,
      lineHeight: C.textLineHeight,
      textTransform: C.uppercase,
    },
  },

  // iconButton: { toComplete }

  // Colors
  colors: {
    ...C.theme,
    ...newTheme,
  },

  // Container
  container: {
    ...defaultTheme.container,
    width: C.containerWidth,
  },

  // Grid
  grid: {
    ...defaultTheme.grid,
    containerWidth: C.containerWidth,
    colsSpace: C.colsSpace,
    rowsSpace: C.rowsSpace,
  },

  // Links
  link: {
    ...defaultTheme.link,
    base: {
      ...defaultTheme.link.base,
      color: C.primary,
      hoverColor: C.black,
    },
    secondary: {
      ...defaultTheme.link,
      color: C.black,
      hoverColor: C.primary,
    },
  },

  // Header
  header: {
    height: {
      desktop: C.desktopHeight,
      mobile: C.mobileHeight,
    },
  },

  // Modal
  modal: {
    modalMinHeight: 816,
    modalWidth: 1186,
  },

  // Typografy
  typography: {
    ...defaultTheme.typography,
    // Base font family
    baseFontFamily: C.baseFontFamily,
    // Headers
    h1FontSize: C.h1FontSize,
    h1MovilFontSize: C.h1MovilFontSize,
    h1LineHeight: C.h1LineHeight,
    h1MovilLineHeight: C.h1MovilLineHeight,
    h2FontSize: C.h2FontSize,
    h2LineHeight: C.h2LineHeight,
    h3FontSize: C.h3FontSize,
    h3LineHeight: C.h3LineHeight,
    h4FontSize: C.h4FontSize,
    h4LineHeight: C.h4LineHeight,
    h5FontSize: C.h5FontSize,
    h5LineHeight: C.h5LineHeight,
    // Custom titles
    lightTitleFontSize: C.lightTitleFontSize,
    lightTitleLineHeight: C.lightTitleLineHeight,
    preTitleFontSize: C.preTitleFontSize,
    preTitleLineHeight: C.preTitleLineHeight,
    // Parragraphs
    p20FontSize: C.p20FontSize, // p20
    p18FontSize: C.p18FontSize, // p18
    baseFontSize: C.p16FontSize, // p16
    smallFontSize: C.p14FontSize, // p14
    smallTextFontSize: C.smallTextFontSize, // smallText
    extraSmallTextFontSize: C.extraSmallTextFontSize, // extraSmallText
    baseLineHeight: C.textLineHeight,
    extraSmallTextLineHeight: C.extraSmallTextLineHeight,
    // Links
    linkFontSize: C.linkFontSize,
    linkLineHeight: C.linkLineHeight,
    // Weights
    extraBoldFontWeight: C.extraBoldFontWeight,
    boldFontWeight: C.boldFontWeight,
    semiBoldFontWeight: C.semiBoldFontWeight,
    normalFontWeight: C.normalFontWeight,
    lightFontWeight: C.lightFontWeight,
    // Text transforms
    uppercase: C.uppercase,
    capitalize: C.capitalize,
    lowercase: C.lowercase,
    // Padding between thumbnail and title
    thumbTitleSpace: C.sSize,
  },
  tile: {
    ...defaultTheme.tile,
    backgroundColor: C.white,
  },
});

export const dRuralTheme = {
  ...defaultTheme,

  // Box Shadows
  boxShadow: {
    light: C.boxShadowLight,
  },

  // Buttons
  button: {
    ...defaultTheme.button,

    border: {
      radius: C.btnBorderRadius,
    },

    colors: {
      ...defaultTheme.button.colors,

      primary: {
        ...defaultTheme.button.colors.primary,
        // Active
        activeBackground: C.theme.primaryDark,
        // Normal
        background: C.theme.primaryDark,
        color: C.theme.white,
        // Hover
        hoverBackground: C.theme.primary,
        hoverColor: C.theme.white,
        // Disabled
        disabledBackground: C.theme.disabled,
        disabledColor: C.theme.white,
      },

      secondary: {
        ...defaultTheme.button.colors.secondary,
        // Active
        activeBackground: C.theme.druralGray,
        // Normal
        background: C.theme.druralGray,
        color: C.theme.white,
        // Hover
        hoverBackground: C.theme.primary,
        hoverColor: C.white,
        // Disabled
        disabledBackground: C.theme.disabled,
        disabledColor: C.theme.white,
      },

      ghost: {
        // Active
        activeBackground: C.theme.white,
        // Normal
        borderColor: C.theme.black,
        background: "transparent",
        color: C.theme.black,
        // Hover
        hoverBackground: "transparent",
        hoverBorderColor: C.theme.primary,
        hoverColor: C.theme.primary,
        // Disabled
        disabledBackground: "transparent",
        disabledBorderColor: C.theme.disabled,
        disabledColor: C.theme.disabled,
      },

      labelOnly: {
        // Active
        activeBackground: "transparent",
        // Normal
        background: "transparent",
        color: C.theme.black,
        // Hover
        hoverBackground: "transparent",
        hoverColor: C.theme.primary,
        // Disabled
        disabledBackground: "transparent",
        disabledColor: C.theme.disabled,
      },

      labelOnlyPrimary: {
        // Active
        activeBackground: "transparent",
        // Normal
        background: "transparent",
        color: C.theme.primaryDark,
        // Hover
        hoverBackground: "transparent",
        hoverColor: C.theme.primary,
        // Disabled
        disabledBackground: "transparent",
        disabledColor: C.theme.disabled,
      },
    },

    height: C.xlSize,

    padding: {
      ...defaultTheme.button.padding,
      md: `${C.xsSize} 2.5rem`,
      sm: `${C.xsSize} 2.5rem`,
    },

    typography: {
      ...defaultTheme.button.typography,
      fontSize: C.p16FontSize,
      smallFontSize: C.p14FontSize,
      fontWeight: C.boldFontWeight,
      lineHeight: C.textLineHeight,
      textTransform: C.uppercase,
    },
  },

  // iconButton: { toComplete }

  // Colors
  colors: {
    ...C.theme,
  },

  // Container
  container: {
    ...defaultTheme.container,
    width: C.containerWidth,
  },

  // Dropdown
  dropdown: {
    ...defaultTheme.dropdown,
    boxShadow: " 0px 4px 8px rgba(0, 0, 0, 0.2)",
  },

  // Grid
  grid: {
    ...defaultTheme.grid,
    containerWidth: C.containerWidth,
    colsSpace: C.colsSpace,
    rowsSpace: C.rowsSpace,
  },

  // Links
  link: {
    ...defaultTheme.link,
    base: {
      ...defaultTheme.link.base,
      color: C.primary,
      hoverColor: C.black,
    },
    secondary: {
      ...defaultTheme.link,
      color: C.black,
      hoverColor: C.primary,
    },
  },

  // Header
  header: {
    height: {
      desktop: C.desktopHeight,
      mobile: C.mobileHeight,
    },
  },

  // Modal
  modal: {
    modalMinHeight: 816,
    modalWidth: 1186,
  },

  // Typografy
  typography: {
    ...defaultTheme.typography,
    // Base font family
    baseFontFamily: C.baseFontFamily,
    // Headers
    h1FontSize: C.h1FontSize,
    h1MovilFontSize: C.h1MovilFontSize,
    h1LineHeight: C.h1LineHeight,
    h1MovilLineHeight: C.h1MovilLineHeight,
    h2FontSize: C.h2FontSize,
    h2LineHeight: C.h2LineHeight,
    h3FontSize: C.h3FontSize,
    h3LineHeight: C.h3LineHeight,
    h4FontSize: C.h4FontSize,
    h4LineHeight: C.h4LineHeight,
    h5FontSize: C.h5FontSize,
    h5LineHeight: C.h5LineHeight,
    // Custom titles
    lightTitleFontSize: C.lightTitleFontSize,
    lightTitleLineHeight: C.lightTitleLineHeight,
    preTitleFontSize: C.preTitleFontSize,
    preTitleLineHeight: C.preTitleLineHeight,
    // Parragraphs
    p20FontSize: C.p20FontSize, // p20
    p18FontSize: C.p18FontSize, // p18
    baseFontSize: C.p16FontSize, // p16
    smallFontSize: C.p14FontSize, // p14
    smallTextFontSize: C.smallTextFontSize, // smallText
    extraSmallTextFontSize: C.extraSmallTextFontSize, // extraSmallText
    baseLineHeight: C.textLineHeight,
    extraSmallTextLineHeight: C.extraSmallTextLineHeight,
    // Links
    linkFontSize: C.linkFontSize,
    linkLineHeight: C.linkLineHeight,
    // Weights
    extraBoldFontWeight: C.extraBoldFontWeight,
    boldFontWeight: C.boldFontWeight,
    semiBoldFontWeight: C.semiBoldFontWeight,
    normalFontWeight: C.normalFontWeight,
    lightFontWeight: C.lightFontWeight,
    // Text transforms
    uppercase: C.uppercase,
    capitalize: C.capitalize,
    lowercase: C.lowercase,
    // Padding between thumbnail and title
    thumbTitleSpace: C.sSize,
  },
  tile: {
    ...defaultTheme.tile,
    backgroundColor: C.white,
  },
};

export type DruralTheme = typeof dRuralTheme;
export const styled = baseStyled as ThemedStyledInterface<DruralTheme>;
