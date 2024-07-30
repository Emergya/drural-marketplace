import { makeStyles } from "@drural/macaw-ui";
import { fade, lighten, Typography } from "@material-ui/core";
import { sectionNames } from "@saleor/intl";
import classNames from "classnames";
import React from "react";
import { useIntl } from "react-intl";

import { MultiAutocompleteChoiceType } from "../MultiAutocompleteSelectField";

const useStyles = makeStyles(
  theme => ({
    chip: {
      width: "100%"
    },
    chipContainer: {
      display: "flex",
      flexDirection: "column",
      marginTop: theme.spacing(1)
    },
    chipInner: {
      "& svg": {
        color: "#000",
        width: "16px",
        height: "16px"
      },
      alignItems: "center",
      borderRadius: 4,
      color: "#000",
      display: "flex",
      justifyContent: "space-between",
      margin: theme.spacing(1, 0),
      paddingBottom: theme.spacing(0.5),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
      paddingTop: theme.spacing(0.5)
    },
    chipInnerPrimary: {
      background: lighten(theme.palette.primary.main, 0.7)
    },
    chipInnerSecondary: {
      background: lighten(theme.palette.alert.paper.warning, 0.7)
    },
    chipLabel: {
      color: "#000",
      fontSize: "14px"
    },
    disabledChipInner: {
      "& svg": {
        color: theme.palette.grey[200]
      },
      alignItems: "center",
      background: fade(theme.palette.grey[400], 0.8),
      borderRadius: 18,
      color: theme.palette.primary.contrastText,
      display: "flex",
      justifyContent: "space-between",
      margin: theme.spacing(1, 0),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1)
    }
  }),
  { name: "StaticAutocompleteData" }
);

interface IProps {
  displayValues: MultiAutocompleteChoiceType[];
  cardColor?: "primary" | "secondary";
}

export const StaticAutocompleteData: React.FC<IProps> = ({
  displayValues,
  cardColor
}) => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <>
      <Typography variant="body1">
        {intl.formatMessage(sectionNames.collections)}
      </Typography>
      <div className={classes.chipContainer}>
        {displayValues &&
          displayValues.map(value => (
            <div className={classes.chip} key={value.value}>
              <div
                className={classNames(
                  !value.disabled
                    ? classes.chipInner
                    : classes.disabledChipInner,
                  cardColor === "secondary"
                    ? classes.chipInnerSecondary
                    : classes.chipInnerPrimary
                )}
              >
                <Typography className={classes.chipLabel}>
                  {value.label}
                </Typography>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default StaticAutocompleteData;
