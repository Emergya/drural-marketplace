import { styled } from "@styles";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  @media (min-width: ${props => props.theme.breakpoints.mediumScreen}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const GridItem = styled.div`
  justify-self: center;
  margin-bottom: 17px;
  margin-top: 17px;
`;
