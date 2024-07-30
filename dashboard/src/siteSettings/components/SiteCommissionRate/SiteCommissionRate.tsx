import { Card, CardContent } from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import PriceField from "@saleor/components/PriceField";
import { getFormErrors } from "@saleor/utils/errors";
import getShopErrorMessage from "@saleor/utils/errors/shop";
import React from "react";
import { useIntl } from "react-intl";

import { ISiteCommissionRateProps } from "./types";

const SiteCommissionRate: React.FC<ISiteCommissionRateProps> = ({
  data,
  disabled,
  errors,
  onChange
}) => {
  const intl = useIntl();

  const formErrors = getFormErrors(["commission"], errors);

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({ defaultMessage: "Site commission rate" })}
      />
      <CardContent>
        <PriceField
          disabled={disabled}
          error={!!formErrors.commission}
          fullWidth
          helperText={intl.formatMessage({
            defaultMessage: "Rate in base 1"
          })}
          hint={getShopErrorMessage(formErrors.commission, intl)}
          InputProps={{
            inputProps: {
              autoComplete: "none"
            }
          }}
          label={intl.formatMessage({
            defaultMessage: "Commission rate"
          })}
          maxValue={1}
          minValue={0}
          name="comissionRate"
          value={data.comissionRate}
          onChange={onChange}
          currencySymbol={null}
        />
      </CardContent>
    </Card>
  );
};
SiteCommissionRate.displayName = "SiteCommissionRate";
export default SiteCommissionRate;
