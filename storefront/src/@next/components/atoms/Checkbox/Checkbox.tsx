/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React from "react";
import ReactSVG from "react-svg";

import check from "../../../../images/checked.svg";
import * as S from "./styles";
import { IProps } from "./types";

const ENTER_KEY: number = 13;
const SPACE_KEY: number = 32;

export const Checkbox: React.FC<IProps> = ({
  name,
  checked,
  disabled,
  helpText,
  onChange = () => null,
  children,
  ...props
}: IProps) => {
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <S.Checkbox
      disabled={disabled}
      ref={ref}
      onClick={evt => {
        evt.preventDefault();
        onChange(evt);
        if (ref.current) {
          ref.current.blur();
        }
      }}
    >
      <S.Label>
        <input
          {...props}
          tabIndex={-1}
          type="checkbox"
          name={name}
          checked={checked}
          disabled={disabled}
          readOnly
        />
        <div
          ref={ref}
          tabIndex={0}
          onKeyDown={evt => {
            if (evt.which === SPACE_KEY || evt.which === ENTER_KEY) {
              evt.preventDefault();
              onChange(evt);
            }
          }}
        >
          <span>{checked && <ReactSVG path={check} />}</span>
        </div>
      </S.Label>
      <div>
        {children}
        {helpText && <S.HelpText disabled={disabled}>{helpText}</S.HelpText>}
      </div>
    </S.Checkbox>
  );
};
