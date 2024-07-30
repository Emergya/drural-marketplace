import React from "react";
import { FormattedMessage } from "react-intl";

import * as S from "./styles";
import { IProps } from "./types";

export const LoginTabs: React.FC<IProps> = ({
  active = "login",
  setActive,
}) => {
  return (
    <S.Container>
      <S.RestyledButton
        middleline
        color={active === "login" ? "labelOnly" : "labelOnlyPrimary"}
        testingContext="testButton"
        onClick={() => {
          setActive("login");
        }}
      >
        <FormattedMessage defaultMessage="Log In" />
      </S.RestyledButton>
      <S.RestyledButton
        color={active === "register" ? "labelOnly" : "labelOnlyPrimary"}
        testingContext="testButton"
        onClick={() => {
          setActive("register");
        }}
      >
        <FormattedMessage defaultMessage="Register" />
      </S.RestyledButton>
    </S.Container>
  );
};
