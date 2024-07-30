import React from "react";

import { Loader, Tile } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * Template for checkout page.
 */
const Checkout: React.FC<IProps> = ({
  loading,
  navigation,
  checkout,
  paymentGateways,
  hidePaymentGateways = false,
  cartSummary,
  button,
}: IProps) => {
  return (
    <div className="container">
      {loading && (
        <S.Loader>
          <Loader fullScreen />
        </S.Loader>
      )}
      <S.Wrapper>
        <Tile>
          <S.Navigation>{navigation}</S.Navigation>
          <S.Checkout>{checkout}</S.Checkout>
          <S.PaymentGateways hide={hidePaymentGateways}>
            {paymentGateways}
          </S.PaymentGateways>
        </Tile>
        <S.CartSummary>{cartSummary}</S.CartSummary>
        <S.Button>{button}</S.Button>
      </S.Wrapper>
    </div>
  );
};

export { Checkout };
