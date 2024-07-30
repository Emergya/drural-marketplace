import { useAuth } from "@drural/sdk";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { FormattedMessage } from "react-intl";

import { PageBottomSpacing, PageTopSpacing } from "@components/atoms";
import { Container } from "@components/templates";
import { paths } from "@paths";

import * as S from "./styles";

export const AccountDeleteMessageSent: NextPage = () => {
  const { push } = useRouter();
  const { user } = useAuth();

  if (!user) {
    push(paths.home);
  }

  return (
    <Container>
      <PageTopSpacing />
      <S.Wrapper>
        <S.Title className="email-title">
          <FormattedMessage defaultMessage="Message sent!" />
        </S.Title>

        <S.TextWrapper>
          <S.Text>
            <FormattedMessage defaultMessage="Check your email, you should have received a massage with a link to confirm deleting your account." />
          </S.Text>
        </S.TextWrapper>

        <S.StyledButton
          onClick={() => push(paths.home)}
          testingContext="goToHomeButton"
        >
          <FormattedMessage defaultMessage="Go back to home page" />
        </S.StyledButton>
      </S.Wrapper>
      <PageBottomSpacing />
    </Container>
  );
};
