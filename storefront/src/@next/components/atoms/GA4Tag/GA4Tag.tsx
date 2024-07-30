import React, { useEffect } from "react";
import ReactGA from "react-ga4";

import { IProps } from "./types";

export const GA4Tag: React.FC<IProps> = ({ measurementId }) => {
  // Events
  const initReactGA = () => {
    ReactGA.initialize(measurementId);
    ReactGA.send({ hitType: "pageview" });
  };

  useEffect(() => {
    initReactGA();
  }, []);

  return null;
};
