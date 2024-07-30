import { makeStyles } from "@drural/macaw-ui";
import { Typography } from "@material-ui/core";
import StatusChip from "@saleor/components/StatusChip";
import { transformProductStatus } from "@saleor/misc";
import { ProductDetails_product } from "@saleor/products/types/ProductDetails";
import React from "react";
import { useIntl } from "react-intl";

export interface TitleProps {
  isSimpleProduct: boolean;
  product?: ProductDetails_product;
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

const Title: React.FC<TitleProps> = props => {
  const intl = useIntl();
  const classes = useStyles(props);
  const { product } = props;

  if (!product) {
    return null;
  }

  const { localized, status } = transformProductStatus(
    product.channelListings[0].isPublished,
    intl
  );

  return (
    <div className={classes.container}>
      <Typography className={classes.title} variant="h2">
        {product.name}
      </Typography>
      <div className={classes.statusContainer}>
        <StatusChip label={localized} type={status} />
      </div>
    </div>
  );
};

export default Title;
