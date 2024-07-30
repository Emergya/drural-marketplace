import { styled } from "@styles";

export const Wrapper = styled.div<{
  hoverable?: boolean;
  isSelected?: boolean;
  status: "success" | "error";
}>`
  border-radius: 4px;
  background-color: ${props => {
    if (props.status === "success") {
      return props.isSelected
        ? props.theme.colors.primary700
        : props.theme.colors.primary_300;
    }
    if (props.status === "error") {
      return props.isSelected
        ? props.theme.colors.errorRed
        : props.theme.colors.errorRed_200;
    }
    return props.theme.colors.primary_300;
  }};
  color: ${props =>
    props.isSelected ? props.theme.colors.white : props.theme.colors.black}
  font-size: ${props => props.theme.typography.smallFontSize};
  line-height: ${props => props.theme.typography.baseLineHeight};
  margin-bottom: 8px;
  margin-right: 8px;
  padding: 4px 8px;

  &:hover {
    background-color: ${props => {
      if (props.isSelected) {
        return "";
      }
      if (props.hoverable) {
        return props.status === "success"
          ? props.theme.colors.primary
          : props.theme.colors.errorRed;
      }
      return "";
    }};
    cursor: ${props => (props.hoverable ? "pointer" : "grab")};
  }
`;
