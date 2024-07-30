import backgroundArt from "@assets/images/drural-login.png";
import dRuralLogoHorizontalPositive from "@assets/images/dRuralLogos/Logo-Horizontal-Positive.svg";
// TODO review
/* import saleorDarkLogo from "@assets/images/logo-dark.svg";
import saleorLightLogo from "@assets/images/logo-light.svg";
import useTheme from "@saleor/hooks/useTheme"; */
// import { makeStyles } from "@drural/macaw-ui";
//  TODO REVIEW FULL COMPONENT
// import { useTheme } from "@drural/macaw-ui";
import { makeStyles } from "@drural/macaw-ui";
import { LogoBrandContext } from "@saleor/LogoBrandProvider/LogoBrandProvider";
import React from "react";
import SVG from "react-inlinesvg";

const useStyles = makeStyles(
  theme => ({
    logo: {
      display: "block",
      marginBottom: theme.spacing(4),
      padding: theme.spacing(1.5),
      width: "100%"
    },
    mainPanel: {
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(2)
      },
      background: theme.palette.background.default,
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      justifyContent: "center",
      padding: theme.spacing(6),
      width: "100%"
    },
    mainPanelContent: {
      [theme.breakpoints.up("xs")]: {
        width: "100%"
      },
      [theme.breakpoints.up("sm")]: {
        width: 328
      },
      "@media (min-width: 1440px)": {
        marginLeft: 240,
        width: 464
      },
      margin: "auto",
      width: "100%"
    },
    root: {
      [theme.breakpoints.up("lg")]: {
        gridTemplateColumns: "376px 1fr"
      },
      "@media (min-width: 1440px)": {
        gridTemplateColumns: "520px 1fr"
      },
      display: "grid",
      gridTemplateColumns: "1fr",
      height: "100vh",
      overflow: "hidden",
      width: "100vw"
    },
    sidebar: {
      [theme.breakpoints.up("lg")]: {
        display: "block"
      },
      display: "none"
    },
    sidebarArt: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }),
  {
    name: "Layout"
  }
);

const Layout: React.FC = props => {
  const { children } = props;

  const classes = useStyles(props);
  const brand = React.useContext(LogoBrandContext);
  // TODO review
  // const { themeType } = useTheme();
  /* const { isDark } = useTheme(); */

  return (
    <div className={classes.root}>
      <div className={classes.sidebar}>
        <img
          className={classes.sidebarArt}
          src={brand?.banner || backgroundArt}
        />
      </div>
      <div className={classes.mainPanel}>
        <div className={classes.mainPanelContent}>
          <SVG
            src={brand?.logo || dRuralLogoHorizontalPositive}
            className={classes.logo}
            // src={themeType === "dark" ? saleorDarkLogo : saleorLightLogo}
            /* src={isDark ? saleorDarkLogo : saleorLightLogo} */
          />
          {children}
        </div>
      </div>
    </div>
  );
};

Layout.displayName = "Layout";
export default Layout;
