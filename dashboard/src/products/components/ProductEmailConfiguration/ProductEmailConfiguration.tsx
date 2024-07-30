import { Card, CardContent, TextField } from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import FormSpacer from "@saleor/components/FormSpacer";
import { commonMessages } from "@saleor/intl";
import { getFormErrors } from "@saleor/utils/errors";
import getPurchaseEmailErrorMessage from "@saleor/utils/errors/purchaseEmail";
import React from "react";
import { useIntl } from "react-intl";

import { useStyles } from "./styles";
import {
  ProductEmailConfigurationFields,
  ProductEmailConfigurationProps
} from "./types";

export const ProductEmailConfiguration: React.FC<ProductEmailConfigurationProps> = ({
  contentValidationError,
  data,
  disabled,
  errors,
  subjectValidationError,
  titleValidationError,
  onChange
}) => {
  const intl = useIntl();
  const classes = useStyles();

  const formErrors = getFormErrors(
    [
      ProductEmailConfigurationFields.subject,
      ProductEmailConfigurationFields.title,
      ProductEmailConfigurationFields.content
    ],
    errors
  );

  const subjectHelperText =
    getPurchaseEmailErrorMessage(formErrors.subject, intl) ||
    subjectValidationError ||
    intl.formatMessage({
      defaultMessage:
        "This is the subject of the mail that your customer will receive after completing the reservation."
    });

  const titleHelperText =
    getPurchaseEmailErrorMessage(formErrors.title, intl) ||
    titleValidationError ||
    intl.formatMessage({
      defaultMessage:
        "This is the title of the mail content. You can use the variables from the side panel to insert them into the content."
    });

  const contentHelperText =
    getPurchaseEmailErrorMessage(formErrors.content, intl) ||
    contentValidationError ||
    intl.formatMessage({
      defaultMessage:
        "This is the content of the mail content. You can use the variables from the side panel to insert them into the content."
    });

  return (
    <Card>
      <CardTitle title={intl.formatMessage(commonMessages.mailConfiguration)} />
      <CardContent>
        <TextField
          disabled={disabled}
          error={!!formErrors.subject || !!subjectValidationError}
          fullWidth
          helperText={subjectHelperText}
          label={intl.formatMessage(commonMessages.subject)}
          name={ProductEmailConfigurationFields.subject}
          value={data.subject}
          required
          onChange={onChange}
        />
        <FormSpacer className={classes.customFormSpacer} />
        <TextField
          disabled={disabled}
          error={!!formErrors.title || !!titleValidationError}
          fullWidth
          helperText={titleHelperText}
          label={intl.formatMessage(commonMessages.mailTitle)}
          name={ProductEmailConfigurationFields.title}
          value={data.title}
          required
          onChange={onChange}
        />
        <FormSpacer className={classes.customFormSpacer} />
        <TextField
          disabled={disabled}
          error={!!formErrors.content || !!contentValidationError}
          fullWidth
          helperText={contentHelperText}
          label={intl.formatMessage(commonMessages.mailContent)}
          multiline
          name={ProductEmailConfigurationFields.content}
          value={data.content}
          required
          rows={14}
          onChange={onChange}
        />
      </CardContent>
    </Card>
  );
};
export default ProductEmailConfiguration;
