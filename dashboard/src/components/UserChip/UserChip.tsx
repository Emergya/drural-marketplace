// TODO review. A lot of code has been removed.
import { makeStyles, UserChipMenu, UserChipMenuItem } from "@drural/macaw-ui";
import { UilSignout } from "@iconscout/react-unicons";
import { FormControlLabel, Switch } from "@material-ui/core";
import { User } from "@saleor/fragments/types/User";
import { getUserInitials, getUserName } from "@saleor/misc";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

const useStyles = makeStyles(
  theme => ({
    logoutButton: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,

      "&:hover": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white
      },

      "& svg": {
        marginRight: theme.spacing(1.25)
      }
    },
    spacer: {
      height: theme.spacing(3.5)
    },
    switch: {
      "&&:hover": {
        background: "transparent"
      }
    }
  }),
  {
    name: "UserChip"
  }
);

export interface UserChipProps {
  isDarkThemeEnabled: boolean;
  user: User;
  onLogout: () => void;
  onProfileClick?: () => void;
  onThemeToggle: () => void;
  onlyLogoutMenu?: boolean;
}

const UserChip: React.FC<UserChipProps> = ({
  isDarkThemeEnabled,
  user,
  onLogout,
  onProfileClick,
  onThemeToggle,
  onlyLogoutMenu = false
}) => {
  const classes = useStyles({});
  const intl = useIntl();
  const [showThemeSwitcher] = React.useState(false);

  return (
    <UserChipMenu
      initials={getUserInitials(user)}
      name={getUserName(user, true)}
      avatar={user?.avatar?.url}
    >
      {!onlyLogoutMenu && (
        <UserChipMenuItem
          onClick={onProfileClick}
          data-test="accountSettingsButton"
        >
          <FormattedMessage
            defaultMessage="Account Settings"
            description="button"
          />
        </UserChipMenuItem>
      )}
      <div className={classes.spacer} />
      <UserChipMenuItem
        className={classes.logoutButton}
        onClick={onLogout}
        data-test="logOutButton"
      >
        <UilSignout />
        <FormattedMessage defaultMessage="Log out" description="button" />
      </UserChipMenuItem>
      {/* conditionally renders dark mode enabler, dark mode unused ATM */}
      {showThemeSwitcher && (
        <UserChipMenuItem
          leaveOpen
          data-test="themeSwitch"
          data-test-is-dark={isDarkThemeEnabled}
        >
          <FormControlLabel
            control={
              <Switch
                classes={{
                  switchBase: classes.switch
                }}
                checked={isDarkThemeEnabled}
                color="primary"
                disableRipple
              />
            }
            label={intl.formatMessage({
              defaultMessage: "Enable Dark Mode",
              description: "button"
            })}
            onChange={onThemeToggle}
          />
        </UserChipMenuItem>
      )}
    </UserChipMenu>
  );
};
UserChip.displayName = "UserChip";
export default UserChip;
