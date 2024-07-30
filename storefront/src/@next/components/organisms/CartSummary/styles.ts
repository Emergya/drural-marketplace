import { DefaultTheme, media, styled } from "@styles";

export const Wrapper = styled.div<{ mobileCartOpened: boolean }>`
  ${media.mediumScreen`
    background-color: #fff;
    box-shadow: 0px 4px 16px rgb(0 0 0 / 10%);
    height: 100%;
    left: 0%;
    padding: 32px 24px;
    position: fixed;
    top: calc(100% - 86px);
    transition: all 0.5s ease;
    width: 100%;
  `}

  ${props =>
    props.mobileCartOpened &&
    media.mediumScreen`
    overflow-y: scroll;
    top: 0%;
  `}
`;
export const Content = styled.div``;

export const ProductLine = styled.div`
  padding-bottom: 30px;
`;

export const CartSummaryProductList = styled.div`
  margin-bottom: 30px;
`;

export const HR = styled.hr`
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid ${props => props.theme.colors.baseFontColorTransparent};
  margin: 0;
  padding: 0;
`;

export const Title = styled.h3`
  padding-bottom: 2rem;

  ${media.mediumScreen`
    font-size: ${(props: { theme: DefaultTheme }) =>
      props.theme.typography.h4FontSize};
    cursor: pointer;
  `}
`;
export const ArrowUp = styled.div<{ mobileCartOpened: boolean }>`
  display: none;
  ${media.mediumScreen`
    display: unset;
    padding-left: 6px;
  `}
  ${props =>
    props.mobileCartOpened &&
    media.mediumScreen`
    transform: rotate(180deg);
  `}
`;
export const CostLine = styled.div<{ last: boolean }>`
  display: flex;
  justify-content: space-between;
  span {
    display: inline-block;
  }
  font-weight: ${props =>
    props.last ? props.theme.typography.boldFontWeight : "normal"};
`;

export const Costs = styled.div`
  display: flex;
  flex-direction: column;

  div {
    margin-bottom: 20px;
    &:last-of-type {
      margin-bottom: 0px;
    }
  }
`;
