import gql from "graphql-tag";
import { checkoutPriceFragment } from "./checkout";

export const baseProductFragment = gql`
  fragment BaseProduct on Product {
    id
    name
    slug
    hasNoPrice
    isBillable
    isBookable
    seoDescription
    isAvailableForPurchase
    availableForPurchase
    seoTitle
    url
    thumbnail {
      url
      alt
    }
    thumbnail2x: thumbnail(size: 510) {
      url
    }
  }
`;

export const selectedAttributeFragment = gql`
  fragment SelectedAttributeFields on SelectedAttribute {
    attribute {
      id
      name
      slug
    }
    values {
      id
      name
    }
  }
`;

export const productVariantFragment = gql`
  ${checkoutPriceFragment}
  fragment ProductVariantFields on ProductVariant {
    id
    sku
    name
    quantityAvailable(countryCode: $countryCode)
    images {
      id
      url
      alt
    }
    pricing {
      onSale
      priceUndiscounted {
        ...Price
      }
      price {
        ...Price
      }
    }
    attributes(variantSelection: $variantSelection) {
      attribute {
        id
        name
        slug
      }
      values {
        id
        name
        value: name
      }
    }
  }
`;

export const productPricingFragment = gql`
  ${checkoutPriceFragment}
  fragment ProductPricingField on Product {
    pricing {
      onSale
      priceRangeUndiscounted {
        start {
          ...Price
        }
        stop {
          ...Price
        }
      }
      priceRange {
        start {
          ...Price
        }
        stop {
          ...Price
        }
      }
    }
  }
`;

export const productFragment = gql`
  ${baseProductFragment}
  ${selectedAttributeFragment}
  ${productVariantFragment}
  ${productPricingFragment}
  fragment ProductDetails on Product {
    ...BaseProduct
    ...ProductPricingField
    description
    details
    company {
      id
      name
      publicName
      rating
      imageUrl
      products(channel: $channel, filter: { isPublished: true }) {
        totalCount
      }
    }
    paymentMethods {
      id
      name
      identifier
      isActive
    }
    category {
      id
      name
      slug
      products(first: 3, channel: $channel) {
        edges {
          node {
            ...BaseProduct
            ...ProductPricingField
            address {
              street
              postalCode
              locality
              region
              country
              longitude
              latitude
            }
            category {
              id
              name
              slug
            }
          }
        }
      }
    }
    categories(first: 3) {
      edges {
        node {
          id
          name
          slug
          products(first: 3, channel: $channel) {
            edges {
              node {
                ...BaseProduct
                ...ProductPricingField
              }
            }
          }
        }
      }
    }
    address {
      street
      postalCode
      locality
      region
      country
      longitude
      latitude
    }
    images {
      id
      url
    }
    attributes {
      ...SelectedAttributeFields
    }
    variants {
      ...ProductVariantFields
    }
    isAvailable
  }
`;
