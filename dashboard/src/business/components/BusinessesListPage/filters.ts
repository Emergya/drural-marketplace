import { IFilter } from "@saleor/components/Filter";
import { commonMessages } from "@saleor/intl";
import {
  businessActiveShopMessages,
  businessStatusMessages
} from "@saleor/misc";
import { FilterOpts, MinMax } from "@saleor/types";
import { CompanyStatusEnum } from "@saleor/types/globalTypes";
import {
  createDateField,
  createOptionsField,
  createTextField
} from "@saleor/utils/filters/fields";
import { defineMessages, IntlShape } from "react-intl";

export enum BusinessActiveShopEnum {
  ACTIVE = "ACTIVE",
  DEACTIVE = "DEACTIVE"
}

export enum BusinessesFilterKeys {
  created = "created",
  status = "status",
  activeShop = "activeShop",
  locality = "locality",
  postalCode = "postalCode"
}

export interface BusinessListFilterOpts {
  created: FilterOpts<MinMax>;
  status: FilterOpts<CompanyStatusEnum[]>;
  activeShop: FilterOpts<BusinessActiveShopEnum[]>;
  locality: FilterOpts<string>;
  postalCode: FilterOpts<string>;
}

const messages = defineMessages({
  placed: {
    defaultMessage: "Created",
    description: "businesses"
  }
});

export function createFilterStructure(
  intl: IntlShape,
  opts: BusinessListFilterOpts
): IFilter<BusinessesFilterKeys> {
  return [
    {
      ...createDateField(
        BusinessesFilterKeys.created,
        intl.formatMessage(messages.placed),
        opts.created.value
      ),
      active: opts.created.active
    },
    {
      ...createOptionsField(
        BusinessesFilterKeys.status,
        intl.formatMessage(commonMessages.status),
        opts.status.value,
        true,
        [
          {
            label: intl.formatMessage(businessStatusMessages.accepted),
            value: CompanyStatusEnum.ACCEPTED
          },
          {
            label: intl.formatMessage(businessStatusMessages.rejected),
            value: CompanyStatusEnum.REJECTED
          },
          {
            label: intl.formatMessage(businessStatusMessages.pending),
            value: CompanyStatusEnum.PENDING
          },
          {
            label: intl.formatMessage(businessStatusMessages.suspended),
            value: CompanyStatusEnum.DEACTIVATED
          }
        ]
      ),
      active: opts.status.active
    },
    {
      ...createOptionsField(
        BusinessesFilterKeys.activeShop,
        intl.formatMessage(commonMessages.activeShop),
        opts.activeShop.value,
        false,
        [
          {
            label: intl.formatMessage(businessActiveShopMessages.active),
            value: BusinessActiveShopEnum.ACTIVE
          },
          {
            label: intl.formatMessage(businessActiveShopMessages.deactive),
            value: BusinessActiveShopEnum.DEACTIVE
          }
        ]
      )
    },
    {
      ...createTextField(
        BusinessesFilterKeys.locality,
        intl.formatMessage(commonMessages.locality),
        opts.locality.value
      ),
      active: opts.locality.active
    },
    {
      ...createTextField(
        BusinessesFilterKeys.postalCode,
        intl.formatMessage(commonMessages.postalCode),
        opts.postalCode.value
      ),
      active: opts.postalCode.active
    }
  ];
}
