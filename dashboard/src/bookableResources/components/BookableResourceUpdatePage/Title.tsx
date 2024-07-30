import { makeStyles } from "@drural/macaw-ui";
import { Typography } from "@material-ui/core";
import { BookableResourceDetails_bookableResource } from "@saleor/bookableResources/types/BookableResourceDetails";
import StatusChip from "@saleor/components/StatusChip";
import { transformProductStatus } from "@saleor/misc";
import React from "react";
import { useIntl } from "react-intl";

export interface TitleProps {
  bookableResource?: BookableResourceDetails_bookableResource;
}

const useStyles = makeStyles(
  theme => ({
    container: {
      alignItems: "center",
      display: "flex"
    },
    statusContainer: {
      alignItems: "center",
      display: "flex",
      marginLeft: theme.spacing(2)
    },
    title: {
      [theme.breakpoints.down("xs")]: {
        fontSize: 18,
        lineHeight: "24px"
      }
    }
  }),
  { name: "ProductDetailsTitle" }
);

const Title: React.FC<TitleProps> = ({ bookableResource }) => {
  const intl = useIntl();
  const classes = useStyles();

  if (!bookableResource) {
    return null;
  }

  const { localized, status } = transformProductStatus(
    bookableResource.isActive,
    intl
  );

  return (
    <div className={classes.container}>
      <Typography className={classes.title} variant="h2">
        {bookableResource.name}
      </Typography>
      <div className={classes.statusContainer}>
        <StatusChip label={localized} type={status} />
      </div>
    </div>
  );
};

export default Title;
