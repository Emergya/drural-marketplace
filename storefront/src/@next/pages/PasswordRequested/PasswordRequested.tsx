import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { FormattedMessage } from "react-intl";
import ReactSVG from "react-svg";

import { Button, PageBottomSpacing, PageTopSpacing } from "@components/atoms";
import { Container } from "@components/templates";
import { paths } from "@paths";

import emailIllustration from "../../../images/dRuralImages/password_mail_illlustration.svg";
import * as S from "./styles";

export const PasswordRequested: NextPage = () => {
  const { push } = useRouter();

  return (
    <Container>
      <PageTopSpacing />
      <S.Wrapper>
        <S.ImageDiv>
          <ReactSVG path={emailIllustration} />
        </S.ImageDiv>
        <S.TextDiv>
          <h2>
            <FormattedMessage defaultMessage="Check your email" />
          </h2>
          <p className="light-title">
            <FormattedMessage defaultMessage="We have sent you an email with instructions on how to change your password." />
          </p>
          <Button
            onClick={() => push(paths.home)}
            testingContext="goToHomeButton"
          >
            <FormattedMessage defaultMessage="Back to home" />
          </Button>
        </S.TextDiv>
      </S.Wrapper>
      <PageBottomSpacing />
    </Container>
  );
};
