import { UilPlus } from "@iconscout/react-unicons";
import React from "react";

import * as S from "./styles";

interface IProps {
  title: string;
  buttonText: string;
  onPress?: () => void;
}

export const HeaderWithButton: React.FC<IProps> = ({
  title,
  buttonText,
  onPress,
}: IProps) => {
  return (
    <S.Header>
      <S.TitleWrapper>
        <h2>{title}</h2>
      </S.TitleWrapper>
      <S.ButtonWrapper>
        <S.RestyledButton onClick={onPress} testingContext="wish-list">
          <UilPlus size="24" color="#FFFFFF" />
          {buttonText}
        </S.RestyledButton>
      </S.ButtonWrapper>
    </S.Header>
  );
};
