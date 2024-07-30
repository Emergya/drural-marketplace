import { media, styled } from "@styles";

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  margin-left: -7px;
  padding-bottom: 0.75rem;
  padding-top: 2rem;

  ${media.mediumScreen`
    padding-bottom: 0.625rem;
    padding-top: 1.5rem;
  `}

  &:hover {
    button,
    svg {
      color: ${props => props.theme.colors.primary};
    }
  }

  svg {
    color: ${props => props.theme.colors.primaryDark};
  }
`;
