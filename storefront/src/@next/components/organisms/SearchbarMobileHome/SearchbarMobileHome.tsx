import React from "react";

import { SearchbarMobileTile } from "@components/atoms/SearchbarMobileTile";
import { SearchMobileTile } from "@components/molecules/SearchMobileTile";

import * as S from "./styles";
import { IProps } from "./types";

export const SearchbarMobileHome: React.FC<IProps> = ({
  query,
  suggestions,
  onItemClick,
  onChange,
  onSubmit,
}) => {
  const [searchTileShow, setSearchTileShow] = React.useState(false);

  return (
    <S.SearchBarContainer>
      <SearchbarMobileTile onClick={() => setSearchTileShow(true)} />
      {searchTileShow && (
        <SearchMobileTile
          query={query}
          suggestions={suggestions}
          onItemClick={onItemClick}
          onChange={onChange}
          onSubmit={onSubmit}
          onClose={() => setSearchTileShow(false)}
        />
      )}
    </S.SearchBarContainer>
  );
};
