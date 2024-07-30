import Switch from "rc-switch";
import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

import "rc-switch/assets/index.css";

export const SwitchInput: React.FC<IProps> = ({
  checked,
  onChange,
  onClick,
  checkedChildren,
  unCheckedChildren,
  disabled,
}) => (
  <S.SwitchStyled>
    <Switch
      checked={checked}
      onChange={onChange}
      onClick={onClick}
      checkedChildren={checkedChildren}
      unCheckedChildren={unCheckedChildren}
      disabled={disabled}
    />
  </S.SwitchStyled>
);
