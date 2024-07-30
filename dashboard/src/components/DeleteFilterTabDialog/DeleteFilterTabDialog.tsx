import { makeStyles } from "@drural/macaw-ui";
import { DialogContentText } from "@material-ui/core";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import ActionDialog from "../ActionDialog";
import { ConfirmButtonTransitionState } from "../ConfirmButton";

export interface DeleteFilterTabDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  open: boolean;
  tabName: string;
  onClose: () => void;
  onSubmit: () => void;
}

const useStyles = makeStyles(
  theme => ({
    closeIcon: {
      position: "absolute",
      top: theme.spacing(3),
      right: theme.spacing(3),
      [theme.breakpoints.down("xs")]: {
        top: theme.spacing(2.5),
        right: theme.spacing(2.5)
      }
    },
    dialogContent: {
      textAlign: "center"
    }
  }),
  { name: "DeleteFilterBarDielog" }
);

const DeleteFilterTabDialog: React.FC<DeleteFilterTabDialogProps> = ({
  confirmButtonState,
  onClose,
  onSubmit,
  open,
  tabName
}) => {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <ActionDialog
      open={open}
      confirmButtonState={confirmButtonState}
      onClose={onClose}
      onConfirm={onSubmit}
      title={intl.formatMessage({
        defaultMessage: "Delete Search",
        description: "custom search delete, dialog header"
      })}
      variant="default"
    >
      <DialogContentText className={classes.dialogContent}>
        <FormattedMessage
          defaultMessage="Are you sure you want to delete {name} search tab?"
          values={{
            name: <strong>{tabName}</strong>
          }}
        />
      </DialogContentText>
    </ActionDialog>
  );
};
DeleteFilterTabDialog.displayName = "DeleteFilterTabDialog";
export default DeleteFilterTabDialog;
