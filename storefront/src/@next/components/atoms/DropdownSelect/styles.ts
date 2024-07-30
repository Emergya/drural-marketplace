import { styled } from "@styles";

export const Wrapper = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  font-size: ${props => props.theme.typography.smallFontSize};
  width: 100%;
`;

export const SortLine = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 16px;
  padding-right: 16px;
  border: 1px solid ${props => props.theme.colors.druralGray_100};
  height: 48px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  &:hover {
    background-color: ${props => props.theme.colors.primary100};
    color: ${props => props.theme.colors.primaryDark};
    border: 1px solid ${props => props.theme.colors.primaryLight};
  }
`;

export const Value = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  opacity: 0.5;
`;

export const Indicator = styled.div<{ rotate: string }>`
  height: 24px;
  right: 1rem;
  transition-duration: 0.3s;
  transform: ${props =>
    props.rotate === "true" ? "rotate(180deg)" : "rotate(0deg)"};
`;
