import React from "react";

import { Input } from "@components/atoms";

import { IProps } from "./types";

export const InputLoginFormWrapper: React.FC<IProps> = ({
  label = "",
  iconLeft,
  iconRight,
  errors,
  helpText,
  defaultValue = "",
  ...props
}: IProps) => {
  let err: boolean;
  if (!errors || errors.length === 0) {
    err = false;
  } else {
    err = true;
  }

  return (
    <div>
      <Input
        contentLeft={iconLeft}
        contentRight={iconRight}
        error={err}
        label={label}
        value={defaultValue}
        {...props}
      />

      {errors && (
        <span className="input__error">
          {errors.map(error => error.message).join(" ")}
        </span>
      )}
      {helpText && <span className="input__help-text">{helpText}</span>}
    </div>
  );
};
