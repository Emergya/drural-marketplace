import { lighten } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { darken, fade } from "@material-ui/core/styles/colorManipulator";

import { dRuralPalette } from "./palettes";

const colors = dRuralPalette.light;

export const dRuralInputOverrides = (
  newColors?: Record<string, string>
): Partial<Theme> => ({
  overrides: {
    MuiTextField: {
      root: {
        "&:hover": {
          "& .MuiFormLabel-root:not(.Mui-error)": {
            color: newColors?.primary || colors.primary
          },
          "& .MuiOutlinedInput-input": {
            "&:-webkit-autofill": {
              boxShadow: `inset 0 0 0px 1000px ${lighten(
                newColors?.primary || colors.primary,
                0.9
              )} !important`
            }
          }
        }
      }
    },
    MuiInputBase: {
      input: {
        transition: "all 300ms"
      }
    },
    MuiInputLabel: {
      root: {
        "&$disabled": {
          color: `${fade("#000000", 0.4)} !important` as any
        },
        "&&$focused": {
          "&:not($error)": {
            color: newColors?.primary || colors.primary
          }
        },
        "&$filled": {
          transform: "translate(12px, 8px) scale(0.8)"
        }
      }
    },
    MuiOutlinedInput: {
      root: {
        boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.1)",
        transition: "all 300ms",

        "& $notchedOutline": {
          borderColor: lighten(newColors?.secondary || colors.secondary, 0.8)
        },

        "&:hover": {
          backgroundColor: lighten(newColors?.primary || colors.primary, 0.9),

          "& $notchedOutline": {
            borderColor: newColors?.primary || colors.primary
          }
        },

        "&$disabled": {
          "& fieldset": {
            borderColor: [[colors.input.disabled], "!important"] as any
          },
          "& input": {
            backgroundColor: colors.input.disabledBackground,
            color: colors.input.disabledText,
            zIndex: 2
          }
        }
      },
      input: {
        "&:-webkit-autofill": {
          border: `1px solid ${colors.input.border}`,
          boxShadow: `inset 0 0 0px 1000px ${colors.autofill}`,
          "&:hover": {
            boxShadow: `inset 0 0 0px 1000px ${lighten(
              newColors?.primary || colors.primary,
              0.9
            )} !important`
          }
        },

        "&::placeholder": {
          color: lighten(newColors?.secondary || colors.secondary, 0.2)
        },

        // padding changed since font size was changed
        paddingTop: "24px",
        paddingBottom: "12px"
      }
    },
    MuiFormControlLabel: {
      label: {
        "&.Mui-disabled": {
          color: "#000000",
          opacity: 0.3
        }
      }
    },
    MuiFormLabel: {
      root: {
        "&:not($error)": {
          color: `${fade("#000000", 0.5)}`
        }
      },
      filled: {
        "&&:not($error)": {
          color: `${fade("#000000", 0.6)}`
        }
      }
    },
    MuiRadio: {
      root: {
        color: "#000000",
        "&.Mui-checked": {
          color: `${newColors?.primary || colors.primary} !important`
        }
      }
    },
    MuiCheckbox: {
      colorPrimary: {
        "&.Mui-checked": {
          color: darken(newColors?.primary || colors.primary, 0.1)
        },
        "&.Mui-disabled": {
          color: "#000000",
          opacity: 0.3
        }
      },
      indeterminate: {
        "& svg": {
          width: 22
        }
      },
      root: {
        padding: 12,
        "&.Mui-disabled": {
          color: "#000000",
          opacity: 0.3
        }
      }
    },
    MuiFormHelperText: {
      root: {
        "&.Mui-disabled": {
          color: "#000000",
          opacity: 0.3
        }
      }
    }
  }
});
