import { makeStyles } from "@drural/macaw-ui";
import { Typography } from "@material-ui/core";
import { BusinessDetails_company } from "@saleor/business/types/BusinessDetails";
import StatusChip from "@saleor/components/StatusChip";
import { getBusinessStatus } from "@saleor/misc";
import React from "react";
import { useIntl } from "react-intl";

export interface TitleProps {
  business?: BusinessDetails_company;
}

const useStyles = makeStyles(
  theme => ({
    container: {
      alignItems: "center",
      display: "flex"
    },
    statusContainer: {
      marginLeft: theme.spacing(2)
    }
  }),
  { name: "OrderDetailsTitle" }
);

const Title: React.FC<TitleProps> = props => {
  const intl = useIntl();
  const classes = useStyles(props);
  const { business } = props;

  if (!business) {
    return null;
  }

  const businessStatus = getBusinessStatus(business?.status, intl);

  return (
    <div className={classes.container}>
      <Typography variant="h2">{business.publicName}</Typography>
      <div className={classes.statusContainer}>
        <StatusChip
          label={businessStatus.localized}
          type={businessStatus.chipStatus}
        />
      </div>
    </div>
  );
};

export default Title;
