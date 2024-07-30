import { Theme } from "@material-ui/core";

export const dRuralDialogOverrides: Partial<Theme> = {
  overrides: {
    MuiDialog: {
      paper: {
        margin: 8
      }
    },
    MuiDialogTitle: {
      root: {
        borderBottom: "none",
        textAlign: "center"
      }
    },
    MuiDialogActions: {
      root: {
        borderTop: "none",
        justifyContent: "center"
      }
    }
  }
};
