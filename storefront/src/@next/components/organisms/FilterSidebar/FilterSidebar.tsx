import React from "react";
import { FormattedMessage } from "react-intl";
import MapGL from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

import {
  Button,
  RangeInput,
  SliderInput,
  SwitchInput,
} from "@components/atoms";
import { CloseIcon } from "@components/atoms/CloseIcon";
import { AttributeValuesChecklist } from "@components/molecules";
import { CategoriesChecklist } from "@components/molecules/CategoriesChecklist";
import { useHandlerWhenClickedOutside } from "@hooks";
import {
  locationFilterMaxValue,
  MAPBOX_STYLES_URL,
  MAPBOX_TOKEN,
  priceFilterMaxValue,
} from "@temp/constants";
import { commonMessages } from "@temp/intl";

import { IFilterAttribute } from "../../../types";
import { Overlay } from "..";
import * as S from "./styles";
import { IProps } from "./types";
import { checkIfAttributeIsChecked, MARKER_OPTIONS } from "./utils";

import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

export const FilterSidebar: React.FC<IProps> = ({
  hide,
  filters,
  show,
  attributes,
  target,
  onAttributeFiltersChange,
  categories,
  categoriesFilter,
  onCategoriesFilterChange,
  applydRuralFilters,
  resetdRuralFilters,
  distance,
  onDistanceFilterChange,
  priceLte,
  priceGte,
  onPriceFilterChange,
  handleViewportChange,
  handleGeocoderViewportChange,
  searchLocation,
  viewport,
}: IProps) => {
  const { setElementRef } = useHandlerWhenClickedOutside(() => {
    if (resetdRuralFilters) {
      resetdRuralFilters();
    }
    hide();
  });
  const mapRef = React.useRef(null);
  const geocoderContainerRef = React.useRef(null);

  const [isLocationEnabled, setIsLocationEnabled] = React.useState(false);

  return (
    <Overlay
      duration={0}
      position="left"
      show={show}
      hide={hide}
      target={target}
    >
      <S.Wrapper ref={setElementRef()} data-test="filterSidebar">
        <S.FiltersContainer>
          <S.Header>
            <span>
              <FormattedMessage {...commonMessages.filterHeader} />
            </span>
            <S.CloseIconWrapper
              onClick={() => {
                hide();
                if (resetdRuralFilters) {
                  resetdRuralFilters();
                }
              }}
            >
              <CloseIcon size={18} backGroundColor />
            </S.CloseIconWrapper>
          </S.Header>
          {categories && (
            <S.CategoriesContainer>
              <CategoriesChecklist
                categories={categories}
                categoriesFilter={categoriesFilter!}
                onCategoriesFilterChange={onCategoriesFilterChange!}
              />
            </S.CategoriesContainer>
          )}
          {typeof distance !== "undefined" && (
            <>
              <S.DistanceWrapper>
                <S.TitleWrapper>
                  <S.Title>
                    <FormattedMessage {...commonMessages.location} />
                  </S.Title>
                  <SwitchInput
                    checked={isLocationEnabled}
                    onChange={value => setIsLocationEnabled(value)}
                  />
                </S.TitleWrapper>
                {isLocationEnabled && (
                  <>
                    <S.CurrentLocation> {searchLocation}</S.CurrentLocation>
                    <S.SubtitleSmall>
                      <FormattedMessage defaultMessage="Enter my location manually" />
                    </S.SubtitleSmall>
                    <S.MapContainer>
                      <S.SearchContainer ref={geocoderContainerRef} />
                      <MapGL
                        ref={mapRef}
                        {...viewport}
                        width="100%"
                        height="200px"
                        onViewportChange={handleViewportChange}
                        mapboxApiAccessToken={MAPBOX_TOKEN}
                        mapStyle={MAPBOX_STYLES_URL}
                      >
                        <Geocoder
                          mapRef={mapRef}
                          containerRef={geocoderContainerRef}
                          onViewportChange={handleGeocoderViewportChange}
                          mapboxApiAccessToken={MAPBOX_TOKEN}
                          placeholder="Enter address..."
                          position="top-left"
                          marker={MARKER_OPTIONS}
                        />
                      </MapGL>
                    </S.MapContainer>
                    <S.SubtitleSmall>
                      <FormattedMessage defaultMessage="Distance from my location:" />
                    </S.SubtitleSmall>
                    <SliderInput
                      value={distance}
                      min={0}
                      max={locationFilterMaxValue}
                      step={10}
                      units="Km"
                      onChange={onDistanceFilterChange}
                      zIndex={20}
                    />
                  </>
                )}
              </S.DistanceWrapper>
              <S.Separator />
            </>
          )}
          {typeof priceLte !== "undefined" && (
            <>
              <S.DistanceWrapper>
                <S.Title>
                  <FormattedMessage {...commonMessages.priceRange} />
                </S.Title>
                <RangeInput
                  value={[priceGte!, priceLte]}
                  min={0}
                  max={priceFilterMaxValue}
                  step={10}
                  units="€"
                  unlimited
                  onChange={onPriceFilterChange}
                  zIndex={20}
                />
              </S.DistanceWrapper>
            </>
          )}
          {attributes.map(({ id, slug, name, choices }) => {
            const values = (choices?.edges.map(({ node }) => node) ||
              []) as IFilterAttribute[];

            return (
              <AttributeValuesChecklist
                key={id}
                title={name}
                name={slug!}
                values={values.map(value => ({
                  ...value,
                  selected: checkIfAttributeIsChecked(filters, value, slug!),
                }))}
                valuesShowLimit
                onValueClick={value =>
                  onAttributeFiltersChange(slug!, value.slug)
                }
              />
            );
          })}
        </S.FiltersContainer>

        <S.ButtonContainer>
          <Button
            testingContext="FilterSideBar"
            fullWidth
            onClick={() => {
              hide();
              if (applydRuralFilters) {
                applydRuralFilters(isLocationEnabled);
              }
            }}
          >
            <FormattedMessage defaultMessage="Apply filters" />
          </Button>
        </S.ButtonContainer>
      </S.Wrapper>
    </Overlay>
  );
};
