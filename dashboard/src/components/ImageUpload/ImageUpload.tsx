import { makeStyles } from "@drural/macaw-ui";
import { useMediaQuery } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { MediaShapeEnum, MediaSizeEnum } from "@saleor/utils/_types/media";
import classNames from "classnames";
import React from "react";
import { FormattedMessage } from "react-intl";

import Dropzone from "../Dropzone";
import ImageUploadPicture from "../ImageUploadPicture";

interface ImageUploadProps {
  children?: (props: { isDragActive: boolean }) => React.ReactNode;
  className?: string;
  description?: string;
  disableClick?: boolean;
  isActiveClassName?: string;
  iconContainerClassName?: string;
  iconContainerActiveClassName?: string;
  hideUploadIcon?: boolean;
  shape?: MediaShapeEnum;
  title?: string;
  onImageUpload: (file: FileList) => void;
}

const useStyles = makeStyles(
  theme => ({
    backdrop: {
      background: fade(theme.palette.primary.main, 0.1),
      color: theme.palette.primary.main
    },
    fileField: {
      display: "none"
    },
    flexWrapper: {
      display: "flex",
      alignItems: "center"
    },
    flexWrapperMobile: {
      display: "block"
    },
    imageContainer: {
      background: "#ffffff",
      border: "1px solid #eaeaea",
      borderRadius: theme.spacing(),
      height: 148,
      justifySelf: "start",
      overflow: "hidden",
      padding: theme.spacing(2),
      position: "relative",
      transition: theme.transitions.duration.standard + "s",
      width: 148
    },
    imageWrapper: {
      paddingRight: 22
    },
    infoWrapper: {
      textAlign: "left"
    },
    photosIcon: {
      height: "64px",
      margin: "0 auto",
      width: "64px"
    },
    photosIconContainer: {
      padding: 24,
      textAlign: "center"
    },
    svgBackBars: {
      position: "absolute",
      left: 24
    },
    svgIcon: {
      position: "absolute",
      left: 63,
      top: 61
    },
    uploadTitle: {
      color: theme.palette.common.black,
      fontSize: theme.typography.h4.fontSize,
      fontWeight: theme.typography.h4.fontWeight,
      lineHeight: theme.typography.h4.lineHeight,
      marginBottom: 20
    },
    uploadText: {
      color: theme.palette.common.black,
      fontSize: 12,
      lineHeight: "20px",
      marginBottom: 6,
      opacity: 0.5
    }
  }),
  { name: "ImageUpload" }
);

export const ImageUpload: React.FC<ImageUploadProps> = props => {
  const {
    children,
    className,
    description,
    disableClick,
    iconContainerActiveClassName,
    iconContainerClassName,
    isActiveClassName,
    hideUploadIcon,
    shape = MediaShapeEnum.SQUARE,
    title,
    onImageUpload
  } = props;

  const classes = useStyles(props);
  const matches = useMediaQuery("(max-width:425px)");

  return (
    <Dropzone disableClick={disableClick} onDrop={onImageUpload}>
      {({ isDragActive, getInputProps, getRootProps }) => (
        <>
          <div
            {...getRootProps()}
            className={classNames(className, classes.photosIconContainer, {
              [classes.backdrop]: isDragActive,
              [isActiveClassName]: isDragActive
            })}
          >
            {!hideUploadIcon && (
              <div
                className={classNames(
                  matches === true
                    ? classes.flexWrapperMobile
                    : classes.flexWrapper,
                  iconContainerClassName,
                  {
                    [iconContainerActiveClassName]: isDragActive
                  }
                )}
              >
                <input
                  {...getInputProps()}
                  className={classes.fileField}
                  accept=".png, .jpg, .jpeg, .gif"
                />

                <div className={classes.imageWrapper}>
                  <ImageUploadPicture shape={shape} size={MediaSizeEnum.SM} />
                </div>

                <div className={classes.infoWrapper}>
                  <Typography className={classes.uploadTitle}>
                    {title ? (
                      title
                    ) : (
                      <FormattedMessage
                        defaultMessage="Upload a photo of your choice"
                        description="image upload title"
                      />
                    )}
                  </Typography>
                  <Typography className={classes.uploadText}>
                    {description ? (
                      description
                    ) : (
                      <FormattedMessage
                        defaultMessage="You should upload at least one photo"
                        description="image upload text description"
                      />
                    )}
                  </Typography>
                  <Typography className={classes.uploadText}>
                    <FormattedMessage
                      defaultMessage="Max. filesize 2 MG"
                      description="image upload text size"
                    />
                  </Typography>
                </div>
              </div>
            )}
          </div>
          {children && children({ isDragActive })}
        </>
      )}
    </Dropzone>
  );
};
ImageUpload.displayName = "ImageUpload";
export default ImageUpload;
