import { makeStyles } from "@drural/macaw-ui";
import { Card, CardContent, lighten, Typography } from "@material-ui/core";
import { IconProps } from "@material-ui/core/Icon";
import { User } from "@saleor/fragments/types/User";
import { sectionNames } from "@saleor/intl";
import React from "react";
import { useIntl } from "react-intl";

import { hasPermission } from "../auth/misc";
import Container from "../components/Container";
import PageHeader from "../components/PageHeader";
import { PermissionEnum } from "../types/globalTypes";

export interface MenuItem {
  description: string;
  icon: React.ReactElement<IconProps>;
  permission: PermissionEnum;
  title: string;
  url?: string;
  testId?: string;
}

export interface MenuSection {
  label: string;
  menuItems: MenuItem[];
}

const useStyles = makeStyles(
  theme => ({
    card: {
      "&:hover": {
        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.15);"
      },
      cursor: "pointer",
      marginBottom: theme.spacing(3),
      transition: theme.transitions.duration.standard + "ms"
    },
    cardContent: {
      // Overrides Material-UI default theme
      "&:last-child": {
        paddingBottom: 16
      },
      display: "grid",
      gridColumnGap: theme.spacing(4),
      gridTemplateColumns: "48px 1fr"
    },
    cardDisabled: {
      "& $icon, & $sectionTitle, & $sectionDescription": {
        color: theme.palette.text.disabled
      },
      marginBottom: theme.spacing(3)
    },
    configurationCategory: {
      [theme.breakpoints.down("md")]: {
        gridTemplateColumns: "1fr"
      },
      borderTop: `solid 1px ${theme.palette.divider}`,
      display: "grid",
      gridColumnGap: theme.spacing(4),
      gridTemplateColumns: "1fr 3fr",
      paddingTop: theme.spacing(3)
    },
    configurationItem: {
      [theme.breakpoints.down("md")]: {
        gridTemplateColumns: "1fr"
      },
      display: "grid",
      gridColumnGap: theme.spacing(4),
      gridTemplateColumns: "1fr 1fr"
    },
    configurationLabel: {
      paddingBottom: 20
    },
    header: {
      margin: 0
    },
    icon: {
      "& path": {
        fill: theme.palette.primary.main
      },
      fontSize: 26,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "64px",
      width: "64px",
      borderRadius: "50%",
      backgroundColor: lighten(theme.palette.primary.main, 0.9)
    },
    sectionDescription: {
      opacity: "0.6"
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 600 as 600,
      color: "#000",
      marginBottom: "8px"
    }
  }),
  { name: "ConfigurationPage" }
);

export interface ConfigurationPageProps {
  menu: MenuSection[];
  user: User;
  onSectionClick: (sectionName: string) => void;
}

export const ConfigurationPage: React.FC<ConfigurationPageProps> = props => {
  const { menu: menus, user, onSectionClick } = props;
  const classes = useStyles(props);

  const intl = useIntl();
  return (
    <Container>
      <PageHeader
        className={classes.header}
        title={intl.formatMessage(sectionNames.configuration)}
      />
      {menus
        .filter(menu =>
          menu.menuItems.some(menuItem =>
            hasPermission(menuItem.permission, user)
          )
        )
        .map((menu, menuIndex) => (
          <div className={classes.configurationCategory} key={menuIndex}>
            <div className={classes.configurationLabel}>
              <Typography>{menu.label}</Typography>
            </div>
            <div className={classes.configurationItem}>
              {menu.menuItems
                .filter(menuItem => hasPermission(menuItem.permission, user))
                .map((item, itemIndex) => (
                  <Card
                    className={item.url ? classes.card : classes.cardDisabled}
                    onClick={() => onSectionClick(item.url)}
                    key={itemIndex}
                    data-test="settingsSubsection"
                    data-testid={item.title.toLowerCase()}
                    data-test-id={item.testId}
                  >
                    <CardContent className={classes.cardContent}>
                      <div className={classes.icon}>{item.icon}</div>
                      <div>
                        <Typography className={classes.sectionTitle}>
                          {item.title}
                        </Typography>
                        <Typography className={classes.sectionDescription}>
                          {item.description}
                        </Typography>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ))}
    </Container>
  );
};
ConfigurationPage.displayName = "ConfigurationPage";
export default ConfigurationPage;
