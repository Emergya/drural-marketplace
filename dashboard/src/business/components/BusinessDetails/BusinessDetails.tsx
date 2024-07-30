import { SaleorTheme } from "@drural/macaw-ui";
import { Card, CardContent, TextField, useMediaQuery } from "@material-ui/core";
import { CompanyUpdate_companyUpdate_errors } from "@saleor/business/types/CompanyUpdate";
import CardTitle from "@saleor/components/CardTitle";
import FormSpacer from "@saleor/components/FormSpacer";
import Grid from "@saleor/components/Grid";
import { commonMessages } from "@saleor/intl";
import { getFormErrors } from "@saleor/utils/errors";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
export interface BusinessDetailsProps {
  data: {
    name: string;
    cif: string;
    phone: string;
    email: string;
  };
  disabled: boolean;
  onChange: (event: React.ChangeEvent<any>) => void;
  errors: CompanyUpdate_companyUpdate_errors[];
}

const BusinessDetails: React.FC<BusinessDetailsProps> = props => {
  const { data, disabled, onChange, errors } = props;
  const intl = useIntl();
  const isMdDown = useMediaQuery((theme: SaleorTheme) =>
    theme.breakpoints.down("md")
  );

  const formErrors = getFormErrors(["name", "cif", "email", "phone"], errors);

  return (
    <Card>
      <CardTitle
        title={
          <FormattedMessage
            defaultMessage="Company data"
            description="Company information, header"
          />
        }
      />
      <CardContent>
        <Grid variant="default">
          <TextField
            disabled={disabled}
            error={!!formErrors.name}
            helperText={formErrors.name?.message}
            fullWidth
            name="name"
            type="text"
            label={intl.formatMessage(commonMessages.companyName)}
            value={data.name}
            onChange={onChange}
          />
          {isMdDown && <FormSpacer />}
          <TextField
            disabled={disabled}
            error={!!formErrors.cif}
            helperText={formErrors.cif?.message}
            fullWidth
            name="cif"
            type="text"
            label={intl.formatMessage(commonMessages.cif)}
            value={data.cif}
            onChange={onChange}
          />
          {isMdDown && <FormSpacer />}
          <TextField
            disabled={disabled}
            error={!!formErrors.email}
            helperText={formErrors.email?.message}
            fullWidth
            name="email"
            type="text"
            label={intl.formatMessage(commonMessages.email)}
            value={data.email}
            onChange={onChange}
          />
          {isMdDown && <FormSpacer />}
          <TextField
            disabled={disabled}
            error={!!formErrors.phone}
            helperText={formErrors.phone?.message}
            fullWidth
            name="phone"
            type="text"
            label={intl.formatMessage(commonMessages.telephone)}
            value={data.phone}
            onChange={onChange}
          />
          {isMdDown && <FormSpacer />}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default BusinessDetails;
