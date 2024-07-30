import { media, styled } from "@styles";

export const Loader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
  z-index: 10;
`;

export const Wrapper = styled.div`
  margin: 80px 0;
  display: grid;
  grid-template-columns: 3fr 9fr;
  grid-column-gap: 12px;
  grid-template-areas:
    "cartSummary checkoutWrapper"
    ". button";
  ${media.mediumScreen`
    grid-template-columns: 1fr;
    grid-template-areas:
      "checkoutWrapper"
      "button";
  `}
`;

export const Navigation = styled.div`
  grid-area: navigation;
  max-width: 80%;
  margin: 0 auto;
  padding-bottom: 72px;
  padding-top: 40px;
  height: 85px;
`;
export const Checkout = styled.div`
  grid-area: checkout;
  padding: 3rem 0 0 0;
`;
export const PaymentGateways = styled.div<{ hide: boolean }>`
  ${props => props.hide && "display: none;"};
  grid-area: paymentGateways;
`;
export const CartSummary = styled.div`
  background-color: ${props => props.theme.colors.white};
  grid-area: cartSummary;

  ${media.mediumScreen`
    position: fixed;
    bottom: 0;
    z-index: 100;
  `}
`;
export const Button = styled.div`
  grid-area: button;
  margin: 2rem 0 0 0;
  text-align: end;
`;
