export interface MapBoxProps {
  searchLocation: string;
  viewport: ViewPort;
  // MapBox in FilterSidebar
  handleViewportChange: (newViewport: ViewPort) => void;
  handleGeocoderViewportChange: (newViewport: ViewPort) => void;
  // MapBox in Page
  handleGeocoderViewportChangeBigMap: (newViewport: ViewPort) => void;
  viewportBigMap: ViewPort;
}

export interface ViewPort {
  latitude: number;
  longitude: number;
  zoom: number;
  transitionDuration?: number;
}

export const centerEuropeCoordinates = {
  latitude: 49.759036,
  longitude: 14.13034,
};
