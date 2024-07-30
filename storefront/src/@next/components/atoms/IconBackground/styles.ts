import { styled } from "@styles";

export const IconWrapper = styled.div<{
  iconBackgroundSize?: string;
}>`
  align-items: center;
  background-color: ${props => props.theme.colors.primaryTransparent};
  border-radius: 100px;
  display: flex;
  justify-content: center;
  height: ${props =>
    props.iconBackgroundSize ? props.iconBackgroundSize : "64px"};
  width: ${props =>
    props.iconBackgroundSize ? props.iconBackgroundSize : "64px"};

  svg {
    color: ${props => props.theme.colors.primary};
  }
`;
