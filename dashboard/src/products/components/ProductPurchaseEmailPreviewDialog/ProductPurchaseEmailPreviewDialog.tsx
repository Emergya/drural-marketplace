import iconLogo from "@assets/images/dRuralLogos/Icon-Mono-Positive.svg";
import logo from "@assets/images/dRuralLogos/Logo-Horizontal-Positive.svg";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from "@material-ui/core";
import CloseIcon from "@saleor/components/CloseIcon";
import { buttonMessages } from "@saleor/intl";
import React from "react";
import { FormattedMessage } from "react-intl";

import { useStyles } from "./styles";
import { IProductPurchaseEmailPreviewDialogProps } from "./types";

export const ProductPurchaseEmailPreviewDialog: React.FC<IProductPurchaseEmailPreviewDialogProps> = ({
  data,
  disabled,
  open,
  onClose
}) => {
  const classes = useStyles();
  const { subject, title, content } = data || {};

  return (
    <Dialog
      classes={{ paper: classes.dialog }}
      onClose={onClose}
      open={open}
      maxWidth="lg"
      fullWidth
    >
      <CloseIcon className={classes.closeIcon} onClose={onClose} />

      <DialogTitle className={classes.titleWrapper}>
        <Typography variant="h2" className={classes.title}>
          <FormattedMessage
            defaultMessage="Email preview"
            description="dialog title"
          />
        </Typography>
      </DialogTitle>

      <div className={classes.emailSubjectWrapper}>
        <Typography className={classes.emailSubject} variant="body2">
          Subject: {subject}
        </Typography>
      </div>

      <DialogContent className={classes.contentWrapper}>
        <div className={classes.emailContainer}>
          <div className={classes.emailLogoWrapper}>
            <img className={classes.emailLogo} src={logo} />
          </div>

          <div className={classes.emailWrapper}>
            <div className={classes.emailWrapperInner}>
              {title && (
                <Typography className={classes.emailTitle} variant="h3">
                  {title}
                </Typography>
              )}
              {content && <Typography>{content}</Typography>}
            </div>
          </div>

          <div className={classes.emailFooterWrapper}>
            <Typography>
              <FormattedMessage defaultMessage="© 2022 dRural" />
            </Typography>
            <Typography>
              <FormattedMessage defaultMessage="Designed and developed by dRural." />{" "}
            </Typography>
            <img className={classes.emailIconLogo} src={iconLogo} />
          </div>
        </div>
      </DialogContent>

      <DialogActions className={classes.actionsWrapper}>
        <Button
          color="primary"
          variant="contained"
          disabled={disabled}
          onClick={onClose}
        >
          <FormattedMessage {...buttonMessages.done} />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductPurchaseEmailPreviewDialog;
