import defaultImageSmall from "@assets/images/dRuralIcons/img-default-small.svg";
import { makeStyles } from "@drural/macaw-ui";
import { Avatar as MuiAvatar, lighten } from "@material-ui/core";
import classNames from "classnames";
import React from "react";
import ReactSVG from "react-inlinesvg";

import Image from "../../icons/Image";

export const AVATAR_MARGIN = 32;

const useStyles = makeStyles(
  theme => ({
    alignRight: {
      justifyContent: "flex-end"
    },
    avatar: {
      background: "none",
      border: `1px solid ${lighten(theme.palette.secondary.main, 0.4)}`,
      borderRadius: 0,
      color: "#bdbdbd",
      display: "inline-flex"
    },
    children: {
      alignSelf: "center",
      marginLeft: theme.spacing(2),
      width: "100%"
    },
    content: {
      alignItems: "center",
      display: "flex"
    },
    root: {
      "&:not(first-child)": {
        paddingLeft: 0
      },
      paddingRight: theme.spacing(3),
      width: "1%"
    }
  }),
  { name: "Avatar" }
);

export interface AvatarProps {
  thumbnail?: string;
  alignRight?: boolean;
  avatarProps?: string;
  children?: React.ReactNode | React.ReactNodeArray;
}

const Avatar: React.FC<AvatarProps> = ({
  children,
  alignRight,
  thumbnail,
  avatarProps
}) => {
  const classes = useStyles({});

  return (
    <div
      className={classNames(classes.content, {
        [classes.alignRight]: alignRight
      })}
    >
      {thumbnail === undefined ? (
        <MuiAvatar className={classNames(classes.avatar, avatarProps)}>
          <ReactSVG src={defaultImageSmall} />
        </MuiAvatar>
      ) : thumbnail === null ? (
        <MuiAvatar className={classNames(classes.avatar, avatarProps, 0.4)}>
          <Image color="primary" />
        </MuiAvatar>
      ) : (
        <MuiAvatar
          className={classNames(classes.avatar, avatarProps)}
          src={thumbnail}
        />
      )}
      {!alignRight && <div className={classes.children}>{children}</div>}
    </div>
  );
};

export default Avatar;
