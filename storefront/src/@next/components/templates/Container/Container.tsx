import { media, styled } from "@styles";

export const Container = styled.div`
  width: ${props => props.theme.container.width};
  max-width: 100vw;
  margin: 80px auto 0;
  padding: 0 ${props => props.theme.spacing.spacer};

  ${media.largeScreen`
    padding: 0 0.75rem;
    width: 100%;      
  `}

  ${media.mediumScreen`
    margin: 56px auto 0;
  `}
`;
