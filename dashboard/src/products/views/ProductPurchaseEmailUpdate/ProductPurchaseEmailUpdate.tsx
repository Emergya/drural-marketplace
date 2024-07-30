import { DialogContentText } from "@material-ui/core";
import ActionDialog from "@saleor/components/ActionDialog";
import NotFoundPage from "@saleor/components/NotFoundPage";
import { WindowTitle } from "@saleor/components/WindowTitle";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import useUser from "@saleor/hooks/useUser";
import { getMutationState } from "@saleor/misc";
import ProductPurchaseEmailPage from "@saleor/products/components/ProductPurchaseEmailPage";
import { useProductPurchaseEmailUpdateMutation } from "@saleor/products/mutations";
import { useProductPurchaseEmailQuery } from "@saleor/products/queries";
import { ProductPurchaseEmailUpdate_productUpdate_errors } from "@saleor/products/types/ProductPurchaseEmailUpdate";
import { getPurchaseEmailMutationVariables } from "@saleor/products/utils/data";
import getPurchaseEmailErrorMessage from "@saleor/utils/errors/purchaseEmail";
import createDialogActionHandlers from "@saleor/utils/handlers/dialogActionHandlers";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { commonMessages } from "../../../intl";
import { PurchaseEmailFormData } from "../../forms/PurchaseEmailForm/types";
import {
  productPurchaseEmailEditUrl,
  ProductPurchaseEmailUrlDialog,
  ProductPurchaseEmailUrlQueryParams,
  productUrl
} from "../../urls";
import { useStyles } from "./styles";
import { ProductPurchaseEmailUpdateProps } from "./types";

export const ProductPurchaseEmailUpdate: React.FC<ProductPurchaseEmailUpdateProps> = ({
  productId,
  params
}) => {
  const intl = useIntl();
  const notify = useNotifier();
  const navigate = useNavigator();
  const classes = useStyles();
  const { user } = useUser();

  const [openModal, closeModal] = createDialogActionHandlers<
    ProductPurchaseEmailUrlDialog,
    ProductPurchaseEmailUrlQueryParams
  >(navigate, params => productPurchaseEmailEditUrl(productId, params), params);

  const {
    data: productData,
    loading: loadingProduct
  } = useProductPurchaseEmailQuery({
    displayLoader: true,
    variables: {
      id: productId,
      sellerRequest: !user.isStaff
    }
  });
  const product = productData?.product;

  const [
    updatePurchaseEmail,
    updatePurchaseEmailOpts
  ] = useProductPurchaseEmailUpdateMutation({
    onCompleted: data => {
      const { errors, product } = data.productUpdate || {};

      if (errors.length) {
        handleErrors(errors);
      } else {
        handleSuccess(!!product.purchaseEmail);
      }
    }
  });

  const handleBack = () => navigate(productUrl(productId));

  const handleErrors = (
    errors: ProductPurchaseEmailUpdate_productUpdate_errors[]
  ) => {
    errors.map(error =>
      notify({
        status: "error",
        text: getPurchaseEmailErrorMessage(error, intl)
      })
    );
  };

  const handleSuccess = (hasEmail: boolean) => {
    notify({
      status: "success",
      text: hasEmail
        ? intl.formatMessage(commonMessages.savedChanges)
        : intl.formatMessage({
            defaultMessage: "Purchase email removed"
          })
    });
    if (!hasEmail) {
      handleBack();
    }
  };

  const handleSubmit = (formData: PurchaseEmailFormData) => {
    updatePurchaseEmail(getPurchaseEmailMutationVariables(productId, formData));
  };

  const handleDelete = () => {
    updatePurchaseEmail(getPurchaseEmailMutationVariables(productId, null));
  };

  const loading = loadingProduct || updatePurchaseEmailOpts.loading;

  const formTransitionState = getMutationState(
    updatePurchaseEmailOpts.called,
    updatePurchaseEmailOpts.loading,
    updatePurchaseEmailOpts.data?.productUpdate.errors
  );

  const errors = updatePurchaseEmailOpts.data?.productUpdate.errors || [];

  if (!loading && (!product || !product?.purchaseEmail)) {
    return <NotFoundPage onBack={handleBack} />;
  }

  return (
    <>
      <WindowTitle title={product?.name} />
      <ProductPurchaseEmailPage
        errors={errors}
        header={product?.name}
        initialData={product?.purchaseEmail}
        loading={loading}
        product={product}
        saveButtonBarState={formTransitionState}
        onBack={handleBack}
        onDelete={() => openModal("remove")}
        onSubmit={handleSubmit}
      />
      <ActionDialog
        confirmButtonState={updatePurchaseEmailOpts.status}
        open={params.action === "remove"}
        title={intl.formatMessage({
          defaultMessage: "Delete purchase email"
        })}
        variant="default"
        onClose={closeModal}
        onConfirm={handleDelete}
      >
        <DialogContentText className={classes.textAlignCenter}>
          <FormattedMessage defaultMessage="Are you sure you want to delete the purchase email for this service?" />
        </DialogContentText>
      </ActionDialog>
    </>
  );
};
export default ProductPurchaseEmailUpdate;
