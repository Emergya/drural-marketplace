import { useAuth } from "@drural/sdk";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-apollo";

import { locationFilterMaxValue, priceFilterMaxValue } from "@temp/constants";

import {
  SearchSuggestionsQuery,
  SearchSuggestionsQueryVariables,
} from "../../../../views/Home/gqlTypes/SearchSuggestionsQuery";
import { searchSuggestionsQuery } from "../../../../views/Home/queries";
import { Header } from "./Header";
import { IPropsWrapper, Search } from "./types";

const initialSearchState = {
  query: undefined,
  distance: undefined,
  price: [],
};

export const HeaderComponent: React.FC<IPropsWrapper> = ({ loading }) => {
  const { user, signOut } = useAuth();
  const handleSignOut = () => signOut();
  const { pathname: location } = useRouter();
  const { push } = useRouter();
  const [searchState, setSearchState] = React.useState<Search>(
    initialSearchState
  );

  const handleSubmitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let urlSearchQuery = "/search/?";

    if (searchState.query) {
      urlSearchQuery += `q=${searchState.query}`;
    }
    if (
      searchState.distance !== undefined &&
      searchState.distance !== locationFilterMaxValue
    ) {
      urlSearchQuery += `&distance=${searchState.distance}`;
    }
    if (searchState.price.length > 1) {
      urlSearchQuery += `&priceGte=${searchState.price[0]}`;

      if (priceFilterMaxValue !== searchState.price[1]) {
        urlSearchQuery += `&priceLte=${searchState.price[1]}`;
      }
    }

    push(urlSearchQuery);
  };

  const onQueryChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    setSearchState({
      ...searchState,
      query: target.value,
    });
  };

  const onSearchItemClick = (searchQuery: string) => {
    setSearchState({
      ...searchState,
      query: searchQuery,
    });
  };

  const onSearchItemMobileClick = (searchQuery: string) => {
    push(`/search/?q=${searchQuery}`);
    resetSearch();
  };

  const onDistanceChange = (distanceQuery: number) => {
    setSearchState({
      ...searchState,
      distance: distanceQuery,
    });
  };

  const onPriceChange = (priceQuery: number[]) => {
    setSearchState({
      ...searchState,
      price: priceQuery,
    });
  };

  const resetSearch = () => {
    setSearchState(initialSearchState);
  };

  const { data: search } = useQuery<
    SearchSuggestionsQuery,
    SearchSuggestionsQueryVariables
  >(searchSuggestionsQuery, {
    variables: {
      query: searchState.query!,
      channel: "default-channel",
      pageSize: 5,
    },
    skip: !searchState.query,
  });

  return (
    <Header
      loading={loading}
      user={user}
      handleSignOut={handleSignOut}
      location={location}
      query={searchState.query || ""}
      onQueryChange={onQueryChange}
      suggestions={
        search?.products
          ? search.products.edges.map(product => product.node)
          : []
      }
      onSearchItemClick={onSearchItemClick}
      distance={searchState.distance}
      onDistanceChange={onDistanceChange}
      price={searchState.price}
      onPriceChange={onPriceChange}
      onSubmit={handleSubmitSearch}
      onMobileItemClick={onSearchItemMobileClick}
      resetSearch={resetSearch}
    />
  );
};
