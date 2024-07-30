import { makeStyles, SaleorTheme } from "@drural/macaw-ui";
import { UilAngleDown } from "@iconscout/react-unicons";
import {
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useMediaQuery
} from "@material-ui/core";
import { CompanyUpdate_companyUpdate_errors } from "@saleor/business/types/CompanyUpdate";
import CardTitle from "@saleor/components/CardTitle";
import FormSpacer from "@saleor/components/FormSpacer";
import Grid from "@saleor/components/Grid";
import { commonMessages } from "@saleor/intl";
import { getFormErrors } from "@saleor/utils/errors";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useIntl } from "react-intl";

import { Languages } from "../../languages";

const useStyles = makeStyles(
  theme => ({
    selecIcon: {
      marginRight: theme.spacing(2)
    }
  }),
  { name: "BusinessDetails" }
);
export interface BusinessConfigurationProps {
  data: {
    publicName: string;
    languageCode: string;
    description: string;
  };
  disabled: boolean;
  onChange: (event: React.ChangeEvent<any>) => void;
  errors: CompanyUpdate_companyUpdate_errors[];
}

const BusinessConfiguration: React.FC<BusinessConfigurationProps> = props => {
  const { data, disabled, onChange, errors } = props;
  const intl = useIntl();
  const classes = useStyles();
  const isMdDown = useMediaQuery((theme: SaleorTheme) =>
    theme.breakpoints.down("md")
  );

  const formErrors = getFormErrors(
    ["publicName", "languageCode", "description"],
    errors
  );
  return (
    <Card>
      <CardTitle
        title={
          <FormattedMessage
            defaultMessage="Shop configuration"
            description="Shop configuration, header"
          />
        }
      />
      <CardContent>
        <Grid variant={!isMdDown ? "uniform" : "default"}>
          <TextField
            disabled={disabled}
            error={!!formErrors.publicName}
            helperText={formErrors.publicName?.message}
            fullWidth
            name="publicName"
            type="text"
            label={intl.formatMessage(commonMessages.shopName)}
            value={data.publicName}
            onChange={onChange}
          />
          {isMdDown && <FormSpacer />}
          <FormControl
            variant="outlined"
            error={!!formErrors.languageCode}
            fullWidth
          >
            <InputLabel variant="filled">
              <FormattedMessage defaultMessage="Language" />
            </InputLabel>
            <Select
              disabled={disabled}
              name="languageCode"
              fullWidth
              value={data?.languageCode}
              onChange={onChange}
              IconComponent={() => (
                <UilAngleDown className={classes.selecIcon} />
              )}
            >
              {Languages.map((lang, i) => (
                <MenuItem key={"lang" + i} value={lang.code}>
                  {lang.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <FormSpacer />
        <TextField
          error={!!formErrors.description}
          helperText={formErrors.description?.message}
          disabled={disabled}
          fullWidth
          multiline
          name="description"
          type="text"
          rows={5}
          label={intl.formatMessage(commonMessages.description)}
          value={data.description}
          onChange={onChange}
        />
      </CardContent>
    </Card>
  );
};

export default BusinessConfiguration;
