import { Card, CardContent, Typography } from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import { DateTime } from "@saleor/components/Date";
import { Hr } from "@saleor/components/Hr";
import Skeleton from "@saleor/components/Skeleton";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { maybe } from "../../../misc";
import { useStyles } from "./styles";
import { UserStatsProps } from "./types";

const UserStats: React.FC<UserStatsProps> = props => {
  const { user } = props;
  const classes = useStyles(props);

  const intl = useIntl();

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({
          defaultMessage: "User History",
          description: "section header"
        })}
      />
      <CardContent>
        <Typography className={classes.label} variant="caption">
          <FormattedMessage defaultMessage="Last login" />
        </Typography>
        {maybe(
          () => (
            <Typography variant="h6" className={classes.value}>
              {user.lastLogin === null ? (
                "-"
              ) : (
                <DateTime date={user.lastLogin} />
              )}
            </Typography>
          ),
          <Skeleton />
        )}
      </CardContent>
      <Hr />
      <CardContent>
        <Typography className={classes.label} variant="caption">
          <FormattedMessage defaultMessage="Last order" />
        </Typography>
        {maybe(
          () => (
            <Typography variant="h6" className={classes.value}>
              {user.lastPlacedOrder.edges.length === 0 ? (
                "-"
              ) : (
                <DateTime date={user.lastPlacedOrder.edges[0].node.created} />
              )}
            </Typography>
          ),
          <Skeleton />
        )}
      </CardContent>
    </Card>
  );
};
UserStats.displayName = "UserStats";
export default UserStats;
