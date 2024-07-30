import { Card, CardContent, Typography } from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import Hr from "@saleor/components/Hr";
import { commonMessages } from "@saleor/intl";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useIntl } from "react-intl";

import { useStyles } from "./styles";
import { ProductEmailVariablesProps, PurchaseEmailVariable } from "./types";
import {
  getPurchaseEmailBookingVariables,
  getPurchaseEmailCommonVariables
} from "./utils";

export const ProductEmailVariables: React.FC<ProductEmailVariablesProps> = ({
  isBookable
}) => {
  const intl = useIntl();
  const classes = useStyles();

  const getPurchaseEmailVariableElement = (
    varialbe: PurchaseEmailVariable,
    index: number
  ): React.ReactNode => (
    <div key={index} className={classes.variableWrapper}>
      <Typography variant="body2">
        <span>{"{{"}</span>
        <span className={classes.varaibleSpan}>{varialbe.name}</span>
        <span>{"}}"}</span>
      </Typography>
      <Typography className={classes.varaibleHelperText} variant="body2">
        {varialbe.helperText}
      </Typography>
    </div>
  );

  return (
    <Card>
      <CardTitle title={intl.formatMessage(commonMessages.mailVariables)} />
      <CardContent>
        <Typography variant="body2">
          <FormattedMessage defaultMessage="You can use variables within the title and content of your custom purchase email. Here is the list of variables you can use. Notice that to be recognized they must be inside the double brackets and with no spaces in between." />
        </Typography>
        <Hr className={classes.separator} />
        <div className={classes.variablesWrapper}>
          {getPurchaseEmailCommonVariables(intl).map((variable, index) =>
            getPurchaseEmailVariableElement(variable, index)
          )}
          {isBookable &&
            getPurchaseEmailBookingVariables(intl).map((variable, index) =>
              getPurchaseEmailVariableElement(variable, index)
            )}
        </div>
      </CardContent>
    </Card>
  );
};
export default ProductEmailVariables;
