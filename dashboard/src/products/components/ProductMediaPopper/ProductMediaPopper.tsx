import { makeStyles } from "@drural/macaw-ui";
import {
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList as Menu,
  Paper,
  Popper
} from "@material-ui/core";
import React from "react";
import { defineMessages, useIntl } from "react-intl";

interface ProductMediaPopperProps {
  anchorRef: HTMLButtonElement;
  imagesUploadRef: HTMLInputElement;
  openMediaUrlModal: () => void;
  popperStatus: boolean;
  setPopperStatus: (popperStatus: boolean) => void;
}

const messages = defineMessages({
  uploadImages: {
    defaultMessage: "Upload Images",
    description: "modal button images upload"
  },
  uploadUrl: {
    defaultMessage: "Upload URL",
    description: "modal button url upload"
  }
});

const useStyles = makeStyles(
  () => ({
    paper: {
      borderRadius: 0,
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)"
    }
  }),
  { name: "ProductMediaPopper" }
);

export const ProductMediaPopper = ({
  anchorRef,
  imagesUploadRef,
  setPopperStatus,
  openMediaUrlModal,
  popperStatus
}: ProductMediaPopperProps) => {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Popper
      open={popperStatus}
      anchorEl={anchorRef}
      transition
      placement="bottom-end"
    >
      {({ TransitionProps }) => (
        <Grow {...TransitionProps}>
          <Paper square className={classes.paper}>
            <ClickAwayListener
              onClickAway={() => setPopperStatus(false)}
              mouseEvent="onClick"
            >
              <Menu>
                <MenuItem
                  onClick={() => imagesUploadRef.click()}
                  data-test="uploadImages"
                  key="upload-images"
                >
                  {intl.formatMessage(messages.uploadImages)}
                </MenuItem>
                <MenuItem
                  onClick={openMediaUrlModal}
                  data-test="uploadMediaUrl"
                  key="upload-media-url"
                >
                  {intl.formatMessage(messages.uploadUrl)}
                </MenuItem>
              </Menu>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};
