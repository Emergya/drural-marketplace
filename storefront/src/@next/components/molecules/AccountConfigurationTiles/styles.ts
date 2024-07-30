import { media, styled } from "@styles";

// 1. Tiles styles
export const TileWrapper = styled.div`
  height: auto;
  margin-bottom: 1.5rem;
`;

export const AllowLocationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  min-height: 4rem;
  margin-bottom: 17px;
`;

export const DistanceWrapper = styled.div`
  .rc-slider {
    width: 312px;
    ${media.smallScreen`
      width: 98%;
    `}
  }
`;

export const LoaderWrapper = styled.div`
  text-align: center;

  h4 {
    margin-bottom: 1rem;
  }
`;

export const Header = styled.div<{
  marginTop?: string;
}>`
  margin-bottom: ${props => (props.marginTop ? props.marginTop : "2rem")};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h3`
  ${media.smallScreen`
    font-size: 22px;
    line-height: 2rem;
  `}
`;

export const SubtitleMain = styled.h4`
  font-size: ${props => props.theme.typography.baseFontSize};
  font-weight: ${props => props.theme.typography.boldFontWeight};
  line-height: ${props => props.theme.typography.baseLineHeight};
  margin: 0 0.5rem 0.5rem 0;
`;

export const SubtitleSmall = styled.h4<{
  marginBottom?: string;
}>`
  color: ${props => props.theme.colors.black};
  font-size: ${props => props.theme.typography.smallTextFontSize};
  font-weight: ${props => props.theme.typography.normalFontWeight};
  line-height: ${props => props.theme.typography.baseLineHeight};
  opacity: 0.6;
  margin-bottom: ${props => (props.marginBottom ? props.marginBottom : "6px")};
`;

export const ButtonsWrapper = styled.div<{
  marginTop?: string;
}>`
  align-items: flex-end;
  display: flex;
  flex-wrap: wrap-reverse;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: ${props => (props.marginTop ? props.marginTop : "1.75rem")};

  button {
    width: inherit;

    &:last-child {
      margin-left: 0.5rem;

      ${media.smallScreen`
      margin-bottom: 0.5rem;
    `}
    }
  }

  ${media.smallScreen`
    justify-content: flex-start;
  `}
`;

// 2. Category modal styles
export const OverlayInnerWrapper = styled.div`
  padding: 22px 26px;
  @media (min-width: ${props => props.theme.breakpoints.mediumScreen}) {
    padding: 50px 26px 24px;
  }
`;

export const CloseIconWrapper = styled.div`
  position: absolute;
  top: 2%;
  left: 90%;
  width: 15px;
  @media (min-width: ${props => props.theme.breakpoints.mediumScreen}) {
    top: 2%;
    left: 96%;
  }

  &:hover {
    color: ${props => props.theme.colors.primary}
    cursor: pointer;
  }
`;

export const OverlayTextWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  text-align: center;
  h2 {
    margin-bottom: 20px;
  }
  > p {
    font-size: ${props => props.theme.typography.baseFontSize};
    font-weight: ${props => props.theme.typography.normalFontWeight};
    text-align: center;
    margin-bottom: 32px;
    @media (min-width: ${props => props.theme.breakpoints.mediumScreen}) {
      font-weight: ${props => props.theme.typography.lightFontWeight};
      font-size: ${props => props.theme.typography.lightTitleFontSize};
      width: 80%;
    }
  }
`;

export const OverlayCategoriesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 54vh;
  overflow-y: scroll;

  @media (min-width: ${props => props.theme.breakpoints.mediumScreen}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const OverlayCategoriesGridWrapper = styled.div`
  justify-self: center;
  margin-bottom: 17px;
  margin-top: 17px;
`;

export const OverlayButtonsWrapper = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: center;
  padding-top: 40px;
  button {
    width: inherit;

    &:last-child {
      margin-left: 1rem;
    }
  }
`;
