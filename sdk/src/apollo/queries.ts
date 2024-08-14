import { gql } from "@apollo/client";
import {
  // checkoutFragment,
  // checkoutProductVariantFragment,
  userFragment,
} from "./fragments";

export const USER = gql`
  ${userFragment}
  query UserDetails {
    user: me {
      ...UserFragment
    }
    token @client
    authenticated @client
  }
`;

// export const checkoutDetails = gql`
//   ${checkoutFragment}
//   query CheckoutDetails($token: UUID!) {
//     checkout(token: $token) {
//       ...Checkout
//     }
//   }
// `;

// export const userCheckoutTokenList = gql`
//   query UserCheckoutTokenList($channel: String) {
//     me {
//       id
//       checkoutTokens(channel: $channel)
//     }
//   }
// `;

// export const checkoutProductVariants = gql`
//   ${checkoutProductVariantFragment}
//   query CheckoutProductVariants($ids: [ID], $channel: String) {
//     productVariants(ids: $ids, first: 100, channel: $channel) {
//       edges {
//         node {
//           ...ProductVariant
//         }
//       }
//     }
//   }
// `;
