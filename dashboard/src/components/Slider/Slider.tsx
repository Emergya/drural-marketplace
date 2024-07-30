// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from "react";
import ReactSlider, { Settings } from "react-slick";

interface SliderProps {
  children: React.ReactNode;
}

export const Slider: React.FC<SliderProps> = ({ children }) => {
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return <ReactSlider {...settings}>{children}</ReactSlider>;
};
export default Slider;
