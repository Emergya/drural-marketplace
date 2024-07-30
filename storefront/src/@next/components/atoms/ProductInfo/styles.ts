import { media, styled } from "@styles";

export const Wrapper = styled.div`
  &:not(:last-child) {
    padding-bottom: 3rem;

    ${media.smallScreen`
      padding-bottom: 2rem;
    `}
  }

  &:last-child {
    padding-bottom: 1rem;

    ${media.smallScreen`
      padding-bottom: 10px;
    `}
  }
`;

export const Title = styled.h3`
  margin-bottom: 14px;
`;

export const Text = styled.p`
  margin-bottom: 1rem;
`;
