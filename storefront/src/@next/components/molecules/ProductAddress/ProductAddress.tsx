import { UilLocationPoint } from "@iconscout/react-unicons";
import React, { FC, useCallback, useEffect } from "react";
import MapGL, { Marker } from "react-map-gl";

import {
  MAPBOX_DEFAULT_COORDS,
  MAPBOX_DEFAULT_ZOOM,
  MAPBOX_STYLES_URL,
  MAPBOX_TOKEN,
} from "@temp/constants";
import { ViewPort } from "@utils/mapbox";

import ServiceMarker from "../../../../images/dRuralImages/Marker.svg";
import * as S from "./styles";
import { IProps } from "./types";

import "mapbox-gl/dist/mapbox-gl.css";

export const ProductAddress: FC<IProps> = ({ address }) => {
  const [viewport, setViewport] = React.useState<ViewPort>({
    latitude: MAPBOX_DEFAULT_COORDS.latitude,
    longitude: MAPBOX_DEFAULT_COORDS.longitude,
    zoom: MAPBOX_DEFAULT_ZOOM,
  });

  useEffect(() => {
    if (address?.latitude && address?.longitude) {
      setViewport({
        ...viewport,
        latitude: address.latitude,
        longitude: address.longitude,
      });
    }
  }, [address]);

  const handleViewportChange = useCallback((viewport: ViewPort) => {
    setViewport(viewport);
  }, []);

  return (
    <S.Wrapper>
      <S.HeaderWrapper>
        <UilLocationPoint />
        <S.Samlltaxt>{`${address.street}, ${address.postalCode}, ${address.region}, ${address.country}`}</S.Samlltaxt>
      </S.HeaderWrapper>
      <S.MapWrapper>
        <S.Map>
          {address.longitude && address.latitude && (
            <MapGL
              {...viewport}
              mapboxApiAccessToken={MAPBOX_TOKEN}
              mapStyle={MAPBOX_STYLES_URL}
              height="192px"
              width="100%"
              onViewStateChange={handleViewportChange}
            >
              <Marker latitude={address.latitude} longitude={address.longitude}>
                <img src={ServiceMarker} alt="marker" />
              </Marker>
            </MapGL>
          )}
        </S.Map>
      </S.MapWrapper>
    </S.Wrapper>
  );
};
