import { media, styled } from "@styles";

// 1. Wrappers
export const TileWrapper = styled.div`
  height: auto;
  margin-bottom: 1.5rem;
`;

export const TileInnerWrapper = styled.div`
  position: relative;
`;

export const LoaderWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const CalendarWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

export const SlotsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 22px;
`;

export const CaptionWrapper = styled.div``;

export const OverlayInnerWrapper = styled.div`
  width: 100%;

  padding: 22px 26px;
  @media (min-width: ${props => props.theme.breakpoints.mediumScreen}) {
    padding: 50px 64px 32px;
  }
`;

export const CloseIconWrapper = styled.div`
  position: absolute;
  top: 2%;
  left: 90%;
  width: 15px;
  @media (min-width: ${props => props.theme.breakpoints.mediumScreen}) {
    top: 24px;
    left: 93%;
  }

  &:hover {
    color: ${props => props.theme.colors.primary}
    cursor: pointer;
  }
`;

export const OverlayHeaderWrapper = styled.div``;

export const OverlayContentWrapper = styled.div``;

export const OverlayInfoWrapper = styled.div`
  &:not(:last-child) {
    padding-bottom: 30px;
  }
`;

export const OverlayButtonsWrapper = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: center;
  padding-top: 42px;

  ${media.extraSmallScreen`
    flex-wrap: wrap-reverse;
  `}

  button {
    width: inherit;

    &:last-child {
      margin-left: 1rem;
    }

    ${media.extraSmallScreen`
      width: 100%;
      
      &:last-child {
        margin-bottom: 1rem;
        margin-left: 0;
      }
  `}
  }
`;

// 2. Elements
export const Title = styled.h3<{
  marginBottom?: string;
}>`
  margin-bottom: ${props =>
    props.marginBottom ? props.marginBottom : " 2.5rem"};

  ${media.smallScreen`
    font-size: 22px;
    line-height: 2rem;
  `}
`;

export const OverlayTitle = styled.h2`
  margin-bottom: 30px;
  text-align: center;
`;

export const OverlayContentTitle = styled.p`
  font-weight: ${props => props.theme.typography.boldFontWeight};
  font-size: ${props => props.theme.typography.linkFontSize};
  line-height: ${props => props.theme.typography.linkLineHeight};
  padding-bottom: 14px;
`;

export const OverlayInfoTitle = styled.p`
  font-weight: ${props => props.theme.typography.boldFontWeight};
  font-size: ${props => props.theme.typography.extraSmallTextFontSize};
  line-height: ${props => props.theme.typography.extraSmallTextLineHeight};
  padding-bottom: 8px;
  text-transform: uppercase;
`;

export const OverlayInfoText = styled.p``;
