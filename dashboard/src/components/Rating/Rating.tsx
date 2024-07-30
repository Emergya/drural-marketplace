import starStuffed from "@assets/images/dRuralIcons/star-stuffed.svg";
import { UilStar } from "@iconscout/react-unicons";
import React from "react";
import SVG from "react-inlinesvg";
import Rating from "react-rating";

const DruralRating = ({ ...props }) => {
  const { ...ratingProps } = props;

  return (
    <Rating
      {...ratingProps}
      emptySymbol={<UilStar />}
      placeholderSymbol={<SVG src={starStuffed} />}
    />
  );
};
export default DruralRating;
