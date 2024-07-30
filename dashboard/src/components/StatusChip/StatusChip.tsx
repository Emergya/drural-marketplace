import { makeStyles } from "@drural/macaw-ui";
import { lighten, Typography } from "@material-ui/core";
import classNames from "classnames";
import React from "react";

import { StatusType } from "./types";

export interface StatusChipProps {
  type?: StatusType;
  label?: string;
}

const statusChipColors = makeStyles(
  theme => ({
    alert: {
      background: lighten(theme.palette.alert.paper.warning, 0.7)
    },
    error: {
      backgroundColor: lighten(theme.palette.error.main, 0.7)
    },
    neutral: {
      background: lighten(theme.palette.secondary.main, 0.6)
    },
    success: {
      background: lighten(theme.palette.primary.main, 0.7)
    }
  }),
  { name: "StatusChipColors" }
);

const useStyles = makeStyles(
  theme => ({
    label: {
      fontSize: theme.typography.body2.fontSize,
      textTransform: "uppercase"
    },
    root: {
      borderRadius: 4,
      display: "inline-block",
      padding: "4px 8px"
    }
  }),
  { name: "StatusChip" }
);

const StatusChip: React.FC<StatusChipProps> = props => {
  const { type = StatusType.NEUTRAL, label } = props;
  const classes = useStyles(props);
  const colors = statusChipColors(props);

  if (!label) {
    return null;
  }

  return (
    <div className={classNames(classes.root, colors[type])}>
      <Typography className={classNames(classes.label)}>{label}</Typography>
    </div>
  );
};

export default StatusChip;
