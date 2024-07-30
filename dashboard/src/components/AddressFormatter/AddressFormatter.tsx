import { Typography } from "@material-ui/core";
import { BusinessDetails_company_address } from "@saleor/business/types/BusinessDetails";
import { ProductAddressFormData } from "@saleor/products/utils/data";
import React from "react";

import { AddressType } from "../../customers/types";
import Skeleton from "../Skeleton";

interface AddressFormatterProps {
  address?: AddressType;
  businessAddress?: BusinessDetails_company_address | ProductAddressFormData;
}

const AddressFormatter: React.FC<AddressFormatterProps> = ({
  address,
  businessAddress
}) => (
  // TODO un switch que recojal los casos
  <address
    style={{
      fontStyle: "inherit"
    }}
  >
    {address && (
      <>
        <Typography component="p">
          {address.firstName} {address.lastName}
        </Typography>
        <Typography component="p">{address.phone}</Typography>
        {address.companyName && (
          <Typography component="p">{address.companyName}</Typography>
        )}
        <Typography component="p">
          {address.streetAddress1}
          <br />
          {address.streetAddress2}
        </Typography>
        <Typography component="p">
          {" "}
          {address.postalCode} {address.city}
          {address.cityArea ? ", " + address.cityArea : ""}
        </Typography>
        <Typography component="p">
          {address.countryArea
            ? address.countryArea + ", " + address.country.country
            : address.country.country}
        </Typography>
      </>
    )}
    {businessAddress && (
      <>
        <Typography component="p">{businessAddress.street}</Typography>
        <Typography component="p">
          {businessAddress.streetSecondLine}
        </Typography>
        <Typography component="p">
          {businessAddress.postalCode} {businessAddress.locality}
        </Typography>
        <Typography component="p">
          {businessAddress.region}
          {businessAddress.country && ", "}
          {businessAddress.country}
        </Typography>
      </>
    )}
    {!businessAddress && !address && <Skeleton />}
  </address>
);
AddressFormatter.displayName = "AddressFormatter";
export default AddressFormatter;
