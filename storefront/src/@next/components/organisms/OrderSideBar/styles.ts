import { styled } from "@styles";

export const Wrapper = styled.div`
  overflow: auto;
  width: 360px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  box-shadow: 6px 0px 30px rgba(0, 0, 0, 0.15);
`;
export const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 15px 12px 15px 24px;
  border-bottom: 1px solid ${props => props.theme.colors.druralGray};

  font-weight: ${props => props.theme.typography.lightFontWeight};
  font-size: ${props => props.theme.typography.lightTitleFontSize};
`;

export const CloseIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius:100%;
  cursor: pointer;
  div{
    height: 20px;
  }
  background-color: ${props => props.theme.colors.primaryDark};
  :hover {
    background-color: ${props => props.theme.colors.primary};
  
    }
  }
`;

export const FiltersContainer = styled.div`
  width: 100%;
`;

export const OptionsList = styled.ul`
  li {
    padding: 16px 24px 16px 24px;
    cursor: pointer;
  }
`;

export const Separator = styled.hr`
  border: 0;
  border-top: 1px solid ${props => props.theme.colors.druralGray_100};
  width: 90%;
  margin: auto;
`;
