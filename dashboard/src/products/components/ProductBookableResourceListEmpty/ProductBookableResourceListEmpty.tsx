import notFoundImg from "@assets/images/dRuralImages/no-services.svg";
import { Typography } from "@material-ui/core";
import { bookableResourceAddPath } from "@saleor/bookableResources/urls";
import StyledLink from "@saleor/components/StyledLink";
import useNavigator from "@saleor/hooks/useNavigator";
import React from "react";
import SVG from "react-inlinesvg";
import { FormattedMessage } from "react-intl";

import { useStyles } from "./styles";

export const ProductBookableResourceListEmpty: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigator();

  return (
    <div className={classes.container}>
      <div className={classes.imageWrapper}>
        <SVG src={notFoundImg} className={classes.image} />
      </div>
      <div className={classes.infoWrapper}>
        <Typography variant="body1" className={classes.title}>
          <FormattedMessage defaultMessage="You have not defined any bookable resource yet." />
        </Typography>
        <Typography variant="body2" className={classes.text}>
          <FormattedMessage defaultMessage="A bookable resource can be a person, a bike, a car, or anything that can be booked for a period of time." />
        </Typography>
        <Typography variant="body2" className={classes.text}>
          <FormattedMessage defaultMessage="A bookable service must have at least one bookable resource included. " />
          <StyledLink onClick={() => navigate(bookableResourceAddPath)}>
            <FormattedMessage defaultMessage="Click here " />
          </StyledLink>
          <FormattedMessage defaultMessage="to add them and then go back to the service details to continue the booking setup." />
        </Typography>
      </div>
    </div>
  );
};
ProductBookableResourceListEmpty.displayName =
  "ProductBookableResourceListEmpty";
export default ProductBookableResourceListEmpty;
