import { makeStyles } from "@drural/macaw-ui";
import { lighten } from "@material-ui/core";

export const useStyles = makeStyles(
  theme => ({
    // Elements
    wrapper: {
      alignItems: "center",
      border: `1px dashed #85B1A4`,
      borderRadius: "16px",
      display: "flex",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden"
    },
    svgBackBars: {
      backgroundColor: lighten(theme.palette.primary.main, 0.9),
      borderRadius: "18px",
      overflow: "hidden"
    },
    svgIcon: {
      color: theme.palette.primary.main,
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)"
    },
    //   Sizes
    //      Rectangles
    smSquare: {
      height: "128px",
      width: "128px",
      "& rect": {
        fill: "white"
      }
    },
    mlSquare: {
      height: "200px",
      width: "200px",
      "& rect": {
        fill: "white"
      }
    },
    smReactangle: {
      height: "128px",
      width: "207px",
      "& rect": {
        fill: "white"
      }
    },
    mlReactangle: {
      height: "200px",
      width: "324px",
      "& rect": {
        fill: "white"
      }
    },
    //      Icon
    mlSvgIcon: {
      width: "67px"
    },
    smSvgIcon: {
      width: "44px"
    }
  }),
  { name: "ImageUploadPicture" }
);
