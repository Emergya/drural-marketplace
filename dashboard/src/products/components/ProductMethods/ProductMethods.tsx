import { CardContent, FormHelperText, Typography } from "@material-ui/core";
import ControlledCheckbox from "@saleor/components/ControlledCheckbox";
import React from "react";
import { useIntl } from "react-intl";

import { useStyles } from "./styles";
import { ProductMethodsProps } from "./types";
import {
  getHelperText,
  getIsChecked,
  getIsDisabled,
  getProductPaymentMethodMessages
} from "./utils";

const ProductMethods: React.FC<ProductMethodsProps> = ({
  data,
  disabled,
  isStripeEnabled,
  title,
  methods,
  onMethodChange
}) => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <CardContent>
      {title && (
        <Typography className={classes.title} variant="body1">
          {title}
        </Typography>
      )}
      <div className={classes.methodsWrapper}>
        {methods.map(method => {
          const isDisabled = getIsDisabled(disabled, method, isStripeEnabled);
          const helperText = getHelperText(method, isStripeEnabled, intl);

          return (
            <div className={classes.methodItem} key={method.id}>
              <ControlledCheckbox
                checked={getIsChecked(data, method)}
                disabled={isDisabled}
                label={getProductPaymentMethodMessages(method, intl)}
                name={method.id}
                onChange={onMethodChange}
              />
              {helperText && (
                <FormHelperText disabled={isDisabled}>
                  {helperText}
                </FormHelperText>
              )}
            </div>
          );
        })}
      </div>
    </CardContent>
  );
};
ProductMethods.displayName = "ProductMethods";
export default ProductMethods;
