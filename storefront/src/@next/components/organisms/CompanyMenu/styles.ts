import { Tab } from "@components/atoms";
import { styled } from "@styles";

export const Menu = styled.div``;

export const MobileMenuHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;

  & > div:first-child {
    align-items: center;
    display: flex;
  }

  & > div:last-child {
    @media (max-width: ${props => props.theme.breakpoints.mediumScreen}) {
      width: 90%;
    }
  }
`;

export const CategoriesTab = styled(Tab)`
  padding: 0;
`;

export const CategoriesDropdown = styled.div`
  height: 100%;
  position: relative;
`;

export const CategoriesDropdownTitle = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  padding: 0.5rem;

  svg {
    margin-left: 4px;
  }

  @media (max-width: ${props => props.theme.breakpoints.largeScreen}) {
    padding: 0;
  }
`;

export const CategoriesDropdownContent = styled.div`
  border-radius: 4px;
  box-shadow: ${props => props.theme.dropdown.boxShadow};
  background-color: ${props => props.theme.dropdown.backgroundColor};
  font-weight: ${props => props.theme.typography.normalFontWeight};
  padding: 1rem 0;
  position: absolute;
  right: auto;
  z-index: 2;

  @media (max-width: ${props => props.theme.breakpoints.largeScreen}) {
    background-color: ${props => props.theme.colors.black};
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    position: initial;
  }
`;

export const CategoriesDropdownItem = styled.div`
  color: ${props => props.theme.colors.black};
  cursor: pointer;
  padding: 10px 48px 10px 24px;
  width: fill-available;
  white-space: nowrap;

  &:hover {
    background-color: ${props => props.theme.colors.primaryLight};
  }

  @media (max-width: ${props => props.theme.breakpoints.largeScreen}) {
    color: ${props => props.theme.colors.white};
    padding: 14px 24px;
  }
`;

export const CategoriesDropdownNoHoverItem = styled(CategoriesDropdownItem)`
  &:hover {
    background-color: ${props => props.theme.colors.white};
  }

  @media (max-width: ${props => props.theme.breakpoints.largeScreen}) {
    &:hover {
      background-color: ${props => props.theme.colors.black};
    }
  }
`;

export const TabText = styled.p``;
