import { styled } from "@styles";

export const Wrapper = styled.div`
  box-shadow: ${props => props.theme.boxShadow.light};
  background-color: ${props => props.theme.colors.white};
  padding: 1.25rem;
  font-weight: ${props => props.theme.typography.boldFontWeight};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-bottom: 1.5rem;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 67px;
  left: 0;
  width: 100%;
  padding: 1.25rem 0;
  height: auto;
  /* height: 350px; */
  overflow: visible;
  z-index: 5;
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;

export const MenuHeader = styled.div`
  font-weight: ${props => props.theme.typography.boldFontWeight};
  padding: 0.75rem 1.25rem 1.5rem;
`;

export const MenuItem = styled.div<{
  active: boolean;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 13px 14px 13px 18px;

  &:hover {
    background-color: ${props => props.theme.colors.primaryLight};
  }

  svg {
    transform: rotate(-90deg);
  }
`;
