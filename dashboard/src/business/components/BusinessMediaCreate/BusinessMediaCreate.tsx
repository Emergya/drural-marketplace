import { UilImageUpload } from "@iconscout/react-unicons";
import { Button, Typography } from "@material-ui/core";
import { businessDescriptionAction } from "@saleor/business/utils";
import BannerImageCropDialog from "@saleor/components/BannerImageCropDialog";
import ImageUploadPicture from "@saleor/components/ImageUploadPicture";
import MediaTile from "@saleor/components/MediaTile";
import useNotifier from "@saleor/hooks/useNotifier";
import { MediaShapeEnum, MediaSizeEnum } from "@saleor/utils/_types/media";
import getFileValidationErrorMessage from "@saleor/utils/errors/files";
import {
  bannerAspect,
  bannerFileValitations,
  minBannerHeight
} from "@saleor/utils/files/constants";
import {
  cleanFileInputValue,
  fileValidator,
  getFileUrl
} from "@saleor/utils/files/files";
import classNames from "classnames";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useIntl } from "react-intl";

import { useStyles } from "./styles";
import { IBusinessMediaProps } from "./types";

const BusinessMediaCreate: React.FC<IBusinessMediaProps> = ({
  actionName,
  description,
  image,
  shape = MediaShapeEnum.SQUARE,
  size = MediaSizeEnum.ML,
  title,
  validations,
  withCropper,
  dispatch,
  setImage
}) => {
  // 1. Variables
  const classes = useStyles();
  const intl = useIntl();
  const notify = useNotifier();

  const [isModalOpen, setModalOpen] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<string>(null);

  // 2. Events
  const onFileInputClick = async (file: File) => {
    const fileUrl = await getFileUrl(file, notify);

    if (fileUrl) {
      const validationError = await fileValidator(
        file,
        fileUrl,
        validations,
        notify
      );

      if (validationError) {
        notify({
          status: "error",
          text: getFileValidationErrorMessage(
            validations.dimesions,
            validationError,
            intl
          )
        });
        return;
      }
      if (withCropper) {
        setImageToCrop(fileUrl);
        setModalOpen(true);
      } else {
        setImage(fileUrl);
        dispatch(businessDescriptionAction(actionName, file));
      }
    }
  };

  const onCropComplete = async (file: File) => {
    const fileUrl = await getFileUrl(file, notify);

    if (fileUrl) {
      if (withCropper) {
        onModalClose();
      }

      setImage(fileUrl);
      dispatch(businessDescriptionAction(actionName, file));
    }
  };

  const onModalClose = () => {
    setModalOpen(false);
    setImageToCrop(null);
  };

  // 3. Render
  return (
    <div
      className={classNames(
        "businessCreate-uploadContainer",
        classes.uploadContainer
      )}
    >
      <div className={classes.photoWrapper}>
        {image ? (
          <MediaTile
            media={{ alt: "", url: image }}
            shape={shape}
            size={size}
            onDelete={() => {
              dispatch(businessDescriptionAction(actionName, null));
              setImage("");
            }}
          />
        ) : (
          <ImageUploadPicture shape={shape} size={size} />
        )}
      </div>

      <div className={classes.contentWrapper}>
        <div className={classes.photoTitle}>
          <Typography variant="h4">{title}</Typography>
        </div>
        <div className={classes.description}>
          <Typography variant="body1" className={classes.baseXS}>
            {description}
          </Typography>
          <Typography variant="body1" className={classes.baseXS}>
            <FormattedMessage defaultMessage="Max. filesize 2 MB" />
          </Typography>
        </div>
        <input
          accept=".png, .jpg, .jpeg, .gif"
          className={classes.input}
          id={actionName}
          name={actionName}
          multiple={false}
          type="file"
          onClick={cleanFileInputValue}
          onChange={({ target }) => {
            onFileInputClick(target.files[0]);
          }}
        />
        <label htmlFor={actionName} className={classes.imageLabel}>
          <Button
            variant="outlined"
            color="secondary"
            component="span"
            className={classes.button}
          >
            <UilImageUpload
              size={21}
              color="#000000"
              className={classes.icon}
            />
            {intl.formatMessage({
              defaultMessage: "Upload photo"
            })}
          </Button>
        </label>
      </div>

      {withCropper && imageToCrop && (
        <BannerImageCropDialog
          imageSrc={imageToCrop}
          open={isModalOpen}
          onClose={onModalClose}
          onComplete={onCropComplete}
          bannerAspect={bannerAspect}
          bannerFileValitations={bannerFileValitations}
          minBannerHeight={minBannerHeight}
        />
      )}
    </div>
  );
};

export default BusinessMediaCreate;
