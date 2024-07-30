import { media, styled } from "@styles";

// 1. Wrappers
export const Wrapper = styled.div`
  padding-bottom: 26px;

  ${media.smallScreen`
    padding-bottom: 24px;
  `}
`;

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 1rem;
`;

export const MapWrapper = styled.div`
  svg {
    width: 100%;
  }
`;

export const Map = styled.div`
  height: 192px;
  width: 100%;
`;

// 2. Typographies
export const Samlltaxt = styled.p`
  font-size: ${props => props.theme.typography.smallTextFontSize};
  margin-left: 0.5rem;
`;
