import { makeStyles } from "@drural/macaw-ui";
import { MAPBOX_STYLES_URL, MAPBOX_TOKEN } from "@saleor/config";
import { ViewPort } from "@saleor/types";
import React from "react";
import MapGL, { Marker } from "react-map-gl";

import ServiceMarker from "../../../../assets/images/dRuralImages/Marker.svg";

interface BusinessMapUpdateProps {
  markerPoint: {
    longitude: number;
    latitude: number;
  };
  viewport: ViewPort;
  handleViewportChange: (newViewport: ViewPort) => void;
}

const useStyles = makeStyles(
  theme => ({
    mapWrapper: {
      display: "flex",
      flexDirection: "column",
      width: "380px",
      height: "264px",
      boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
      marginLeft: "40px",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        marginTop: "40px",
        marginLeft: "0px"
      }
    }
  }),
  { name: "BusinessMapUpdate" }
);

const BusinessMapUpdate: React.FC<BusinessMapUpdateProps> = ({
  markerPoint,
  viewport,
  handleViewportChange
}) => {
  const classes = useStyles();

  const marker = React.useMemo(
    () => (
      <Marker latitude={markerPoint.latitude} longitude={markerPoint.longitude}>
        <div>
          <img src={ServiceMarker} alt="marker" />
        </div>
      </Marker>
    ),
    [markerPoint.latitude, markerPoint.longitude]
  );

  return (
    <div className={classes.mapWrapper}>
      <MapGL
        {...viewport}
        onViewportChange={handleViewportChange}
        height="100%"
        width="100%"
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle={MAPBOX_STYLES_URL}
      >
        {marker}
      </MapGL>
    </div>
  );
};

export default BusinessMapUpdate;
