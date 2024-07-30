import { IFilter } from "@saleor/components/Filter";
import { sectionNames } from "@saleor/intl";
import { AutocompleteFilterOpts, FilterOpts, MinMax } from "@saleor/types";
import { AttributeInputTypeEnum } from "@saleor/types/globalTypes";
import {
  createAutocompleteField,
  createDateField,
  createOptionsField
  // createPriceField
} from "@saleor/utils/filters/fields";
import { defineMessages, IntlShape } from "react-intl";

export enum ServiceStatusEnum {
  ACTIVE = "ACTIVE",
  DEACTIVE = "DEACTIVE"
}

export enum ProductFilterKeys {
  createdDate = "createdDate",
  modifiedDate = "modifiedDate",
  categories = "categories",
  collections = "collections",
  price = "price",
  status = "status"
}

export type AttributeFilterOpts = FilterOpts<string[]> & {
  id: string;
  name: string;
  slug: string;
  inputType: AttributeInputTypeEnum;
};

export interface ProductListFilterOpts {
  createdDate: FilterOpts<MinMax>;
  modifiedDate: FilterOpts<MinMax>;
  categories: FilterOpts<string[]> & AutocompleteFilterOpts;
  collections: FilterOpts<string[]> & AutocompleteFilterOpts;
  price: FilterOpts<MinMax>;
  status: FilterOpts<ServiceStatusEnum>;
}

const messages = defineMessages({
  active: {
    defaultMessage: "Active",
    description: "active service"
  },
  deactive: {
    defaultMessage: "Deactive",
    description: "deactive service"
  },
  available: {
    defaultMessage: "Available",
    description: "service status"
  },
  createdDate: {
    defaultMessage: "Created date",
    description: "service created date"
  },
  hidden: {
    defaultMessage: "Hidden",
    description: "service is hidden"
  },
  modifiedDate: {
    defaultMessage: "Modified date",
    description: "service modification date"
  },
  price: {
    defaultMessage: "Price"
  },
  status: {
    defaultMessage: "Status",
    description: "service status"
  },
  visibility: {
    defaultMessage: "Visibility",
    description: "service visibility"
  },
  visible: {
    defaultMessage: "Visible",
    description: "service is visible"
  }
});

export function createFilterStructure(
  intl: IntlShape,
  opts: ProductListFilterOpts
): IFilter<string> {
  return [
    {
      ...createOptionsField(
        ProductFilterKeys.status,
        intl.formatMessage(messages.status),
        [opts.status.value],
        false,
        [
          {
            label: intl.formatMessage(messages.active),
            value: ServiceStatusEnum.ACTIVE
          },
          {
            label: intl.formatMessage(messages.deactive),
            value: ServiceStatusEnum.DEACTIVE
          }
        ]
      )
    },
    {
      ...createDateField(
        ProductFilterKeys.createdDate,
        intl.formatMessage(messages.createdDate),
        opts.createdDate.value
      ),
      active: opts.createdDate.active
    },
    {
      ...createDateField(
        ProductFilterKeys.modifiedDate,
        intl.formatMessage(messages.modifiedDate),
        opts.modifiedDate.value
      ),
      active: opts.modifiedDate.active
    },
    // Commented untill needed --> maybe with billable service
    // {
    //   ...createPriceField(
    //     ProductFilterKeys.price,
    //     intl.formatMessage(messages.price),
    //     opts.price.value
    //   ),
    //   active: opts.price.active
    // },
    {
      ...createAutocompleteField(
        ProductFilterKeys.categories,
        intl.formatMessage(sectionNames.categories),
        opts.categories.value,
        opts.categories.displayValues,
        true,
        opts.categories.choices,
        {
          hasMore: opts.categories.hasMore,
          initialSearch: "",
          loading: opts.categories.loading,
          onFetchMore: opts.categories.onFetchMore,
          onSearchChange: opts.categories.onSearchChange
        }
      ),
      active: opts.categories.active
    },
    {
      ...createAutocompleteField(
        ProductFilterKeys.collections,
        intl.formatMessage(sectionNames.collections),
        opts.collections.value,
        opts.collections.displayValues,
        true,
        opts.collections.choices,
        {
          hasMore: opts.collections.hasMore,
          initialSearch: "",
          loading: opts.collections.loading,
          onFetchMore: opts.collections.onFetchMore,
          onSearchChange: opts.collections.onSearchChange
        }
      ),
      active: opts.collections.active
    }
  ];
}
