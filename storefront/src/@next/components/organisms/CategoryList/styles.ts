import { media, styled } from "@styles";

export const List = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: ${props => props.theme.grid.colsSpace};
  row-gap: ${props => props.theme.grid.rowsSpace};

  ${media.largeScreen`
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 1.5rem;
  `}

  ${media.smallScreen`
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem 0;
  `}
`;

export const Loader = styled.div`
  text-align: center;
  margin: 2.5rem 0;
`;
