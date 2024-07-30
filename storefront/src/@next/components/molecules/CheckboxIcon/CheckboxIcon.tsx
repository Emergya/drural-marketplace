import React from "react";
import { FormattedMessage } from "react-intl";

import { Checkbox } from "@components/atoms/Checkbox";

import * as S from "./styles";
import { IProps } from "./types";

export const CheckboxIcon: React.FC<IProps> = ({
  icon,
  title,
  onChange,
  checked,
  disabled,
}) => {
  return (
    <S.Container>
      <S.RelativeCheckbox>
        <Checkbox
          name={title}
          onChange={onChange}
          checked={checked}
          disabled={disabled}
        />
      </S.RelativeCheckbox>
      <S.IconContainer>{icon}</S.IconContainer>
      <S.ThumbnailTitle>
        <FormattedMessage
          defaultMessage="{message}"
          values={{ message: title }}
        />
      </S.ThumbnailTitle>
    </S.Container>
  );
};
