import * as C from "./constants";

// 1. Colors

// Primary - green
export const primary_100 = "#EBFBF6";
export const primary_200 = "#C4F4E5";
export const primary_300 = "#9DEDD4";
export const primary_400 = "#76E6C3";
export const primary = "#3CDCAA";
export const primary_600 = "#23C290";
export const primary_700 = "#1B9770";
export const primary_800 = "#136C50";
export const primary_900 = "#0C4030";

// Secondary - orange
export const secondary_100 = "#FEF7EC";
export const secondary_200 = "#FDE6C6";
export const secondary_300 = "#FCD7A0";
export const secondary_400 = "#FAC77A";
export const secondary = "#F9AF42";
export const secondary_600 = "#F49407";
export const secondary_700 = "#B76F05";
export const secondary_800 = "#7A4A03";
export const secondary_900 = "#3D2501";

// Error - red
export const errorRed_100 = "#FEE0E0";
export const errorRed_200 = "#FFA3A3";
export const errorRed_300 = "#FF7575";
export const errorRed_400 = "#FF4747";
export const errorRed = "#CC0000";
export const errorRed_600 = "#A30000";
export const errorRed_700 = "#7A0000";
export const errorRed_800 = "#510000";
export const errorRed_900 = "#280000";

// Others
export const blueGray = "#87A2C7";
export const skin = "#763E47";
export const disabledGray = "#E5E5E5";

// Gray scale
export const druralGray_50 = "#F7F6F8";
export const druralGray_100 = "#E0DEE3";
export const druralGray_200 = "#C1BEC8";
export const druralGray_300 = "#A39EAD";
export const druralGray_400 = "#847D91";
export const druralGray = "#676173";
export const druralGray_600 = "#524D5C";
export const druralGray_700 = "#3D3A45";
export const druralGray_800 = "#29262E";
export const druralGray_900 = "#141316";
export const druralBorderGray = "#E6E6E6";

export const white = "#ffffff";
export const black = "#000000";

// Social media colors
export const socialMediaColors = {
  email: "#F86767",
  facebook: "#3b5998",
  twitter: "#55acee",
  whatsapp: "#25D366",
};

// 2. Theme colors
export const theme = {
  // Importing default theme color
  ...C.theme,
  // Overriding them
  activeMenuOption: primary_600,
  autofillSelected: druralGray_100,
  bannerBackground: druralGray_50,
  bannerEdge: druralGray_300,
  bannerLink: primary_600,
  baseFont: black,
  baseFontColorSemiTransparent: druralGray,
  baseFontColorTransparent: druralGray_100,
  dark: druralGray_700,
  disabled: disabledGray,
  divider: druralGray_50,
  dividerDark: druralGray_200,
  error: errorRed,
  hoverLightBackground: primary_200,
  light: druralGray_50,
  lightFont: druralGray,
  listAttributeName: druralGray,
  listBullet: primary_600,
  primary,
  primary100: primary_100,
  primary700: primary_700,
  primaryDark: primary_600,
  primaryLight: primary_200,
  primaryTransparent: primary_100,
  tabTitle: primary_600,
  secondary,
  secondaryDark: secondary_600,
  secondaryLight: secondary_200,
  success: primary,
  thumbnailBorder: primary_600,
  tableDivider: druralGray_100,
  tabsBorder: druralGray_100,
  white,
  // Adding new ones
  black,
  blueGray,
  druralGray,
  druralGray_100,
  druralGray_200,
  druralGray_300,
  druralGray_400,
  borderGray: druralGray_100,
  grayDark: druralGray_600,
  grayLight: druralGray_100,
  errorRed,
  errorRed_200,
  primary_300,
  primary_400,
  skin,
};

// 3. Sizes
export const xsSize = "0.75rem"; // 12px
export const sSize = "1rem"; // 16px
export const xlSize = "3.125rem"; // 48px --> 50px due to border and text alignment necessary

// 4. Typografy
export const baseFontFamily = "'Poppins', sans-serif";
export const baseFontSize = "1rem"; // 16px
export const baseLineHeight = "1.5rem"; // 24px
// Headings
export const h1FontSize = "3rem"; // 48px
export const h1MovilFontSize = "1.5rem"; // 24px
export const h1LineHeight = "4.5rem"; // 72px
export const h1MovilLineHeight = "2rem"; // 32px
export const h2FontSize = "1.75"; // 28px
export const h2LineHeight = "2.5rem"; // 40px
export const h3FontSize = "1.375rem"; // 22px
export const h3LineHeight = "2rem"; // 32px
export const h4FontSize = "1.125rem"; // 18px
export const h4LineHeight = "1.5rem"; // 24px
export const h5FontSize = "0.875rem"; // 14px
export const h5LineHeight = "1.25rem"; // 20px
// Custom titles
export const lightTitleFontSize = "1.25rem"; // 20px
export const lightTitleLineHeight = "2rem"; // 32px
export const preTitleFontSize = "0.75rem"; // 12px
export const preTitleLineHeight = "1.125rem"; // 18px
// Parragraphs
export const p20FontSize = "1.25rem"; // 20px
export const p18FontSize = "1.125rem"; // 18px
export const p16FontSize = "1rem"; // 16px
export const p14FontSize = "0.875rem"; // 14px
export const smallTextFontSize = "0.8125rem"; // 13px
export const extraSmallTextFontSize = "0.75rem"; // 12px
export const textLineHeight = "1.5rem"; // 24px
export const extraSmallTextLineHeight = "1.25rem"; // 20px
// Liks
export const linkFontSize = "0.875rem"; // 14px
export const linkLineHeight = "21px"; // 0.80769230769rem
// Weights
export const extraBoldFontWeight = "700";
export const boldFontWeight = "600";
export const semiBoldFontWeight = "500";
export const normalFontWeight = "400";
export const lightFontWeight = "300";
// Text transforms
export const uppercase = "uppercase";
export const capitalize = "capitalize";
export const lowercase = "lowercase";

// 5. Border radius
export const btnBorderRadius = "24px";

// 6. Box shadows
export const boxShadowLight = "0px 4px 16px rgba(0, 0, 0, 0.1)";

// 7. Grid
export const containerWidth = "1170px";
export const colsSpace = "32px";
export const rowsSpace = "42px";

// Header sizes

export const mobileHeight = "56px";
export const desktopHeight = "80px";

// 8. Breackpoints
export const xxxLargeScreen = 1920;
export const xxLargeScreen = 1600;
export const xLargeScreen = 1280;
export const largeScreen = 992;
export const mediumScreen = 720;
export const smallScreen = 540;
