import React from "react";

export interface IProps {
  name: string;
  picture: React.ReactNode;
  pictureSize: number;
  onClick?: () => void;
}
