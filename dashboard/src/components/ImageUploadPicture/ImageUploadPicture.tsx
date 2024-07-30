import uploadImgBackBarsRectangle from "@assets/images/dRuralImages/upload_photo_background_rectangle.svg";
import uploadImgBackBarsSquare from "@assets/images/dRuralImages/upload-img-back-bars-square.svg";
import { UilImage } from "@iconscout/react-unicons";
import { MediaShapeEnum, MediaSizeEnum } from "@saleor/utils/_types/media";
import classNames from "classnames";
import React from "react";
import SVG from "react-inlinesvg";

import { useStyles } from "./styles";
import { IImageUploadPictureProps } from "./types";

export const ImageUploadPicture: React.FC<IImageUploadPictureProps> = ({
  shape,
  size
}) => {
  const classes = useStyles();

  return (
    <div
      className={classNames(classes.wrapper, {
        [classes.mlSquare]:
          shape === MediaShapeEnum.SQUARE && size === MediaSizeEnum.ML,
        [classes.smSquare]:
          shape === MediaShapeEnum.SQUARE && size === MediaSizeEnum.SM,
        [classes.mlReactangle]:
          shape === MediaShapeEnum.RECTANGLE && size === MediaSizeEnum.ML,
        [classes.smReactangle]:
          shape === MediaShapeEnum.RECTANGLE && size === MediaSizeEnum.SM
      })}
    >
      <SVG
        className={classNames(classes.svgBackBars, {
          [classes.mlSquare]:
            shape === MediaShapeEnum.SQUARE && size === MediaSizeEnum.ML,
          [classes.smSquare]:
            shape === MediaShapeEnum.SQUARE && size === MediaSizeEnum.SM,
          [classes.mlReactangle]:
            shape === MediaShapeEnum.RECTANGLE && size === MediaSizeEnum.ML,
          [classes.smReactangle]:
            shape === MediaShapeEnum.RECTANGLE && size === MediaSizeEnum.SM
        })}
        src={
          shape === MediaShapeEnum.SQUARE
            ? uploadImgBackBarsSquare
            : uploadImgBackBarsRectangle
        }
      />
      <UilImage
        size={size === MediaSizeEnum.ML ? 67 : 52}
        className={classes.svgIcon}
      />
    </div>
  );
};
ImageUploadPicture.displayName = "ImageUploadPicture";
export default ImageUploadPicture;
