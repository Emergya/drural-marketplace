import { CSSProperties } from "react";

import { media, styled } from "@styles";

export const lightboxStyles: CSSProperties = {
  bottom: 28,
  borderRadius: 6,
  width: "auto",
};

export const Container = styled.div`
  margin: 0 !important;
  padding: 0 !important;
`;

export const MainWrapper = styled.div`
  align-items: center;
  display: flex;

  ${media.xLargeScreen`
    flex-wrap: wrap;
  `}
`;

export const InfoWrapper = styled.div`
  flex: 1 1 0%;
  min-width: 65%;
  margin-right: 1.5rem;

  ${media.smallScreen`
    margin-right: 0;
  `}
`;

export const TitleWrapper = styled.div`
  margin-bottom: 0.75rem;
`;

export const ParragraphWrapper = styled.div`
  ${media.xLargeScreen`
    margin-bottom: 1.5rem;
  `}
`;

export const ActionWrapper = styled.div`
  display: flex;

  button span {
    font-size: ${props => props.theme.typography.smallFontSize};
  }

  button:first-child {
    margin-right: 0.5rem;
  }

  ${media.smallScreen`
    flex-wrap: wrap-reverse;
    width: 100%;

    button {
      width: 100%
    }

    button:first-child {
      margin-top: 0.5rem
      margin-right: 0;
    }
  `}
`;

export const Title = styled.h4``;

export const Parragraph = styled.p`
  font-size: ${props => props.theme.typography.smallTextFontSize};
`;
