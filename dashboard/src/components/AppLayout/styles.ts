import { makeStyles } from "@drural/macaw-ui";

import { appLoaderHeight } from "./consts";

export const useStyles = makeStyles(
  theme => ({
    // Imports Poppins font family. Material UI needs this type of import to recognise the font.
    "@global": {
      "@import":
        "url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap')"
    },
    appAction: {
      [theme.breakpoints.down("sm")]: {
        left: 0,
        width: "100%"
      },
      bottom: 0,
      gridColumn: 2,
      position: "sticky",
      zIndex: 10
    },
    appActionDocked: {
      position: "static"
    },
    appLoader: {
      height: appLoaderHeight,
      marginBottom: theme.spacing(4),
      zIndex: 1201
    },
    appLoaderPlaceholder: {
      height: appLoaderHeight,
      marginBottom: theme.spacing(4)
    },

    content: {
      flex: 1
    },
    darkThemeSwitch: {
      [theme.breakpoints.down("sm")]: {
        marginRight: theme.spacing(1)
      },
      marginRight: theme.spacing(2)
    },
    header: {
      alignItems: "flex-end",
      display: "grid",
      gridTemplateAreas: `"headerAnchor headerToolbar"`,
      [theme.breakpoints.down("sm")]: {
        gridTemplateAreas: `"headerToolbar" 
          "headerAnchor"`
      },
      marginBottom: theme.spacing(2.75)
    },
    headerAnchor: {
      gridArea: "headerAnchor"
    },
    headerToolbar: {
      display: "flex",
      gridArea: "headerToolbar",
      height: 40,
      [theme.breakpoints.down("sm")]: {
        height: "auto"
      }
    },
    logo: {
      width: "157px",
      height: "56px"
    },
    root: {
      [theme.breakpoints.up("md")]: {
        display: "flex"
      },
      width: `100%`
    },
    spacer: {
      flex: 1
    },
    shrunkLogo: {
      height: 36,
      marginTop: 12,
      width: 36
    },
    userBar: {
      alignItems: "center",
      display: "flex"
    },

    view: {
      flex: 1,
      flexGrow: 1,
      marginLeft: 0,
      paddingBottom: theme.spacing(),
      [theme.breakpoints.up("sm")]: {
        paddingBottom: theme.spacing(3)
      }
    },
    viewContainer: {
      minHeight: `calc(100vh + ${appLoaderHeight + 70}px - ${theme.spacing(2)})`
    }
  }),
  {
    name: "AppLayout"
  }
);
