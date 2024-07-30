import { Button } from "@components/atoms";
import { media, styled } from "@styles";

// 1. Wrappers
export const Wrapper = styled.div`
  margin auto;
  text-align: center;
  width: 50%

  ${media.mediumScreen`
  width: 100%
  `}
`;

export const TextWrapper = styled.div`
  padding-bottom: 3rem;
`;

// 2. Elements

export const Title = styled.h2`
  padding-bottom: 2rem;
`;

export const Text = styled.p`
  &:not(:last-child) {
    padding-bottom: 1rem;
  }
`;

export const StyledButton = styled(Button)`
  height: inherit;
  width: inherint;

  ${media.smallScreen`
    width: 100%
  `}
`;
