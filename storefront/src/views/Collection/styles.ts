import { styled } from "@styles";

export const MapSwitchContainer = styled.div`
  display: flex;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  .map-switch {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 48px;
    width: 48px;
    background-color: ${props => props.theme.colors.white};
  }
  .map-switch-active {
    background-color: ${props => props.theme.colors.primary};
    svg {
      color: ${props => props.theme.colors.white};
    }
  }
`;
