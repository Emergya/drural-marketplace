import { makeStyles } from "@drural/macaw-ui";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { DialogProps } from "@saleor/types";
import React from "react";

import CloseIcon from "../CloseIcon";
import { ConfirmButtonTransitionState } from "../ConfirmButton";
import DialogButtons from "./DialogButtons";
import { ActionDialogVariant } from "./types";

interface ActionDialogProps extends DialogProps {
  children?: React.ReactNode;
  confirmButtonLabel?: string;
  confirmButtonState: ConfirmButtonTransitionState;
  disabled?: boolean;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
  title: string;
  variant?: ActionDialogVariant;
  onConfirm();
}

const useStyles = makeStyles(
  theme => ({
    sectionTitle: {
      fontWeight: 600 as 600,
      marginBottom: theme.spacing(),
      marginTop: theme.spacing(2)
    },
    textFieldGrid: {
      display: "grid",
      gridColumnGap: theme.spacing(2),
      gridTemplateColumns: "1fr 1fr",
      [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: "1fr",
        gridRowGap: "40px"
      }
    },
    paperProps: {
      maxWidth: "800px",
      width: "100%",
      borderRadius: "16px",
      minHeight: "312px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "25px",
      [theme.breakpoints.down("sm")]: {
        paddingLeft: 0,
        paddingRight: 0,
        maxWidth: "100vw",
        marginRight: "10px",
        marginLeft: "10px"
      }
    },

    title: {
      borderBottom: "none",
      textAlign: "center",
      "& h2": {
        fontSize: "28px",
        fontWeight: "600",
        [theme.breakpoints.down("xs")]: {
          fontSize: "18px"
        }
      }
    },
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
    content: {
      textAlign: "center"
    }
  }),
  { name: "ActionDialog" }
);

const ActionDialog: React.FC<ActionDialogProps> = props => {
  const { children, open, title, onClose, variant, ...rest } = props;
  const classes = useStyles(props);
  return (
    <Dialog
      fullWidth
      onClose={onClose}
      open={open}
      {...rest}
      PaperProps={{ classes: { root: classes.paperProps } }}
    >
      <CloseIcon className={classes.closeIcon} onClose={onClose} />
      <DialogTitle className={classes.title}>{title}</DialogTitle>
      <DialogContent className={classes.content}>{children}</DialogContent>
      <DialogButtons {...rest} onClose={onClose} variant={variant} />
    </Dialog>
  );
};

ActionDialog.defaultProps = {
  maxWidth: "xs"
};

ActionDialog.displayName = "ActionDialog";
export default ActionDialog;
