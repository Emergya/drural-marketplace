import React from "react";

import { CheckboxIcon } from "@components/molecules";

import * as S from "./styles";
import { IProps } from "./types";

export const CheckboxIconGrid: React.FC<IProps> = ({
  preferences,
  onChange = () => null,
}) => {
  return (
    <S.Container>
      {Object.keys(preferences).map((preference, index) => {
        const Icon = preferences[preference].icon;
        const preferenceOption = preferences[preference];

        const newChange = (event: React.SyntheticEvent) => {
          onChange(event, preference);
        };

        return (
          <S.GridItem key={preference}>
            <CheckboxIcon
              icon={<Icon color="#3CDCAA" size={40} />}
              title={preferenceOption.title}
              checked={preferenceOption.value}
              onChange={newChange}
            />
          </S.GridItem>
        );
      })}
    </S.Container>
  );
};
