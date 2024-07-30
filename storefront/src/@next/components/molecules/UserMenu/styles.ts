import { styled } from "@styles";

export const Wrapper = styled.div`
  box-shadow: ${props => props.theme.boxShadow.light};
  background-color: ${props => props.theme.colors.white};
  z-index: 5;
  padding: 0;
  width: 100%;
`;

export const SelectTitle = styled.div`
  font-size: ${props => props.theme.typography.lightTitleFontSize};
  font-weight: ${props => props.theme.typography.lightFontWeight};
  border-bottom: 1px solid #e0dee3;
  padding: 18px 16px 6px 24px;
  margin-bottom: 8px;
`;

export const ItemList = styled.ul`
  list-style-type: none;
`;

export const ShopItem = styled.div`
  display: flex;
  align-items: center;
`;

export const MenuItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 9px 16px 10px 24px;
  cursor: pointer;
  font-size: ${props => props.theme.typography.smallFontSize};
  a {
    display: flex;
    line-height: 32px;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    svg {
      margin-right: 11px;
    }
  }
  &:hover {
    background-color: ${props => props.theme.colors.primaryLight};
  }
`;

export const Logout = styled.div`
  display: flex;
  align-items: center;
  padding: 9px 16px 10px 18px;
  color: #ffffff;
  font-size: ${props => props.theme.typography.smallFontSize};
  background-color: #000;
  border-radius: 0 0 4px 4px;
  margin-top: 11px;
  cursor: pointer;
  svg {
    margin-right: 14px;
  }
  &:hover {
    background-color: ${props => props.theme.colors.primary};
  }
`;

export const Notifications = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 100%;
  color: ${props => props.theme.colors.white};
  background-color: ${props => props.theme.colors.primaryDark};
`;
