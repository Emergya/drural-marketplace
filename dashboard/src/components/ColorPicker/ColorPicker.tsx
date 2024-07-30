import { makeStyles } from "@drural/macaw-ui";
import { ClickAwayListener, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { ColorChangeHandler, SketchPicker } from "react-color";
import { FormattedMessage } from "react-intl";

export interface IColorPickerProps {
  colorName: string;
  selectedColor: string | undefined;
  defaultColor: string;
  changeSelectedColor: ColorChangeHandler;
}

const useStyles = makeStyles<IColorPickerProps>(
  theme => ({
    wrapper: {
      position: "relative",
      display: "flex",
      width: "fit-content",
      alignItems: "center"
    },
    colorCircle: {
      height: "40px",
      width: "40px",
      borderRadius: "50%",
      cursor: "pointer",
      marginRight: "8px"
    },
    colorPicker: {
      position: "absolute",
      left: "50px",
      zIndex: 2
    },
    actionText: {
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: "12px",
      opacity: "0.5"
    }
  }),
  { name: "ColorPicker" }
);

const ColorPicker: React.FC<IColorPickerProps> = props => {
  const { colorName, selectedColor, defaultColor, changeSelectedColor } = props;

  const [openColorPicker, setOpenColorPicker] = useState<boolean>(false);
  const [color, setColor] = useState("");
  const classes = useStyles(props);

  React.useEffect(() => {
    if (selectedColor) {
      setColor(selectedColor);
    } else {
      setColor(defaultColor);
    }
  }, [selectedColor, defaultColor]);

  const hanndleChangeColor: ColorChangeHandler = (color, event) => {
    setColor(color.hex);
    changeSelectedColor(color, event);
  };

  return (
    <div className={classes.wrapper}>
      <div
        className={classes.colorCircle}
        style={{ backgroundColor: color }}
        onClick={() => setOpenColorPicker(true)}
      ></div>
      <div>
        <Typography variant="subtitle1">{colorName}</Typography>
        <Typography className={classes.actionText}>
          <FormattedMessage defaultMessage="Click to change" />
        </Typography>
      </div>
      {openColorPicker && (
        <div className={classes.colorPicker}>
          <ClickAwayListener onClickAway={() => setOpenColorPicker(false)}>
            <SketchPicker color={color} onChangeComplete={hanndleChangeColor} />
          </ClickAwayListener>
        </div>
      )}
    </div>
  );
};

ColorPicker.displayName = "ColorPicker";
export default ColorPicker;
