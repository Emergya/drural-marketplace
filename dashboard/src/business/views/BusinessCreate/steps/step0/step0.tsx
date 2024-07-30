import "mapbox-gl/dist/mapbox-gl.css";

import { makeStyles } from "@drural/macaw-ui";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
import { lighten, TextField } from "@material-ui/core";
import {
  addressAutoCompletedAction,
  businessInfoAction,
  CreateCompanyStep
} from "@saleor/business/utils";
import {
  MAPBOX_DEFAULT_COORDS,
  MAPBOX_DEFAULT_ZOOM,
  MAPBOX_DEFAULT_ZOOM_OUT,
  MAPBOX_STYLES_URL,
  MAPBOX_TOKEN
} from "@saleor/config";
import { useHandlerWhenClickedOutside } from "@saleor/hooks/useHandleClickedOutside";
import useNotifier from "@saleor/hooks/useNotifier";
import { commonMessages } from "@saleor/intl";
import { ViewPort } from "@saleor/types";
import React from "react";
import { useIntl } from "react-intl";
import MapGL, { Marker } from "react-map-gl";

import ServiceMarker from "../../../../../../assets/images/dRuralImages/Marker.svg";

export interface CreateCompanyFormStep0 {
  companyName: string;
  cif: string;
  address: string;
  country: string;
  phone: string;
  email: string;
}

const useStyles = makeStyles(
  theme => ({
    heading: {
      textAlign: "center",
      marginTop: theme.spacing(2)
    },
    separator: {
      marginTop: theme.spacing(8),
      width: "100%"
    },
    gridWrapper: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      columnGap: "30px",
      rowGap: "48px",
      [theme.breakpoints.down("md")]: {
        gridTemplateColumns: "1fr",
        rowGap: "40px"
      }
    },
    map: {
      display: "flex",
      flexDirection: "column",
      margin: "0 auto",
      width: "max(100%,300px)",
      height: "100%",
      [theme.breakpoints.down("md")]: {
        height: "auto"
      },
      "&  > div:first-child": {
        [theme.breakpoints.down("md")]: {
          height: "264px !important"
        }
      }
    },
    mapItem: {
      gridRow: "1 / 4",
      gridColumn: "3",
      boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
      [theme.breakpoints.down("md")]: {
        gridRow: "7",
        gridColumn: "1"
      }
    },
    markerShow: {
      display: "block"
    },
    markerNoShow: {
      display: "none"
    },
    gridItem: {
      width: "100%",
      "& button": {
        width: "auto",
        "& svg": {
          marginRight: "10px"
        }
      }
    },
    addressItem: {
      position: "relative",
      gridRow: "3",
      gridColumn: "1 / 3",
      [theme.breakpoints.down("md")]: {
        gridRow: "5",
        gridColumn: "1"
      }
    },
    secondLineItem: {
      gridRow: "4",
      gridColumn: "1 / 3",
      [theme.breakpoints.down("md")]: {
        gridRow: "6",
        gridColumn: "1"
      }
    },
    addressOptionsList: {
      zIndex: 10,
      width: "100%",
      padding: "10px 0",
      position: "absolute",
      top: "60px",
      left: "0",
      backgroundColor: "white",
      "& ul": {
        padding: "0",
        listStyleType: "none",
        "& li": {
          cursor: "pointer",
          paddingLeft: "20px",
          "&:hover": {
            backgroundColor: lighten(theme.palette.primary.main, 0.7)
          }
        }
      }
    }
  }),
  { name: "step0" }
);

const Step0: React.FC<CreateCompanyStep> = ({
  dispatch,
  state,
  errors,
  handdleInput,
  setMapboxAddressSelected
}) => {
  const classes = useStyles();
  const intl = useIntl();

  // First position of map set to the center of Europe

  const [viewport, setViewport] = React.useState<ViewPort>({
    ...MAPBOX_DEFAULT_COORDS,
    zoom: MAPBOX_DEFAULT_ZOOM_OUT
  });

  const [showAddressOptions, setShowAddressOptions] = React.useState(false);
  const [addressOptions, setAddressOptions] = React.useState([]);
  const [showSecondLineAddress, setShowSecondLineAddress] = React.useState(
    false
  );
  const notify = useNotifier();
  const { setElementRef } = useHandlerWhenClickedOutside(() => {
    setShowAddressOptions(false);
  });

  const geocodingClient = React.useMemo(() => {
    try {
      return mbxGeocoding({
        accessToken: MAPBOX_TOKEN
      });
    } catch (error) {
      notify({
        status: "error",
        text: intl.formatMessage(commonMessages.mapBox)
      });
    }
  }, [MAPBOX_TOKEN]);

  const dispatchSelectedAddress = React.useCallback(feature => {
    const updatedAddress = {
      country: "",
      locality: "",
      postalCode: "",
      region: "",
      street: "",
      streetSecondLine: "",
      latitude: null,
      longitude: null
    };

    const streetNumber = feature.address;

    let address = feature.text;

    if (streetNumber) {
      address = address.concat(" ", streetNumber);
    }
    if (feature.properties.address) {
      address = feature.properties.address;
    }

    dispatch(
      addressAutoCompletedAction("addressAutoCompleted", feature.place_name)
    );

    updatedAddress.longitude = feature.center[0];
    updatedAddress.latitude = feature.center[1];
    updatedAddress.street = address;

    feature.context.map(context => {
      if (context.id.includes("postcode")) {
        updatedAddress.postalCode = context.text;
      }
      if (context.id.includes("place")) {
        updatedAddress.locality = context.text;
      }
      if (context.id.includes("region")) {
        updatedAddress.region = context.text;
      }
      if (context.id.includes("country")) {
        updatedAddress.country = context.short_code.toUpperCase();
      }
    });

    dispatch(
      businessInfoAction("coordinates", {
        longitude: updatedAddress.longitude,
        latitude: updatedAddress.latitude
      })
    );
    dispatch(businessInfoAction("address", updatedAddress.street));

    dispatch(businessInfoAction("postalCode", updatedAddress.postalCode));

    dispatch(businessInfoAction("city", updatedAddress.locality));

    dispatch(businessInfoAction("province", updatedAddress.region));

    dispatch(businessInfoAction("country", updatedAddress.country));

    setViewport({
      longitude: feature.center[0],
      latitude: feature.center[1],
      zoom: MAPBOX_DEFAULT_ZOOM
    });
  }, []);

  const getAddressOptions = React.useCallback(
    (address: string) => {
      if (address && geocodingClient) {
        geocodingClient
          .forwardGeocode({
            query: `${address} `,
            limit: 4
          })
          .send()
          .then(response => {
            if (response.body.features.length > 0) {
              setAddressOptions(response.body.features);
            }
          });
      }
    },
    [geocodingClient]
  );

  const marker = React.useMemo(
    () => (
      <Marker
        latitude={
          state.businessInfo.latitude
            ? state.businessInfo.latitude
            : viewport.latitude
        }
        longitude={
          state.businessInfo.longitude
            ? state.businessInfo.longitude
            : viewport.longitude
        }
      >
        <div
          className={
            state.businessInfo.longitude
              ? classes.markerShow
              : classes.markerNoShow
          }
        >
          <img src={ServiceMarker} alt="marker" />
        </div>
      </Marker>
    ),
    [state.businessInfo.latitude, state.businessInfo.longitude]
  );

  const handleViewportChange = React.useCallback((newViewport: ViewPort) => {
    setViewport(newViewport);
  }, []);

  return (
    <div className={classes.separator}>
      <form>
        <div className={classes.gridWrapper}>
          <div className={classes.gridItem}>
            <TextField
              error={errors.companyName ? true : false}
              variant="outlined"
              fullWidth
              autoComplete="none"
              label={intl.formatMessage({
                defaultMessage: "Company name"
              })}
              name="companyName"
              onChange={({ target }) => {
                dispatch(businessInfoAction(target.name, target.value));
              }}
              onBlur={handdleInput}
              type="text"
              value={state.businessInfo.companyName}
              helperText={
                errors.companyName
                  ? errors.companyName
                  : intl.formatMessage({
                      defaultMessage: "Company legal name"
                    })
              }
              required
            />
          </div>
          <div className={classes.gridItem}>
            <TextField
              error={errors.cif ? true : false}
              variant="outlined"
              fullWidth
              autoComplete="none"
              label={intl.formatMessage(commonMessages.cif)}
              name="cif"
              onBlur={handdleInput}
              onChange={({ target }) =>
                dispatch(businessInfoAction(target.name, target.value))
              }
              type="text"
              value={state.businessInfo.cif}
              helperText={
                errors.cif
                  ? errors.cif
                  : intl.formatMessage({
                      defaultMessage: "Company identification number"
                    })
              }
              required
            />
          </div>
          <div className={classes.mapItem}>
            <div className={classes.map}>
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
          </div>
          <div className={classes.gridItem}>
            {/* TODO: improve telephone format with country prefixes selector*/}
            <TextField
              error={errors.phone ? true : false}
              variant="outlined"
              fullWidth
              autoComplete="tel"
              label={intl.formatMessage(commonMessages.telephone)}
              name="phone"
              onBlur={handdleInput}
              onChange={({ target }) =>
                dispatch(businessInfoAction(target.name, target.value))
              }
              type="tel"
              /* inputProps={{ pattern: "[0-9]{3}-[0-9]{3}-[0-9]{3}" }} */
              value={state.businessInfo.phone}
              helperText={
                errors.phone
                /* ? errors.phone
                  : intl.formatMessage({
                      defaultMessage: "Inputformat: 000-000-000"
                    }) */
              }
              required
            />
          </div>
          <div className={classes.gridItem}>
            <TextField
              error={errors.email ? true : false}
              variant="outlined"
              fullWidth
              autoComplete="none"
              label={intl.formatMessage(commonMessages.email)}
              name="email"
              onBlur={handdleInput}
              onChange={({ target }) =>
                dispatch(businessInfoAction(target.name, target.value))
              }
              type="email"
              value={state.businessInfo.email}
              helperText={errors.email}
              required
            />
          </div>
          <div className={classes.addressItem} ref={setElementRef()}>
            <TextField
              error={errors.address ? true : false}
              variant="outlined"
              fullWidth
              autoComplete="none"
              label={intl.formatMessage(commonMessages.address)}
              name="address"
              onClick={({ target }) => {
                const castTarget = target as EventTarget &
                  (HTMLInputElement | HTMLTextAreaElement);
                setShowAddressOptions(true);
                getAddressOptions(castTarget.value);
              }}
              onFocus={() => setShowAddressOptions(true)}
              onBlur={event => {
                handdleInput(event);
              }}
              onChange={({ target }) => {
                getAddressOptions(target.value);
                setMapboxAddressSelected(false);
                dispatch(
                  addressAutoCompletedAction(
                    "addressAutoCompleted",
                    target.value
                  )
                );
              }}
              type="text"
              value={state.addressAutoCompleted}
              helperText={
                errors.address
                  ? errors.address
                  : intl.formatMessage({
                      defaultMessage:
                        "Street, number, zip code, city, etc (You must select one of the proposed options in order to continue)"
                    })
              }
              required
            />
            {showAddressOptions &&
              addressOptions.length > 0 &&
              state.addressAutoCompleted.length > 0 && (
                <div className={classes.addressOptionsList}>
                  <ul>
                    {addressOptions.map(feature => (
                      <li
                        key={feature.id}
                        onClick={() => {
                          dispatchSelectedAddress(feature);
                          setShowAddressOptions(false);
                          setShowSecondLineAddress(true);
                          setMapboxAddressSelected(true);
                        }}
                      >
                        {feature.place_name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>

          {(showSecondLineAddress || state.addressAutoCompleted.length > 0) && (
            <div className={classes.secondLineItem}>
              <TextField
                variant="outlined"
                fullWidth
                autoComplete="none"
                label={intl.formatMessage(commonMessages.addressSecondLine)}
                name="streetSecondLine"
                onChange={({ target }) => {
                  dispatch(businessInfoAction(target.name, target.value));
                }}
                type="text"
                value={state.businessInfo.streetSecondLine}
                helperText={intl.formatMessage({
                  defaultMessage: "Add letter, floor number, etc"
                })}
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Step0;
