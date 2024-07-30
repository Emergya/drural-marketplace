import { media, styled } from "@styles";

// 1. Wrappers
export const TileWrapper = styled.div`
  min-width: 370px;

  ${media.xLargeScreen`
    min-width: 320px;
  `}

  ${media.largeScreen`
    margin-bottom: 1rem;
    min-width: 100%;
  `}
`;

export const InnerWrapper = styled.div`
  display: flex;
`;

export const ImageWrapper = styled.div`
  width: 64px;
  height: 64px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    object-fit: cover;
    max-width: 170%;
  }
`;

export const ContentWrapper = styled.div`
  padding-left: 1rem;
  padding-top: 0.25rem;
`;

// 2. Elements
export const Title = styled.p`
  color: ${props => props.theme.colors.druralGray};
  font-size: ${props => props.theme.typography.preTitleFontSize};
  font-weight: ${props => props.theme.typography.boldFontWeight};
  letter-spacing: 0.05em;
  line-height: ${props => props.theme.typography.preTitleLineHeight};
  margin-bottom: 0.4rem;
  text-transform: uppercase;
`;

export const Text = styled.p`
  font-size: ${props => props.theme.typography.linkFontSize};
  line-height: ${props => props.theme.typography.linkFontSize};
`;

export const GrayText = styled.p`
  color: ${props => props.theme.colors.druralGray};
  font-size: ${props => props.theme.typography.linkFontSize};
  line-height: ${props => props.theme.typography.linkFontSize};
  margin-top: 9px;
`;
