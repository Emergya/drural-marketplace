import { makeStyles } from "@drural/macaw-ui";
import * as Unicons from "@iconscout/react-unicons";
import { darken, Typography } from "@material-ui/core";
import classNames from "classnames";
import React from "react";

const useStyles = makeStyles(
  theme => ({
    icon: {
      marginBottom: "4px",
      "& path": {
        color: darken(`${theme.palette.primary.main}`, 0.1)
      }
    },
    iconSelected: {
      "& path": {
        color: darken(`${theme.palette.primary.main}`, 0.5)
      }
    },
    iconContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      width: "96px",
      height: "96px",
      borderRadius: "16px",
      backgroundColor: "#F7F6F8",
      overflow: "hidden",
      cursor: "pointer",
      [theme.breakpoints.down("md")]: {
        width: "86px",
        height: "86px"
      }
    },
    iconContainerSelected: {
      border: `4px solid ${darken(`${theme.palette.primary.main}`, 0.1)}`
    },

    iconText: {
      fontSize: "12px",
      fontWeight: 400,
      color: `${theme.palette.grey[700]}`
    },
    iconTextSelected: {
      fontWeight: 600
    }
  }),
  {
    name: "IconTile"
  }
);

export interface IconTileProps {
  iconName: string;
  selectedIconName?: string;
  selectIcon?: (iconName: string) => void;
}

export const IconTile: React.FC<IconTileProps> = ({
  iconName,
  selectIcon,
  selectedIconName
}) => {
  const IconComponent = Unicons[iconName];
  const classes = useStyles();

  return (
    <div
      className={
        selectedIconName === iconName
          ? classNames(classes.iconContainer, classes.iconContainerSelected)
          : classes.iconContainer
      }
      onClick={() => selectIcon(iconName)}
    >
      <IconComponent
        className={
          selectedIconName === iconName
            ? classNames(classes.icon, classes.iconSelected)
            : classes.icon
        }
        size={40}
      />
      <Typography
        className={
          selectedIconName === iconName
            ? classNames(classes.iconText, classes.iconTextSelected)
            : classes.iconText
        }
      >
        {iconName.length > 10
          ? iconName.slice(3, 10).concat("...")
          : iconName.slice(3)}
      </Typography>
    </div>
  );
};

export default IconTile;
