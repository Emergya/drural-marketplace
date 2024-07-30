import { Themes } from "@drural/macaw-ui";
import { light } from "@drural/macaw-ui";

export const dRuralPalette: Partial<Themes> = {
  light: {
    ...light,
    alert: {
      // Warning and Error colors for alerts --> $secondary and $errorRed
      paper: {
        ...light.alert.paper,
        success: "#C4F4E5",
        error: "#CC0000",
        warning: "#F9AF42"
      },
      icon: {
        ...light.alert.icon,
        success: "#3CDCAA",
        error: "#CC0000",
        warning: "#F9AF42"
      }
    },
    background: {
      // Body background color
      default: "#F7F6F8",
      paper: "#FFFFFF"
    },
    // Generic errors --> $errorRed
    error: "#CC0000",
    gray: {
      ...light.gray,
      // disabled buttons --> $dRuralGrey100
      disabled: "#E5E5E5"
    },
    // $primary
    primary: "#3CDCAA",
    // $druralGrey
    secondary: "#676173",
    autofill: "#FFFFFF",
    input: {
      ...light.input,
      border: "#3CDCAA",
      disabled: "#E6E6E6",
      disabledBackground: "#F3F3F3"
    },
    divider: "#E0DEE3"
  }
};
