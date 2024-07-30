import { dRuralTheme, styled } from "@styles";

type WhiteSpaceProperty =
  | "-moz-pre-wrap"
  | "normal"
  | "nowrap"
  | "pre"
  | "pre-line"
  | "pre-wrap";

export const rangeInput = {
  // Gray bar
  rialStyle: {
    background: dRuralTheme.colors.grayLight,
    boxShadow: "inset 0px 4px 4px rgba(0, 0, 0, 0.16)",
    height: "0.5rem",
  },

  // Avtive bar
  trackStyle: {
    boxShadow: "inset 0px -4px 4px rgba(0, 0, 0, 0.16)",
    height: "0.5rem",
  },

  // Dots
  dotStyle: {
    display: "none",
  },

  // Label
  tooltipStyle: {
    background: "none",
    color: dRuralTheme.colors.black,
  },

  // Handler
  handleStyle: {
    alignItems: "center",
    background: dRuralTheme.colors.white,
    border: `1px solid ${dRuralTheme.colors.light}`,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
    cursor: "pointer",
    display: "flex",
    height: "1rem",
    justifyContent: "center",
    width: "1rem",
  },

  handleDotStyle: {
    background: dRuralTheme.colors.bannerEdge,
    borderRadius: "24px",
    cursor: "pointer",
    height: "0.25rem",
    width: "0.25rem",
  },

  // Overlay
  overlayInnerStyle: {
    background: dRuralTheme.colors.white,
    boxShadow: "none",
    color: dRuralTheme.colors.black,
    fontSize: dRuralTheme.typography.baseFontSize,
    fontWeight: 600,
    lineHeight: dRuralTheme.typography.baseLineHeight,
    whiteSpace: "nowrap" as WhiteSpaceProperty,
    paddingRight: "12px",
    paddingLeft: "12px",
  },

  // Marks
  markStyle: {
    color: dRuralTheme.colors.druralGray,
    fontSize: dRuralTheme.typography.smallFontSize,
    lineHeight: dRuralTheme.typography.baseLineHeight,
    paddingTop: "0.5rem",
    width: 65,
  },
};

export const StyleWrapper = styled.div`
  .rc-slider-track {
    background-color: ${props => props.theme.colors.primary};
  }
`;
