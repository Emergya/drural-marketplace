import React from "react";

import { Button } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

export const StartSellingRow: React.FC<IProps> = ({
  title,
  description,
  buttonText,
  onButtonClick,
}) => (
  <S.Container>
    <S.ContainerInner className="container">
      <S.Title>{title}</S.Title>
      <S.Description>{description}</S.Description>
      <Button testingContext="StartSellingRowButton" onClick={onButtonClick}>
        {buttonText}
      </Button>
    </S.ContainerInner>
  </S.Container>
);
