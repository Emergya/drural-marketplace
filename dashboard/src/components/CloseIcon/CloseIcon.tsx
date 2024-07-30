import { makeStyles } from "@drural/macaw-ui";
import { UilMultiply } from "@iconscout/react-unicons";
import classNames from "classnames";
import React from "react";

const useStyles = makeStyles(
  theme => ({
    icon: {
      color: "#000000",
      cursor: "pointer",
      "&:hover": {
        color: theme.palette.primary.main
      }
    },
    iconWithBackground: {
      color: "#FFFFFF"
    }
  }),
  { name: "CloseIcon" }
);

export interface CloseIconProps {
  className?: string;
  onClose?: () => void;
  size?: number;
  backGroundColor?: boolean;
}

const CloseIcon: React.FC<CloseIconProps> = ({
  className,
  onClose,
  size = 24,
  backGroundColor = false
}) => {
  const classes = useStyles();
  return (
    <div
      onClick={onClose}
      className={classNames(
        className,
        classes.icon,
        backGroundColor ? classes.iconWithBackground : ""
      )}
    >
      <UilMultiply size={`${size}`} />
    </div>
  );
};
CloseIcon.displayName = "CloseIcon";
export default CloseIcon;
