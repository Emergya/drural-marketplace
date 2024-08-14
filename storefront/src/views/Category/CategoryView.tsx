import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { useAlert } from "react-alert";
import { useIntl } from "react-intl";
import {
  NumberParam,
  StringParam,
  useQueryParam,
  useQueryParams,
} from "use-query-params";

import { Loader, OfflinePlaceholder } from "@components/atoms";
import { NotificationModal } from "@components/organisms/NotificationModal";
import { useGeoLocation } from "@hooks/useGeoLocation";
import { MAPBOX_TOKEN, priceFilterMaxValue } from "@temp/constants";
import { commonMessages } from "@temp/intl";
import { IFilters } from "@types";
import { FilterQuerySet } from "@utils/collections";
import { ViewPort } from "@utils/mapbox";

import { MetaWrapper, NotFound } from "../../components";
import NetworkStatus from "../../components/NetworkStatus";
import { MAX_DISTANCE, MAX_PRICE, PRODUCTS_PER_PAGE } from "../../core/config";
import { getZoomFromDistance } from "../Search/utils";
import { Page } from "./Page";
import { useProductsQuery } from "./queries";
import { filtersChangeHandler, getInitialData, InitialData } from "./utils";

export const CategoryView: NextPage = () => {
  const intl = useIntl();
  const alert = useAlert();
  const {
    query: { slug },
  } = useRouter();

  const [category, setCategory] = React.useState<InitialData>(null);
  const [loadingCategory, setLoadingCategory] = React.useState(true);

  React.useEffect(() => {
    getInitialData(slug as string)
      .then(data => {
        setCategory(data);
      })
      .finally(() => setLoadingCategory(false));
  }, [slug]);

  const { location, getLocation, setLocation } = useGeoLocation();
  const [showLocationAlert, setShowLocationAlert] = React.useState(false);

  const [queryFilter, setQueryFilter] = useQueryParams({
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

  const [filterState, setFilterState] = React.useState({
    categories: [],
    distance: queryFilter.distance,
    priceGte: queryFilter.priceGte,
    priceLte: queryFilter.priceLte,
    longitude: location.coordinates.long,
    latitude: location.coordinates.lat,
  });

  const [sort, setSort] = useQueryParam("sortBy", StringParam);
  const [attributeFilters, setAttributeFilters] = useQueryParam(
    "filters",
    FilterQuerySet
  );
  const filters: IFilters = {
    attributes: attributeFilters,
    pageSize: PRODUCTS_PER_PAGE,
    priceGte: queryFilter.priceGte,
    priceLte: queryFilter.priceLte,
    sortBy: sort || null,
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

  const { data, loadMore, loading } = useProductsQuery(filters, {
    categoryId: category?.id,
  });
  const [products, pageInfo, numberOfProducts] = useMemo(
    () => [
      data?.products?.edges.map(e => e.node) || [],
      data?.products?.pageInfo,
      data?.products?.totalCount || 0,
    ],
    [data]
  );

  const applyFilters = (isLocationEnabled: boolean) => {
    setQueryFilter({
      priceGte: filterState.priceGte,
      priceLte:
        filterState.priceLte !== priceFilterMaxValue
          ? filterState.priceLte
          : null,
      distance: isLocationEnabled ? filterState.distance : null,
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
      categories: [],
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

  const handleClearFilters = () => setAttributeFilters({});

  const handleFiltersChange = filtersChangeHandler(
    filters,
    attributeFilters,
    setAttributeFilters
  );

  const handleOrderChange = (value: { value?: string; label: string }) =>
    setSort(value.value);

  const handleLoadMore = () =>
    loadMore(
      (prev, next) => ({
        products: {
          ...prev.products,
          edges: [...prev.products.edges, ...next.products.edges],
          pageInfo: next.products.pageInfo,
        },
      }),
      pageInfo.endCursor
    );

  const handleClickLocation = () => {
    getLocation();
    setShowLocationAlert(false);
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
        {isOnline => {
          if (!isOnline) {
            return <OfflinePlaceholder />;
          }

          if (loadingCategory) {
            return <Loader fullScreen />;
          }

          if (!category) {
            return <NotFound />;
          }

          return (
            <MetaWrapper
              meta={{
                description: category.details.seoDescription,
                title: category.details.seoTitle,
                type: "product.category",
              }}
            >
              <Page
                clearFilters={handleClearFilters}
                category={category}
                products={products}
                displayLoader={loading}
                hasNextPage={!!pageInfo?.hasNextPage}
                numberOfProducts={numberOfProducts}
                activeSortOption={filters.sortBy}
                filters={filters}
                onAttributeFiltersChange={handleFiltersChange}
                onLoadMore={handleLoadMore}
                activeFilters={Object.keys(filters?.attributes || {}).length}
                onOrder={handleOrderChange}
                applyFilters={applyFilters}
                resetFilters={resetFilters}
                distance={
                  filterState.distance === undefined
                    ? MAX_DISTANCE
                    : filterState.distance
                }
                onDistanceFilterChange={onDistanceFilterChange}
                priceLte={
                  filterState.priceLte === undefined ? 0 : filterState.priceLte
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
                handleGeocoderViewportChangeBigMap={handleViewportChangeBigMap}
              />
            </MetaWrapper>
          );
        }}
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
