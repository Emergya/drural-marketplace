import { UilListUl, UilMapMarker } from "@iconscout/react-unicons";
import classNames from "classnames";
import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import MapGL, { Marker, Popup } from "react-map-gl";

import { PageBottomSpacing } from "@components/atoms";
import { ProductListHeader, ProductTile } from "@components/molecules";
import { FilterSidebar, ProductList } from "@components/organisms";
import { OrderSideBar } from "@components/organisms/OrderSideBar";
import { Attribute } from "@graphql/gqlTypes/Attribute";
import { FeaturedProduct } from "@graphql/gqlTypes/FeaturedProduct";
import { useHandlerWhenClickedOutside } from "@hooks";
import { MAPBOX_STYLES_URL, MAPBOX_TOKEN } from "@temp/constants";
import { commonMessages } from "@temp/intl";
import { IFilters } from "@types";
import { SortOptions } from "@utils/collections";
import { MapBoxProps } from "@utils/mapbox";

import { ProductsFeatured } from "../../components";
import { maybe } from "../../core/utils";
import ServiceMarker from "../../images/dRuralImages/Marker.svg";
import ServiceMarkerActive from "../../images/dRuralImages/Marker-active.svg";
import {
  SearchProducts_products,
  SearchProducts_products_edges_node,
  SearchProducts_products_edges_node_category,
} from "./gqlTypes/SearchProducts";
import * as S from "./styles";

import "mapbox-gl/dist/mapbox-gl.css";
import "./scss/index.scss";

interface PageProps extends MapBoxProps {
  activeFilters: number;
  attributes: Attribute[];
  activeSortOption: string;
  displayLoader: boolean;
  filters: IFilters;
  hasNextPage: boolean;
  featuredProducts: FeaturedProduct[];
  search?: string;
  setSearch?: (
    newValue: string,
    updateType?: "replace" | "replaceIn" | "push" | "pushIn"
  ) => void;
  products: SearchProducts_products;
  sortOptions: SortOptions;
  clearFilters: () => void;
  onLoadMore: () => void;
  onAttributeFiltersChange: (attributeSlug: string, value: string) => void;
  onOrder: (order: { value?: string; label: string }) => void;
  // new ones
  categories: SearchProducts_products_edges_node_category[];
  categoriesFilter: string[];
  onCategoriesFilterChange: (categoryId: string, selected: boolean) => void;
  distance: number;
  priceLte: number;
  priceGte: number;
  onPriceFilterChange: (distance: number[]) => void;
  onDistanceFilterChange: (distance: number) => void;
  applyFilters: (isLocationEnabled: boolean) => void;
  resetFilters: () => void;
}

const Page: React.FC<PageProps> = ({
  activeFilters,
  activeSortOption,
  attributes,
  search,
  setSearch,
  displayLoader,
  hasNextPage,
  clearFilters,
  onLoadMore,
  products,
  filters,
  onOrder,
  sortOptions,
  onAttributeFiltersChange,
  featuredProducts,
  categories,
  categoriesFilter,
  onCategoriesFilterChange,
  distance,
  onDistanceFilterChange,
  applyFilters,
  resetFilters,
  priceLte,
  priceGte,
  onPriceFilterChange,
  handleViewportChange,
  handleGeocoderViewportChange,
  searchLocation,
  viewport,
  handleGeocoderViewportChangeBigMap,
  viewportBigMap,
}) => {
  const canDisplayProducts = maybe(
    () => !!products.edges && products.totalCount !== undefined
  );
  const hasProducts = canDisplayProducts && !!products.totalCount;
  const [showFilters, setShowFilters] = React.useState(false);
  const [showOrderFilters, setShowOrderFilters] = React.useState(false);
  const [showMap, setShowMap] = React.useState(false);
  const [selectedService, setSelectedService] = React.useState<
    SearchProducts_products_edges_node
  >(null);
  const intl = useIntl();

  const { setElementRef } = useHandlerWhenClickedOutside(() => {
    setSelectedService(null);
  });

  const getAttribute = (attributeSlug: string, valueSlug: string) => {
    return {
      attributeSlug,
      valueName: attributes
        .find(({ slug }) => attributeSlug === slug)
        .choices.edges.map(({ node }) => node)
        .find(({ slug }) => valueSlug === slug).name,
      valueSlug,
    };
  };

  const activeFiltersAttributes =
    filters &&
    filters.attributes &&
    Object.keys(filters.attributes).reduce(
      (acc, key) =>
        acc.concat(
          filters.attributes[key].map(valueSlug => getAttribute(key, valueSlug))
        ),
      []
    );

  return (
    <div className="category">
      <div className="search-page">
        <div className="search-container search-page__dRuralHeader ">
          <div className="title-container">
            <h2>
              <FormattedMessage defaultMessage="Search results" />
            </h2>
            {search && (
              <h3>
                <FormattedMessage
                  defaultMessage="Search term: {search}"
                  values={{
                    search: search || "",
                  }}
                />
              </h3>
            )}
            <p>
              <FormattedMessage
                defaultMessage="{totalCount} services found"
                values={{ totalCount: products ? products.totalCount : 0 }}
              />
            </p>
          </div>
          <S.MapSwitchContainer>
            <div
              className={classNames("map-switch", {
                "map-switch-active": !showMap,
              })}
              onClick={() => setShowMap(false)}
            >
              <UilListUl size="20" />
            </div>
            <div
              className={classNames("map-switch", {
                "map-switch-active": showMap,
              })}
              onClick={() => setShowMap(true)}
            >
              <UilMapMarker size="20" />
            </div>
          </S.MapSwitchContainer>
        </div>
      </div>
      <div className="search-container">
        <FilterSidebar
          show={showFilters}
          hide={() => setShowFilters(false)}
          onAttributeFiltersChange={onAttributeFiltersChange}
          attributes={attributes}
          filters={filters}
          categories={categories}
          categoriesFilter={categoriesFilter}
          onCategoriesFilterChange={onCategoriesFilterChange}
          applydRuralFilters={applyFilters}
          resetdRuralFilters={resetFilters}
          onDistanceFilterChange={onDistanceFilterChange}
          distance={distance}
          priceLte={priceLte}
          priceGte={priceGte}
          onPriceFilterChange={onPriceFilterChange}
          handleViewportChange={handleViewportChange}
          handleGeocoderViewportChange={handleGeocoderViewportChange}
          searchLocation={searchLocation}
          viewport={viewport}
        />
        <OrderSideBar
          show={showOrderFilters}
          onChange={onOrder}
          sortOptions={sortOptions}
          hide={() => setShowOrderFilters(false)}
        />
        <ProductListHeader
          activeSortOption={activeSortOption}
          openFiltersMenu={() => setShowFilters(true)}
          numberOfProducts={products ? products.totalCount : 0}
          activeFilters={activeFilters}
          activeFiltersAttributes={activeFiltersAttributes}
          clearFilters={clearFilters}
          sortOptions={sortOptions}
          onChange={onOrder}
          onCloseFilterAttribute={onAttributeFiltersChange}
          openOrderFilters={() => setShowOrderFilters(true)}
        />
        {canDisplayProducts && !showMap && (
          <ProductList
            products={products.edges.map(edge => edge.node)}
            canLoadMore={hasNextPage}
            loading={displayLoader}
            onLoadMore={onLoadMore}
          />
        )}
      </div>
      <div className="service-map">
        {showMap && (
          <MapGL
            {...viewportBigMap}
            className="map"
            onViewportChange={handleGeocoderViewportChangeBigMap}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            mapStyle={MAPBOX_STYLES_URL}
          >
            {canDisplayProducts &&
              products.edges
                .map(edge => edge.node)
                .map(product => {
                  if (product.address?.latitude && product.address?.longitude) {
                    return (
                      <Marker
                        key={product.id}
                        latitude={product.address.latitude}
                        longitude={product.address.longitude}
                      >
                        {selectedService?.id === product.id ? (
                          <div ref={setElementRef()}>
                            <img src={ServiceMarkerActive} alt="marker" />
                          </div>
                        ) : (
                          <img
                            onClick={() => {
                              setSelectedService(product);
                            }}
                            src={ServiceMarker}
                            alt="marker"
                          />
                        )}
                      </Marker>
                    );
                  }
                })}
            {selectedService && (
              <Popup
                latitude={selectedService.address.latitude}
                longitude={selectedService.address.longitude}
                onClose={() => {
                  setSelectedService(null);
                }}
              >
                <div ref={setElementRef()}>
                  <ProductTile product={selectedService} />
                </div>
              </Popup>
            )}
          </MapGL>
        )}
      </div>

      {!hasProducts && (
        <ProductsFeatured
          products={featuredProducts}
          title={intl.formatMessage(commonMessages.youMightLike)}
        />
      )}

      {!showMap && <PageBottomSpacing />}
    </div>
  );
};

export default Page;
