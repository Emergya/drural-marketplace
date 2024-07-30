import { UilPlus } from "@iconscout/react-unicons";
import React from "react";
import { FormattedMessage } from "react-intl";

import { Tile } from "../Tile";
import * as S from "./styles";
import { IProps } from "./types";

export const AddNewTile: React.FC<IProps> = ({
  boxShadow,
  type,
  ...props
}: IProps) => {
  return (
    <Tile boxShadow={boxShadow} tileType="addNew" {...props}>
      <S.Content>
        <S.IconWrapper>
          <UilPlus size="48" />
        </S.IconWrapper>
        <p>
          <FormattedMessage defaultMessage="Add new {type}" values={{ type }} />
        </p>
      </S.Content>
    </Tile>
  );
};
