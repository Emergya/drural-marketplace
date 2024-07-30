import { styled } from "@styles";

export const BreadCrumbsMobile = styled.div`
  color: ${props => props.theme.colors.primaryDark};

  svg {
    color: ${props => props.theme.colors.primary};
  }

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

export const BreadCrumbsLink = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${props => props.theme.colors.druralGray};
  &:hover,
  &:focus {
    color: ${props => props.theme.colors.black};
  }
  svg {
    color: ${props => props.theme.colors.druralGray};
  }
`;

export const HomeLink = styled.a`
  svg {
    color: ${props => props.theme.colors.primaryDark};
    cursor: pointer;
    &:hover {
      color: ${props => props.theme.colors.primaryLight};
    }
  }
`;
