import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { FormattedMessage } from "react-intl";
import Media from "react-responsive";

import { PageBottomSpacing, PageTopSpacing } from "@components/atoms";
import { Container } from "@components/templates";
import { paths } from "@paths";
import { mediumScreen } from "@styles/constants-drural";

import accountDeletedImage from "../../../images/dRuralImages/account-deleted-img.svg";
import * as S from "./styles";

export const AccountDeleteSuccess: NextPage = () => {
  const { push } = useRouter();

  return (
    <Container>
      <PageTopSpacing />
      <S.Wrapper>
        <Media minWidth={mediumScreen + 1}>
          <S.ImageColumn>
            <S.Image path={accountDeletedImage} />
          </S.ImageColumn>
        </Media>

        <S.InfoColumn>
          <S.Title className="email-title">
            <FormattedMessage defaultMessage="Account deletion in process" />
          </S.Title>

          <Media maxWidth={mediumScreen}>
            <S.MobileImageWrapper>
              <S.Image path={accountDeletedImage} />
            </S.MobileImageWrapper>
          </Media>

          <S.TextWrapper>
            <S.LightTitle>
              <FormattedMessage defaultMessage="Your account has been deactivated and the deletion process has been initiated." />
            </S.LightTitle>

            <S.LightTitle>
              <FormattedMessage defaultMessage=" It can take up to 24 hours to completely remove all the data associated with your account." />
            </S.LightTitle>
          </S.TextWrapper>

          <S.StyledButton
            onClick={() => push(paths.home)}
            testingContext="goToLoginButton"
          >
            <FormattedMessage defaultMessage="Done" />
          </S.StyledButton>
        </S.InfoColumn>
      </S.Wrapper>
      <PageBottomSpacing />
    </Container>
  );
};
