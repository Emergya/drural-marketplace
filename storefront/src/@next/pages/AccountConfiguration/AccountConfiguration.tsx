import React from "react";

import { AccountConfigurationTiles } from "@components/molecules";

import * as S from "./styles";

export const AccountConfiguration: React.FC = () => {
  return (
    <S.Wrapper>
      <AccountConfigurationTiles />
    </S.Wrapper>
  );
};
