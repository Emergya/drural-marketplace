import { NextPage } from "next";
import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import ReactSVG from "react-svg";

import { Button, PageBottomSpacing, PageTopSpacing } from "@components/atoms";
import { Container } from "@components/templates";

import {
  OverlayContext,
  OverlayTheme,
  OverlayType,
} from "../../../components/index";
import registerIllustration from "../../../images/dRuralImages/register_illustration.svg";
import * as S from "./styles";

export const RegistrationMessage: NextPage = () => {
  const overlayContext = useContext(OverlayContext);
  return (
    <Container>
      <PageTopSpacing />
      <S.Wrapper>
        <S.ImageDiv>
          <ReactSVG path={registerIllustration} />
        </S.ImageDiv>
        <S.TextDiv>
          <h2 className="email-title">
            <FormattedMessage defaultMessage="Check your email" />
          </h2>
          <p className="p16">
            <FormattedMessage defaultMessage="You are just one step away from activating your account on dRural marketplace." />
          </p>
          <p className="p16">
            <FormattedMessage defaultMessage="A confirmation link has been sent to your email. Please check your inbox and click on the link to complete the registration process." />
          </p>

          <Button
            testingContext="goToLoginButton"
            onClick={() =>
              overlayContext.show(OverlayType.login, OverlayTheme.modal)
            }
          >
            <FormattedMessage defaultMessage="Back to log in" />
          </Button>
        </S.TextDiv>
      </S.Wrapper>
      <PageBottomSpacing />
    </Container>
  );
};
