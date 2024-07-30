import { lighten, Theme } from "@material-ui/core/styles";
import themeOverrides from "@saleor/themeOverrides";

import { dRuralDialogOverrides } from "../ruralDialog";
import { dRuralPalette } from "./palettes";
import { dRuralButtonOverrides } from "./ruralButtons";
import { dRuralInputOverrides } from "./ruralInputs";
import { dRuralTableOverrides } from "./ruralTable";

const colors = dRuralPalette.light;

// These are variables for the pxToRem function, which is required in the property typography
const fontSizeToRem = 16; // px
// Tell Material-UI what's the font-size on the html element.
const htmlFontSize = 16;
const coef = fontSizeToRem / 14;

const fontFamily = '"Poppins", "roboto", "sans-serif"';

const dRuralThemeOverrides = (
  newColors?: Record<string, string>
): Partial<Theme> => ({
  typography: {
    fontFamily,
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightBold: 600,
    fontWeightMedium: 400,
    pxToRem: size => `${(size / htmlFontSize) * coef}rem`,
    h1: {
      fontWeight: 600,
      fontSize: "48px",
      lineHeight: "72px",
      fontFamily
    },
    h2: {
      fontFamily,
      fontWeight: 600,
      fontSize: "28px",
      lineHeight: "40px"
    },
    h3: {
      fontFamily,
      fontWeight: 600,
      fontSize: "22px",
      lineHeight: "32px"
    },
    h4: {
      fontFamily,
      fontWeight: 600,
      fontSize: "18px",
      lineHeight: "24px"
    },
    h5: {
      fontFamily,
      fontWeight: 600,
      fontSize: "14px",
      lineHeight: "20px"
    },
    // DEFAULT STYLES (Small and Extra small texts must be customized)
    h6: {
      // Light Title
      fontFamily,
      fontWeight: 300,
      fontSize: "20px",
      lineHeight: "32px"
    },
    subtitle1: {
      // PRETITLE
      fontFamily,
      fontWeight: 600,
      fontSize: "12px",
      lineHeight: "18px",
      letterSpacing: "0.05em",
      textTransform: "uppercase"
    },
    subtitle2: {
      fontFamily
    },
    body1: {
      // Paragraph 16
      fontFamily,
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: "24px"
    },
    body2: {
      // Paragraph 14
      fontFamily,
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "24px"
    },
    caption: {
      fontFamily
    },
    button: {
      fontFamily
    },
    overline: {
      fontFamily
    }
  },
  overrides: {
    ...dRuralInputOverrides(newColors).overrides,
    ...dRuralButtonOverrides(newColors).overrides,
    ...dRuralDialogOverrides.overrides,
    ...dRuralTableOverrides(newColors).overrides,
    ...themeOverrides,
    // MuiCssBaseline: {
    //   "@global": {
    //     "@font-face": [poppinsFont]
    //   }
    // },
    MuiCard: {
      root: {
        borderWidth: 0,
        boxShadow: "0px 4px 16px 0px rgba(0, 0, 0, 0.1)",
        color: "#000000"
      }
    },
    MuiChip: {
      clickable: {
        "&:hover, &:focus": {
          backgroundColor: "#ffffff"
        }
      }
    },
    MuiExpansionPanel: {
      rounded: {
        "&:last-child": {
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px"
        }
      }
    },
    MuiIconButton: {
      label: {
        width: "inherit"
      },
      root: {
        height: 38,
        width: 38
      }
    },
    MuiList: {
      root: {
        padding: 0,
        gridRowGap: 0
      }
    },
    MuiMenuItem: {
      root: {
        color: "#000000",
        borderRadius: 0,
        minWidth: 340,
        paddingBottom: 13,
        paddingLeft: 24,
        paddingRight: 14,
        paddingTop: 13,

        "&:hover": {
          backgroundColor: lighten(newColors?.primary || colors.primary, 0.7)
        }
      }
    },
    MuiPaper: {
      root: {
        borderRadius: "8px"
      },
      rounded: {
        borderRadius: 16
      }
    },
    MuiSwitch: {
      colorPrimary: {
        // Selected
        "&.Mui-checked + .MuiSwitch-track": {
          backgroundColor: `${lighten(
            newColors?.primary || colors.primary,
            0.3
          )} !important`
        },

        // Disabled
        "&.Mui-disabled + .MuiSwitch-track": {
          backgroundColor: lighten(
            newColors?.secondary || colors.secondary,
            0.8
          )
        },

        "&.Mui-disabled": {
          color: "#fff"
        }
      },
      disabled: {
        opacity: 0.6,
        cursor: "not-allowed !important"
      },
      root: {
        alignItems: "center",
        height: 40,
        padding: 0,
        width: 64
      },
      switchBase: {
        left: -2,
        top: 1
      },
      thumb: {
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.3)",
        height: "32px",
        width: "32px"
      },
      track: {
        backgroundColor: lighten(newColors?.secondary || colors.secondary, 0.8),
        borderRadius: "20px",
        height: "40px",
        width: "64px"
      }
    },
    MuiTabs: {
      indicator: {
        backgroundColor: newColors?.primary || colors.primary,
        height: 4
      }
    },
    MuiTooltip: {
      tooltip: {
        fontSize: 11
      }
    },
    MuiTypography: {
      colorTextPrimary: {
        color: "#000000"
      },
      body1: {
        color: "#000000"
      },
      caption: {
        color: lighten(newColors?.secondary || colors.secondary, 0.2)
      }
    }
  },
  // Additional dRural colors
  customColors: {
    blueGray: "#87A2C7"
  }
});
export default dRuralThemeOverrides;
