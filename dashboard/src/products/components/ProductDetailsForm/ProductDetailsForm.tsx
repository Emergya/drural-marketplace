import { Card, CardContent, TextField } from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import ControlledCheckbox from "@saleor/components/ControlledCheckbox";
import FormSpacer from "@saleor/components/FormSpacer";
import PriceField from "@saleor/components/PriceField";
import RichTextEditor from "@saleor/components/RichTextEditor";
import Skeleton from "@saleor/components/Skeleton";
import { EUR_TO_HRK_RATE } from "@saleor/config";
import { commonMessages } from "@saleor/intl";
import { renderCollection } from "@saleor/misc";
import {
  getFormChannelError,
  getFormChannelErrors,
  getFormErrors,
  getProductErrorMessage
} from "@saleor/utils/errors";
import React from "react";
import { useIntl } from "react-intl";

import { useStyles } from "./styles";
import { ProductDetailsFormProps } from "./types";

export const ProductDetailsForm: React.FC<ProductDetailsFormProps> = ({
  data,
  disabled,
  isSimpleProduct,
  isUpdatePage,
  errors,
  channelsErrors,
  onChange,
  onDetailsChange,
  onDescriptionChange,
  onHasNoPriceChange,
  onPriceChange
}) => {
  const intl = useIntl();
  const classes = useStyles();

  const formErrors = getFormErrors(
    ["name", "description", "details", "rating"],
    errors
  );
  const formChannelErrors = getFormChannelErrors(["price"], channelsErrors);

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage(commonMessages.generalInformations)}
      />
      <CardContent>
        <TextField
          error={!!formErrors.name}
          helperText={getProductErrorMessage(formErrors.name, intl)}
          disabled={disabled}
          fullWidth
          label={intl.formatMessage({
            defaultMessage: "Name",
            description: "product name"
          })}
          name="name"
          value={data.name}
          onChange={onChange}
          required
        />
        <FormSpacer />
        <RichTextEditor
          data={data.description}
          disabled={disabled}
          error={!!formErrors.description}
          helperText={getProductErrorMessage(formErrors.description, intl)}
          label={intl.formatMessage(commonMessages.description)}
          name="description"
          onChange={onDescriptionChange}
          required
        />
        <FormSpacer />
        <RichTextEditor
          data={data.details}
          disabled={disabled}
          error={!!formErrors.details}
          helperText={intl.formatMessage({
            defaultMessage:
              "Write a list including the main features of the service."
          })}
          label={intl.formatMessage(commonMessages.serviceDetails)}
          name="details"
          onChange={onDetailsChange}
        />
        {isSimpleProduct &&
          renderCollection(data.channelListings, listing => {
            const priceError = getFormChannelError(
              formChannelErrors.price,
              listing.id
            );

            return listing ? (
              <div key={listing.id}>
                <FormSpacer className={classes.customSpacer} />
                <div className={classes.priceWrapper}>
                  <PriceField
                    className={classes.price}
                    convertValueToKuna={!!EUR_TO_HRK_RATE}
                    error={!!priceError}
                    label={intl.formatMessage({
                      defaultMessage: "Price"
                    })}
                    minValue={data.isBillable ? 0.5 : 0}
                    name={`${listing.id}-channel-price`}
                    value={listing.price || ""}
                    currencySymbol={listing.currency}
                    onChange={e =>
                      onPriceChange(listing.id, {
                        costPrice: listing.costPrice,
                        price: e.target.value
                      })
                    }
                    disabled={disabled || data.hasNoPrice}
                    hint={
                      priceError && getProductErrorMessage(priceError, intl)
                    }
                    required={!data.hasNoPrice}
                  />
                  <ControlledCheckbox
                    className={classes.hasNoPrice}
                    checked={data.hasNoPrice}
                    disabled={disabled || isUpdatePage}
                    label={intl.formatMessage({
                      defaultMessage: "This service has no price"
                    })}
                    name="hasNoPrice"
                    onChange={onHasNoPriceChange}
                  />
                </div>
              </div>
            ) : (
              <Skeleton />
            );
          })}
      </CardContent>
    </Card>
  );
};
export default ProductDetailsForm;
