import { OrderStatus } from "@drural/sdk";
import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import Media from "react-responsive";

import { PageBottomSpacing, PageTopSpacing } from "@components/atoms";
import { Container } from "@components/templates";
import { mediumScreen } from "@styles/constants";
import { checkoutMessages } from "@temp/intl";

import image from "../../../../images/dRuralImages/password_mail_illlustration.svg";
import * as S from "./styles";
import { IProps } from "./types";

export const messages = defineMessages({
  unfulfilled: {
    defaultMessage:
      "We’ve emailed you an order confirmation where you can check the services ordered.",
    description: "thank you subtitle",
  },
  unconfirmed: {
    defaultMessage:
      "Your order has been placed, it needs to be confirmed by the staff, we'll send you an email when it's done.",
    description: "thank you subtitle",
  },
});

/**
 * Thank you page after completing the checkout.
 */
const ThankYou: React.FC<IProps> = ({
  orderStatus,
  orderNumber,
  continueShoppingUrl,
  orderDetailsUrl,
  onButtonClick,
}: IProps) => (
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
          <FormattedMessage defaultMessage="Thank you for your order!" />
        </S.Title>

        <Media maxWidth={mediumScreen}>
          <S.MobileImageWrapper>
            <S.Image path={image} />
          </S.MobileImageWrapper>
        </Media>

        <S.ParragraphWrapper>
          <S.LightTitle>
            <FormattedMessage defaultMessage="Your order number is" />{" "}
            <strong>{orderNumber}.</strong>
          </S.LightTitle>

          <S.LightTitle>
            <FormattedMessage
              {...(orderStatus === OrderStatus.UNCONFIRMED
                ? messages.unconfirmed
                : messages.unfulfilled)}
            />
          </S.LightTitle>
        </S.ParragraphWrapper>

        <S.ButtonsWrapper>
          <S.StyledButton
            testingContext="continueShoppingButton"
            color="ghost"
            fullWidth
            onClick={() => onButtonClick(continueShoppingUrl)}
          >
            <FormattedMessage {...checkoutMessages.continueShopping} />
          </S.StyledButton>

          <S.StyledButton
            testingContext="gotoOrderDetailsButton"
            fullWidth
            onClick={() => onButtonClick(orderDetailsUrl)}
          >
            <FormattedMessage defaultMessage="Order details" />
          </S.StyledButton>
        </S.ButtonsWrapper>
      </S.InfoColumn>
    </S.Wrapper>
    <PageBottomSpacing />
  </Container>
);

export { ThankYou };
