import { media, styled } from "@styles";

export const List = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 1.875rem;
  row-gap: 2.687rem;
  margin-top: 30px;

  > a {
    justify-self: center;
  }

  ${media.largeScreen`
    grid-template-columns: 1fr 1fr;
    row-gap: 1.125rem;
  `}

  ${media.mediumScreen`
  
  column-gap: 14px;
  column-gap: 0.875rem;
  `}

  ${media.extraSmallScreen`
    grid-template-columns: 1fr;
   
  `}
`;

export const Loader = styled.div`
  text-align: center;
  margin: 2.5rem 0;
`;
