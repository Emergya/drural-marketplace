import { styled } from "@styles";

export const Wrapper = styled.div`
  margin-bottom: ${props => props.theme.spacing.fieldSpacer};

  .react-select-dropdown__option {
    background-color: ${props => props.theme.colors.white};

    &:active {
      background-color: ${props => props.theme.colors.primary_400};

      &:hover {
        background-color: ${props => props.theme.colors.primary_400};
      }
    }

    &--is-focused {
      &:hover {
        background-color: ${props => props.theme.colors.primary100};
      }
    }

    &--is-selected {
      background-color: ${props => props.theme.colors.primaryLight};

      &:hover {
        background-color: ${props => props.theme.colors.primaryLight};
      }
    }
  }
`;

export const Indicator = styled.div<{ rotate: string }>`
  position: absolute;
  right: 1rem;
  transition-duration: 0.3s;
  transform: ${props =>
    props.rotate === "true" ? "rotate(180deg)" : "rotate(0deg)"};
`;

export const HelpText = styled.span`
  color: ${props => props.theme.input.labelColor};
  font-size: ${props => props.theme.input.labelFontSize};
`;

export const ErrorMessages = styled.div`
  top: 100%;
`;
