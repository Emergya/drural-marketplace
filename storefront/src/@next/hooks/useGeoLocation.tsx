import { useState } from "react";

import { MAPBOX_DEFAULT_COORDS } from "@temp/constants";

export interface GeoLocation {
  loaded: boolean;
  allowed: boolean;
  coordinates: { lat: number; long: number };
}

export const useGeoLocation = () => {
  const [location, setLocation] = useState<GeoLocation>({
    loaded: false,
    allowed: false,
    coordinates: {
      lat: MAPBOX_DEFAULT_COORDS.latitude,
      long: MAPBOX_DEFAULT_COORDS.longitude,
    },
  });

  const onSuccess = (position: any) => {
    setLocation({
      ...location,
      loaded: true,
      allowed: true,
      coordinates: {
        lat: position.coords.latitude,
        long: position.coords.longitude,
      },
    });
  };

  const onError = () => {
    setLocation({ ...location, loaded: true, allowed: false });
  };

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  };

  return { location, getLocation, setLocation };
};
