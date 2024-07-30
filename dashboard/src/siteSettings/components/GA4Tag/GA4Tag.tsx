import { Card, CardContent, TextField } from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import ControlledSwitch from "@saleor/components/ControlledSwitch";
import Grid from "@saleor/components/Grid";
import { getFormErrors } from "@saleor/utils/errors";
import getShopErrorMessage from "@saleor/utils/errors/shop";
import React from "react";
import { useIntl } from "react-intl";

import { useStyles } from "./styles";
import { IGA4TagProps } from "./types";
import { getInputErrorMessage } from "./utils";

const GA4Tag: React.FC<IGA4TagProps> = ({
  data,
  disabled,
  errors,
  onChange
}) => {
  const intl = useIntl();
  const classes = useStyles();

  const formErrors = getFormErrors(["ga4"], errors);
  const inputErrorMessage = getInputErrorMessage(data, intl);

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({ defaultMessage: "Google Analytics 4" })}
      />
      <CardContent>
        <Grid>
          <TextField
            disabled={disabled || !data.ga4Active}
            error={!!formErrors.ga4 || !!inputErrorMessage}
            fullWidth
            name="ga4"
            label={intl.formatMessage({
              defaultMessage: "Measurement id"
            })}
            helperText={
              inputErrorMessage ||
              getShopErrorMessage(formErrors.ga4, intl) ||
              intl.formatMessage({
                defaultMessage: "Google analytics property measurement id"
              })
            }
            value={data.ga4}
            onChange={onChange}
            InputProps={{
              inputProps: {
                autoComplete: "none"
              }
            }}
          />
          <div className={classes.controledSwitch}>
            <ControlledSwitch
              name="ga4Active"
              label=""
              checked={data.ga4Active}
              onChange={onChange}
              disabled={disabled}
            />
          </div>
        </Grid>
      </CardContent>
    </Card>
  );
};
GA4Tag.displayName = "GA4Tag";
export default GA4Tag;
