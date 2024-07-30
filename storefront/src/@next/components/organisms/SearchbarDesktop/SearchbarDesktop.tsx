import { UilSearch } from "@iconscout/react-unicons";
import React from "react";
import { FormattedMessage } from "react-intl";

import { SearchListTile } from "@components/atoms/SearchListTile";
import { SearchLocationTile } from "@components/atoms/SearchLocationTile";
import { SearchPriceTile } from "@components/atoms/SearchPriceTile";
import { useHandlerWhenClickedOutside } from "@hooks/useHandlerWhenClickedOutside";

import * as S from "./styles";
import { IProps } from "./types";

export const SearchbarDesktop: React.FC<IProps> = ({
  query,
  onQueryChange,
  suggestions,
  onSearchItemClick,
  distance,
  onDistanceChange,
  price,
  onPriceChange,
  onSubmit,
}: IProps) => {
  const { setElementRef } = useHandlerWhenClickedOutside(() => {
    setSearchTileShow(false);
    setLocationTileShow(false);
    setPriceTileShow(false);
  });

  const [searchTileShow, setSearchTileShow] = React.useState(false);
  const [locationTileShow, setLocationTileShow] = React.useState(false);
  const [priceTileShow, setPriceTileShow] = React.useState(false);

  const handleSearchClick = () => {
    setSearchTileShow(!searchTileShow);
    setLocationTileShow(false);
    setPriceTileShow(false);
    if (!searchTileShow && inputEl?.current) {
      inputEl.current.focus();
    }
  };

  const handleLocationClick = () => {
    setSearchTileShow(false);
    setLocationTileShow(!locationTileShow);
    setPriceTileShow(false);
  };

  const handlePriceClick = () => {
    setSearchTileShow(false);
    setLocationTileShow(false);
    setPriceTileShow(!priceTileShow);
  };

  const inputEl = React.useRef<HTMLInputElement>(null);

  return (
    <S.Searchbar ref={setElementRef()}>
      <S.Form onSubmit={onSubmit}>
        <S.Searchbox onClick={handleSearchClick}>
          <h4>
            <FormattedMessage defaultMessage="What are you looking for?" />
          </h4>
          <S.Input
            type="text"
            onChange={onQueryChange}
            ref={inputEl}
            placeholder="Enter your search..."
            value={query}
          />
          {searchTileShow && (
            <SearchListTile
              suggestions={suggestions}
              onClick={search => {
                onSearchItemClick(search);
                setSearchTileShow(false);
              }}
            />
          )}
        </S.Searchbox>
        <S.Locationbox onClick={handleLocationClick}>
          <h4>
            <FormattedMessage defaultMessage="Search services near me" />
          </h4>
          <S.P>
            {distance ? (
              <FormattedMessage
                defaultMessage="Distance selected: {distanceSelected} km"
                values={{
                  distanceSelected: distance,
                }}
              />
            ) : (
              <FormattedMessage defaultMessage="How close?" />
            )}
          </S.P>
          {locationTileShow && (
            <SearchLocationTile
              distance={distance === undefined ? 100 : distance}
              onChange={onDistanceChange}
            />
          )}
        </S.Locationbox>
        <S.Pricebox onClick={handlePriceClick}>
          <h4>
            <FormattedMessage defaultMessage="Price range" />
          </h4>
          <S.P>
            {price.length > 1 ? (
              <FormattedMessage
                defaultMessage="Price selected: {pge} - {ple} €"
                values={{
                  pge: price[0],
                  ple: price[1],
                }}
              />
            ) : (
              <FormattedMessage defaultMessage="How much do you want to expend?" />
            )}
          </S.P>
          {priceTileShow && (
            <SearchPriceTile
              price={price.length > 1 ? price : [0, 100]}
              onChange={onPriceChange}
            />
          )}
        </S.Pricebox>
        <S.IconWrapper color="primary" type="submit">
          <UilSearch size="24" color="#fff" />
        </S.IconWrapper>
      </S.Form>
    </S.Searchbar>
  );
};
