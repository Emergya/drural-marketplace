import defaultImageSmall from "@assets/images/dRuralIcons/img-default-small.svg";
import { makeStyles } from "@drural/macaw-ui";
import { CircularProgress, IconButton, lighten } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { MediaShapeEnum, MediaSizeEnum } from "@saleor/utils/_types/media";
import classNames from "classnames";
import React from "react";
import ReactSVG from "react-inlinesvg";

const useStyles = makeStyles(
  theme => ({
    media: {
      height: "100%",
      objectFit: "contain",
      userSelect: "none",
      width: "100%"
    },
    mediaContainer: {
      "&:hover, &.dragged": {
        "& $mediaOverlay": {
          display: "block"
        }
      },
      "&:not(:last-child)": {
        marginBottom: 16,
        marginRight: 16
      },
      background: theme.palette.background.paper,
      border: `1px solid ${lighten(theme.palette.secondary.main, 0.4)}`,
      height: 148,
      overflow: "hidden",
      position: "relative",
      width: 148
    },
    mediaOverlay: {
      background: "rgba(0, 0, 0, 0.6)",
      cursor: "move",
      display: "none",
      height: 148,
      left: 0,
      position: "absolute",
      top: 0,
      width: 148
    },
    mediaOverlayShadow: {
      "&mediaOverlay": {
        alignItems: "center",
        display: "flex",
        justifyContent: "center"
      }
    },
    mediaOverlayToolbar: {
      display: "flex",
      justifyContent: "flex-end"
    },

    smSquare: {
      height: "128px",
      width: "128px"
    },
    mlSquare: {
      height: "200px",
      width: "200px"
    },
    smReactangle: {
      height: "128px",
      width: "207px"
    },
    mlReactangle: {
      height: "200px",
      width: "324px"
    }
  }),
  { name: "MediaTile" }
);

interface MediaTileProps {
  media: {
    alt: string;
    url: string;
    type?: string;
    oembedData?: string;
  };
  loading?: boolean;
  className?: string;
  shape?: MediaShapeEnum;
  size?: MediaSizeEnum;
  onDelete?: () => void;
  onEdit?: (event: React.ChangeEvent<any>) => void;
}

const MediaTile: React.FC<MediaTileProps> = props => {
  const {
    loading,
    onDelete,
    onEdit,
    media,
    className,
    shape = MediaShapeEnum.SQUARE,
    size = MediaSizeEnum.SM
  } = props;
  const classes = useStyles(props);
  const parsedMediaOembedData = media?.oembedData
    ? JSON.parse(media.oembedData)
    : null;
  const mediaUrl = parsedMediaOembedData?.thumbnail_url || media?.url;

  return (
    <div
      className={classNames(classes.mediaContainer, className, {
        [classes.mlSquare]:
          shape === MediaShapeEnum.SQUARE && size === MediaSizeEnum.ML,
        [classes.smSquare]:
          shape === MediaShapeEnum.SQUARE && size === MediaSizeEnum.SM,
        [classes.mlReactangle]:
          shape === MediaShapeEnum.RECTANGLE && size === MediaSizeEnum.ML,
        [classes.smReactangle]:
          shape === MediaShapeEnum.RECTANGLE && size === MediaSizeEnum.SM
      })}
      data-test="product-image"
    >
      {(onEdit || onDelete) && (
        <div
          className={classNames(classes.mediaOverlay, {
            [classes.mediaOverlayShadow]: loading,
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
          {loading ? (
            <CircularProgress size={32} />
          ) : (
            <div className={classes.mediaOverlayToolbar}>
              {onEdit && (
                <IconButton color="primary" onClick={onEdit}>
                  <EditIcon />
                </IconButton>
              )}
              {onDelete && (
                <IconButton color="primary" onClick={onDelete}>
                  <DeleteIcon />
                </IconButton>
              )}
            </div>
          )}
        </div>
      )}
      {mediaUrl ? (
        <img className={classes.media} src={mediaUrl} alt={media.alt} />
      ) : (
        <ReactSVG width="100%" height="100%" src={defaultImageSmall} />
      )}
    </div>
  );
};
MediaTile.displayName = "MediaTile";
export default MediaTile;
