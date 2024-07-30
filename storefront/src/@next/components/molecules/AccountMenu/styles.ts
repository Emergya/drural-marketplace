import { styled } from "@styles";

export const Wrapper = styled.div`
  box-shadow: ${props => props.theme.boxShadow.light};
  background-color: ${props => props.theme.colors.white};
  height: auto;
  padding-top: 1rem;
  padding-bottom: 4.5rem;
`;

export const MenuHeader = styled.div`
  font-size: ${props => props.theme.typography.h3FontSize};
  font-weight: ${props => props.theme.typography.boldFontWeight};
  text-transform: "uppercase";
  padding-bottom: 2rem;
`;

export const MenuItem = styled.div<{
  active: boolean;
}>`
  border-left: ${props =>
    props.active ? `6px solid ${props.theme.colors.primary}` : ""};
  cursor: pointer;
  padding: ${props =>
    props.active ? "13px 14px 13px 18px" : "13px 14px 13px 24px"};

  &:hover {
    background-color: ${props => props.theme.colors.primaryLight};
  }
`;
