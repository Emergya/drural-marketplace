import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
import { NextPage } from "next";
import * as React from "react";
import { useAlert } from "react-alert";
import { useQuery } from "react-apollo";
import { useIntl } from "react-intl";
import {
  ArrayParam,
  NumberParam,
  StringParam,
  useQueryParam,
  useQueryParams,
} from "use-query-params";

import { OfflinePlaceholder } from "@components/atoms";
import { NotificationModal } from "@components/organisms/NotificationModal";
import { useGeoLocation } from "@hooks/useGeoLocation";
import { channelSlug, MAPBOX_TOKEN } from "@temp/constants";
import { commonMessages } from "@temp/intl";
import { IFilters } from "@types";
import { FilterQuerySet, SORT_OPTIONS } from "@utils/collections";
import { ViewPort } from "@utils/mapbox";
import { FeaturedProducts } from "@utils/ssr";

import { NotFound } from "../../components";
import NetworkStatus from "../../components/NetworkStatus";
import { MAX_DISTANCE, MAX_PRICE, PRODUCTS_PER_PAGE } from "../../core/config";
import {
  convertSortByFromString,
  convertToAttributeScalar,
} from "../../core/utils";
import { filtersChangeHandler } from "../Category/utils";
import { GetAlldRuralCategories } from "./gqlTypes/GetAlldRuralCategories";
import Page from "./Page";
import { getAllCategories, TypedSearchProductsQuery } from "./queries";
import { getZoomFromDistance } from "./utils";

export interface SearchPageProps {
  data: FeaturedProducts;
}

export const SearchPage: NextPage<SearchPageProps> = ({
  data: featuredProducts,
}) => {
  const intl = useIntl();
  const alert = useAlert();
  const { location, getLocation, setLocation } = useGeoLocation();
  const [queryFilter, setQueryFilter] = useQueryParams({
    categories: ArrayParam,
    distance: NumberParam,
    priceGte: NumberParam,
    priceLte: NumberParam,
  });
  const [searchLocation, setSearchLocation] = React.useState("");
  const [resetZoom, setResetZoom] = React.useState(4);
  const [viewport, setViewport] = React.useState<ViewPort>({
    latitude: location.coordinates.lat,
    longitude: location.coordinates.long,
    zoom: getZoomFromDistance(queryFilter.distance),
  });
  const [viewportBigMap, setViewportBigMap] = React.useState<ViewPort>({
    latitude: location.coordinates.lat,
    longitude: location.coordinates.long,
    zoom: getZoomFromDistance(queryFilter.distance),
  });

  const [showLocationAlert, setShowLocationAlert] = React.useState(false);
  const [sort, setSort] = useQueryParam("sortBy", StringParam);
  const [search, setSearch] = useQueryParam("q", StringParam);
  const [attributeFilters, setAttributeFilters] = useQueryParam(
    "filters",
    FilterQuerySet
  );

  const [filterState, setFilterState] = React.useState({
    categories: queryFilter.categories || [],
    distance: queryFilter.distance,
    priceGte: queryFilter.priceGte,
    priceLte: queryFilter.priceLte,
    longitude: location.coordinates.long,
    latitude: location.coordinates.lat,
  });

  const handleViewportChange = React.useCallback((newViewport: ViewPort) => {
    setViewport(newViewport);
  }, []);

  const handleViewportChangeBigMap = React.useCallback(
    (newViewport: ViewPort) => {
      setViewportBigMap(newViewport);
    },
    []
  );

  const geocodingClient = React.useMemo(() => {
    try {
      return mbxGeocoding({
        accessToken: MAPBOX_TOKEN,
      });
    } catch (error) {
      alert.show(
        {
          content: intl.formatMessage(commonMessages.mapBox),
          title: "Error",
        },
        { type: "error", timeout: 5000 }
      );
    }
  }, [MAPBOX_TOKEN]);

  const handleGeocoderViewportChange = React.useCallback(
    (newViewport: ViewPort) => {
      onViewportFilterChange(newViewport.latitude, newViewport.longitude);
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      });
    },
    [handleViewportChange]
  );

  const onViewportFilterChange = (latitude: number, longitude: number) => {
    setFilterState(prevFilterState => ({
      ...prevFilterState,

      latitude,
      longitude,
    }));
  };

  const applyFilters = (isLocationEnabled: boolean) => {
    setQueryFilter({
      categories: filterState.categories,
      priceGte: filterState.priceGte,
      priceLte: filterState.priceLte,
      distance: isLocationEnabled ? filterState.distance : undefined,
    });

    if (isLocationEnabled) {
      setLocation({
        ...location,
        coordinates: {
          lat: filterState.latitude,
          long: filterState.longitude,
        },
      });
    }

    setResetZoom(getZoomFromDistance(filterState.distance));
    setViewport({
      ...viewport,
      zoom: getZoomFromDistance(filterState.distance),
    });
    setViewportBigMap({
      ...viewport,
      zoom: getZoomFromDistance(filterState.distance),
    });
  };

  const resetFilters = () => {
    setFilterState({
      categories: queryFilter.categories || [],
      distance: queryFilter.distance,
      priceGte: queryFilter.priceGte,
      priceLte: queryFilter.priceLte,
      longitude: location.coordinates.long,
      latitude: location.coordinates.lat,
    });
    setViewport({
      ...viewport,
      longitude: location.coordinates.long,
      latitude: location.coordinates.lat,
      zoom: resetZoom,
    });
  };

  const filters: IFilters = {
    attributes: attributeFilters,
    pageSize: PRODUCTS_PER_PAGE,
    priceGte: queryFilter.priceGte,
    priceLte: queryFilter.priceLte,
    sortBy: sort || null,
    categories: queryFilter.categories || [],
    closeness:
      queryFilter.distance === undefined && sort !== "closeness"
        ? null
        : {
            radius:
              queryFilter.distance === undefined
                ? MAX_DISTANCE
                : queryFilter.distance,
            latitude: location.coordinates.lat,
            longitude: location.coordinates.long,
          },
  };

  const variables = {
    ...filters,
    attributes: filters.attributes
      ? convertToAttributeScalar(filters.attributes)
      : [],
    channel: channelSlug,
    query: search || "",
    sortBy: convertSortByFromString(filters.sortBy),
    closeness: filters.closeness,
  };

  const clearFilters = () => setAttributeFilters({});

  const handleClickLocation = () => {
    getLocation();
    setShowLocationAlert(false);
  };

  const onCategoriesFilterChange = (categoryId: string, selected: boolean) => {
    const index = filterState.categories.indexOf(categoryId);
    if (index === -1) {
      if (selected) {
        setFilterState({
          ...filterState,
          categories: [...filterState.categories, categoryId],
        });
      }
    } else if (!selected) {
      const newCategories = [...filterState.categories];
      newCategories.splice(index, 1);
      setFilterState({ ...filterState, categories: newCategories });
    }
  };

  const onDistanceFilterChange = (distance: number) => {
    setFilterState({
      ...filterState,
      distance,
    });
  };

  const onPriceFilterChange = (price: number[]) => {
    // Check necessary dut tu bug in RangeInput component lib rc-slider
    if (price[1] >= price[0]) {
      setFilterState({
        ...filterState,
        priceLte: price[1],
        priceGte: price[0],
      });
    }
    if (price[1] < price[0]) {
      setFilterState({
        ...filterState,
        priceLte: price[0],
        priceGte: price[1],
      });
    }
  };

  const { data: allCategories } = useQuery<GetAlldRuralCategories>(
    getAllCategories
  );

  React.useEffect(() => {
    if ("permissions" in navigator) {
      navigator.permissions.query({ name: "geolocation" }).then(result => {
        if (result.state === "prompt") {
          setShowLocationAlert(true);
        } else {
          getLocation();
        }
      });
    } else {
      getLocation();
    }
  }, []);

  React.useEffect(() => {
    geocodingClient
      ?.reverseGeocode({
        query: [location.coordinates.long, location.coordinates.lat],
        types: ["place", "region", "country"],
      })
      .send()
      .then(response => {
        // GeoJSON document with geocoding matches
        setSearchLocation(response.body.features[0]?.place_name);
      });

    setViewport({
      ...viewport,
      latitude: location.coordinates.lat,
      longitude: location.coordinates.long,
    });
  }, [location]);

  return (
    <>
      <NetworkStatus>
        {isOnline => (
          <TypedSearchProductsQuery
            variables={variables}
            errorPolicy="all"
            loaderFull
          >
            {({ loading, data, loadMore }) => {
              const canDisplayFilters =
                !!data?.attributes?.edges && !!data?.products?.edges;

              if (canDisplayFilters) {
                const handleLoadMore = () =>
                  loadMore(
                    (prev, next) => ({
                      ...prev,
                      products: {
                        ...prev.products,
                        edges: [...prev.products.edges, ...next.products.edges],
                        pageInfo: next.products.pageInfo,
                      },
                    }),
                    { after: data.products.pageInfo.endCursor }
                  );

                return (
                  <Page
                    clearFilters={clearFilters}
                    attributes={data.attributes.edges.map(({ node }) => node)}
                    displayLoader={loading}
                    hasNextPage={data.products?.pageInfo?.hasNextPage ?? false}
                    sortOptions={SORT_OPTIONS}
                    setSearch={setSearch}
                    search={search}
                    activeSortOption={filters.sortBy}
                    filters={filters}
                    products={data.products}
                    featuredProducts={featuredProducts.products}
                    onAttributeFiltersChange={filtersChangeHandler(
                      filters,
                      attributeFilters,
                      setAttributeFilters
                    )}
                    onLoadMore={handleLoadMore}
                    activeFilters={
                      filters!.attributes
                        ? Object.keys(filters!.attributes).length
                        : 0
                    }
                    onOrder={value => {
                      setSort(value.value);
                    }}
                    categories={
                      allCategories?.categories &&
                      allCategories.categories.edges.map(edge => edge.node)
                    }
                    categoriesFilter={filterState.categories || []}
                    onCategoriesFilterChange={onCategoriesFilterChange}
                    applyFilters={applyFilters}
                    resetFilters={resetFilters}
                    distance={
                      filterState.distance === undefined
                        ? MAX_DISTANCE
                        : filterState.distance
                    }
                    onDistanceFilterChange={onDistanceFilterChange}
                    priceLte={
                      filterState.priceLte === undefined
                        ? 0
                        : filterState.priceLte
                    }
                    priceGte={
                      filterState.priceGte === undefined
                        ? MAX_PRICE
                        : filterState.priceGte
                    }
                    onPriceFilterChange={onPriceFilterChange}
                    handleViewportChange={handleViewportChange}
                    handleGeocoderViewportChange={handleGeocoderViewportChange}
                    searchLocation={searchLocation}
                    viewport={viewport}
                    viewportBigMap={viewportBigMap}
                    handleGeocoderViewportChangeBigMap={
                      handleViewportChangeBigMap
                    }
                  />
                );
              }

              if (data && data.products === null) {
                return <NotFound />;
              }

              if (!isOnline) {
                return <OfflinePlaceholder />;
              }
            }}
          </TypedSearchProductsQuery>
        )}
      </NetworkStatus>
      {showLocationAlert && (
        <NotificationModal
          title={intl.formatMessage({ defaultMessage: "GeoLocalization" })}
          text={intl.formatMessage({
            defaultMessage:
              "dRural wants to access your location in order to offer a better service and to show you the services closest to you.",
          })}
          buttonText="OK"
          onClick={handleClickLocation}
          hide={() => {
            handleClickLocation();
            setShowLocationAlert(false);
          }}
        />
      )}
    </>
  );
};
