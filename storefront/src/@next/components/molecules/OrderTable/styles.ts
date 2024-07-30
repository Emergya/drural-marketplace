import { media, styled } from "@styles";

export const Wrapper = styled.div``;

export const Row = styled.div`
  color: ${props => props.theme.colors.lightFont}
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 5rem;
  cursor: pointer;

  border-bottom: 1px solid ${props => props.theme.colors.tableDivider};
`;

export const HeaderRow = styled(Row)`
  color: ${props => props.theme.colors.black};
  cursor: default;
`;

export const IndexNumber = styled.div`
  width: 14%;
  ${media.smallScreen`
     width: 50%;
  `}
`;
export const ProductsOrdered = styled.div`
  width: 25%;
  display: flex;
  flex-wrap: nowrap;
`;
export const DateOfOrder = styled.div`
  width: 14%;
`;
export const Value = styled.div`
  width: 14%;
`;
export const Status = styled.div`
  width: 22%;
  ${media.smallScreen`
     width: 50%;
  `}
`;
/* export const ShopName = styled.div`
  width: 20%;
`; */
