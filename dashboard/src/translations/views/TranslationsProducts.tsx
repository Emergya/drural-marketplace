import { OutputData } from "@editorjs/editorjs";
import NotFoundPage from "@saleor/components/NotFoundPage";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import useShop from "@saleor/hooks/useShop";
import { commonMessages } from "@saleor/intl";
import { stringifyQs } from "@saleor/utils/urls";
import React from "react";
import { useIntl } from "react-intl";

import { maybe } from "../../misc";
import { LanguageCodeEnum } from "../../types/globalTypes";
import TranslationsProductsPage from "../components/TranslationsProductsPage";
import {
  TypedUpdateAttributeValueTranslations,
  TypedUpdateProductTranslations
} from "../mutations";
import { useProductTranslationDetails } from "../queries";
import { TranslationField, TranslationInputFieldName } from "../types";
import {
  languageEntitiesUrl,
  languageEntityUrl,
  TranslatableEntities
} from "../urls";
import { getParsedTranslationInputData } from "../utils";

export interface TranslationsProductsQueryParams {
  activeField: string;
}
export interface TranslationsProductsProps {
  id: string;
  languageCode: LanguageCodeEnum;
  params: TranslationsProductsQueryParams;
}

const TranslationsProducts: React.FC<TranslationsProductsProps> = ({
  id,
  languageCode,
  params
}) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const shop = useShop();
  const intl = useIntl();

  const productTranslations = useProductTranslationDetails({
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

  const onUpdate = (errors: unknown[]) => {
    if (errors.length === 0) {
      productTranslations.refetch();
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
        tab: TranslatableEntities.products
      })
    );

  return (
    <TypedUpdateProductTranslations
      onCompleted={data => onUpdate(data.productTranslate.errors)}
    >
      {(updateTranslations, updateTranslationsOpts) => (
        <TypedUpdateAttributeValueTranslations
          onCompleted={data => onUpdate(data.attributeValueTranslate.errors)}
        >
          {updateAttributeValueTranslations => {
            const handleSubmit = (
              { name: fieldName }: TranslationField<TranslationInputFieldName>,
              data: string
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

            const handleAttributeValueSubmit = (
              { id }: TranslationField<TranslationInputFieldName>,
              data: OutputData
            ) => {
              updateAttributeValueTranslations({
                variables: {
                  id,
                  input: { richText: JSON.stringify(data) },
                  language: languageCode
                }
              });
            };

            const translation = productTranslations?.data?.translation;

            if (translation === null) {
              return <NotFoundPage onBack={handleBack} />;
            }

            return (
              <TranslationsProductsPage
                productId={id}
                activeField={params.activeField}
                disabled={
                  productTranslations.loading || updateTranslationsOpts.loading
                }
                languageCode={languageCode}
                languages={maybe(() => shop.languages, [])}
                saveButtonState={updateTranslationsOpts.status}
                onBack={handleBack}
                onEdit={onEdit}
                onDiscard={onDiscard}
                onLanguageChange={lang =>
                  navigate(
                    languageEntityUrl(lang, TranslatableEntities.products, id)
                  )
                }
                onSubmit={handleSubmit}
                onAttributeValueSubmit={handleAttributeValueSubmit}
                data={
                  translation?.__typename === "ProductTranslatableContent"
                    ? translation
                    : null
                }
              />
            );
          }}
        </TypedUpdateAttributeValueTranslations>
      )}
    </TypedUpdateProductTranslations>
  );
};
TranslationsProducts.displayName = "TranslationsProducts";
export default TranslationsProducts;
