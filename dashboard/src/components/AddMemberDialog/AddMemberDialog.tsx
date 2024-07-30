import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from "@material-ui/core";
import CloseIcon from "@saleor/components/CloseIcon";
import ConfirmButton from "@saleor/components/ConfirmButton";
import Form from "@saleor/components/Form";
import FormSpacer from "@saleor/components/FormSpacer";
import useModalDialogErrors from "@saleor/hooks/useModalDialogErrors";
import { buttonMessages, commonMessages } from "@saleor/intl";
import { getFormErrors } from "@saleor/utils/errors";
import getAccountErrorMessage from "@saleor/utils/errors/account";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { useStyles } from "./styles";
import { AddMemberDialogProps } from "./types";
import { initialForm } from "./utils";

const AddMemberDialog: React.FC<AddMemberDialogProps> = props => {
  const { confirmButtonState, errors, open, title, onClose, onConfirm } = props;

  const classes = useStyles(props);
  const dialogErrors = useModalDialogErrors(errors, open);
  const intl = useIntl();
  const formErrors = getFormErrors(
    ["firstName", "lastName", "email"],
    dialogErrors
  );

  return (
    <Dialog
      onClose={onClose}
      open={open}
      PaperProps={{ classes: { root: classes.paperProps } }}
    >
      <CloseIcon className={classes.closeIcon} onClose={onClose} />
      <Form initial={initialForm} onSubmit={onConfirm}>
        {({ change, data: formData, hasChanged }) => (
          <>
            <DialogTitle className={classes.title}>{title}</DialogTitle>
            <DialogContent>
              <div className={classes.textFieldGrid}>
                <TextField
                  error={!!formErrors.firstName}
                  helperText={
                    !!formErrors.firstName &&
                    getAccountErrorMessage(formErrors.firstName, intl)
                  }
                  label={intl.formatMessage(commonMessages.firstName)}
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={change}
                />
                <TextField
                  error={!!formErrors.lastName}
                  helperText={
                    !!formErrors.lastName &&
                    getAccountErrorMessage(formErrors.lastName, intl)
                  }
                  label={intl.formatMessage(commonMessages.lastName)}
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={change}
                />
              </div>
              <FormSpacer />
              <TextField
                error={!!formErrors.email}
                fullWidth
                helperText={
                  !!formErrors.email &&
                  getAccountErrorMessage(formErrors.email, intl)
                }
                label={intl.formatMessage(commonMessages.email)}
                name="email"
                type="email"
                value={formData.email}
                onChange={change}
              />
            </DialogContent>

            <DialogActions className={classes.actions}>
              <Button
                onClick={onClose}
                color="secondary"
                variant="outlined"
                className={classes.backButton}
              >
                <FormattedMessage {...buttonMessages.back} />
              </Button>
              <ConfirmButton
                data-test="submit"
                color="primary"
                disabled={!hasChanged}
                variant="contained"
                type="submit"
                transitionState={confirmButtonState}
              >
                <FormattedMessage
                  defaultMessage="Send invite"
                  description="button"
                />
              </ConfirmButton>
            </DialogActions>
          </>
        )}
      </Form>
    </Dialog>
  );
};
AddMemberDialog.displayName = "AddMemberDialog";
export default AddMemberDialog;
