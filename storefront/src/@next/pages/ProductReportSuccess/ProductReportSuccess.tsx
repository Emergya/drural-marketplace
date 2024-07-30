import { useAuth } from "@drural/sdk";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { FormattedMessage } from "react-intl";
import Media from "react-responsive";
import { generatePath } from "react-router";

import { PageBottomSpacing, PageTopSpacing, Redirect } from "@components/atoms";
import { Container } from "@components/templates";
import { paths } from "@paths";
import { largeScreen } from "@styles/constants";
import { mediumScreen } from "@styles/constants-drural";

import image from "../../../images/dRuralImages/password_mail_illlustration.svg";
import * as S from "./styles";

export const ProductReportSuccess: NextPage = () => {
  const { user } = useAuth();
  const { query, push } = useRouter();

  if (!user || !query.productSlug) {
    return <Redirect url={paths.home} />;
  }

  return (
    <Container>
      <PageTopSpacing />
      <S.Wrapper>
        <Media minWidth={mediumScreen + 1}>
          <S.ImageColumn>
            <S.Image path={image} />
          </S.ImageColumn>
        </Media>

        <S.InfoColumn>
          <S.Title className="email-title">
            <FormattedMessage defaultMessage="Service reported" />
          </S.Title>

          <Media maxWidth={mediumScreen}>
            <S.MobileImageWrapper>
              <S.Image path={image} />
            </S.MobileImageWrapper>
          </Media>

          <S.LightTitle>
            <FormattedMessage defaultMessage="Thank you for leaving your feedback. Your report will be reviewed by a dRural administrator." />
          </S.LightTitle>

          <S.ButtonsWrapper>
            {query.productSlug && (
              <Media minWidth={largeScreen + 1}>
                <S.StyledButton
                  onClick={() =>
                    push(
                      generatePath(paths.product, {
                        slug: query.productSlug as string,
                      })
                    )
                  }
                  testingContext="backToServiceDetailsButton"
                  color="ghost"
                >
                  <FormattedMessage defaultMessage="Back to service" />
                </S.StyledButton>
              </Media>
            )}
            <S.StyledButton
              onClick={() => push(paths.home)}
              testingContext="backToHomeButton"
            >
              <FormattedMessage defaultMessage="Back to home" />
            </S.StyledButton>
          </S.ButtonsWrapper>
        </S.InfoColumn>
      </S.Wrapper>
      <PageBottomSpacing />
    </Container>
  );
};
