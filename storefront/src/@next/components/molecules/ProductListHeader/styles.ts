import { styled } from "@styles";
import { smallScreen } from "@styles/constants-drural";

export const Wrapper = styled.div`
  position: relative;
  margin-bottom: 1.4rem;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  &:after {
    content: "";
    position: absolute;
    right: 50%;
    top: 0;
    height: 100%;
    width: 1px;
    border-left: 1px solid ${props => props.theme.colors.black};
    opacity: 0.1;
  }
`;

export const Bar = styled.div`
  height: 64px;
  background-color: ${props => props.theme.tile.backgroundColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  font-size: ${props => props.theme.typography.smallFontSize};
  margin-top: 1rem;
  margin-bottom: 1.4rem;
`;

export const LeftSide = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-right: 10px;
  }
`;

export const RightSide = styled.div`
  display: flex;
  align-items: center;
  height: auto;
`;

export const FiltersButton = styled.button`
  font-size: ${props => props.theme.typography.smallFontSize};
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const Clear = styled.button`
  padding-left: 2rem;
  cursor: pointer;
  font-size: ${props => props.theme.typography.smallFontSize};
  color: ${props => props.theme.colors.lightFont};
`;
export const Element = styled.span`
  padding-left: 2rem;
  display: flex;
  align-items: center;
`;

export const Filters = styled.span`
  font-weight: ${props => props.theme.typography.boldFontWeight};
`;

export const Label = styled.span`
  color: ${props => props.theme.colors.lightFont};
`;

export const Sort = styled.div`
  width: auto;
  display: inline-block;
`;

export const FiltersChipsWrapper = styled.div`
  > div {
    margin: 0.4rem;
  }
`;
export const OrderWrapper = styled.div`
  display: flex;
  span {
    margin-left: 1rem;
    text-align: start;
  }
  @media (max-width: ${smallScreen}px) {
    flex-direction: column;
    align-items: flex-end;
    span {
      margin-left: 1rem;
      text-align: end;
      max-width: 105px;
    }
  }
`;
