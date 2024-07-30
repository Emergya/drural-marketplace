import React from "react";

import * as S from "./styles";
import { StatusLabelProps } from "./types";

export const StatusLabel: React.FC<StatusLabelProps> = ({ label, status }) => {
  function getStatus(status: string) {
    switch (status) {
      case "error":
        return <S.ErrorDot />;
      case "alert":
        return <S.AlertDot />;
      case "neutral":
        return <S.NeutralDot />;
      case "success":
        return <S.SuccessDot />;
      default:
        return <S.NeutralDot />;
    }
  }
  return (
    <S.Container>
      {getStatus(status)}
      <S.TextContainer>{label}</S.TextContainer>
    </S.Container>
  );
};
