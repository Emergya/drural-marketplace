import { makeStyles } from "@drural/macaw-ui";
import { Card, CardContent, Typography } from "@material-ui/core";
import { businessUrl } from "@saleor/business/urls";
import CardTitle from "@saleor/components/CardTitle";
import StarsRating from "@saleor/components/StarsRating";
import useNavigator from "@saleor/hooks/useNavigator";
import { commonMessages } from "@saleor/intl";
import { ProductDetails_product_company } from "@saleor/products/types/ProductDetails";
import { CompanyStatus } from "@saleor/types/globalTypes";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useIntl } from "react-intl";

const useStyles = makeStyles(
  theme => ({
    cardWrapper: {
      alignItems: "center",
      cursor: "pointer",
      display: "flex"
    },
    contentWrapper: {
      paddingLeft: 12
    },
    image: {
      borderRadius: 100,
      height: 78,
      objectFit: "cover",
      width: 78
    },
    subtitle: {
      marginBottom: theme.spacing(0.5)
    },
    text: {
      marginBottom: theme.spacing(1)
    }
  }),
  { name: "ProductCompany" }
);

interface ProductCompanyProps {
  company: ProductDetails_product_company;
  rating: number;
}

const ProductCompany: React.FC<ProductCompanyProps> = ({ company, rating }) => {
  const { id, publicName, imageUrl, publishedProducts } = company || {};
  const isCompanyActive =
    company?.status === CompanyStatus.ACC && company?.isEnabled;

  const classes = useStyles();
  const intl = useIntl();
  const navigate = useNavigator();

  return (
    <Card>
      <CardTitle title={intl.formatMessage(commonMessages.shop)} />
      <CardContent
        className={classes.cardWrapper}
        onClick={() => navigate(businessUrl(id))}
      >
        <img src={imageUrl} className={classes.image} />
        <div className={classes.contentWrapper}>
          <Typography className={classes.subtitle} variant="h4">
            {publicName}
          </Typography>
          <Typography className={classes.text} variant="body2">
            {isCompanyActive ? (
              <FormattedMessage
                defaultMessage="{productCount} {productCount, plural, one {service} other {services}} published"
                values={{
                  productCount: publishedProducts?.totalCount
                }}
              />
            ) : (
              <FormattedMessage defaultMessage="Company inactive" />
            )}
          </Typography>
          <StarsRating initialRating={rating} readonly />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCompany;
