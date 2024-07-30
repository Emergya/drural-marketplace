import { styled } from "@styles";

export const SearchBar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  width: 390px;
  max-width: 90vw;
  background-color: ${props => props.theme.colors.white};
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  border-radius: 24px;
  padding-left: 24px;
  padding-right: 5px;
  cursor: pointer;
  margin: 0 auto;
  span {
    color: #676173;
  }
`;

export const IconWrapper = styled.div<{
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
  width: 38px;
  margin-left: 30px;
`;
