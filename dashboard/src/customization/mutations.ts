import makeMutation from "@saleor/hooks/makeMutation";
import gql from "graphql-tag";

import {
  CustomizationUpdate,
  CustomizationUpdateVariables
} from "./types/CustomizationUpdate";

const customizationUpdate = gql`
  mutation CustomizationUpdate($input: ShopSettingsInput!) {
    shopSettingsUpdate(input: $input) {
      shop {
        primaryColor
        secondaryColor
        logo {
          url
          alt
        }
        dashboardBanner {
          url
          alt
        }
        storefrontBanner {
          url
          alt
        }
      }
      errors {
        code
        message
        field
      }
    }
  }
`;

export const useUpdateCustomization = makeMutation<
  CustomizationUpdate,
  CustomizationUpdateVariables
>(customizationUpdate);
