import { lighten, Theme } from "@material-ui/core";

import { dRuralPalette } from "./palettes";

const colors = dRuralPalette.light;

export const dRuralTableOverrides = (
  newColors?: Record<string, string>
): Partial<Theme> => ({
  overrides: {
    MuiTableCell: {
      head: {
        color: "#000000",
        fontSize: "16px",
        lineHeight: "24px",
        padding: "16px 24px"
      },
      body: {
        color: lighten("#000000", 0.4)
      },
      paddingCheckbox: {
        textAlign: "center"
      },
      root: {
        borderBottomColor: lighten(
          newColors?.secondary || colors.secondary,
          0.8
        ),
        padding: "16px 24px"
      }
    },
    MuiTableRow: {
      footer: {
        backgroundColor: lighten(
          newColors?.secondary || colors.secondary,
          0.95
        ),

        "&:hover": {
          backgroundColor: lighten(
            newColors?.secondary || colors.secondary,
            0.95
          ),
          cursor: "default"
        }
      },
      head: {
        "&:hover": {
          backgroundColor: "inherit",
          cursor: "default"
        }
      },
      root: {
        "&:hover": {
          backgroundColor: lighten(newColors?.primary || colors.primary, 0.7),
          cursor: "pointer",

          "& .MuiTableCell-body": {
            color: "#000000"
          }
        }
      }
    }
  }
});
