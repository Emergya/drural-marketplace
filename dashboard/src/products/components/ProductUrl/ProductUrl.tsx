import { Card, CardContent, TextField } from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import { getFormErrors, getProductErrorMessage } from "@saleor/utils/errors";
import React from "react";
import { useIntl } from "react-intl";

import { ProductUrlProps } from "./types";

export const ProducUrl: React.FC<ProductUrlProps> = ({
  url,
  disabled,
  errors,
  onChange
}) => {
  const intl = useIntl();
  const formErrors = getFormErrors(["url"], errors);

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({ defaultMessage: "Service url" })}
      />
      <CardContent>
        <TextField
          error={!!formErrors.url}
          helperText={
            getProductErrorMessage(formErrors.url, intl) ||
            intl.formatMessage({ defaultMessage: "The url of the service" })
          }
          disabled={disabled}
          fullWidth
          label={intl.formatMessage({
            defaultMessage: "URL"
          })}
          name="url"
          type="url"
          value={url}
          onChange={onChange}
        />
      </CardContent>
    </Card>
  );
};
export default ProducUrl;
