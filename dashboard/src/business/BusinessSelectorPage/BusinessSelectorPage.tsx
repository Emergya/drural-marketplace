import dRuralLogoHorizontalPositive from "@assets/images/dRuralLogos/Logo-Horizontal-Positive.svg";
import { makeStyles, useTheme } from "@drural/macaw-ui";
import Typography from "@material-ui/core/Typography";
import Container from "@saleor/components/Container";
import useUser from "@saleor/hooks/useUser";
import React from "react";
import SVG from "react-inlinesvg";
import { FormattedMessage } from "react-intl";

import { BusinessContext } from "../../components/BusinessProvider";
import CardSpacer from "../../components/CardSpacer";
import UserChip from "../../components/UserChip";
import { BusinessesGrid } from "./views/CardGrid";
import { NoBusinessView } from "./views/NoBusinessView";

const useStyles = makeStyles(
  theme => ({
    container: {
      width: "100%",
      textAlign: "center",
      marginBottom: "50px"
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "24px"
    },
    logo: {
      height: "56px",
      width: "157px",
      [theme.breakpoints.down("sm")]: {
        height: "40px",
        width: "112px"
      }
    }
  }),
  { name: "BusinessSelectorPage" }
);

export interface BusinessPageProps {
  setFirstBusiness: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BusinessSelectorPage: React.FC<BusinessPageProps> = ({
  setFirstBusiness
}) => {
  const { businessList, setActiveBusiness } = React.useContext(BusinessContext);

  const classes = useStyles({});
  const { themeType, setTheme } = useTheme();
  const { logout, user } = useUser();
  const isDark = themeType === "dark";
  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  return (
    <Container>
      <div className={classes.header}>
        <SVG src={dRuralLogoHorizontalPositive} className={classes.logo} />
        <UserChip
          isDarkThemeEnabled={isDark}
          user={user}
          onLogout={logout}
          onThemeToggle={toggleTheme}
          onlyLogoutMenu={true}
        />
      </div>
      <div className={classes.container}>
        <h1>
          <FormattedMessage
            defaultMessage="Hello, {name}"
            values={{
              name: user.firstName
            }}
          />
        </h1>
        {businessList.length !== 0 && (
          <Typography variant="body1" color="textSecondary" component="p">
            <FormattedMessage defaultMessage="First, select the shop you want to operate on." />
          </Typography>
        )}
      </div>
      <CardSpacer />
      {(() => {
        if (businessList.length === 0) {
          return <NoBusinessView setFirstBusiness={setFirstBusiness} />;
        } else if (businessList.length === 1) {
          setActiveBusiness(0);
        } else {
          return (
            <BusinessesGrid
              businessList={businessList}
              setActiveBusiness={setActiveBusiness}
            />
          );
        }
      })()}
    </Container>
  );
};
