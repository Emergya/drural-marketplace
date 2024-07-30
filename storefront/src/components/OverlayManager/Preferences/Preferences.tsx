import * as Unicons from "@iconscout/react-unicons";
import { UilMultiply } from "@iconscout/react-unicons";
import { useRouter } from "next/router";
import * as React from "react";
import { useAlert } from "react-alert";
import { useMutation, useQuery } from "react-apollo";

import { ModalNavButtons } from "@components/molecules/ModalNavButtons";
import { Overlay } from "@components/organisms";
import { paths } from "@paths";
import Loader from "@temp/components/Loader";

import { OverlayContextInterface } from "../..";
import { GetSaleorCategories } from "./gqlTypes/GetSaleorCategories";
import {
  setAccountCategoriesPreferences,
  setAccountCategoriesPreferencesVariables,
} from "./gqlTypes/setAccountCategoriesPreferences";
import {
  setAccountLocationPreferences,
  setAccountLocationPreferencesVariables,
} from "./gqlTypes/setAccountLocationPreferences";
import {
  getSaleorCategoriesQuery,
  setCategoriesPreferencesMutation,
  setLocationPreferencesMutation,
} from "./queries";
import Categories from "./sections/Categories";
import Location from "./sections/Location";
import Saving from "./sections/Saving";
import Skip from "./sections/Skip";
import * as S from "./styles";
import { LocationInterface } from "./types";
import { initialLocation, PreferenceObject } from "./utils";

const Preferences: React.FC<{ overlay: OverlayContextInterface }> = ({
  overlay,
}) => {
  const [preferences, setPreferences] = React.useState<
    Record<string, PreferenceObject>
  >(null);
  const [location, setLocation] = React.useState<LocationInterface>(
    initialLocation
  );
  const [activeStep, setActiveStep] = React.useState(0);
  const [loader, setLoader] = React.useState(true);
  const alert = useAlert();
  const [iconHover, setIconHover] = React.useState(false);

  const displayQueryMutationError = () => {
    alert.show(
      {
        content: "Something went wrong",
        title: "Error",
      },
      { type: "error", timeout: 5000 }
    );
  };
  const { loading, data } = useQuery<GetSaleorCategories>(
    getSaleorCategoriesQuery,
    {
      onError() {
        displayQueryMutationError();
        overlay.hide();
      },
    }
  );
  React.useEffect(() => {
    let userPreferences: Record<string, PreferenceObject>;

    if (data) {
      data.categories.edges.map((category, index) => {
        const categoryKey = category.node.name.replace(/\s/g, "");
        // TODO: this check is only necessary due to the lack of icons in backend
        let icon;
        if (`${category.node.iconId}` in Unicons) {
          icon = Unicons[`${category.node.iconId}`];
        } else {
          icon = Unicons.UilImageBlock;
        }
        userPreferences = {
          ...userPreferences,
          [`${categoryKey}`]: {
            id: category.node.id,
            icon,
            title: category.node.name,
            value: false,
          },
        };
      });
      setPreferences(userPreferences);
      setLoader(false);
    }
  }, [loading]);

  const [addLocation] = useMutation<
    setAccountLocationPreferences,
    setAccountLocationPreferencesVariables
  >(setLocationPreferencesMutation, {
    onCompleted(data) {
      // TODO: error handling UI not yet defined
      if (data.setAccountLocationPreferences.errors?.length > 0) {
        alert.show(
          {
            content: "Something went wrong",
            title: "Error",
          },
          { type: "error", timeout: 5000 }
        );
        overlay.hide();
      } else if (activeStep === 1) {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
      }
    },
    onError() {
      displayQueryMutationError();
      overlay.hide();
    },
  });

  const [addCategories] = useMutation<
    setAccountCategoriesPreferences,
    setAccountCategoriesPreferencesVariables
  >(setCategoriesPreferencesMutation, {
    onCompleted(data) {
      // TODO: error handling UI not yet defined
      if (data.setAccountCategoriesPreferences.errors?.length > 0) {
        alert.show(
          {
            content: "Something went wrong",
            title: "Error",
          },
          { type: "error", timeout: 5000 }
        );
        overlay.hide();
      } else if (activeStep === 1) {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
      }
    },
    onError() {
      displayQueryMutationError();
      overlay.hide();
    },
  });

  const { push, pathname } = useRouter();

  const handleNext = () => {
    if (activeStep === 0) {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    }
    if (activeStep === 1) {
      addLocation({
        variables: {
          input: {
            isLocationAllowed: location.accessLocation,
            distance: location.distanceNearMe,
          },
        },
      });
      const preferencesChosen = Object.values(preferences).filter(
        category => category.value
      );
      const preferencesIDs = preferencesChosen.map(choice => choice.id);
      addCategories({
        variables: {
          categories: preferencesIDs,
        },
      });
    }
    if (activeStep === 2 || activeStep === 3) {
      overlay.hide();
      if (pathname === "/onboarding") {
        push(paths.home);
      }
    }
  };

  const handleBack = () => {
    if (activeStep === 0 || activeStep === 1) {
      setActiveStep(3);
    }
    if (activeStep === 3) {
      setActiveStep(0);
    }
  };

  const getButtonName = (step: number, type: string) => {
    if (type === "next") {
      switch (step) {
        case 0:
          return "Next";
        case 1:
          return "Save";
        case 2:
          return "OK";
        case 3:
          return "OK";
        default:
          return "error step";
      }
    }
    if (type === "back") {
      switch (step) {
        case 0:
          return "Skip";
        case 1:
          return "Skip";
        case 2:
          return "";
        case 3:
          return "Back";
        default:
          return "error step";
      }
    }
  };

  const nextButtonName = React.useMemo(
    () => getButtonName(activeStep, "next"),
    [activeStep]
  );
  const backButtonName = React.useMemo(
    () => getButtonName(activeStep, "back"),
    [activeStep]
  );

  const handleCheckboxChange = (event: React.SyntheticEvent, name: string) => {
    setPreferences({
      ...preferences,
      [`${name}`]: {
        ...preferences[`${name}`],
        value: !preferences[`${name}`].value,
      },
    });
  };
  return (
    <Overlay position="center" duration={0} show hide={overlay.hide}>
      {loader ? (
        <S.LoadingDiv>
          <Loader />
        </S.LoadingDiv>
      ) : (
        (() => {
          switch (activeStep) {
            case 0:
              return (
                <Categories
                  preferences={preferences}
                  onChange={handleCheckboxChange}
                />
              );
            case 1:
              return (
                <Location location={location} updateLocation={setLocation} />
              );
            case 2:
              return <Saving />;
            case 3:
              return <Skip />;
            default:
              return "ERROR";
          }
        })()
      )}
      <S.NavButtons>
        <ModalNavButtons
          textNext={nextButtonName}
          textBack={backButtonName}
          onNext={handleNext}
          onBack={handleBack}
          displayBack={activeStep !== 2}
        />
      </S.NavButtons>

      <S.CloseIcon
        onClick={overlay.hide}
        onMouseOver={() => setIconHover(true)}
        onFocus={() => setIconHover(true)}
        onMouseOut={() => setIconHover(false)}
        onBlur={() => setIconHover(false)}
      >
        {!iconHover ? (
          <UilMultiply size="24" color="#000000" />
        ) : (
          <UilMultiply size="24" color="#3CDCAA" />
        )}
      </S.CloseIcon>
    </Overlay>
  );
};

export default Preferences;
