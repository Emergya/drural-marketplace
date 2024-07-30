import gql from "graphql-tag";

import {
  attributeValueFragment,
  attributeValueListFragment
} from "./attributes";
import { metadataFragment } from "./metadata";
import { taxTypeFragment } from "./taxes";
import { weightFragment } from "./weight";

export const stockFragment = gql`
  fragment StockFragment on Stock {
    id
    quantity
    quantityAllocated
    warehouse {
      id
      name
    }
  }
`;

export const fragmentMoney = gql`
  fragment Money on Money {
    amount
    currency
  }
`;

export const priceRangeFragment = gql`
  ${fragmentMoney}
  fragment PriceRangeFragment on TaxedMoneyRange {
    start {
      net {
        ...Money
      }
    }
    stop {
      net {
        ...Money
      }
    }
  }
`;

export const fragmentProductMedia = gql`
  fragment ProductMediaFragment on ProductMedia {
    id
    alt
    sortOrder
    url
    type
    oembedData
  }
`;

export const channelListingProductWithoutPricingFragment = gql`
  fragment ChannelListingProductWithoutPricingFragment on ProductChannelListing {
    isPublished
    publicationDate
    isAvailableForPurchase
    availableForPurchase
    visibleInListings
    channel {
      id
      name
      currencyCode
    }
  }
`;
export const channelListingProductFragment = gql`
  ${priceRangeFragment}
  ${channelListingProductWithoutPricingFragment}
  fragment ChannelListingProductFragment on ProductChannelListing {
    ...ChannelListingProductWithoutPricingFragment
    pricing {
      priceRange {
        ...PriceRangeFragment
      }
    }
    isPublished
  }
`;

export const channelListingProductVariantFragment = gql`
  ${fragmentMoney}
  fragment ChannelListingProductVariantFragment on ProductVariantChannelListing {
    channel {
      id
      name
      currencyCode
    }
    price {
      ...Money
    }
    costPrice {
      ...Money
    }
  }
`;

export const productFragment = gql`
  ${channelListingProductFragment}
  fragment ProductFragment on Product {
    id
    name
    thumbnail {
      url
    }
    categories(first: 20) {
      edges {
        node {
          id
          name
        }
      }
    }
    collections {
      id
    }
    company {
      id
      name
      publicName
    }
    createdAt
    updatedAt
    productType {
      id
      name
      hasVariants
    }
    channelListings {
      ...ChannelListingProductFragment
    }
    isAvailableForPurchase
  }
`;

export const productVariantAttributesFragment = gql`
  ${priceRangeFragment}
  ${attributeValueFragment}
  ${attributeValueListFragment}
  fragment ProductVariantAttributesFragment on Product {
    id
    attributes {
      attribute {
        id
        slug
        name
        inputType
        entityType
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
      values {
        ...AttributeValueFragment
      }
    }
    productType {
      id
      variantAttributes(variantSelection: VARIANT_SELECTION) {
        id
        name
        inputType
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
    }
    channelListings {
      channel {
        id
        name
        currencyCode
      }
      pricing {
        priceRange {
          ...PriceRangeFragment
        }
      }
    }
  }
`;

export const productFragmentDetails = gql`
  ${fragmentProductMedia}
  ${productVariantAttributesFragment}
  ${stockFragment}
  ${weightFragment}
  ${metadataFragment}
  ${taxTypeFragment}
  ${channelListingProductFragment}
  ${channelListingProductVariantFragment}
  fragment Product on Product {
    ...ProductVariantAttributesFragment
    ...MetadataFragment
    name
    slug
    description
    details
    hasNoPrice
    seoTitle
    seoDescription
    rating
    url
    defaultVariant {
      id
    }
    company {
      id
      name
      status
      isEnabled
      publicName
      imageUrl
      publishedProducts: products(
        channel: $channel
        filter: { isPublished: true }
      ) {
        totalCount
      }
      stripeCredentials {
        accountId
        isEnabled
      }
    }
    address {
      street
      streetSecondLine
      postalCode
      locality
      region
      country
      id
      latitude
      longitude
    }
    category {
      id
      name
    }
    categories(first: 20) {
      edges {
        node {
          id
          name
        }
      }
    }
    collections {
      id
      name
    }
    chargeTaxes
    channelListings {
      ...ChannelListingProductFragment
    }
    media {
      ...ProductMediaFragment
    }
    isAvailable
    isBillable
    isBookable
    paymentMethods {
      id
      identifier
      name
      isActive
    }
    duration
    bookableResources(first: 100) {
      edges {
        node {
          id
        }
      }
    }
    keywords(first: 100) {
      edges {
        node {
          id
          nameKeyword
        }
      }
    }
    purchaseEmail {
      subject
      title
      content
    }
    variants {
      id
      sku
      name
      margin
      media {
        url(size: 200)
      }
      stocks {
        ...StockFragment
      }
      trackInventory
      channelListings {
        ...ChannelListingProductVariantFragment
      }
    }
    productType {
      id
      name
      hasVariants
      taxType {
        ...TaxTypeFragment
      }
    }
    weight {
      ...WeightFragment
    }
    taxType {
      ...TaxTypeFragment
    }
  }
`;

export const variantAttributeFragment = gql`
  ${attributeValueListFragment}
  fragment VariantAttributeFragment on Attribute {
    id
    name
    slug
    inputType
    entityType
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
`;

export const selectedVariantAttributeFragment = gql`
  ${attributeValueFragment}
  ${variantAttributeFragment}
  fragment SelectedVariantAttributeFragment on SelectedAttribute {
    attribute {
      ...VariantAttributeFragment
    }
    values {
      ...AttributeValueFragment
    }
  }
`;

export const fragmentVariant = gql`
  ${fragmentProductMedia}
  ${selectedVariantAttributeFragment}
  ${priceRangeFragment}
  ${fragmentProductMedia}
  ${stockFragment}
  ${weightFragment}
  ${metadataFragment}
  ${channelListingProductVariantFragment}
  fragment ProductVariant on ProductVariant {
    id
    ...MetadataFragment
    selectionAttributes: attributes(variantSelection: VARIANT_SELECTION) {
      ...SelectedVariantAttributeFragment
    }
    nonSelectionAttributes: attributes(
      variantSelection: NOT_VARIANT_SELECTION
    ) {
      ...SelectedVariantAttributeFragment
    }
    media {
      id
      url
      type
      oembedData
    }
    name
    product {
      id
      defaultVariant {
        id
      }
      media {
        ...ProductMediaFragment
      }
      name
      thumbnail {
        url
      }
      channelListings {
        publicationDate
        isPublished
        channel {
          id
          name
          currencyCode
        }
        pricing {
          priceRange {
            ...PriceRangeFragment
          }
        }
      }
      variants {
        id
        name
        sku
        media {
          id
          url
          type
          oembedData
        }
      }
      defaultVariant {
        id
      }
    }
    channelListings {
      ...ChannelListingProductVariantFragment
    }
    sku
    stocks {
      ...StockFragment
    }
    trackInventory
    weight {
      ...WeightFragment
    }
  }
`;

export const exportFileFragment = gql`
  fragment ExportFileFragment on ExportFile {
    id
    status
    url
  }
`;
