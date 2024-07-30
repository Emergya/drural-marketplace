import { styled } from "@styles";

export const IconWrapper = styled.div<{
  color: "primary" | "secondary";
}>`
  align-items: center;
  background-color: ${props =>
    props.theme.button.colors[props.color].background};
  border-radius: ${props => props.theme.button.border.radius};
  cursor: pointer;
  display: flex;
  height: 38px;
  justify-content: center;
  transition: 0.3s;
  width: 38px;

  &:hover {
    background-color: ${props =>
      props.theme.button.colors[props.color].hoverBackground};
  }
`;
