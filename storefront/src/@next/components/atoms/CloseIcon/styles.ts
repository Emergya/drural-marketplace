import { styled } from "@styles";

type WrapperProps = {
  backGroundColor: boolean;
};

export const Wrapper = styled.div<WrapperProps>`
  svg {
    color: ${props =>
      props.backGroundColor
        ? props.theme.colors.white
        : props.theme.colors.black};

    &:hover {
      color: ${props => props.theme.colors.primary};
    }
  }
`;
