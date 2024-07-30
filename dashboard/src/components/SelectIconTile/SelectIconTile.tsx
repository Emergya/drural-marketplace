import { makeStyles } from "@drural/macaw-ui";
import * as Unicons from "@iconscout/react-unicons";
import { UilImage } from "@iconscout/react-unicons";
import { lighten, Typography } from "@material-ui/core";
import React from "react";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles(
  theme => ({
    icon: {
      "& path": {
        color: `${theme.palette.primary.main}`
      }
    },
    iconContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minWidth: "88px",
      width: "88px",
      height: "88px",
      borderRadius: "16px",
      backgroundColor: "#F7F6F8",
      marginRight: "17px"
    },
    iconContainerEmpty: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minWidth: "88px",
      width: "88px",
      height: "88px",
      borderRadius: "16px",
      border: "1px dashed #136C50",
      marginRight: "17px",
      background: `repeating-linear-gradient(-45deg,${lighten(
        theme.palette.primary.light,
        0.8
      )}, ${lighten(
        theme.palette.primary.light,
        0.8
      )} 5px, #FFFFFF 5px, #FFFFFF 10px)`
    },
    wrapper: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      minWidth: "220px",
      cursor: "pointer"
    },
    textContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      maxWidth: "190px"
    },
    text: {
      opacity: "0.5",
      marginTop: "5px"
    }
  }),
  {
    name: "SelectIconTile"
  }
);

export interface SelectIconTileProps {
  iconName: string;
  openModal: () => void;
}

export const SelectIconTile: React.FC<SelectIconTileProps> = ({
  iconName,
  openModal
}) => {
  const IconComponent = Unicons[iconName];
  const classes = useStyles();

  return (
    <div className={classes.wrapper} onClick={() => openModal()}>
      <div
        className={
          IconComponent ? classes.iconContainer : classes.iconContainerEmpty
        }
      >
        {IconComponent ? (
          <IconComponent className={classes.icon} size={40} />
        ) : (
          <UilImage className={classes.icon} size={28} />
        )}
      </div>
      <div className={classes.textContainer}>
        <Typography variant="h4">
          <FormattedMessage defaultMessage="Select icon" />
        </Typography>
        <Typography variant="body2" className={classes.text}>
          <FormattedMessage defaultMessage="Choose the icon that best suits the category description" />
        </Typography>
      </div>
    </div>
  );
};

export default SelectIconTile;
