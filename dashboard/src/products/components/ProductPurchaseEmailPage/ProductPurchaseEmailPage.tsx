import { Backlink } from "@drural/macaw-ui";
import Container from "@saleor/components/Container";
import Grid from "@saleor/components/Grid";
import PageHeader from "@saleor/components/PageHeader";
import Savebar from "@saleor/components/Savebar";
import useNotifier from "@saleor/hooks/useNotifier";
import {
  validateHandlebarsTemplate,
  validateSuject
} from "@saleor/products/forms/PurchaseEmailForm/utils";
import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { commonMessages } from "../../../intl";
import PurchaseEmailForm from "../../forms/PurchaseEmailForm/PurchaseEmailForm";
import ProductEmailConfiguration from "../ProductEmailConfiguration/ProductEmailConfiguration";
import ProductEmailVariables from "../ProductEmailVariables";
import ProductPurchaseEmailPreviewDialog from "../ProductPurchaseEmailPreviewDialog";
import { ProductPurchaseEmailPageProps } from "./types";

export const ProductPurchaseEmailPage: React.FC<ProductPurchaseEmailPageProps> = ({
  errors,
  header,
  initialData,
  loading,
  product,
  saveButtonBarState,
  onDelete,
  onBack,
  onSubmit
}) => {
  const intl = useIntl();
  const notify = useNotifier();
  const [isPreviewModalOpen, setPreviewModalOpen] = useState<boolean>(false);

  const handleAdditionalButton = () => {
    setPreviewModalOpen(true);
    notify({
      status: "warning",
      text: intl.formatMessage({
        defaultMessage:
          "Notice that email variables are not applied on preview mode."
      })
    });
  };

  return (
    <PurchaseEmailForm onSubmit={onSubmit} initialData={initialData}>
      {({ change, data, disabled: formDisabled, hasChanged, submit }) => {
        const subjectValidationError: string = validateSuject(
          data.subject,
          intl
        );
        const titleValidationError: string = validateHandlebarsTemplate(
          data.title,
          intl
        );
        const contentValidationError: string = validateHandlebarsTemplate(
          data.content,
          intl
        );
        const validationError: boolean =
          !!titleValidationError ||
          !!contentValidationError ||
          !!subjectValidationError;

        return (
          <Container>
            <Backlink onClick={onBack}>
              <FormattedMessage {...commonMessages.backToServiceEdition} />
            </Backlink>
            <PageHeader title={header} />
            <Grid>
              <div>
                <ProductEmailConfiguration
                  contentValidationError={contentValidationError}
                  data={data}
                  disabled={loading}
                  errors={errors}
                  subjectValidationError={subjectValidationError}
                  titleValidationError={titleValidationError}
                  onChange={change}
                />
              </div>
              <div>
                <ProductEmailVariables isBookable={product?.isBookable} />
              </div>
            </Grid>

            <Savebar
              disabled={
                loading ||
                !onSubmit ||
                formDisabled ||
                !hasChanged ||
                validationError
              }
              state={saveButtonBarState}
              onAdditionalButton={handleAdditionalButton}
              onCancel={onBack}
              onDelete={onDelete}
              onSubmit={submit}
            />

            <ProductPurchaseEmailPreviewDialog
              data={data}
              open={isPreviewModalOpen}
              onClose={() => setPreviewModalOpen(false)}
            />
          </Container>
        );
      }}
    </PurchaseEmailForm>
  );
};
export default ProductPurchaseEmailPage;
