import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from "@material-ui/core";
import ConfirmButton, {
  ConfirmButtonTransitionState
} from "@saleor/components/ConfirmButton";
import Form from "@saleor/components/Form";
import FormSpacer from "@saleor/components/FormSpacer";
import { AccountErrorFragment } from "@saleor/fragments/types/AccountErrorFragment";
import useModalDialogErrors from "@saleor/hooks/useModalDialogErrors";
import { buttonMessages } from "@saleor/intl";
import { DialogProps } from "@saleor/types";
import { getFormErrors } from "@saleor/utils/errors";
import getAccountErrorMessage from "@saleor/utils/errors/account";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

interface StaffPasswordResetDialogFormData {
  newPassword: string;
  oldPassword: string;
  newPasswordRepeat: string;
}
export interface StaffPasswordResetDialogProps extends DialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  errors: AccountErrorFragment[];
  onSubmit: (data: StaffPasswordResetDialogFormData) => void;
}

const initialForm: StaffPasswordResetDialogFormData = {
  newPassword: "",
  oldPassword: "",
  newPasswordRepeat: ""
};

const StaffPasswordResetDialog: React.FC<StaffPasswordResetDialogProps> = ({
  confirmButtonState,
  errors,
  open,
  onClose,
  onSubmit
}) => {
  const intl = useIntl();
  const dialogErrors = useModalDialogErrors(errors, open);

  const formErrors = getFormErrors(
    ["oldPassword", "newPassword", "newPasswordRepeat"],
    dialogErrors
  );

  const [repeatNewPasswordError, setRepeatNewPasswordError] = React.useState(
    ""
  );

  const handleSubmit = (data: StaffPasswordResetDialogFormData) => {
    if (data.newPasswordRepeat !== data.newPassword) {
      setRepeatNewPasswordError(
        intl.formatMessage({
          defaultMessage:
            "The new password and the repeated new password must be the same, please check the fields"
        })
      );

      return null;
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\-_])(?=.{7,})/.test(
        data.newPassword
      )
    ) {
      setRepeatNewPasswordError(
        intl.formatMessage({
          defaultMessage:
            "Must contain 7 characters and at least an uppercase, a lowercase, a number and a special case."
        })
      );
      return null;
    } else {
      return onSubmit(data);
    }
  };

  return (
    <Dialog
      onClose={() => {
        setRepeatNewPasswordError("");
        onClose();
      }}
      open={open}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        <FormattedMessage
          defaultMessage="Change Password"
          description="dialog header"
        />
      </DialogTitle>
      <Form initial={initialForm} onSubmit={handleSubmit}>
        {({ change }) => (
          <>
            <DialogContent>
              <TextField
                error={!!formErrors.oldPassword}
                fullWidth
                helperText={getAccountErrorMessage(
                  formErrors.oldPassword,
                  intl
                )}
                label={intl.formatMessage({
                  defaultMessage: "Previous Password",
                  description: "input label"
                })}
                name="oldPassword"
                type="password"
                onChange={change}
              />
              <FormSpacer />
              <TextField
                error={!!repeatNewPasswordError || !!formErrors.newPassword}
                fullWidth
                helperText={
                  repeatNewPasswordError ||
                  getAccountErrorMessage(formErrors.newPassword, intl) ||
                  intl.formatMessage({
                    defaultMessage:
                      "New password must be at least 7 characters long, must have one lowercase letter, one number and one special character"
                  })
                }
                label={intl.formatMessage({
                  defaultMessage: "New Password",
                  description: "input label"
                })}
                name="newPassword"
                type="password"
                onChange={e => {
                  setRepeatNewPasswordError("");
                  change(e);
                }}
              />

              <TextField
                style={{
                  marginTop: !!formErrors.newPassword ? "20px" : "10px"
                }}
                error={
                  !!repeatNewPasswordError || !!formErrors.newPasswordRepeat
                }
                fullWidth
                helperText={
                  repeatNewPasswordError ||
                  getAccountErrorMessage(formErrors.newPasswordRepeat, intl) ||
                  intl.formatMessage({
                    defaultMessage: "Repeat the same new Password"
                  })
                }
                label={intl.formatMessage({
                  defaultMessage: "Repeat New Password",
                  description: "input label"
                })}
                name="newPasswordRepeat"
                type="password"
                onChange={e => {
                  setRepeatNewPasswordError("");
                  change(e);
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setRepeatNewPasswordError("");
                  onClose();
                }}
              >
                <FormattedMessage {...buttonMessages.back} />
              </Button>
              <ConfirmButton
                transitionState={confirmButtonState}
                color="primary"
                variant="contained"
                type="submit"
              >
                <FormattedMessage {...buttonMessages.save} />
              </ConfirmButton>
            </DialogActions>
          </>
        )}
      </Form>
    </Dialog>
  );
};

StaffPasswordResetDialog.displayName = "StaffPasswordResetDialog";
export default StaffPasswordResetDialog;
