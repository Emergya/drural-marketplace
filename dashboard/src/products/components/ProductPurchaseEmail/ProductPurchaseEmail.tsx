import { UilEnvelopeInfo } from "@iconscout/react-unicons";
import { Button, Card, CardContent, Typography } from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import useNavigator from "@saleor/hooks/useNavigator";
import { productPurchaseEmailAddPath } from "@saleor/products/urls";
import React from "react";
import { FormattedMessage } from "react-intl";

import { productPurchaseEmailEditPath } from "../../urls";
import { useStyles } from "./styles";
import { ProductPurchaseEmailProps } from "./types";

const ProductPurchaseEmail: React.FC<ProductPurchaseEmailProps> = ({
  disabled,
  hasEmail,
  productId
}) => {
  const classes = useStyles();
  const navigate = useNavigator();

  return (
    <Card>
      <CardTitle
        title={<FormattedMessage defaultMessage="Service instructions" />}
      />
      <CardContent>
        <Typography className={classes.text}>
          <FormattedMessage defaultMessage="Once the service is purchased, you can send the user a mail with aditional instructions, if needed." />
        </Typography>
        <Button
          color="secondary"
          disabled={disabled}
          fullWidth
          variant="outlined"
          onClick={() =>
            navigate(
              hasEmail
                ? productPurchaseEmailEditPath(productId)
                : productPurchaseEmailAddPath(productId)
            )
          }
        >
          <UilEnvelopeInfo className={classes.iconButton} />
          <FormattedMessage defaultMessage="Configure email" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductPurchaseEmail;
