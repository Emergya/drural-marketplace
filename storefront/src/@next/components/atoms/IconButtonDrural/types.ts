import React from "react";

export interface IProps {
  children: React.ReactNode;
  color: "primary" | "secondary";
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  testingContext?: string;
}
