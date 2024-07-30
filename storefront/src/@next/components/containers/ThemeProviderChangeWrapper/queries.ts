import gql from "graphql-tag";

export const shopCustomization = gql`
  query ShopCustomization {
    shop {
      primaryColor
      secondaryColor
      logo {
        url
        alt
      }
      storefrontBanner {
        url
        alt
      }
    }
  }
`;
