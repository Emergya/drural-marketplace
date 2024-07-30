import { Card, CardContent, TextField } from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import FormSpacer from "@saleor/components/FormSpacer";
import { getFormErrors } from "@saleor/utils/errors";
import getAppErrorMessage from "@saleor/utils/errors/app";
import React from "react";
import { useIntl } from "react-intl";

import { useStyles } from "./styles";
import { ICustomAppInfoProps } from "./types";

const CustomAppInformation: React.FC<ICustomAppInfoProps> = ({
  data,
  disabled,
  errors,
  onChange
}) => {
  const intl = useIntl();
  const classes = useStyles();

  const formErrors = getFormErrors(["name"], errors);

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({
          defaultMessage: "App Information",
          description: "header"
        })}
      />
      <CardContent>
        <TextField
          disabled={disabled}
          error={!!formErrors.name}
          label={intl.formatMessage({
            defaultMessage: "App Name",
            description: "custom app name"
          })}
          helperText={getAppErrorMessage(formErrors.name, intl)}
          fullWidth
          name="name"
          value={data.name}
          onChange={onChange}
        />
        <FormSpacer />
        {data.user && (
          <TextField
            className={classes.shrinkDisabledLabel}
            disabled
            label={intl.formatMessage({
              defaultMessage: "User",
              description: "custom app user"
            })}
            helperText={intl.formatMessage({
              defaultMessage: "User account asociated with the app"
            })}
            fullWidth
            name="user"
            value={data.user}
          />
        )}
      </CardContent>
    </Card>
  );
};

CustomAppInformation.displayName = "CustomAppInformation";
export default CustomAppInformation;
