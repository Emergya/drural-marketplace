import { UilMultiply } from "@iconscout/react-unicons";
import React from "react";
import { FormattedMessage } from "react-intl";

import { Button, Loader } from "@components/atoms";
import { CheckboxIcon } from "@components/molecules";
import { Overlay } from "@components/organisms";
import { commonMessages } from "@temp/intl";

import { TypedSetAccountCategoriesPreferencesMutation } from "./queries";
import * as S from "./styles";
import { CategoryOverlayProps } from "./types";
import {
  arraysMatch,
  getGridCategoriesPreferences,
  setInicialCategoriesPreferences,
} from "./utils";

export const CategoryOverlay: React.FC<CategoryOverlayProps> = ({
  categories,
  loadingCategories,
  userCategories,
  hide,
  setFormStatus,
  refetchUserCategories,
}) => {
  // 1. State & variables
  const [categoryPreferences, setCategoryPreferences] = React.useState(
    setInicialCategoriesPreferences(userCategories) || []
  );
  const gridPreferences = getGridCategoriesPreferences(
    categories,
    categoryPreferences
  );

  // 2. From validation
  const hasChanged = !arraysMatch(
    categoryPreferences,
    setInicialCategoriesPreferences(userCategories)
  );

  // 3. Events
  const handleCheckboxChange = (event: React.SyntheticEvent, id: string) => {
    const preferences = [...categoryPreferences];
    const index = preferences.indexOf(id);

    if (index === -1) {
      setCategoryPreferences([...preferences, id]);
    } else {
      preferences.splice(index, 1);
      setCategoryPreferences(preferences);
    }
  };

  // 4. Render
  return (
    <TypedSetAccountCategoriesPreferencesMutation
      onCompleted={data => {
        const errors = data.setAccountCategoriesPreferences?.errors;

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

        refetchUserCategories();
        hide();
      }}
    >
      {(
        setAccountCategoriesPreferences,
        { loading: mutationLoading, data }
      ) => {
        const loading = loadingCategories || mutationLoading;

        return (
          <Overlay position="center" duration={0} show hide={hide}>
            <S.OverlayInnerWrapper>
              <S.CloseIconWrapper onClick={hide}>
                <UilMultiply size="24" />
              </S.CloseIconWrapper>
              <S.OverlayTextWrapper>
                <h2>
                  <FormattedMessage defaultMessage="Preferred categories" />
                </h2>
                <p>
                  <FormattedMessage defaultMessage="Select your preferred categories, so we can show you first the services you are more interested in. You can select as many as you want." />
                </p>
              </S.OverlayTextWrapper>
              {categories.length > 0 && (
                <S.OverlayCategoriesContainer>
                  {loading ? (
                    <Loader />
                  ) : (
                    gridPreferences.map(preference => {
                      const { id, icon: Icon } = preference;

                      return (
                        <S.OverlayCategoriesGridWrapper key={preference.id}>
                          <CheckboxIcon
                            icon={<Icon color="#3CDCAA" size={40} />}
                            title={preference.title}
                            checked={preference.value}
                            onChange={e => handleCheckboxChange(e, id)}
                          />
                        </S.OverlayCategoriesGridWrapper>
                      );
                    })
                  )}
                </S.OverlayCategoriesContainer>
              )}
              <S.OverlayButtonsWrapper>
                <Button
                  testingContext="cancelButton"
                  type="button"
                  color="ghost"
                  onClick={hide}
                >
                  <FormattedMessage {...commonMessages.cancel} />
                </Button>
                <Button
                  testingContext="submit"
                  type="submit"
                  disabled={!hasChanged || loading}
                  onClick={() => {
                    setAccountCategoriesPreferences({
                      variables: {
                        categories: categoryPreferences,
                      },
                    });
                  }}
                >
                  <FormattedMessage {...commonMessages.save} />
                </Button>
              </S.OverlayButtonsWrapper>
            </S.OverlayInnerWrapper>
          </Overlay>
        );
      }}
    </TypedSetAccountCategoriesPreferencesMutation>
  );
};
