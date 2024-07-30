import { makeStyles } from "@drural/macaw-ui";
import React from "react";
import Rating from "react-rating";

import starEmpty from "../../../assets/images/dRuralIcons/star-empty.svg";
import starFull from "../../../assets/images/dRuralIcons/star-full.svg";

const useStyles = makeStyles(
  () => ({
    image: {
      paddingRight: 5
    }
  }),
  { name: "StarsRating" }
);

export interface StarsRatingProps {
  initialRating?: number;
  readonly?: boolean;
  onClick?: (rating: number) => void;
}

export const StarsRating: React.FC<StarsRatingProps> = ({
  initialRating = 0,
  readonly = false,
  onClick
}) => {
  const classes = useStyles();

  return (
    <Rating
      emptySymbol={
        <img className={classes.image} src={starEmpty} alt="star-empty" />
      }
      fullSymbol={
        <img className={classes.image} src={starFull} alt="star-full" />
      }
      initialRating={initialRating}
      readonly={readonly}
      onClick={onClick}
    />
  );
};
export default StarsRating;
