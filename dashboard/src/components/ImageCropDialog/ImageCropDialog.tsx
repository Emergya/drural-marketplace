import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from "@material-ui/core";
import { buttonMessages } from "@saleor/intl";
import React from "react";
import { FormattedMessage } from "react-intl";

import CloseIcon from "../CloseIcon";
import ImageCrop from "../ImageCrop/ImageCrop";
import { useStyles } from "./styles";
import { IImageCropDialogProps } from "./types";

export const ImageCropDialog: React.FC<IImageCropDialogProps> = ({
  aspect,
  crop,
  imageRef,
  imageSrc,
  keepSelection,
  minHeight,
  open,
  ruleOfThirds,
  onClose,
  onChange,
  onComplete,
  onImageLoad,
  onSave,
  ...props
}) => {
  const classes = useStyles();

  return (
    <Dialog
      classes={{ paper: classes.dialog }}
      onClose={onClose}
      open={open}
      maxWidth="lg"
    >
      <CloseIcon className={classes.closeIcon} onClose={onClose} />
      <DialogTitle className={classes.titleWrapper}>
        <Typography variant="h2" className={classes.title}>
          <FormattedMessage
            defaultMessage="Crop the image"
            description="dialog title"
          />
        </Typography>
      </DialogTitle>

      <DialogContent className={classes.contentWrapper}>
        <ImageCrop
          aspect={aspect}
          crop={crop}
          imageRef={imageRef}
          imageSrc={imageSrc}
          keepSelection={keepSelection}
          minHeight={minHeight}
          ruleOfThirds={ruleOfThirds}
          onChange={onChange}
          onComplete={onComplete}
          onImageLoad={onImageLoad}
          {...props}
        />
      </DialogContent>
      <DialogActions className={classes.actionsWrapper}>
        <Button color="secondary" variant="outlined" onClick={onClose}>
          <FormattedMessage {...buttonMessages.cancel} />
        </Button>
        <Button
          color="primary"
          variant="contained"
          disabled={!imageRef.current}
          onClick={onSave}
        >
          <FormattedMessage {...buttonMessages.save} />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImageCropDialog;
