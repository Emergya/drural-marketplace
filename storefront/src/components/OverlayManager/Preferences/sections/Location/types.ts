import React from "react";

import { LocationInterface } from "../../types";

export interface IProps {
  location: LocationInterface;
  updateLocation: React.Dispatch<React.SetStateAction<LocationInterface>>;
}
