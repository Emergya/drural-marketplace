import { media, styled } from "@styles";

export const Tabs = styled.div`
  display: flex;
  justify-content: space-between;

  ${media.largeScreen`
    display: block;
  `}
`;
