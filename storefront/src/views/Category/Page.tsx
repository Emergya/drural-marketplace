import { BaseCategory } from "@drural/sdk/lib/fragments/gqlTypes/BaseCategory";
import { CategoryDetails } from "@drural/sdk/lib/fragments/gqlTypes/CategoryDetails";
import { ProductList_products_edges_node } from "@drural/sdk/lib/queries/gqlTypes/ProductList";
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
import { useHandlerWhenClickedOutside } from "@hooks";
import { MAPBOX_STYLES_URL, MAPBOX_TOKEN } from "@temp/constants";
import { commonMessages } from "@temp/intl";
import { SORT_OPTIONS } from "@utils/collections";
import { MapBoxProps } from "@utils/mapbox";
import { FeaturedProducts } from "@utils/ssr";

import {
  Breadcrumbs,
  extractBreadcrumbs,
  ProductsFeatured,
} from "../../components";
import ServiceMarker from "../../images/dRuralImages/Marker.svg";
import ServiceMarkerActive from "../../images/dRuralImages/Marker-active.svg";
import * as S from "./styles";
import { Filters, getActiveFilterAttributes } from "./utils";

import "mapbox-gl/dist/mapbox-gl.css";
import "./scss/index.scss";

export interface CategoryData {
  details: CategoryDetails;
  ancestors: BaseCategory[];
  attributes: Attribute[];
  featuredProducts: FeaturedProducts;
}

interface PageProps extends MapBoxProps {
  category: CategoryData;
  activeFilters: number;
  activeSortOption: string;
  displayLoader: boolean;
  filters: Filters;
  hasNextPage: boolean;
  products: ProductList_products_edges_node[];
  numberOfProducts: number;
  clearFilters: () => void;
  onLoadMore: () => void;
  onAttributeFiltersChange: (attributeSlug: string, value: string) => void;
  onOrder: (order: { value?: string; label: string }) => void;
  // new ones
  distance: number;
  priceLte: number;
  priceGte: number;
  onPriceFilterChange: (distance: number[]) => void;
  onDistanceFilterChange: (distance: number) => void;
  applyFilters: (isLocationEnabled: boolean) => void;
  resetFilters: () => void;
}

export const Page: React.FC<PageProps> = ({
  activeFilters,
  activeSortOption,
  category: { attributes, details, ancestors, featuredProducts },
  numberOfProducts,
  products,
  displayLoader,
  hasNextPage,
  clearFilters,
  onLoadMore,
  filters,
  onOrder,
  onAttributeFiltersChange,
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
  const hasProducts = products.length > 0;
  const [showFilters, setShowFilters] = React.useState(false);
  const [showOrderFilters, setShowOrderFilters] = React.useState(false);
  const intl = useIntl();

  const [showMap, setShowMap] = React.useState(false);
  const [selectedService, setSelectedService] = React.useState<
    ProductList_products_edges_node
  >(null);

  const { setElementRef } = useHandlerWhenClickedOutside(() => {
    setSelectedService(null);
  });

  return (
    <div className="category">
      <div className="container">
        <Breadcrumbs breadcrumbs={extractBreadcrumbs(details, ancestors)} />
        <FilterSidebar
          show={showFilters}
          hide={() => setShowFilters(false)}
          onAttributeFiltersChange={onAttributeFiltersChange}
          attributes={attributes}
          filters={filters}
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
        <div className="title-container">
          <h2 style={{ marginBottom: "30px" }}>
            <FormattedMessage
              defaultMessage="{name}"
              values={{
                name: details.name,
              }}
            />
          </h2>
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

        <OrderSideBar
          show={showOrderFilters}
          onChange={onOrder}
          sortOptions={SORT_OPTIONS}
          hide={() => setShowOrderFilters(false)}
        />
        <ProductListHeader
          activeSortOption={activeSortOption}
          openFiltersMenu={() => setShowFilters(true)}
          numberOfProducts={numberOfProducts}
          activeFilters={activeFilters}
          activeFiltersAttributes={getActiveFilterAttributes(
            filters?.attributes,
            attributes
          )}
          clearFilters={clearFilters}
          sortOptions={SORT_OPTIONS}
          onChange={onOrder}
          onCloseFilterAttribute={onAttributeFiltersChange}
          openOrderFilters={() => setShowOrderFilters(true)}
        />

        {!showMap && (
          <ProductList
            products={products}
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
            {products.length > 0 &&
              products.map(product => {
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
      {!displayLoader && !hasProducts && (
        <ProductsFeatured
          products={featuredProducts.products}
          title={intl.formatMessage(commonMessages.youMightLike)}
        />
      )}
      {!showMap && <PageBottomSpacing />}
    </div>
  );
};
