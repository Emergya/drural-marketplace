import { makeStyles } from "@drural/macaw-ui";
import { Card, CardContent, Typography } from "@material-ui/core";
import { BusinessDetails_company } from "@saleor/business/types/BusinessDetails";
import CardTitle from "@saleor/components/CardTitle";
import { DateTime } from "@saleor/components/Date";
import Hr from "@saleor/components/Hr";
import Skeleton from "@saleor/components/Skeleton";
import { maybe } from "@saleor/misc";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

const useStyles = makeStyles(
  theme => ({
    label: {
      color: theme.palette.grey[600],
      marginBottom: theme.spacing(1)
    }
  }),
  { name: "BusinessHistory" }
);

export interface BusinessHistoryProps {
  business: BusinessDetails_company;
}

const BusinessHistory: React.FC<BusinessHistoryProps> = ({ business }) => {
  const intl = useIntl();
  const classes = useStyles();
  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({
          defaultMessage: "Shop history",
          description: "section header"
        })}
      />
      <CardContent>
        <Typography className={classes.label} variant="caption">
          <FormattedMessage defaultMessage="Last modified" />
        </Typography>
        {maybe(
          () => (
            <Typography>
              {business?.modified === null ? (
                "-"
              ) : (
                <DateTime date={business?.modified} />
              )}
            </Typography>
          ),
          <Skeleton />
        )}
      </CardContent>
      <Hr />
      <CardContent>
        <Typography className={classes.label} variant="caption">
          <FormattedMessage defaultMessage="Created" />
        </Typography>
        {maybe(
          () => (
            <Typography>
              {!business?.created ? "-" : <DateTime date={business?.created} />}
            </Typography>
          ),
          <Skeleton />
        )}
      </CardContent>
    </Card>
  );
};
export default BusinessHistory;
