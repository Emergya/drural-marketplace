import gql from "graphql-tag";

export const bookResourceMutation = gql`
  mutation BookResource($input: BookResourceInput!) {
    bookResource(input: $input) {
      booking {
        id
        startDate
        endDate
        resourceName
        variantName
        companyName
        variant {
          id
          name
        }
        bookableResource {
          id
          name
          isActive
        }
        order {
          id
          token
          number
          status
        }
      }
      errors {
        message
      }
    }
  }
`;
