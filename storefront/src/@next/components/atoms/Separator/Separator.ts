import { styled } from "@styles";
import { smallScreen } from "@styles/constants-drural";

export const Separator = styled.hr<{
  marginTop?: string;
  marginBottom?: string;
  mobileMarginTop?: string;
  mobileMarginBottom?: string;
}>`
  border: 1px solid ${props => props.theme.colors.grayLight};
  margin-top: ${props => (props.marginTop ? `${props.marginTop}px` : "1.5rem")};
  margin-bottom: ${props =>
    props.marginBottom ? `${props.marginBottom}px` : "1.5rem"};

  @media (max-width: ${smallScreen}px) {
    margin-top: ${props =>
      props.mobileMarginTop ? `${props.mobileMarginTop}px` : "22px"};
    margin-bottom: ${props =>
      props.mobileMarginBottom ? `${props.mobileMarginBottom}px` : "22px"};
  }
`;
