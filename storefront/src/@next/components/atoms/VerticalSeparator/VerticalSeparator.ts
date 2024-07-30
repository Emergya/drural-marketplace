import { styled } from "@styles";
import { largeScreen } from "@styles/constants-drural";

export const VerticalSeparator = styled.div<{
  marginLeft?: string;
  marginRight?: string;
  mobileMarginLeft?: string;
  mobileMarginRight?: string;
}>`
  background-color: ${props => props.theme.colors.grayLight};
  margin-left: ${props => (props.marginLeft ? props.marginLeft : "2rem")};
  margin-right: ${props => (props.marginRight ? props.marginRight : "2rem")};
  width: 2px;

  @media (max-width: ${largeScreen}px) {
    margin-left: ${props =>
      props.mobileMarginLeft ? props.mobileMarginLeft : "1.5rem"};
    margin-right: ${props =>
      props.mobileMarginRight ? props.mobileMarginRight : "1.5rem"};
  }
`;
