import NotFoundPage from "@saleor/components/NotFoundPage";
import { WindowTitle } from "@saleor/components/WindowTitle";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import useUser from "@saleor/hooks/useUser";
import { getMutationState } from "@saleor/misc";
import ProductPurchaseEmailPage from "@saleor/products/components/ProductPurchaseEmailPage";
import { PurchaseEmailFormData } from "@saleor/products/forms/PurchaseEmailForm/types";
import { useProductPurchaseEmailUpdateMutation } from "@saleor/products/mutations";
import { useProductPurchaseEmailQuery } from "@saleor/products/queries";
import { ProductPurchaseEmailUpdate_productUpdate_errors } from "@saleor/products/types/ProductPurchaseEmailUpdate";
import { getPurchaseEmailMutationVariables } from "@saleor/products/utils/data";
import getPurchaseEmailErrorMessage from "@saleor/utils/errors/purchaseEmail";
import React from "react";
import { useIntl } from "react-intl";
import { Redirect } from "react-router";

import { productPurchaseEmailEditPath, productUrl } from "../../urls";
import { ProductPurchaseEmailCreateProps } from "./types";

export const ProductPurchaseEmailCreate: React.FC<ProductPurchaseEmailCreateProps> = ({
  productId
}) => {
  const intl = useIntl();
  const notify = useNotifier();
  const navigate = useNavigator();
  const { user } = useUser();

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
      const { errors } = data.productUpdate || {};
      if (errors.length) {
        handleErrors(errors);
      } else {
        handleSuccess(productId);
      }
    }
  });

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

  const handleSuccess = (productId: string) => {
    notify({
      status: "success",
      text: intl.formatMessage({
        defaultMessage: "Purchase email created"
      })
    });
    navigate(productPurchaseEmailEditPath(productId));
  };

  const handleSubmit = (formData: PurchaseEmailFormData) => {
    updatePurchaseEmail(getPurchaseEmailMutationVariables(productId, formData));
  };

  const handleBack = () => navigate(productUrl(productId));

  const loading = loadingProduct || updatePurchaseEmailOpts.loading;

  const formTransitionState = getMutationState(
    updatePurchaseEmailOpts.called,
    updatePurchaseEmailOpts.loading,
    updatePurchaseEmailOpts.data?.productUpdate.errors
  );

  const errors = updatePurchaseEmailOpts.data?.productUpdate.errors || [];

  if (!loading && product === null) {
    return <NotFoundPage onBack={handleBack} />;
  }

  if (product?.purchaseEmail) {
    return <Redirect to={productPurchaseEmailEditPath(productId)} />;
  }

  return (
    <>
      <WindowTitle title={product?.name} />
      <ProductPurchaseEmailPage
        errors={errors}
        header={product?.name}
        loading={loading}
        product={product}
        saveButtonBarState={formTransitionState}
        onBack={handleBack}
        onSubmit={handleSubmit}
      />
    </>
  );
};
export default ProductPurchaseEmailCreate;
