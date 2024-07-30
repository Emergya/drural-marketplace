import { Card, CardContent, TextField, Typography } from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import Grid from "@saleor/components/Grid";
import Hr from "@saleor/components/Hr";
import { commonMessages } from "@saleor/intl";
import { getFormErrors } from "@saleor/utils/errors";
import getAccountErrorMessage from "@saleor/utils/errors/account";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { useStyles } from "./styles";
import { UserInfoProps } from "./types";

const UserInfo: React.FC<UserInfoProps> = props => {
  const { data, disabled, errors, onChange } = props;

  const classes = useStyles(props);
  const intl = useIntl();

  const formErrors = getFormErrors(["firstName", "lastName", "email"], errors);

  return (
    <Card>
      <CardTitle
        title={
          <FormattedMessage
            defaultMessage="Personal Information"
            description="customer informations, header"
          />
        }
      />
      <CardContent className={classes.content}>
        <Typography className={classes.sectionHeader}>
          <FormattedMessage {...commonMessages.generalInformations} />
        </Typography>
        <Grid variant="uniform">
          <TextField
            disabled={disabled}
            error={!!formErrors.firstName}
            fullWidth
            helperText={getAccountErrorMessage(formErrors.firstName, intl)}
            name="firstName"
            type="text"
            label={intl.formatMessage(commonMessages.firstName)}
            value={data.firstName}
            onChange={onChange}
          />
          <TextField
            disabled={disabled}
            error={!!formErrors.lastName}
            fullWidth
            helperText={getAccountErrorMessage(formErrors.lastName, intl)}
            name="lastName"
            type="text"
            label={intl.formatMessage(commonMessages.lastName)}
            value={data.lastName}
            onChange={onChange}
          />
        </Grid>
        <Hr className={classes.hr} />
        <Typography className={classes.sectionHeader}>
          <FormattedMessage
            defaultMessage="Contact Information"
            description="customer contact section, header"
          />
        </Typography>
        <TextField
          disabled={disabled}
          error={!!formErrors.email}
          fullWidth
          helperText={getAccountErrorMessage(formErrors.email, intl)}
          name="email"
          type="email"
          label={intl.formatMessage(commonMessages.email)}
          value={data.email}
          onChange={onChange}
        />
      </CardContent>
    </Card>
  );
};
UserInfo.displayName = "UserInfo";
export default UserInfo;
