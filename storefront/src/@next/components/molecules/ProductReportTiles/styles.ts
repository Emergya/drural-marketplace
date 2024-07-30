import { media, styled } from "@styles";

// 1. Wrappers
export const Wrapper = styled.div`
  height: auto;
  margin-bottom: 2rem;

  ${media.smallScreen`
    margin-bottom: 1rem;
  `}
`;

export const Header = styled.div`
  algin-items: center;
  display: flex;
  justify-content: space-between;
`;

export const Body = styled.div``;

// 2. Elements
export const Title = styled.h3`
  margin-bottom: 22px;
`;

export const Text = styled.p`
  margin-bottom: 2rem;
`;
