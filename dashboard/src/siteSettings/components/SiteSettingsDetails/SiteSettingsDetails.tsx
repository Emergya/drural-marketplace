import { Card, CardContent, TextField } from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import FormSpacer from "@saleor/components/FormSpacer";
import { getLocaleOptions } from "@saleor/components/Locale/utils";
import SingleSelectField from "@saleor/components/SingleSelectField";
import { commonMessages } from "@saleor/intl";
import { getFormErrors } from "@saleor/utils/errors";
import getShopErrorMessage from "@saleor/utils/errors/shop";
import React from "react";
import { useIntl } from "react-intl";

import { SiteSettingsDetailsProps } from "./types";

const SiteSettingsDetails: React.FC<SiteSettingsDetailsProps> = ({
  data,
  disabled,
  errors,
  onChange
}) => {
  const intl = useIntl();

  const formErrors = getFormErrors(
    ["name", "domain", "description", "defaultLanguage"],
    errors
  );

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage(commonMessages.generalInformations)}
      />
      <CardContent>
        <TextField
          disabled={disabled}
          error={!!formErrors.name}
          fullWidth
          name="name"
          label={intl.formatMessage({
            defaultMessage: "Name of your store"
          })}
          helperText={
            getShopErrorMessage(formErrors.name, intl) ||
            intl.formatMessage({
              defaultMessage:
                "Name of your store is shown on tab in web browser"
            })
          }
          value={data.name}
          onChange={onChange}
          InputProps={{
            inputProps: {
              autoComplete: "none"
            }
          }}
        />
        <FormSpacer />
        <TextField
          disabled={disabled}
          error={!!formErrors.domain}
          fullWidth
          name="domain"
          label={intl.formatMessage({
            defaultMessage: "URL of your online store"
          })}
          helperText={getShopErrorMessage(formErrors.domain, intl)}
          value={data.domain}
          onChange={onChange}
          InputProps={{
            inputProps: {
              autoComplete: "none"
            }
          }}
        />
        <FormSpacer />
        <TextField
          disabled={disabled}
          error={!!formErrors.description}
          fullWidth
          name="description"
          label={intl.formatMessage({
            defaultMessage: "Store Description"
          })}
          helperText={
            getShopErrorMessage(formErrors.description, intl) ||
            intl.formatMessage({
              defaultMessage:
                "Store description is shown on taskbar after your store name"
            })
          }
          value={data.description}
          onChange={onChange}
          InputProps={{
            inputProps: {
              autoComplete: "none"
            }
          }}
        />
        <FormSpacer />
        <SingleSelectField
          label={intl.formatMessage({
            defaultMessage: "Default Marketplace Language"
          })}
          choices={getLocaleOptions(intl)}
          name="defaultLanguage"
          value={data.defaultLanguage}
          onChange={onChange}
        />
      </CardContent>
    </Card>
  );
};
SiteSettingsDetails.displayName = "SiteSettingsDetails";
export default SiteSettingsDetails;
