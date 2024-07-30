import React from "react";
import { ThemeProvider } from "styled-components";

import { GlobalStyle } from "../src/@next/globalStyles";
import { dRuralTheme } from "../src/@next/globalStyles";
import * as S from "./styles";

import "../src/globalStyles/scss/index-drural.scss";

export const OutLineDecorator = Story => (
  <ThemeProvider theme={dRuralTheme}>
    <S.Wrapper>
      <Story />
      <S.Outline />
      <GlobalStyle />
    </S.Wrapper>
  </ThemeProvider>
);
