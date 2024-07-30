import React from "react";
import { FormattedMessage } from "react-intl";

import { DropdownSelect, Tile } from "@components/atoms";

import * as S from "./styles";
import { IBookableResourceSelectTileProps } from "./types";

export const BookableResourceSelectTile: React.FC<IBookableResourceSelectTileProps> = ({
  options,
  value,
  onSelectChange,
}) => (
  <S.TileWrapper>
    <Tile padding="2rem">
      <S.Title>
        <FormattedMessage defaultMessage="Select resource" />
      </S.Title>
      {options.length ? (
        <DropdownSelect
          name="bookableResourceSelect"
          options={options}
          placeholder="Choose any"
          value={value}
          onChange={value => onSelectChange(value)}
        />
      ) : (
        <FormattedMessage defaultMessage="This service has no associated resources" />
      )}
    </Tile>
  </S.TileWrapper>
);
