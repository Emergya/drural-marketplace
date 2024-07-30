import { styled } from "@styles";

export const Searchbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 80%;
  height: 112px;
  background-color: ${props => props.theme.colors.white};
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 0;
  margin: 0 auto;
  padding-right: 5px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  padding: 0;
  margin: 0;
`;

export const Searchbox = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  
  width: 30%;
  height: 112px;
  background-color: ${props => props.theme.colors.white};
  border-radius: 20px;
  border-color: transparent
  padding: 0;
  padding-left: 32px;
  padding-right: 5px;
  &:hover {
    input {
      background-color: ${props => props.theme.colors.primaryLight};
    }
    background-color: ${props => props.theme.colors.primaryLight};
    &:after {
        border-left: none;
      }
  }
  &:after {
    content: "";
    position: absolute;
    right: 0;
    top: 20%;
    height: 60%;
    width: 1px;
    border-left: 1px solid ${props => props.theme.colors.black};
    opacity: 0.1;
  }
  h4 {
      margin-bottom: 11px;
      text-align: start;
  }
`;

export const Input = styled.input`
  border-color: transparent;
  width: 80%;
  &:focus {
    outline: none;
  }
`;

export const P = styled.p`
  font-size: 14px;
  color: #676173;
  line-height: 21px;
  text-align: start;
`;

export const Locationbox = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  
  width: 30%;
  height: 112px;
  background-color: ${props => props.theme.colors.white};
  border-radius: 20px;
  border-color: transparent
  padding: 0;
  padding-left: 32px;
  padding-right: 5px;
  &:hover {
    background-color: ${props => props.theme.colors.primaryLight};
    &:after {
        border-left: none;
      }
  }
  &:after {
    content: "";
    position: absolute;
    right: 0;
    top: 20%;
    height: 60%;
    width: 1px;
    border-left:1px solid ${props => props.theme.colors.black};
    opacity: 0.1;
  }
  h4 {
    margin-bottom: 11px;
    text-align: start;
}
`;
export const Pricebox = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  
  width: 30%;
  height: 112px;
  background-color: ${props => props.theme.colors.white};
  border-radius: 20px;
  border-color: transparent
  padding: 0;
  padding-left: 32px;
  padding-right: 5px;
  &:hover {
    background-color: ${props => props.theme.colors.primaryLight};
  }
  h4 {
    margin-bottom: 11px;
    text-align: start;
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
  height: 48px;
  justify-content: center;
  transition: 0.3s;
  width: 48px;
  margin-left: 4%;

  &:hover {
    background-color: ${props =>
      props.theme.button.colors[props.color].hoverBackground};
    svg {
      fill: ${props => props.theme.colors.white};
    }
  }
`;
