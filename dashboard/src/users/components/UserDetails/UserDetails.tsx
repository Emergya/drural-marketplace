import { Card, CardContent, TextField, Typography } from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import { ControlledCheckbox } from "@saleor/components/ControlledCheckbox";
import Skeleton from "@saleor/components/Skeleton";
import { maybe } from "@saleor/misc";
import { getFormErrors } from "@saleor/utils/errors";
import getAccountErrorMessage from "@saleor/utils/errors/account";
import moment from "moment-timezone";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { useStyles } from "./styles";
import { UserDetailsProps } from "./types";

const UserDetails: React.FC<UserDetailsProps> = props => {
  const { user, data, disabled, errors, onChange } = props;

  const classes = useStyles(props);
  const intl = useIntl();

  const formErrors = getFormErrors(["note"], errors);

  return (
    <Card>
      <CardTitle
        className={classes.cardTitle}
        title={
          <>
            {maybe<React.ReactNode>(() => user.email, <Skeleton />)}
            {user && user.dateJoined ? (
              <Typography
                className={classes.subtitle}
                variant="caption"
                component="div"
              >
                <FormattedMessage
                  defaultMessage="Active member since {date}"
                  description="section subheader"
                  values={{
                    date: moment(user.dateJoined).format("MMM YYYY")
                  }}
                />
              </Typography>
            ) : (
              <Skeleton style={{ width: "10rem" }} />
            )}
          </>
        }
      />
      <CardContent className={classes.content}>
        <ControlledCheckbox
          checked={data.isActive}
          className={classes.checkbox}
          disabled={disabled}
          label={intl.formatMessage({
            defaultMessage: "User account active",
            description: "check to mark this account as active"
          })}
          name="isActive"
          onChange={onChange}
        />
        <TextField
          disabled={disabled}
          error={!!formErrors.note}
          fullWidth
          multiline
          helperText={getAccountErrorMessage(formErrors.note, intl)}
          name="note"
          label={intl.formatMessage({
            defaultMessage: "Note",
            description: "note about user"
          })}
          value={data.note}
          onChange={onChange}
        />
      </CardContent>
    </Card>
  );
};
UserDetails.displayName = "UserDetails";
export default UserDetails;
