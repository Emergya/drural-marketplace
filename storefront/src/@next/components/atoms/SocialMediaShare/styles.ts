import { styled } from "@styles";

export const Wrapper = styled.div``;

export const IconWrapper = styled.div`
  align-items: center;
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.button.border.radius};
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  height: 38px;
  justify-content: center;
  margin-right: 1rem;
  transition: 0.3s;
  width: 38px;

  &:active {
    background-color: ${props => props.theme.colors.druralGray_100};
  }
`;
