import { Theme } from "@material-ui/core/styles";
import { darken } from "@material-ui/core/styles/colorManipulator";

import { dRuralPalette } from "./palettes";

const colors = dRuralPalette.light;

export const dRuralButtonOverrides = (
  newColors?: Record<string, string>
): Partial<Theme> => ({
  overrides: {
    MuiButton: {
      label: {
        fontWeight: 400,
        transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
      },
      // LABEL ONLY PRIMARY BUTTON (color = "primary")
      textPrimary: {
        "& span": {
          color: darken(newColors?.primary || colors.primary, 0.1)
        },
        "&:hover": {
          backgroundColor: "#FFFFFF"
        },
        "&:hover span": {
          color: newColors?.primary || colors.primary
        },
        "&$disabled span": {
          color: colors.gray.disabled
        },
        "&:not(.Mui-disabled) span": {
          color: darken(newColors?.primary || colors.primary, 0.1),
          "&:hover": {
            color: newColors?.primary || colors.primary
          }
        }
      },
      // LABEL ONLY BUTTON: LIGHT UI (color = "secondary")
      textSecondary: {
        color: "#000000",
        "& span": {
          // color: colors.secondary
        },
        "&:hover": {
          backgroundColor: "#FFFFFF"
        },
        "&:hover span": {
          color: newColors?.primary || colors.primary
        },
        "&$disabled span": {
          color: colors.gray.disabled
        }
      },
      // PRIMARY BUTTON (color = "primary", variant="contained")
      containedPrimary: {
        backgroundColor: darken(newColors?.primary || colors.primary, 0.1),
        "&:active": {
          backgroundColor: darken(newColors?.primary || colors.primary, 0.4)
        },
        "&:hover": {
          backgroundColor: newColors?.primary || colors.primary
        },
        "&$disabled span": {
          color: "#FFFFFF"
        }
      },
      // SECONDARY BUTTON (color = "secondary", variant="contained")
      containedSecondary: {
        backgroundColor: newColors?.secondary || colors.secondary,
        "&:active": {
          backgroundColor: darken(newColors?.secondary || colors.secondary, 0.4)
        },
        "&:hover": {
          backgroundColor: newColors?.primary || colors.primary
        },
        "&$disabled span": {
          color: "#FFFFFF"
        }
      },
      contained: {
        "&$disabled": {
          backgroundColor: colors.gray.disabled
        }
      },
      outlined: {
        padding: "10px 36px",

        "@media(max-width: 600px)": {
          padding: "10px 24px"
        }
      },
      // GHOST BUTTON: LIGHT UI (color = "secondary", variant="outlined")
      outlinedSecondary: {
        border: "2px solid #000000",
        "& span": {
          color: "#000000"
        },
        "&:hover": {
          backgroundColor: "transparent",
          border: `2px solid ${newColors?.primary || colors.primary}`,
          color: newColors?.primary || colors.primary,
          "& span": {
            color: newColors?.primary || colors.primary
          }
        },
        "&$disabled": {
          border: `2px solid ${colors.gray.disabled}`,
          "& span": {
            color: colors.gray.disabled
          }
        }
      },
      root: {
        borderRadius: 24,
        color: "#000000",
        fontSize: 14,
        lineHeight: "24px",
        padding: "12px 38px",
        textTransform: "capitalize",
        transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        "@media(max-width: 600px)": {
          padding: "12px 24px"
        },
        "&:hover": {
          backgroundColor: "#FFFFFF"
        },
        startIcon: {
          marginRight: 12
        },
        text: {
          padding: "12px 38px",

          "@media(max-width: 600px)": {
            padding: "12px 24px"
          }
        },
        endIcon: {
          marginLeft: 16
        }
      }
    }
  }
});
