import { makeStyles } from "@drural/macaw-ui";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import { useCompanyCreateMutation } from "@saleor/business/mutations";
import {
  CompanyCreate,
  CompanyCreateVariables
} from "@saleor/business/types/CompanyCreate";
import {
  Action,
  businessReducer,
  BusinessState,
  InputErrors
} from "@saleor/business/utils";
import { BusinessContext } from "@saleor/components/BusinessProvider";
import useNotifier from "@saleor/hooks/useNotifier";
import useUser from "@saleor/hooks/useUser";
import React from "react";
import { FormattedMessage } from "react-intl";

import Step0 from "./steps/step0";
import Step1 from "./steps/step1";
/* import Step2 from "./steps/step2";
import Step3 from "./steps/step3"; */
import Step4 from "./steps/step4";

function getSteps() {
  return [
    <FormattedMessage defaultMessage="Company data" />,
    <FormattedMessage defaultMessage="Shop configuration" />,
    <FormattedMessage defaultMessage="Completed" />
  ];
}

function getStepContent(
  stepIndex: number,
  dispatch: React.Dispatch<Action>,
  state: BusinessState,
  errors: InputErrors,
  handdleInput: (event: React.FocusEvent<HTMLInputElement>) => void,
  image: string,
  banner: string,
  setImage: React.Dispatch<React.SetStateAction<string>>,
  setBanner: React.Dispatch<React.SetStateAction<string>>,
  setMapboxAddressSelected: React.Dispatch<React.SetStateAction<boolean>>
) {
  switch (stepIndex) {
    /* TODO: payment and shippment methods should not be available yet ***/
    case 0:
      return (
        <Step0
          disabled
          dispatch={dispatch}
          state={state}
          errors={errors}
          handdleInput={handdleInput}
          setMapboxAddressSelected={setMapboxAddressSelected}
        />
      );
    case 1:
      return (
        <Step1
          disabled
          dispatch={dispatch}
          state={state}
          errors={errors}
          handdleInput={handdleInput}
          image={image}
          banner={banner}
          setImage={setImage}
          setBanner={setBanner}
        />
      );
    /*     case 2:
      return (
        <Step2
          disabled
          dispatch={dispatch}
          state={state}
          errors={errors}
          handdleInput={handdleInput}
        />
      );
    case 3:
      return (
        <Step3
          disabled
          dispatch={dispatch}
          state={state}
          errors={errors}
          handdleInput={handdleInput}
        />
      ); */
    case 2:
      return (
        <Step4
          disabled
          dispatch={dispatch}
          state={state}
          errors={errors}
          handdleInput={handdleInput}
        />
      );
    default:
      return "Unknown stepIndex";
  }
}

const useStyles = makeStyles(
  theme => ({
    heading: {
      textAlign: "center",
      marginTop: theme.spacing(2)
    },
    separator: {
      marginTop: theme.spacing(3),
      textAlign: "center",
      width: "100%",
      display: "flex",
      justifyContent: "center"
    },
    separatorStep4: {
      gap: "3rem",
      height: "258px"
    },
    viewContainer: {
      width: "80%",
      margin: "0 auto",
      display: "grid",
      alignContent: "start",
      paddingBottom: "140px",
      [theme.breakpoints.down("sm")]: {
        width: "95%"
      }
    },
    stepper: {
      backgroundColor: "inherit",
      width: "100%",
      margin: "0 auto",
      [theme.breakpoints.down("sm")]: {
        margin: "0",
        width: "100%"
      }
    },
    stepLabelMobile: {
      [theme.breakpoints.up("md")]: {
        display: "none"
      },
      [theme.breakpoints.down("sm")]: {
        display: "block",
        whiteSpace: "nowrap"
      }
    },
    stepLabelDesktop: {
      [theme.breakpoints.down("sm")]: {
        display: "none"
      },
      [theme.breakpoints.up("md")]: {
        display: "block"
      }
    },
    buttonBack: {
      [theme.breakpoints.down("sm")]: {
        padding: "12px 24px",
        border: "2px solid #000000",
        borderRadius: "24px",
        height: "48px",
        marginRight: "8px",
        "&:hover": {
          borderColor: `${theme.palette.primary.main}`,
          "& span": { color: `${theme.palette.primary.main}` }
        }
      }
    },
    buttonNext: {
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        maxWidth: "386px"
      }
    },
    buttonContainer: {
      position: "fixed",
      bottom: "0",
      width: "70%",
      height: "80px",
      padding: "0 1rem",
      backgroundColor: "#ffffff",
      borderRadius: "8px 8px 0px 0px",
      boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
      display: "flex",
      flexDirection: "row-reverse",
      justifyContent: "space-between",
      alignItems: "center",
      zIndex: 10,
      [theme.breakpoints.down("sm")]: {
        position: "static",
        justifyContent: "center",
        backgroundColor: "transparent",
        borderRadius: "0",
        boxShadow: "none",
        width: "100%",
        paddingTop: "40px"
      }
    },
    text: {
      flex: "auto"
    }
  }),
  { name: "BusinessCreate" }
);

const InitialErrors: InputErrors = {
  companyName: "",
  cif: "",
  phone: "",
  email: "",
  address: "",
  streetSecondLine: "",
  postalCode: "",
  city: "",
  province: "",
  shopName: "",
  description: ""
};

const initialState: BusinessState = {
  addressAutoCompleted: "",
  businessInfo: {
    companyName: "",
    cif: "",
    phone: "",
    email: "",
    address: "",
    streetSecondLine: "",
    postalCode: "",
    city: "",
    province: "",
    country: "",
    longitude: null,
    latitude: null
  },
  businessDescription: {
    imageShop: null,
    banner: null,
    shopName: "",
    description: ""
  },
  paymentMethods: {
    creditCard: false,
    payPal: false,
    moneyTransfer: false,
    cashOnDelivery: false,
    payWithYourPhone: false,
    payUponPickUp: false
  },
  shippingMethods: {
    correos: false,
    correosExpress: false,
    courier: false,
    courierExpress: false,
    pickUpAtTheStore: false
  }
};

export const BusinessCreate: React.FC<{}> = () => {
  const { refetchUser } = useUser();
  const steps = getSteps();
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [errors, setErrors] = React.useState(InitialErrors);
  const [businessState, dispatchBusinessState] = React.useReducer(
    businessReducer,
    initialState
  );

  const [mapboxAddressSelected, setMapboxAddressSelected] = React.useState(
    false
  );

  const [image, setImage] = React.useState<string>("");
  const [banner, setBanner] = React.useState<string>("");
  const { refreshAvailableBusinesses } = React.useContext(BusinessContext);
  const notify = useNotifier();

  const isSubmitSuccessful = (data: CompanyCreate) => {
    if (data.companyCreate.errors.length === 0) {
      refreshAvailableBusinesses();
      refetchUser();

      handleNext();
    } else {
      /* TODO: define error messages format and show them instead of default Saleor format ***/

      data.companyCreate.errors.map(error =>
        notify({
          status: "error",
          text: error.message
        })
      );
    }
  };

  const [createCompany] = useCompanyCreateMutation({
    onCompleted: isSubmitSuccessful
  });
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const getBannerVariable = (banner: File | null) => {
    if (banner) {
      return { banner };
    }
  };

  const handleSubmit = () => {
    /* TODO: define categories for businesses ***/
    const variables: CompanyCreateVariables = {
      input: {
        name: businessState.businessInfo.companyName,
        publicName: businessState.businessDescription.shopName,
        cif: businessState.businessInfo.cif,
        address: {
          street: businessState.businessInfo.address,
          streetSecondLine: businessState.businessInfo.streetSecondLine,
          postalCode: businessState.businessInfo.postalCode,
          locality: businessState.businessInfo.city,
          region: businessState.businessInfo.province,
          country: businessState.businessInfo.country,
          latitude: businessState.businessInfo.latitude,
          longitude: businessState.businessInfo.longitude
        },
        phone: businessState.businessInfo.phone,
        email: businessState.businessInfo.email,
        description: businessState.businessDescription.description,
        image: businessState.businessDescription.imageShop,
        ...getBannerVariable(businessState.businessDescription.banner)
      }
    };
    createCompany({ variables });
  };

  function getDefaultMesagge(activeStep: number) {
    /* TODO: payment and shippment methods should not be available yet ***/
    switch (activeStep) {
      case 0:
        return (
          <FormattedMessage defaultMessage="We need some data about you and your shop to get started. All fields are mandatory." />
        );
      case 1:
        return (
          <FormattedMessage defaultMessage="This is the data that will be displayed in your shop profile block." />
        );
      case 2:
        return (
          <FormattedMessage defaultMessage="Just one more step. An administrator of the platform has to review your shop details and validate that everything is ok. You will receive an email when your shop is validated. Once your shop is validated, it will be in draft mode. You must add at least one service in order to make your shop public to all the users in dRural. You will get further instructions in the activation mail. You can also check your shop status in your shop manager." />
        );

      default:
        return "";
    }
  }

  const handleInputError = (event: React.FocusEvent<HTMLInputElement>) => {
    const { target: input } = event;

    if (!input.validity.valid) {
      setErrors(errors => ({
        ...errors,
        [input.name]: input.validationMessage
      }));
    } else {
      setErrors(errors => ({ ...errors, [input.name]: "" }));
    }
  };

  const disableSaveAndContinue = () => {
    const inputErrorStep1 = Object.values(errors)
      .slice(0, 5)
      .filter(info => (info ? true : false));
    const inputErrorStep2 = Object.values(errors)
      .slice(5)
      .filter(info => (info ? true : false));

    if (activeStep === 0 && inputErrorStep1.length === 0) {
      // checks if the 5 inputs in the form are fullfilled and
      // the user has selected an address of the mapbox list options
      const businessInfoKeys = Object.keys(businessState.businessInfo);
      let requiredInfo = 0;
      for (let i = 0; i < 5; i++) {
        if (!!businessState.businessInfo[businessInfoKeys[i]]) {
          requiredInfo++;
        }
      }

      if (requiredInfo === 5 && mapboxAddressSelected) {
        return false;
      }
    }
    if (activeStep === 1 && inputErrorStep2.length === 0) {
      const requiredInfo = Object.values(
        businessState.businessDescription
      ).filter(info => (info ? true : false));

      if (requiredInfo.length >= 3) {
        return false;
      }
    }
    if (activeStep === 2 || activeStep === 3) {
      return false;
    }

    return true;
  };

  return (
    <div className={classes.viewContainer}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        className={classes.stepper}
      >
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>
              <span className={classes.stepLabelMobile}>
                {activeStep === index && label}
              </span>

              <span className={classes.stepLabelDesktop}>{label}</span>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep !== 2 && (
        <div className={classes.separator}>
          <div className={classes.text}>
            <Typography variant="h2" className={classes.heading}>
              <FormattedMessage
                defaultMessage="Set up your shop"
                id="createCompanyStepperHeader"
              />
            </Typography>
            <Typography variant="body1" className={classes.heading}>
              {getDefaultMesagge(activeStep)}
            </Typography>
          </div>
        </div>
      )}
      <div>
        {getStepContent(
          activeStep,
          dispatchBusinessState,
          businessState,
          errors,
          handleInputError,
          image,
          banner,
          setImage,
          setBanner,
          setMapboxAddressSelected
        )}
      </div>
      {activeStep !== 2 && (
        <div className={classes.buttonContainer}>
          <>
            {activeStep !== 1 && (
              <Button
                className={classes.buttonNext}
                disabled={disableSaveAndContinue()}
                color="primary"
                variant="contained"
                onClick={handleNext}
              >
                <FormattedMessage
                  defaultMessage="Save and continue"
                  description="button"
                  id="createCompanySaveButton"
                />
              </Button>
            )}
            {activeStep === 1 && (
              <Button
                className={classes.buttonNext}
                disabled={disableSaveAndContinue()}
                color="primary"
                variant="contained"
                onClick={handleSubmit}
              >
                <FormattedMessage
                  defaultMessage="Open shop in dRural"
                  description="button"
                  id="createCompanySaveShop"
                />
              </Button>
            )}
            {activeStep !== 0 && (
              <Button
                className={classes.buttonBack}
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                <FormattedMessage
                  defaultMessage="Back"
                  description="button"
                  id="src_dot_back"
                />
              </Button>
            )}
          </>
        </div>
      )}
    </div>
  );
};

export default BusinessCreate;
