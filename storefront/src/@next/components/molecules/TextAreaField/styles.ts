import { styled } from "@styles";

export const TextField = styled.div`
  height: auto;
  margin-bottom: ${props => props.theme.spacing.fieldSpacer};
  position: relative;
`;
TextField.displayName = "S.TextField";

export const HelpText = styled.span`
  color: ${props => props.theme.input.labelColor};
  font-size: ${props => props.theme.input.labelFontSize};
`;

export const ErrorMessages = styled.div`
  top: 100%;
`;
