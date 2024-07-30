import { makeStyles } from "@drural/macaw-ui";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from "@material-ui/core";
import { buttonMessages } from "@saleor/intl";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import CloseIcon from "../CloseIcon";
import ConfirmButton, { ConfirmButtonTransitionState } from "../ConfirmButton";
import Form from "../Form";

export interface SaveFilterTabDialogFormData {
  name: string;
}

const initialForm: SaveFilterTabDialogFormData = {
  name: ""
};

export interface SaveFilterTabDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  open: boolean;
  onClose: () => void;
  onSubmit: (data: SaveFilterTabDialogFormData) => void;
}

const useStyles = makeStyles(
  theme => ({
    closeIcon: {
      position: "absolute",
      top: theme.spacing(3),
      right: theme.spacing(3),
      [theme.breakpoints.down("xs")]: {
        top: theme.spacing(2.5),
        right: theme.spacing(2.5),
        "& svg": {
          width: "16px",
          height: "16px"
        }
      }
    },
    dialogTitle: {
      padding: theme.spacing(6, 8, 0),

      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(5, 2, 0)
      },

      "& h2": {
        fontSize: theme.typography.h2.fontSize,
        lineHeight: theme.typography.h2.lineHeight,
        fontWeight: 600,
        [theme.breakpoints.down("xs")]: {
          fontSize: 18,
          lineHeight: "24px",
          width: "90%",
          margin: "auto"
        }
      }
    },
    dialogContent: {
      "&.MuiDialogContent-root": {
        padding: theme.spacing(5.75, 8, 8),

        [theme.breakpoints.down("xs")]: {
          padding: theme.spacing(3, 2, 5)
        }
      }
    },
    dialogActions: {
      padding: theme.spacing(0, 8, 4),

      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(0, 2, 3)
      }
    }
  }),
  { name: "SaveBarTabDialog" }
);

const SaveFilterTabDialog: React.FC<SaveFilterTabDialogProps> = ({
  confirmButtonState,
  onClose,
  onSubmit,
  open
}) => {
  const classes = useStyles();
  const intl = useIntl();
  const [errors, setErrors] = React.useState(false);
  const handleErrors = data => {
    if (data.name.length) {
      onSubmit(data);
      setErrors(false);
    } else {
      setErrors(true);
    }
  };

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="md">
      <CloseIcon className={classes.closeIcon} onClose={onClose} />
      <DialogTitle className={classes.dialogTitle}>
        <FormattedMessage
          defaultMessage="Save Custom Search"
          description="save filter tab, header"
        />
      </DialogTitle>
      <Form initial={initialForm} onSubmit={handleErrors}>
        {({ change, data, submit }) => (
          <>
            <DialogContent className={classes.dialogContent}>
              <TextField
                autoFocus
                fullWidth
                label={intl.formatMessage({
                  defaultMessage: "Search Name",
                  description: "save search tab"
                })}
                name={"name" as keyof SaveFilterTabDialogFormData}
                value={data.name}
                onChange={change}
                error={errors}
                helperText={errors ? "This field is required" : null}
              />
            </DialogContent>
            <DialogActions className={classes.dialogActions}>
              <Button onClick={onClose} color="secondary" variant="outlined">
                <FormattedMessage {...buttonMessages.back} />
              </Button>
              <ConfirmButton
                transitionState={confirmButtonState}
                color="primary"
                variant="contained"
                onClick={submit}
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
SaveFilterTabDialog.displayName = "SaveFilterTabDialog";
export default SaveFilterTabDialog;
