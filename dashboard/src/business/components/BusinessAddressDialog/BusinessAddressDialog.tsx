import { ConfirmButtonTransitionState, makeStyles } from "@drural/macaw-ui";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  lighten,
  TextField
} from "@material-ui/core";
import { BusinessDetails_company_address } from "@saleor/business/types/BusinessDetails";
import { CompanyUpdate_companyUpdate_errors } from "@saleor/business/types/CompanyUpdate";
import CloseIcon from "@saleor/components/CloseIcon";
import ConfirmButton from "@saleor/components/ConfirmButton";
import {
  MAPBOX_DEFAULT_COORDS,
  MAPBOX_DEFAULT_ZOOM,
  MAPBOX_DEFAULT_ZOOM_OUT,
  MAPBOX_TOKEN
} from "@saleor/config";
import { SubmitPromise } from "@saleor/hooks/useForm";
import useHandlerWhenClickedOutside from "@saleor/hooks/useHandleClickedOutside";
import useNotifier from "@saleor/hooks/useNotifier";
import { buttonMessages, commonMessages } from "@saleor/intl";
import { ViewPort } from "@saleor/types";
import React from "react";
import { useIntl } from "react-intl";
import { FormattedMessage } from "react-intl";

import BusinessMapUpdate from "../BusinessMapUpdate";
const useStyles = makeStyles(
  theme => ({
    overflow: {
      overflowY: "visible",
      display: "flex",
      justifyContent: "space-between",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column"
      }
    },
    paper: { width: "auto", maxWidth: "1038px" },
    title: {
      marginTop: "30px",
      "& h2": {
        fontSize: `${theme.typography.h2.fontSize}`,
        fontWeight: `${theme.typography.h2.fontWeight}`
      }
    },
    form: {
      "& form": {
        margin: "10px 30px",
        [theme.breakpoints.down("sm")]: {
          margin: "0px"
        }
      }
    },

    closeIcon: {
      position: "absolute",
      top: theme.spacing(3),
      right: theme.spacing(3),
      [theme.breakpoints.down("xs")]: {
        top: theme.spacing(2.5),
        right: theme.spacing(2.5),
        "& svg": {
          width: "16px",
          height: "16px"
        }
      }
    },
    buttons: {
      justifyContent: "flex-end",
      "& button": {
        width: "270px",
        [theme.breakpoints.down("xs")]: {
          marginBottom: "20px",
          marginLeft: "0px !important"
        }
      },
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column"
      }
    },

    secondLineItem: {
      [theme.breakpoints.down("md")]: {}
    },
    addressItem: {
      position: "relative",
      marginBottom: "50px"
    },
    inputsWrapper: {
      width: "510px",
      [theme.breakpoints.down("xs")]: {
        width: "95%",
        margin: "auto"
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
  { name: "BusinessAddressDialog" }
);

export interface BusinessAddressDialogProps {
  address: BusinessDetails_company_address;
  confirmButtonState: ConfirmButtonTransitionState;
  disabled: boolean;
  errors: CompanyUpdate_companyUpdate_errors[];
  open: boolean;
  onClose: () => void;
  onSubmit: (data: BusinessAddressDialogFormData) => SubmitPromise;
}
export interface BusinessAddressDialogFormData {
  errors: CompanyUpdate_companyUpdate_errors[];
  country: string;
  locality: string;
  postalCode: string;
  region: string;
  street: string;
  streetSecondLine: string;
  longitude: number | null;
  latitude: number | null;
}

const initialValuesAddress: BusinessAddressDialogFormData = {
  country: "",
  locality: "",
  postalCode: "",
  region: "",
  street: "",
  streetSecondLine: "",
  errors: [],
  latitude: null,
  longitude: null
};

const BusinessAddressDialog: React.FC<BusinessAddressDialogProps> = ({
  address,
  confirmButtonState,
  open,
  onClose,
  onSubmit
}) => {
  const classes = useStyles();
  const intl = useIntl();
  const [addressSelected, setAddressSelected] = React.useState(false);

  const [newAddress, setNewAddress] = React.useState<
    BusinessAddressDialogFormData
  >(initialValuesAddress);
  const [addressOptions, setAddressOptions] = React.useState([]);
  const [showAddressOptions, setShowAddressOptions] = React.useState(false);
  const [showSecondLineAddress, setShowSecondLineAddress] = React.useState(
    false
  );
  const notify = useNotifier();
  const [addressAutoCompleted, setAddressAutoCompleted] = React.useState("");

  const [viewport, setViewport] = React.useState<ViewPort>({
    ...MAPBOX_DEFAULT_COORDS,
    zoom: MAPBOX_DEFAULT_ZOOM_OUT
  });

  const { setElementRef } = useHandlerWhenClickedOutside(() => {
    setShowAddressOptions(false);
  });

  const handleViewportChange = React.useCallback((newViewport: ViewPort) => {
    setViewport(newViewport);
  }, []);

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

  const dispatchSelectedAddress = React.useCallback(
    feature => {
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

      setAddressAutoCompleted(feature.place_name);

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

      setNewAddress({
        ...newAddress,
        street: updatedAddress.street,
        postalCode: updatedAddress.postalCode,
        locality: updatedAddress.locality,
        region: updatedAddress.region,
        country: updatedAddress.country,
        longitude: updatedAddress.longitude,
        latitude: updatedAddress.latitude
      });

      setViewport({
        longitude: feature.center[0],
        latitude: feature.center[1],
        zoom: MAPBOX_DEFAULT_ZOOM
      });
    },
    [newAddress]
  );

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

  React.useEffect(() => {
    if (address?.latitude && address?.longitude) {
      setViewport({
        ...viewport,
        latitude: address.latitude,
        longitude: address.longitude,
        zoom: MAPBOX_DEFAULT_ZOOM
      });
      if (address) {
        setAddressAutoCompleted(
          address.street.concat(
            ", ",
            address.postalCode,
            " ",
            address.locality,
            ", ",
            address.region,
            ", ",
            address.country
          )
        );
        setNewAddress({
          ...newAddress,
          street: address.street,
          streetSecondLine: address.streetSecondLine,
          postalCode: address.postalCode,
          locality: address.locality,
          region: address.region,
          country: address.country,
          longitude: address.longitude,
          latitude: address.latitude
        });
      }
    }
  }, [address]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      className={classes.form}
      PaperProps={{ classes: { root: classes.paper } }}
    >
      <CloseIcon className={classes.closeIcon} onClose={onClose} />
      <form
        onSubmit={event => {
          event.preventDefault();
          onSubmit(newAddress);
        }}
      >
        <DialogTitle className={classes.title}>
          <FormattedMessage defaultMessage="Edit Address" />
        </DialogTitle>
        <DialogContent className={classes.overflow}>
          <div className={classes.inputsWrapper}>
            <div className={classes.addressItem} ref={setElementRef()}>
              <TextField
                variant="outlined"
                fullWidth
                autoComplete="off"
                label={intl.formatMessage(commonMessages.address)}
                name="address"
                onClick={({ target }) => {
                  const castTarget = target as EventTarget &
                    (HTMLInputElement | HTMLTextAreaElement);
                  setShowAddressOptions(true);
                  getAddressOptions(castTarget.value);
                }}
                onFocus={() => setShowAddressOptions(true)}
                onChange={({ target }) => {
                  setAddressSelected(false);
                  getAddressOptions(target.value);
                  setAddressAutoCompleted(target.value);
                }}
                type="text"
                value={addressAutoCompleted}
                helperText={intl.formatMessage({
                  defaultMessage:
                    "Street, number, zip code, city, etc (You must select one of the proposed options in order to continue)"
                })}
                required
              />
              {showAddressOptions &&
                addressOptions.length > 0 &&
                addressAutoCompleted.length > 0 && (
                  <div className={classes.addressOptionsList}>
                    <ul>
                      {addressOptions.map(feature => (
                        <li
                          key={feature.id}
                          onClick={() => {
                            dispatchSelectedAddress(feature);
                            setShowAddressOptions(false);
                            setAddressSelected(true);
                            setShowSecondLineAddress(true);
                          }}
                        >
                          {feature.place_name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>

            {(showSecondLineAddress || addressAutoCompleted.length > 0) && (
              <div className={classes.secondLineItem}>
                <TextField
                  variant="outlined"
                  fullWidth
                  autoComplete="none"
                  label={intl.formatMessage(commonMessages.addressSecondLine)}
                  name="addressSecondLine"
                  onChange={({ target }) => {
                    setAddressSelected(true);
                    setNewAddress({
                      ...newAddress,
                      streetSecondLine: target.value
                    });
                  }}
                  type="text"
                  value={newAddress.streetSecondLine}
                  helperText={intl.formatMessage({
                    defaultMessage: "Add letter, floor number, etc"
                  })}
                />
              </div>
            )}
          </div>
          <BusinessMapUpdate
            markerPoint={{
              latitude:
                newAddress.latitude ||
                address?.latitude ||
                MAPBOX_DEFAULT_COORDS.latitude,
              longitude:
                newAddress.longitude ||
                address?.longitude ||
                MAPBOX_DEFAULT_COORDS.longitude
            }}
            viewport={viewport}
            handleViewportChange={handleViewportChange}
          />
        </DialogContent>
        <DialogActions className={classes.buttons}>
          <ConfirmButton
            disabled={!addressSelected}
            transitionState={confirmButtonState}
            color="primary"
            variant="contained"
            type="submit"
          >
            {intl.formatMessage(buttonMessages.addAddress)}
          </ConfirmButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};
BusinessAddressDialog.displayName = "BusinessAddressDialog";
export default BusinessAddressDialog;
