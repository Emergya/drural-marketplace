import { makeStyles } from "@drural/macaw-ui";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography
  // useMediaQuery
} from "@material-ui/core";
import CloseIcon from "@saleor/components/CloseIcon";
import Form from "@saleor/components/Form";
import FormSpacer from "@saleor/components/FormSpacer";
import { buttonMessages } from "@saleor/intl";
import { ProductDetails_product } from "@saleor/products/types/ProductDetails";
import React from "react";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";

interface ProductExternalMediaDialogProps {
  product: ProductDetails_product;
  open: boolean;
  onClose: () => void;
  onSubmit: (mediaUrl: string) => void;
}

interface FormValues {
  mediaUrl: string;
}

const messages = defineMessages({
  buttonMessage: {
    defaultMessage: "Upload URL",
    description: "modal button"
  }
});

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
  { name: "ProductExternalMediaDialog" }
);

const ProductExternalMediaDialog: React.FC<ProductExternalMediaDialogProps> = ({
  open,
  onClose,
  onSubmit
}) => {
  const intl = useIntl();
  const classes = useStyles();
  const initialValues: FormValues = {
    mediaUrl: ""
  };
  // const isMdUp = useMediaQuery((theme: SaleorTheme) =>
  //   theme.breakpoints.up("md")
  // );

  const handleOnSubmit = (values: FormValues) => {
    onSubmit(values.mediaUrl);
    onClose();
  };

  return (
    <Dialog onClose={onClose} open={open} maxWidth="md">
      <CloseIcon className={classes.closeIcon} onClose={onClose} />
      <DialogTitle className={classes.dialogTitle}>
        {intl.formatMessage(messages.buttonMessage)}
      </DialogTitle>
      <Form initial={initialValues} onSubmit={handleOnSubmit}>
        {({ change, data, submit }) => (
          <>
            <DialogContent className={classes.dialogContent}>
              <Typography>
                <FormattedMessage
                  defaultMessage="Media from the URL you supply will be shown in the media gallery. You will be able to define the order of the gallery."
                  description="modal header"
                />
              </Typography>
              <FormSpacer />
              <TextField
                label="URL"
                value={data.mediaUrl}
                name="mediaUrl"
                type="url"
                onChange={change}
                autoFocus
                fullWidth
              />
            </DialogContent>

            <DialogActions className={classes.dialogActions}>
              <Button color="secondary" variant="outlined" onClick={onClose}>
                <FormattedMessage {...buttonMessages.back} />
              </Button>
              <Button color="primary" variant="contained" onClick={submit}>
                {intl.formatMessage(messages.buttonMessage)}
              </Button>
            </DialogActions>
          </>
        )}
      </Form>
    </Dialog>
  );
};

export default ProductExternalMediaDialog;
