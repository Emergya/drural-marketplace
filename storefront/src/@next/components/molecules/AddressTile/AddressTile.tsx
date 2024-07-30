import { UilEdit, UilEllipsisV, UilTrashAlt } from "@iconscout/react-unicons";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import {
  Address,
  DropdownMenu,
  IconButtonDrural,
  Tile,
} from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

const defaultShippingAddress = (
  <S.MenuItem>
    <FormattedMessage defaultMessage="Set as default shipping address" />
  </S.MenuItem>
);
const defaultBillingAddress = (
  <S.MenuItem>
    <FormattedMessage defaultMessage="Set as default billing address" />
  </S.MenuItem>
);

export const AddressTile: React.FC<IProps> = ({
  onEdit,
  onRemove,
  setDefault,
  address,
}: IProps) => {
  const intl = useIntl();
  const header = (
    <S.HeaderContent>
      <DropdownMenu
        type="clickable"
        header={
          <IconButtonDrural color="primary" testingContext="expandButton">
            <UilEllipsisV size="24" color="#fff" />
          </IconButtonDrural>
        }
        items={[
          {
            content: defaultBillingAddress,
            onClick: () => {
              setDefault("BILLING");
            },
            testingContext: "set-billing",
          },
          {
            content: defaultShippingAddress,
            onClick: () => {
              setDefault("SHIPPING");
            },
            testingContext: "set-shipping",
          },
        ]}
      />

      {address.isDefaultBillingAddress && address.isDefaultShippingAddress ? (
        <h3>{intl.formatMessage({ defaultMessage: "Default address" })}</h3>
      ) : address.isDefaultShippingAddress ? (
        <h3>
          {intl.formatMessage({ defaultMessage: "Default shipping address" })}
        </h3>
      ) : address.isDefaultBillingAddress ? (
        <h3>
          {intl.formatMessage({ defaultMessage: "Default billing address" })}
        </h3>
      ) : null}
    </S.HeaderContent>
  );
  const footer = (
    <S.FooterContent>
      <div>
        <IconButtonDrural
          color="secondary"
          testingContext="editButton"
          onClick={onEdit}
        >
          <UilEdit size="24" color="#fff" />
        </IconButtonDrural>
      </div>
      <div>
        <IconButtonDrural
          color="primary"
          testingContext="removeButton"
          onClick={onRemove}
        >
          <UilTrashAlt size="24" color="#fff" />
        </IconButtonDrural>
      </div>
    </S.FooterContent>
  );

  const content = <Address {...address} />;
  return (
    <S.Wrapper
      data-test-billing-default={address.isDefaultBillingAddress}
      data-test-shipping-default={address.isDefaultShippingAddress}
    >
      <Tile footer={footer} header={header}>
        {content}
      </Tile>
    </S.Wrapper>
  );
};
