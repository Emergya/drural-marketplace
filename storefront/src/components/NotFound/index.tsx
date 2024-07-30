import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { FormattedMessage } from "react-intl";
import Media from "react-responsive";

import { Button, PageBottomSpacing, PageTopSpacing } from "@components/atoms";
import { Container } from "@components/templates";
import { paths } from "@paths";
import { mediumScreen } from "@styles/constants-drural";

import notFoundImage from "../../images/dRuralImages/not-found.svg";
import * as S from "./styles";
import { IProps } from "./types";

const NotFound: NextPage<IProps> = () => {
  const { push } = useRouter();
  return (
    <Container>
      <PageTopSpacing />
      <S.Wrapper>
        <Media minWidth={mediumScreen + 1}>
          <S.ImageColumn>
            <S.Image path={notFoundImage} />
          </S.ImageColumn>
        </Media>

        <S.InfoColumn>
          <S.Title className="email-title">
            <FormattedMessage defaultMessage="Ooops!... 404" />
          </S.Title>

          <Media maxWidth={mediumScreen}>
            <S.MobileImageWrapper>
              <S.Image path={notFoundImage} />
            </S.MobileImageWrapper>
          </Media>

          <S.Text>
            <FormattedMessage defaultMessage="We can’t seem to find a page you are looking for! You may have mistyped the address or the page may have moved. We’re sorry for the error and hope you’ll have a good day." />
          </S.Text>

          <Button
            onClick={() => push(paths.home)}
            testingContext="back-home-button"
          >
            <FormattedMessage defaultMessage="Back to home" />
          </Button>
        </S.InfoColumn>
      </S.Wrapper>
      <PageBottomSpacing />
    </Container>
  );
};

export default NotFound;
