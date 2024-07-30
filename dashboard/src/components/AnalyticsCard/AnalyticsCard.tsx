import { Card, CardContent, IconButton, Typography } from "@material-ui/core";
import { commonMessages } from "@saleor/intl";
import classNames from "classnames";
import React from "react";
import { useIntl } from "react-intl";

import Skeleton from "../Skeleton";
import { useStyles } from "./styles";
import { AnalyticsCardProps } from "./types";

const AnalyticsCard: React.FC<AnalyticsCardProps> = props => {
  const {
    backgroundColor,
    children,
    childrenWrapperClassName,
    clickable,
    icon,
    loading,
    testId,
    title,
    onClick
  } = props;

  const classes = useStyles(props);
  const intl = useIntl();

  return (
    <Card
      className={classNames(
        classes.cardSpacing,
        {
          [classes.cardBackgroundPrimary]: backgroundColor === "primary",
          [classes.cardBackgroundSecondary]: backgroundColor === "secondary",
          [classes.cardBackgroundBlue]: backgroundColor === "blueGrey",
          [classes.cardBackgroundRed]: backgroundColor === "red"
        },
        { [classes.clickable]: clickable }
      )}
      onClick={
        onClick &&
        (e => {
          e.stopPropagation();
          onClick();
        })
      }
    >
      <CardContent className={classes.cardContent} data-test-id={testId}>
        <div className={classes.flexContainer}>
          <IconButton
            className={classNames(
              classes.iconButton,
              clickable ? classes.clickable : classes.notClickable,
              {
                [classes.cardIconPrimary]: backgroundColor === "primary",
                [classes.cardIconSecondary]: backgroundColor === "secondary",
                [classes.cardIconBlue]: backgroundColor === "blueGrey",
                [classes.cardIconRed]: backgroundColor === "red"
              }
            )}
          >
            {icon}
          </IconButton>
          <div className={classes.valueWrapper}>
            {loading ? (
              <Skeleton className={classes.skeleton} />
            ) : (
              <Typography
                className={classNames(classes.value, {
                  [childrenWrapperClassName]: childrenWrapperClassName
                })}
                variant="h1"
              >
                {children || intl.formatMessage(commonMessages.score)}
              </Typography>
            )}
          </div>
        </div>
        <div>
          <Typography className={classes.cardTitle} variant="subtitle1">
            {title}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};
AnalyticsCard.displayName = "AnalyticsCard";
export default AnalyticsCard;
