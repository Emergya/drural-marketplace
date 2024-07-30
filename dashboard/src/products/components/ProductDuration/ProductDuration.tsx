import { CardContent, Typography } from "@material-ui/core";
import { TimePicker } from "@saleor/components/TimePicker";
import { commonMessages } from "@saleor/intl";
import { getFormErrors, getProductErrorMessage } from "@saleor/utils/errors";
import React from "react";
import { useIntl } from "react-intl";

import { useStyles } from "./styles";
import { ProductDurationProps } from "./types";

const ProductDuration: React.FC<ProductDurationProps> = ({
  disabled,
  duration,
  errors,
  onDurationChange
}) => {
  // 1. Variables
  const classes = useStyles();
  const intl = useIntl();
  const formErrors = getFormErrors(["duration"], errors);
  const helperText =
    getProductErrorMessage(formErrors.duration, intl) ||
    intl.formatMessage({
      defaultMessage: "Select the duration of this service"
    });
  const format = "HH:mm";

  // 2. Render
  return (
    <CardContent>
      <Typography className={classes.title} variant="body1">
        {intl.formatMessage(commonMessages.duration)}
      </Typography>
      <TimePicker
        disabled={disabled}
        error={!!formErrors.duration}
        format={format}
        helperText={helperText}
        inputReadOnly
        minuteStep={15}
        placeholder={intl.formatMessage(commonMessages.serviceDuration) + " *"}
        value={duration}
        onChange={time => {
          onDurationChange(time?.hour(), time?.minute());
        }}
      />
    </CardContent>
  );
};
ProductDuration.displayName = "ProductDuration";
export default ProductDuration;
