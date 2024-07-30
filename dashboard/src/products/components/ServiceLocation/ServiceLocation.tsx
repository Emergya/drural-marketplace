import {
  Card,
  CardContent,
  FormControlLabel,
  Radio,
  RadioGroup
} from "@material-ui/core";
import AddressFormatter from "@saleor/components/AddressFormatter";
import CardMenu from "@saleor/components/CardMenu";
import CardTitle from "@saleor/components/CardTitle";
import FormSpacer from "@saleor/components/FormSpacer";
import { ProductErrorFragment } from "@saleor/fragments/types/ProductErrorFragment";
import { commonMessages } from "@saleor/intl";
import { maybe } from "@saleor/misc";
import { ProductAddressFormData } from "@saleor/products/utils/data";
import React from "react";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useIntl } from "react-intl";

import { AddressTypeEnum } from "../ProductCreatePage";
import ServiceAddressDialog from "../ServiceAddressDialog";

interface ServiceLocationProps {
  data: {
    address: ProductAddressFormData;
    addressType?: string;
  };
  disabled?: boolean;
  isProductUpdatePage?: boolean;
  errors: ProductErrorFragment[];
  onChange(event: any);
}

const ServiceLocation: React.FC<ServiceLocationProps> = ({
  data,
  isProductUpdatePage,
  onChange
}) => {
  const intl = useIntl();
  const [isOpen, setOpen] = useState(false);
  const [showAddressBox, setShowAddressBox] = useState(false);

  const handdleCloseDialog = () => {
    setOpen(false);
    if (!isProductUpdatePage) {
      onChange({
        target: {
          name: "addressType",
          value: AddressTypeEnum.DEFAULT_ADDRESS
        }
      });
    }
  };

  React.useEffect(() => {
    if (
      data?.addressType === AddressTypeEnum.CUSTOM_ADDRESS ||
      isProductUpdatePage
    ) {
      setShowAddressBox(true);
      if (!isProductUpdatePage) {
        setOpen(true);
      }
    } else if (data?.addressType === AddressTypeEnum.DEFAULT_ADDRESS) {
      setShowAddressBox(false);
    }
  }, [data.addressType]);

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage(commonMessages.serviceLocation)}
        toolbar={
          showAddressBox && (
            <CardMenu
              menuItems={[
                {
                  label: intl.formatMessage({
                    defaultMessage: "Manage"
                  }),
                  onSelect: () => setOpen(true)
                }
              ]}
            />
          )
        }
      />
      <CardContent>
        {!isProductUpdatePage && (
          <RadioGroup name="location" value={data.addressType}>
            <FormControlLabel
              value={AddressTypeEnum.DEFAULT_ADDRESS}
              control={
                <Radio
                  name="addressType"
                  value={AddressTypeEnum.DEFAULT_ADDRESS}
                  onChange={onChange}
                />
              }
              label={<FormattedMessage defaultMessage="Shop location" />}
            />
            <FormControlLabel
              value={AddressTypeEnum.CUSTOM_ADDRESS}
              control={
                <Radio
                  name="addressType"
                  value={AddressTypeEnum.CUSTOM_ADDRESS}
                  onChange={onChange}
                />
              }
              label={<FormattedMessage defaultMessage="Other location" />}
            />
          </RadioGroup>
        )}
        {showAddressBox && (
          <>
            {!isProductUpdatePage && <FormSpacer />}
            <AddressFormatter businessAddress={maybe(() => data.address)} />
          </>
        )}
        <ServiceAddressDialog
          address={data.address}
          onChange={onChange}
          setShowAddressBox={() => {
            setShowAddressBox(true);
            setOpen(false);
          }}
          open={isOpen}
          onClose={handdleCloseDialog}
        />
      </CardContent>
    </Card>
  );
};

export default ServiceLocation;
