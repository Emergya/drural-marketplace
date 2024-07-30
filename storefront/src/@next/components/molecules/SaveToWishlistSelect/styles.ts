import { styled } from "@styles";

export const Wrapper = styled.div<{ rotate: boolean }>`
  box-shadow: ${props => props.theme.boxShadow.light};
  background-color: ${props => props.theme.colors.white};
  padding: 1.25rem;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-bottom: 1.5rem;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.colors.autofillSelected};
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: ${props =>
      !props.rotate ? props.theme.colors.primary100 : "#FFF"};
    color: ${props =>
      !props.rotate ? props.theme.colors.primaryDark : "#000"};
    > div {
      opacity: 1;
    }
  }
  svg {
    transform: ${props => (props.rotate ? "rotate(180deg)" : "rotate(0deg)")};
  }
`;

export const Overlay = styled.div`
  position: absolute;
  top: 48px;
  left: 0;
  width: 100%;
  padding: 0.5rem 0 0 0;
  height: auto;
  overflow: visible;
  z-index: 5;
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
`;

export const SelectTitle = styled.div`
  opacity: 0.5;
`;

export const MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 13px 14px 13px 18px;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.colors.primaryLight};
  }
`;

export const SaveToNewListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 13px 14px 13px 18px;
  color: #ffffff;
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
