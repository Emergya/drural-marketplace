import { styled } from "@styles";

export const ReportService = styled.div`
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
