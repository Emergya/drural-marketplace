import { styled } from "@styles";

export const Overlay = styled.div`
  position: absolute;
  top: 0px;
  left: 0;
  width: 100vw;
  padding: 0;
  height: 100vh;
  z-index: 20;
  background-color: ${props => props.theme.colors.overlay};
  ul {
    width: 100%;
  }
  li {
    text-align: start;
    font-weight: ${props => props.theme.typography.boldFontWeight};
    cursor: pointer;
    width: 100%;
    padding: 5px 15% 5px 15%;
    &:hover {
      background-color: ${props => props.theme.colors.primaryLight};
    }
  }
`;

export const Form = styled.form`
  width: 100%;
  height: 100%;
  margin: 0;
  > div {
    margin: 0;
  }
`;

export const Header = styled.div<{ src: string }>`
  width: 100%;
  display: flex;
  align-items: center;
  background-image: url(${props => props.src});
  background-position: top center;
  background-size: cover;
  height: 80px;
  padding-top: 12px;
  padding-bottom: 12px;
  justify-content: space-around;
  svg {
    fill: ${props => props.theme.colors.white};
    &:hover {
      fill: ${props => props.theme.colors.primary};
    }
  }
`;
export const InfoContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: ${props => props.theme.colors.white};
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 30px 12px 30px 12px;
`;
export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 24px;
  background-color: ${props => props.theme.colors.white};
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  padding: 5px 5px 5px 24px;
  width: 85%;
  height: 48px;
`;
export const Input = styled.input`
  border-color: transparent;
  width: 100%;
  &:focus {
    outline: none;
  }
`;

export const IconWrapper = styled.button<{
  color: "primary" | "secondary";
}>`
  align-items: center;
  background-color: ${props =>
    props.theme.button.colors[props.color].background};
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  height: 38px;
  justify-content: center;
  transition: 0.3s;
  width: 45px;

  &:hover {
    background-color: ${props =>
      props.theme.button.colors[props.color].hoverBackground};
    svg {
      fill: ${props => props.theme.colors.white};
    }
  }
`;
export const CloseIconContainer = styled.div`
  margin-top: 2px;
  margin-left: 5px;
`;
