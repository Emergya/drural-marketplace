import { styled } from "@styles";

export const TextField = styled.div`
  height: 51px;
  margin-bottom: ${props => props.theme.spacing.fieldSpacer};
  position: relative;
`;
TextField.displayName = "S.TextField";

export const HelpText = styled.span`
  color: ${props => props.theme.colors.black};
  font-size: ${props => props.theme.input.labelFontSize};
  opacity: 0.5;
`;

export const ErrorMessages = styled.div`
  top: 100%;
`;
