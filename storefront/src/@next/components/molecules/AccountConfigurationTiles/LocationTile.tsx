import { UilEdit } from "@iconscout/react-unicons";
import React from "react";
import { FormattedMessage } from "react-intl";

import {
  Button,
  IconButtonDrural,
  NotificationTemplate,
  SliderInput,
  /*   SwitchInput, */
  Tile,
} from "@components/atoms";
import * as SliderStyles from "@components/atoms/RangeInput/styles";
import { commonMessages } from "@temp/intl";

import {
  TypedSetAccountLocationPreferencesMutation,
  useUserLocationQuery,
} from "./queries";
import * as S from "./styles";
import { FormStatus } from "./types";
import { getFormStatusMessage } from "./utils";

const sliderMarks = {
  100: {
    label: "100 Km",
    style: SliderStyles.rangeInput.markStyle,
  },
};

export const LocationTile: React.FC = () => {
  // 1. Data
  const { data: userData, refetch } = useUserLocationQuery();

  // 2. States
  const [isEditing, setIsEditing] = React.useState(false);
  const [isLocationAllowed, setIsLocationAllowed] = React.useState(false);
  const [distance, setDistance] = React.useState<number>(50);
  const [formStatus, setFormStatus] = React.useState<FormStatus>({
    success: false,
    error: false,
  });

  React.useEffect(() => {
    if (userData?.me) {
      setIsLocationAllowed(userData.me.isLocationAllowed);
      if (userData.me.distance || userData.me.distance === 0) {
        setDistance(userData.me.distance);
      }
    }
  }, [userData]);

  // 3. Events

  /*   const toggleLocationAllow = () => {
    setIsLocationAllowed(!isLocationAllowed);
  }; */

  const onDistanceChange = (distance: number): void => {
    setDistance(distance);
  };

  // 4. Form validation
  const hasChanged =
    (userData && userData.me?.isLocationAllowed !== isLocationAllowed) ||
    (userData && userData.me?.distance !== distance);

  // 5. Render
  return (
    <TypedSetAccountLocationPreferencesMutation
      onCompleted={data => {
        const errors = data.setAccountLocationPreferences?.errors;

        if (errors?.length !== 0) {
          setFormStatus({
            error: true,
            success: false,
          });
        } else {
          setFormStatus({
            error: false,
            success: true,
          });
          setTimeout(() => {
            setFormStatus({
              error: false,
              success: false,
            });
          }, 3000);
        }

        refetch();
        setIsEditing(false);
      }}
    >
      {(setLocationPreferences, { loading, data }) => {
        return (
          <>
            <S.TileWrapper>
              <Tile id="myaccount__configuration__location">
                <S.Header>
                  <S.Title>
                    <FormattedMessage {...commonMessages.location} />
                  </S.Title>
                  {!isEditing && (
                    <IconButtonDrural
                      color="primary"
                      onClick={() => setIsEditing(isEditing => !isEditing)}
                      testingContext="editLocationButton"
                    >
                      <UilEdit size="24" color="#fff" />
                    </IconButtonDrural>
                  )}
                </S.Header>
                {/*                 <S.AllowLocationWrapper>
                  <div>
                    <S.SubtitleMain>
                      <FormattedMessage defaultMessage="Allow dRural to access my location" />
                    </S.SubtitleMain>
                    {!isEditing &&
                      (userData && userData.me?.isLocationAllowed ? (
                        <FormattedMessage defaultMessage="Access allowed" />
                      ) : (
                        <FormattedMessage defaultMessage="Access denied" />
                      ))}
                  </div>
                  {isEditing && (
                    <SwitchInput
                      checked={isLocationAllowed}
                      onClick={toggleLocationAllow}
                      // disabled={disabled}
                    />
                  )}
                </S.AllowLocationWrapper> */}
                <S.DistanceWrapper>
                  <S.SubtitleSmall>
                    <FormattedMessage defaultMessage="Show services this distance near me" />
                  </S.SubtitleSmall>
                  {isEditing ? (
                    <SliderInput
                      value={distance}
                      min={0}
                      max={100}
                      step={5}
                      marks={sliderMarks}
                      units="Km"
                      onChange={onDistanceChange}
                    />
                  ) : (
                    <p>
                      {`${userData && userData.me?.distance} `}
                      <FormattedMessage defaultMessage="km" />
                    </p>
                  )}
                </S.DistanceWrapper>
                {isEditing && (
                  <S.ButtonsWrapper marginTop="4rem">
                    <Button
                      testingContext="cancelButton"
                      type="button"
                      color="labelOnly"
                      onClick={() => {
                        setIsEditing(false);
                        if (userData?.me) {
                          setIsLocationAllowed(userData.me.isLocationAllowed);
                          if (userData.me.distance) {
                            setDistance(userData.me.distance);
                          }
                        }
                      }}
                    >
                      <FormattedMessage {...commonMessages.cancel} />
                    </Button>
                    <Button
                      testingContext="submit"
                      type="submit"
                      disabled={!hasChanged}
                      onClick={() => {
                        if (userData) {
                          setLocationPreferences({
                            variables: {
                              input: {
                                isLocationAllowed,
                                distance,
                              },
                            },
                          });
                        }
                      }}
                    >
                      <FormattedMessage {...commonMessages.save} />
                    </Button>
                  </S.ButtonsWrapper>
                )}
              </Tile>
            </S.TileWrapper>
            {(formStatus.error || formStatus.success) && (
              <NotificationTemplate
                id="userLocationPreferencesFormNotification"
                close={() => {
                  if (formStatus.error) {
                    setFormStatus({
                      ...formStatus,
                      error: false,
                    });
                  } else {
                    setFormStatus({
                      ...formStatus,
                      success: false,
                    });
                  }
                }}
                message={getFormStatusMessage("Location", formStatus.error)}
                options={{ type: formStatus.error ? "error" : "success" }}
                style={{}}
              />
            )}
          </>
        );
      }}
    </TypedSetAccountLocationPreferencesMutation>
  );
};
