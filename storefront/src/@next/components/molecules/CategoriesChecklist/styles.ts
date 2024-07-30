import { styled } from "@styles";

export const Wrapper = styled.div<{ rotate: number }>`
  background-color: ${props => props.theme.colors.white};
  padding: 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  svg {
    transform: ${props => (props.rotate ? "rotate(180deg)" : "rotate(0deg)")};
  }
`;

export const CategoriesContainer = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${props => props.theme.colors.white};
`;

export const SelectTitle = styled.div`
  font-weight: ${props => props.theme.typography.boldFontWeight};
  font-size: ${props => props.theme.typography.p18FontSize};
`;

export const Separator = styled.hr`
  border: 0;
  border-top: 1px solid ${props => props.theme.colors.druralGray_100};
  width: 90%;
  margin: auto;
`;
