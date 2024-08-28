import { UilEdit } from "@iconscout/react-unicons";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useMutation } from "react-apollo";
import { FormattedMessage, useIntl } from "react-intl";

import {
  Button,
  DropdownSelect,
  IconButtonDrural,
  NotificationTemplate,
  Tile,
} from "@components/atoms";
import {
  getLanguageObject,
  mapLocalesWithLanguage,
} from "@components/atoms/LanguageSelect/utils";
import {
  languageCodeToLocale,
  localeToLanguageCode,
} from "@temp/components/Locale";
import { Locale } from "@temp/components/Locale/types";
import { commonMessages } from "@temp/intl";

import { accountUpdateMutation, useUserLanguageQuery } from "./queries";
import * as S from "./styles";

export const LanguageTile: React.FC = () => {
  const { locale, locales } = useRouter();
  const intl = useIntl();

  // 1. States
  const [isEditing, setIsEditing] = useState(false);
  const [isNotificationOpen, setNotificationOpen] = useState(false);

  // 2. Data
  const { data: userData, refetch } = useUserLanguageQuery();
  const [updateAccount, updateAccountVariables] = useMutation(
    accountUpdateMutation,
    {
      onCompleted: () => {
        refetch();
        setIsEditing(false);
      },
    }
  );

  // 3. Render
  return (
    <>
      <Formik
        initialValues={{
          languageCode:
            languageCodeToLocale(userData?.me?.languageCode) || locale,
        }}
        enableReinitialize
        onSubmit={async (values, { setSubmitting }) => {
          await updateAccount({
            variables: {
              input: {
                languageCode: localeToLanguageCode(
                  values?.languageCode as Locale
                ),
              },
            },
          });
          setNotificationOpen(true);
          setSubmitting(false);
        }}
      >
        {({
          dirty,
          isSubmitting,
          isValid,
          values,
          handleChange,
          resetForm,
        }) => {
          return (
            <Form>
              <S.TileWrapper>
                <Tile>
                  <S.Header>
                    <S.Title>
                      <FormattedMessage defaultMessage="Language" />
                    </S.Title>
                    {!isEditing && (
                      <IconButtonDrural
                        color="primary"
                        onClick={() => setIsEditing(isEditing => !isEditing)}
                      >
                        <UilEdit size="24" color="#fff" />
                      </IconButtonDrural>
                    )}
                  </S.Header>
                  <S.DistanceWrapper>
                    <S.SubtitleSmall>
                      <FormattedMessage defaultMessage="Preferred language" />
                    </S.SubtitleSmall>
                    {isEditing ? (
                      <S.LanguageSelectWrapper>
                        <DropdownSelect
                          name="languageCodeSelect"
                          value={getLanguageObject(values?.languageCode, intl)}
                          onChange={option =>
                            handleChange({
                              target: {
                                name: "languageCode",
                                value: option.value,
                              },
                            })
                          }
                          {...mapLocalesWithLanguage(locales, intl)}
                        />
                      </S.LanguageSelectWrapper>
                    ) : (
                      <p>
                        {getLanguageObject(values?.languageCode, intl).label}
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
                          resetForm();
                        }}
                      >
                        <FormattedMessage {...commonMessages.cancel} />
                      </Button>
                      <Button
                        testingContext="submit"
                        type="submit"
                        disabled={!dirty || isSubmitting || !isValid}
                      >
                        <FormattedMessage {...commonMessages.save} />
                      </Button>
                    </S.ButtonsWrapper>
                  )}
                </Tile>
              </S.TileWrapper>
            </Form>
          );
        }}
      </Formik>
      {isNotificationOpen && (
        <NotificationTemplate
          id="userLanguageFormNotification"
          close={() => setNotificationOpen(false)}
          message={{
            title: intl.formatMessage({
              defaultMessage: "Language saved",
            }),
            content: updateAccountVariables.error
              ? intl.formatMessage({
                  defaultMessage: "Error on saving language preferences.",
                })
              : intl.formatMessage({
                  defaultMessage:
                    "Language preferences have been successfully saved.",
                }),
          }}
          options={{
            type: updateAccountVariables.error ? "error" : "success",
          }}
        />
      )}
    </>
  );
};
