import ReactSVG from "react-svg";

import { styled } from "@styles";

// 1. Wrappers
export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ImageWrapper = styled.div`
  padding-right: 22px;
  text-align: left;
`;

export const InfoWrapper = styled.div`
  textalign: left;
`;

// 2. Elements
export const ImageBorder = styled(ReactSVG)`
  svg {
    width: 96px;
  }
`;

export const ImageBars = styled(ReactSVG)`
  position: relative;
  height: 0;
  bottom: 135px;

  svg {
    width: 96px;
    rect {
      fill: ${props => props.theme.colors.primaryLight};
    }
  }
`;

export const ImageIcon = styled(ReactSVG)`
  position: relative;
  height: 0;
  bottom: 98px;
  left: 30px;

  svg {
    width: 39px;
    path {
      fill: ${props => props.theme.colors.primary};
    }
  }
`;

export const Title = styled.h4`
  color: ${props => props.theme.colors.black};
  margin-bottom: 20px;
`;

export const Text = styled.p`
  color: ${props => props.theme.colors.black};
  font-size: ${props => props.theme.typography.extraSmallTextFontSize};
  line-height: ${props => props.theme.typography.extraSmallTextLineHeight};
  margin-bottom: 6px;
  opacity: 0.5;
`;
