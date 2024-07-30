import { UilImageUpload } from "@iconscout/react-unicons";
import { Button, Typography } from "@material-ui/core";
import useNotifier from "@saleor/hooks/useNotifier";
import getFileValidationErrorMessage from "@saleor/utils/errors/files";
import { defaultFileAcceptedFormats } from "@saleor/utils/files/constants";
import {
  cleanFileInputValue,
  fileValidator,
  getFileUrl
} from "@saleor/utils/files/files";
import classNames from "classnames";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useIntl } from "react-intl";

import { MediaShapeEnum, MediaSizeEnum } from "../../utils/_types/media";
import BannerImageCropDialog from "../BannerImageCropDialog";
import ImageUploadPicture from "../ImageUploadPicture";
import MediaTile from "../MediaTile";
import { useStyles } from "./styles";
import { IImageWithCropProps } from "./types";

const ImageUploadWithCrop: React.FC<IImageWithCropProps> = ({
  title,
  description,
  image,
  shape = MediaShapeEnum.SQUARE,
  size = MediaSizeEnum.ML,
  validations,
  setImage,
  setUploadLinkRef,
  uploadButton,
  withCropper,
  onImageDelete,
  bannerAspect,
  minBannerHeight,
  fileAcceptedFormats
}) => {
  const imgInputAnchor = React.useRef<HTMLInputElement>();
  const clickImgInput = () => imgInputAnchor.current.click();
  // 1. Variables
  const classes = useStyles();
  const intl = useIntl();
  const notify = useNotifier();

  const [isModalOpen, setModalOpen] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<string>(null);
  const [croppedImage, setCroppedImage] = useState<string>(null);

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
        setCroppedImage(fileUrl);
        setImage(file);
      }
    }
  };

  const onCropComplete = async (file: File) => {
    const fileUrl = await getFileUrl(file, notify);

    if (fileUrl) {
      onModalClose();
      setCroppedImage(fileUrl);
      setImage(file);
    }
  };

  const onModalClose = () => {
    setModalOpen(false);
    setImageToCrop(null);
  };

  // Sets Input Ref to extern Link if necessary

  React.useEffect(() => {
    if (imgInputAnchor.current) {
      if (setUploadLinkRef) {
        setUploadLinkRef(imgInputAnchor);
      }
    }
  }, [imgInputAnchor.current, setUploadLinkRef]);

  // 3. Render
  return (
    <div
      className={classNames(
        "businessCreate-uploadContainer",
        classes.uploadContainer
      )}
    >
      <div className={classes.photoWrapper}>
        {croppedImage || image ? (
          <MediaTile
            media={{ alt: "", url: croppedImage || image }}
            shape={shape}
            size={size}
            onDelete={() => {
              setCroppedImage("");
              setImage(null);
              onImageDelete();
            }}
          />
        ) : (
          <div
            className={classes.ImageUploadWrapper}
            onClick={() => clickImgInput()}
          >
            <ImageUploadPicture shape={shape} size={size} />
          </div>
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
          accept={fileAcceptedFormats || defaultFileAcceptedFormats}
          className={classes.input}
          id="image-upload"
          name="image-upload"
          multiple={false}
          type="file"
          onClick={cleanFileInputValue}
          onChange={({ target }) => {
            onFileInputClick(target.files[0]);
          }}
          ref={imgInputAnchor}
        />
        {uploadButton && (
          <div className={classes.imageLabel}>
            <Button
              variant="outlined"
              color="secondary"
              component="span"
              className={classes.button}
              onClick={() => clickImgInput()}
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
          </div>
        )}
      </div>

      {withCropper && imageToCrop && (
        <BannerImageCropDialog
          imageSrc={imageToCrop}
          open={isModalOpen}
          onClose={onModalClose}
          onComplete={onCropComplete}
          bannerAspect={bannerAspect}
          minBannerHeight={minBannerHeight}
          bannerFileValitations={validations}
        />
      )}
    </div>
  );
};

export default ImageUploadWithCrop;
