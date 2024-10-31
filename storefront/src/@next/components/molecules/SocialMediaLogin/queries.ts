import gql from "graphql-tag";

export const socialMediaAccountRegister = gql`
  mutation SocialMediaAccountRegister(
    $firstName: String!
    $lastName: String!
    $email: String!
    $openId: String!
  ) {
    socialMediaAccountRegister(
      input: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        openId: $openId
      }
    ) {
      user {
        id
        email
      }
    }
  }
`;
