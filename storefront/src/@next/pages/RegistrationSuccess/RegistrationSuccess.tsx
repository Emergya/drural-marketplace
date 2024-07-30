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
import mailConfirmedIllustration from "../../../images/dRuralImages/Illustration_mail_confirmed.svg";
import * as S from "./styles";

export const RegistrationSuccess: NextPage = () => {
  const overlayContext = useContext(OverlayContext);
  return (
    <Container>
      <PageTopSpacing />
      <S.Wrapper>
        <S.ImageDiv>
          <ReactSVG path={mailConfirmedIllustration} />
        </S.ImageDiv>
        <S.TextDiv>
          <h2 className="email-title">
            <FormattedMessage defaultMessage="Email confirmed" />
          </h2>
          <p className="p16">
            <FormattedMessage defaultMessage="Your email have been successfully confirmed. Go back to login to enter dRural." />
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
