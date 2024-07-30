import { OutputData } from "@editorjs/editorjs";
import NotFoundPage from "@saleor/components/NotFoundPage";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import useShop from "@saleor/hooks/useShop";
import { commonMessages } from "@saleor/intl";
import { stringifyQs } from "@saleor/utils/urls";
import React from "react";
import { useIntl } from "react-intl";

import { LanguageCodeEnum } from "../../types/globalTypes";
import TranslationsCategoriesPage from "../components/TranslationsCategoriesPage";
import { TypedUpdateCategoryTranslations } from "../mutations";
import { useCategoryTranslationDetails } from "../queries";
import { TranslationField, TranslationInputFieldName } from "../types";
import { UpdateCategoryTranslations } from "../types/UpdateCategoryTranslations";
import {
  languageEntitiesUrl,
  languageEntityUrl,
  TranslatableEntities
} from "../urls";
import { getParsedTranslationInputData } from "../utils";

export interface TranslationsCategoriesQueryParams {
  activeField: string;
}
export interface TranslationsCategoriesProps {
  id: string;
  languageCode: LanguageCodeEnum;
  params: TranslationsCategoriesQueryParams;
}

const TranslationsCategories: React.FC<TranslationsCategoriesProps> = ({
  id,
  languageCode,
  params
}) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const shop = useShop();
  const intl = useIntl();

  const categoryTranslations = useCategoryTranslationDetails({
    variables: { id, language: languageCode }
  });

  const onEdit = (field: string) =>
    navigate(
      "?" +
        stringifyQs({
          activeField: field
        }),
      true
    );
  const onUpdate = (data: UpdateCategoryTranslations) => {
    if (data.categoryTranslate.errors.length === 0) {
      categoryTranslations.refetch();
      notify({
        status: "success",
        text: intl.formatMessage(commonMessages.savedChanges)
      });
      navigate("?", true);
    }
  };
  const onDiscard = () => {
    navigate("?", true);
  };

  const handleBack = () =>
    navigate(
      languageEntitiesUrl(languageCode, {
        tab: TranslatableEntities.categories
      })
    );

  return (
    <TypedUpdateCategoryTranslations onCompleted={onUpdate}>
      {(updateTranslations, updateTranslationsOpts) => {
        const handleSubmit = (
          { name: fieldName }: TranslationField<TranslationInputFieldName>,
          data: string | OutputData
        ) => {
          updateTranslations({
            variables: {
              id,
              input: getParsedTranslationInputData({
                data,
                fieldName
              }),
              language: languageCode
            }
          });
        };

        const translation = categoryTranslations?.data?.translation;

        if (translation === null) {
          return <NotFoundPage onBack={handleBack} />;
        }

        return (
          <TranslationsCategoriesPage
            activeField={params.activeField}
            disabled={
              categoryTranslations.loading || updateTranslationsOpts.loading
            }
            languageCode={languageCode}
            languages={shop?.languages || []}
            saveButtonState={updateTranslationsOpts.status}
            onBack={handleBack}
            onEdit={onEdit}
            onDiscard={onDiscard}
            onLanguageChange={lang =>
              navigate(
                languageEntityUrl(lang, TranslatableEntities.categories, id)
              )
            }
            onSubmit={handleSubmit}
            data={
              translation?.__typename === "CategoryTranslatableContent"
                ? translation
                : null
            }
          />
        );
      }}
    </TypedUpdateCategoryTranslations>
  );
};
TranslationsCategories.displayName = "TranslationsCategories";
export default TranslationsCategories;
