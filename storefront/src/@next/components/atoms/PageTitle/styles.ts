import { media, styled } from "@styles";

export const Title = styled.h2`
  margin-bottom: 3rem;

  ${media.smallScreen`
    margin-bottom: 1.5rem;
  `}
`;
