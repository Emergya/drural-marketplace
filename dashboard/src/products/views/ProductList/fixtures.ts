import { categories } from "@saleor/categories/fixtures";
import { collections } from "@saleor/collections/fixtures";
import { fetchMoreProps, searchPageProps } from "@saleor/fixtures";
import {
  ProductListFilterOpts,
  ServiceStatusEnum
} from "@saleor/products/components/ProductListPage";

export const productListFilterOpts: ProductListFilterOpts = {
  categories: {
    ...fetchMoreProps,
    ...searchPageProps,
    active: false,
    choices: categories.slice(5).map(category => ({
      label: category.name,
      value: category.id
    })),
    displayValues: [
      {
        label: categories[5].name,
        value: categories[5].id
      }
    ],
    value: [categories[5].id]
  },
  collections: {
    ...fetchMoreProps,
    ...searchPageProps,
    active: false,
    choices: collections.slice(5).map(category => ({
      label: category.name,
      value: category.id
    })),
    displayValues: [
      {
        label: collections[5].name,
        value: collections[5].id
      }
    ],
    value: [collections[5].id]
  },
  createdDate: {
    active: false,
    value: {
      max: "2021-10-23T15:59:23.192891+00:00",
      min: "2021-10-23T15:59:23.346243+00:00"
    }
  },
  modifiedDate: {
    active: false,
    value: {
      max: "2021-10-23T15:59:23.192891+00:00",
      min: "2021-10-23T15:59:23.346243+00:00"
    }
  },
  price: {
    active: false,
    value: {
      max: "20",
      min: "10"
    }
  },
  status: {
    active: false,
    value: ServiceStatusEnum.ACTIVE
  }
};
