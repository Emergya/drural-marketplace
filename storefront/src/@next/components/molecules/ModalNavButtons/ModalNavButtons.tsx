import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

export const ModalNavButtons: React.FC<IProps> = ({
  textNext,
  textBack,
  onNext,
  onBack,
  displayNext = true,
  displayBack = true,
  type,
}) => {
  return (
    <S.Container>
      {displayBack && (
        <S.RestyledButton
          color="ghost"
          testingContext="backButton"
          onClick={onBack}
          id="back-Button"
        >
          {textBack}
        </S.RestyledButton>
      )}
      {displayNext && (
        <S.RestyledButton
          color="primary"
          testingContext="nextButton"
          onClick={onNext}
          id="next-Button"
          type={type}
        >
          {textNext}
        </S.RestyledButton>
      )}
    </S.Container>
  );
};
