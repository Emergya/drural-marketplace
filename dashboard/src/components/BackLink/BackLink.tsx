import { makeStyles } from "@drural/macaw-ui";
import { UilAngleLeft } from "@iconscout/react-unicons";
import { darken } from "@material-ui/core";
import React from "react";

import StyledLink from "../StyledLink";

interface BackLinkProps {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const useStyles = makeStyles(
  theme => ({
    wrapper: {
      alignItems: "center",
      display: "flex",
      marginLeft: "-7px",
      paddingBottom: "0.75rem",

      "&:hover": {
        "& button, svg": {
          color: theme.palette.primary.main
        }
      },

      "& svg": {
        color: darken(theme.palette.primary.main, 0.1)
      }
    }
  }),
  { name: "BackLink" }
);

export const BackLink: React.FC<BackLinkProps> = ({ children, onClick }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <UilAngleLeft />
      <StyledLink onClick={onClick} underline>
        {children}
      </StyledLink>
    </div>
  );
};
export default BackLink;
