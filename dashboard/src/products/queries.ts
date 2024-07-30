import {
  attributeValueFragment,
  attributeValueListFragment
} from "@saleor/fragments/attributes";
import { pageInfoFragment } from "@saleor/fragments/pageInfo";
import {
  fragmentVariant,
  productFragment,
  productFragmentDetails,
  // productVariantAttributesFragment,
  variantAttributeFragment
} from "@saleor/fragments/products";
import { taxTypeFragment } from "@saleor/fragments/taxes";
// import { warehouseFragment } from "@saleor/fragments/warehouses";
import makeQuery from "@saleor/hooks/makeQuery";
import {
  ProductMediaById,
  ProductMediaByIdVariables
} from "@saleor/products/types/ProductMediaById";
import gql from "graphql-tag";

import {
  AvailableInGridAttributes,
  AvailableInGridAttributesVariables
} from "./types/AvailableInGridAttributes";
// import {
//   CreateMultipleVariantsData,
//   CreateMultipleVariantsDataVariables
// } from "./types/CreateMultipleVariantsData";
import {
  GetCollectionBySlug,
  GetCollectionBySlugVariables
} from "./types/GetCollectionBySlug";
import {
  GetFraudulentProductReports,
  GetFraudulentProductReportsVariables
} from "./types/GetFraudulentProductReports";
import {
  GetPaymentMethods,
  GetPaymentMethodsVariables
} from "./types/GetPaymentMethods";
import {
  GridAttributes,
  GridAttributesVariables
} from "./types/GridAttributes";
import { InitialProductFilterAttributes } from "./types/InitialProductFilterAttributes";
import {
  InitialProductFilterCategories,
  InitialProductFilterCategoriesVariables
} from "./types/InitialProductFilterCategories";
import {
  InitialProductFilterCollections,
  InitialProductFilterCollectionsVariables
} from "./types/InitialProductFilterCollections";
import {
  InitialProductFilterProductTypes,
  InitialProductFilterProductTypesVariables
} from "./types/InitialProductFilterProductTypes";
import { ProductCount, ProductCountVariables } from "./types/ProductCount";
import {
  ProductDetails,
  ProductDetailsVariables
} from "./types/ProductDetails";
import { ProductList, ProductListVariables } from "./types/ProductList";
import {
  ProductPurchaseEmail,
  ProductPurchaseEmailVariables
} from "./types/ProductPurchaseEmail";
import { ProductType, ProductTypeVariables } from "./types/ProductType";
import {
  ProductVariantCreateData,
  ProductVariantCreateDataVariables
} from "./types/ProductVariantCreateData";
import {
  ProductVariantDetails,
  ProductVariantDetailsVariables
} from "./types/ProductVariantDetails";

const initialProductFilterAttributesQuery = gql`
  query InitialProductFilterAttributes {
    attributes(
      first: 100
      filter: { filterableInDashboard: true, type: PRODUCT_TYPE }
    ) {
      edges {
        node {
          id
          name
          inputType
          slug
        }
      }
    }
  }
`;

export const useInitialProductFilterAttributesQuery = makeQuery<
  InitialProductFilterAttributes,
  never
>(initialProductFilterAttributesQuery);

const initialProductFilterCategoriesQuery = gql`
  query InitialProductFilterCategories($categories: [ID!]) {
    categories(first: 100, filter: { ids: $categories }) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
export const useInitialProductFilterCategoriesQuery = makeQuery<
  InitialProductFilterCategories,
  InitialProductFilterCategoriesVariables
>(initialProductFilterCategoriesQuery);

const initialProductFilterCollectionsQuery = gql`
  query InitialProductFilterCollections($collections: [ID!]) {
    collections(first: 100, filter: { ids: $collections }) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
export const useInitialProductFilterCollectionsQuery = makeQuery<
  InitialProductFilterCollections,
  InitialProductFilterCollectionsVariables
>(initialProductFilterCollectionsQuery);

const initialProductFilterProductTypesQuery = gql`
  query InitialProductFilterProductTypes($productTypes: [ID!]) {
    productTypes(first: 100, filter: { ids: $productTypes }) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
export const useInitialProductFilterProductTypesQuery = makeQuery<
  InitialProductFilterProductTypes,
  InitialProductFilterProductTypesVariables
>(initialProductFilterProductTypesQuery);

const productListQuery = gql`
  ${productFragment}
  ${attributeValueFragment}
  query ProductList(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $filter: ProductFilterInput
    $channel: String
    $company: ID
    $sort: ProductOrder
  ) {
    products(
      before: $before
      after: $after
      first: $first
      last: $last
      filter: $filter
      sortBy: $sort
      channel: $channel
      company: $company
    ) {
      edges {
        node {
          ...ProductFragment
          attributes {
            attribute {
              id
            }
            values {
              ...AttributeValueFragment
            }
          }
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
`;
export const useProductListQuery = makeQuery<ProductList, ProductListVariables>(
  productListQuery
);

const productCountQuery = gql`
  query ProductCount($filter: ProductFilterInput, $channel: String) {
    products(filter: $filter, channel: $channel) {
      totalCount
    }
  }
`;

export const useProductCountQuery = makeQuery<
  ProductCount,
  ProductCountVariables
>(productCountQuery);

const productDetailsQuery = gql`
  ${productFragmentDetails}
  ${taxTypeFragment}
  query ProductDetails(
    $id: ID!
    $channel: String
    $sellerRequest: Boolean
    $firstValues: Int
    $afterValues: String
    $lastValues: Int
    $beforeValues: String
  ) {
    product(id: $id, channel: $channel, sellerRequest: $sellerRequest) {
      ...Product
    }
    taxTypes {
      ...TaxTypeFragment
    }
  }
`;
export const useProductDetails = makeQuery<
  ProductDetails,
  ProductDetailsVariables
>(productDetailsQuery);

const productTypeQuery = gql`
  ${taxTypeFragment}
  ${attributeValueListFragment}
  query ProductType(
    $id: ID!
    $firstValues: Int
    $afterValues: String
    $lastValues: Int
    $beforeValues: String
  ) {
    productType(id: $id) {
      id
      name
      hasVariants
      productAttributes {
        id
        inputType
        entityType
        slug
        name
        valueRequired
        unit
        choices(
          first: $firstValues
          after: $afterValues
          last: $lastValues
          before: $beforeValues
        ) {
          ...AttributeValueListFragment
        }
      }
      taxType {
        ...TaxTypeFragment
      }
    }
  }
`;
export const useProductTypeQuery = makeQuery<ProductType, ProductTypeVariables>(
  productTypeQuery
);

const productVariantQuery = gql`
  ${fragmentVariant}
  query ProductVariantDetails(
    $id: ID!
    $channel: String
    $sellerRequest: Boolean
    $firstValues: Int
    $afterValues: String
    $lastValues: Int
    $beforeValues: String
  ) {
    productVariant(id: $id, channel: $channel, sellerRequest: $sellerRequest) {
      ...ProductVariant
    }
  }
`;
export const useProductVariantQuery = makeQuery<
  ProductVariantDetails,
  ProductVariantDetailsVariables
>(productVariantQuery);

const productVariantCreateQuery = gql`
  ${variantAttributeFragment}
  query ProductVariantCreateData(
    $id: ID!
    $sellerRequest: Boolean
    $firstValues: Int
    $afterValues: String
    $lastValues: Int
    $beforeValues: String
  ) {
    product(id: $id, sellerRequest: $sellerRequest) {
      id
      media {
        id
        sortOrder
        url
      }
      channelListings {
        channel {
          id
          name
          currencyCode
        }
      }
      name
      productType {
        id
        selectionVariantAttributes: variantAttributes(
          variantSelection: VARIANT_SELECTION
        ) {
          ...VariantAttributeFragment
        }
        nonSelectionVariantAttributes: variantAttributes(
          variantSelection: NOT_VARIANT_SELECTION
        ) {
          ...VariantAttributeFragment
        }
      }
      thumbnail {
        url
      }
      variants {
        id
        name
        sku
        media {
          id
          url
          type
        }
      }
    }
  }
`;
export const useProductVariantCreateQuery = makeQuery<
  ProductVariantCreateData,
  ProductVariantCreateDataVariables
>(productVariantCreateQuery);

const productMediaQuery = gql`
  query ProductMediaById(
    $productId: ID!
    $sellerRequest: Boolean
    $mediaId: ID!
  ) {
    product(id: $productId, sellerRequest: $sellerRequest) {
      id
      name
      mainImage: mediaById(id: $mediaId) {
        id
        alt
        url
        type
        oembedData
      }
      media {
        id
        url(size: 48)
        alt
        type
        oembedData
      }
    }
  }
`;
export const useProductMediaQuery = makeQuery<
  ProductMediaById,
  ProductMediaByIdVariables
>(productMediaQuery);

const availableInGridAttributes = gql`
  ${pageInfoFragment}
  query AvailableInGridAttributes($first: Int!, $after: String) {
    availableInGrid: attributes(
      first: $first
      after: $after
      filter: {
        availableInGrid: true
        isVariantOnly: false
        type: PRODUCT_TYPE
      }
    ) {
      edges {
        node {
          id
          name
        }
      }
      pageInfo {
        ...PageInfoFragment
      }
      totalCount
    }
  }
`;
export const useAvailableInGridAttributesQuery = makeQuery<
  AvailableInGridAttributes,
  AvailableInGridAttributesVariables
>(availableInGridAttributes);

const gridAttributes = gql`
  query GridAttributes($ids: [ID!]!) {
    grid: attributes(first: 25, filter: { ids: $ids }) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
export const useGridAttributesQuery = makeQuery<
  GridAttributes,
  GridAttributesVariables
>(gridAttributes);

// const createMultipleVariantsData = gql`
//   ${productVariantAttributesFragment}
//   ${warehouseFragment}
//   query CreateMultipleVariantsData(
//     $id: ID!
//     $firstValues: Int
//     $afterValues: String
//     $lastValues: Int
//     $beforeValues: String
//   ) {
//     product(id: $id) {
//       ...ProductVariantAttributesFragment
//     }
//     warehouses(first: 20) {
//       edges {
//         node {
//           ...WarehouseFragment
//         }
//       }
//     }
//   }
// `;
// export const useCreateMultipleVariantsData = makeQuery<
//   CreateMultipleVariantsData,
//   CreateMultipleVariantsDataVariables
// >(createMultipleVariantsData);

export const getCollectionBySlug = gql`
  query GetCollectionBySlug($slug: String) {
    collection(slug: $slug) {
      id
      name
    }
  }
`;
export const useGetCollectionBySlug = makeQuery<
  GetCollectionBySlug,
  GetCollectionBySlugVariables
>(getCollectionBySlug);

export const getFraudulentProductReports = gql`
  query GetFraudulentProductReports(
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    fraudulentProductReports(
      first: $first
      after: $after
      last: $last
      before: $before
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          user {
            id
            firstName
            lastName
            email
            isStaff
            avatar {
              alt
              url
            }
          }
          product {
            id
            name
            thumbnail {
              alt
              url
            }
            company {
              id
              name
            }
          }
          date
          reason
          phone
          media {
            id
            alt
            oembedData
            url
          }
        }
      }
      totalCount
    }
  }
`;
export const useGetFraudulentProductReports = makeQuery<
  GetFraudulentProductReports,
  GetFraudulentProductReportsVariables
>(getFraudulentProductReports);

export const getPaymentMethods = gql`
  query GetPaymentMethods(
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    paymentMethods(first: $first, after: $after, last: $last, before: $before) {
      edges {
        node {
          id
          identifier
          name
          isActive
        }
      }
      totalCount
    }
  }
`;
export const useGetPaymentMethods = makeQuery<
  GetPaymentMethods,
  GetPaymentMethodsVariables
>(getPaymentMethods);

// Purchase Email
export const productPurchaseEmailQuery = gql`
  query ProductPurchaseEmail(
    $id: ID!
    $channel: String
    $sellerRequest: Boolean!
  ) {
    product(id: $id, channel: $channel, sellerRequest: $sellerRequest) {
      id
      name
      slug
      isBookable
      purchaseEmail {
        subject
        title
        content
      }
    }
  }
`;
export const useProductPurchaseEmailQuery = makeQuery<
  ProductPurchaseEmail,
  ProductPurchaseEmailVariables
>(productPurchaseEmailQuery);
