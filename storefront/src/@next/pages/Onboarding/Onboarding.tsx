import { useAuth } from "@drural/sdk";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useMutation } from "react-apollo";
import { FormattedMessage } from "react-intl";
import ReactSVG from "react-svg";

import {
  Button,
  PageBottomSpacing,
  PageTopSpacing,
  Redirect,
} from "@components/atoms";
import { Container } from "@components/templates";
import { paths } from "@paths";
import { OverlayContext, OverlayType } from "@temp/components";
import { dashboardUrl } from "@temp/constants";

import servicesBuyIllustration from "../../../images/dRuralImages/Services_buy.svg";
import servicesSellIllustration from "../../../images/dRuralImages/Services_sell.svg";
import { AccountUpdate } from "./gqlTypes/AccountUpdate";
import { setOnboardToTrue } from "./mutations";
import * as S from "./styles";

export const Onboarding: NextPage = () => {
  const { push } = useRouter();
  const { user } = useAuth();
  const { show } = React.useContext(OverlayContext);

  const [onboardToTrue] = useMutation<AccountUpdate>(setOnboardToTrue);

  React.useEffect(() => {
    if (user && !user.isOnboard) {
      onboardToTrue();
    }
  }, [user]);

  if (!user) {
    return <Redirect url={paths.home} />;
  }

  return (
    <Container>
      <PageTopSpacing />
      <S.Wrapper>
        <S.TextDiv>
          <p className="light-title">
            <FormattedMessage
              defaultMessage="Welcome, {username}!"
              values={{ username: user.firstName }}
            />
          </p>
          <h2 className="email-title">
            <FormattedMessage defaultMessage="How are you planning to use dRural?" />
          </h2>
        </S.TextDiv>
        <S.ImagesWrapper>
          <S.ImageDiv>
            <S.Image className="service-sell">
              <ReactSVG path={servicesSellIllustration} />
            </S.Image>

            <Button
              testingContext="wantToSellButton"
              onClick={() => push(dashboardUrl || paths.home)}
              fullWidth
            >
              <FormattedMessage defaultMessage="I want to sell" />
            </Button>
          </S.ImageDiv>

          <S.ImageDiv>
            <S.Image className="service-buy">
              <ReactSVG path={servicesBuyIllustration} />
            </S.Image>

            <Button
              testingContext="wantToBuyButton"
              onClick={() => show(OverlayType.preferences)}
              fullWidth
            >
              <FormattedMessage defaultMessage="I want to buy" />
            </Button>
          </S.ImageDiv>
        </S.ImagesWrapper>
      </S.Wrapper>
      <PageBottomSpacing />
    </Container>
  );
};
