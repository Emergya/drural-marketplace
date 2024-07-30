import React from "react";

import { IFormError } from "@types";

export interface IProps extends React.TextareaHTMLAttributes<any> {
  contentLeft?: React.ReactNode;
  contentRight?: React.ReactNode;
  error?: boolean;
  value?: React.TextareaHTMLAttributes<any>["value"];
  label?: string;
  errors?: IFormError[];
}
