import { NextPage } from "next";
import React from "react";
import { PasswordResetRequestForm } from "src/components/";

import { PageBottomSpacing, PageTopSpacing } from "@components/atoms";
import { Container } from "@components/templates";

import * as S from "./styles";

export const dRuralPasswordRecovery: NextPage = () => (
  <Container>
    <PageTopSpacing />
    <S.Wrapper>
      <PasswordResetRequestForm />
    </S.Wrapper>
    <PageBottomSpacing />
  </Container>
);
