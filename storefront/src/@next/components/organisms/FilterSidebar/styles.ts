import { media, styled } from "@styles";

export const Wrapper = styled.div`
  overflow: auto;
  height: 100vh;
  width: 360px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;

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
export const CategoriesContainer = styled.div`
  width: 100%;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  padding: 35px 12px 35px 12px;
`;
export const FiltersContainer = styled.div`
  width: 100%;
`;

export const DistanceWrapper = styled.div`
  padding: 20px;
  margin-bottom: 30px;
  .rc-slider {
    width: 305px;
    ${media.smallScreen`
      width: 98%;
    `}
    .rc-slider-mark-text {
      transform: translateX(-70%) !important;
    }
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const Title = styled.h3`
  font-weight: ${props => props.theme.typography.boldFontWeight};
  font-size: ${props => props.theme.typography.p18FontSize};
  margin-bottom: 7px;
`;
export const SubtitleSmall = styled.h4<{
  marginBottom?: string;
}>`
  color: ${props => props.theme.colors.black};
  font-size: ${props => props.theme.typography.smallTextFontSize};
  font-weight: ${props => props.theme.typography.normalFontWeight};
  line-height: ${props => props.theme.typography.baseLineHeight};
  opacity: 0.6;
  margin-bottom: ${props => (props.marginBottom ? props.marginBottom : "19px")};
`;

export const Separator = styled.hr`
  border: 0;
  border-top: 1px solid ${props => props.theme.colors.druralGray_100};
  width: 90%;
  width: 90%;
  margin: auto;
`;
export const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  margin-bottom: 25px;
  .mapboxgl-ctrl-bottom-left {
    z-index: 0;
  }
  .mapboxgl-ctrl-bottom-right {
    z-index: 0;
  }
`;
export const SearchContainer = styled.div`
  position: absolute;
  width: 95%;
  height: 48px;
  margin: 0;
  top: 7px;
  left: 8px;
  .mapboxgl-ctrl-geocoder {
    width: 100%;
    border: 1px solid ${props => props.theme.colors.druralGray_100};
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
    &:hover {
      border-color: ${props => props.theme.colors.primaryLight};
      background-color: ${props => props.theme.colors.primaryTransparent};
      > input {
        ::placeholder {
          color: ${props => props.theme.colors.primary};
          opacity: 1; 
      }
    }
  }
  .mapboxgl-ctrl-geocoder--icon-search {
    display: none;
  }
  .mapboxgl-ctrl-geocoder--input {
    padding-left: 16px;
    &:focus {
      outline: none;
      border: 2px solid ${props => props.theme.colors.primary};
      border-radius: 4px;
    }
  }
`;

export const CurrentLocation = styled.p`
  margin-bottom: 20px;
`;
