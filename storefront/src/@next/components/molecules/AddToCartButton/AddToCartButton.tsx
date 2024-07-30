import React from "react";
import { FormattedMessage } from "react-intl";

import { Button } from "@components/atoms";

export interface IAddToCartButton {
  disabled: boolean;
  isBookableProduct: boolean;
  onSubmit: () => void;
}

export const AddToCartButton: React.FC<IAddToCartButton> = ({
  disabled,
  isBookableProduct,
  onSubmit,
}) => {
  return (
    <Button
      fullWidth
      testingContext="addProductToCartButton"
      onClick={onSubmit}
      color="primary"
      disabled={disabled}
    >
      {isBookableProduct ? (
        <FormattedMessage defaultMessage="Book this service" />
      ) : (
        <FormattedMessage defaultMessage="Purchase" />
      )}
    </Button>
  );
};
AddToCartButton.displayName = "AddToCartButton";
export default AddToCartButton;
