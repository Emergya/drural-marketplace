import { accountErrorFragment } from "@saleor/fragments/errors";
import makeMutation from "@saleor/hooks/makeMutation";
import gql from "graphql-tag";

import {
  AddCompanyAgent,
  AddCompanyAgentVariables
} from "./types/AddCompanyAgent";
import {
  BulkRemoveCompanyAgent,
  BulkRemoveCompanyAgentVariables
} from "./types/BulkRemoveCompanyAgent";
import {
  CompanyChatwootCreate,
  CompanyChatwootCreateVariables
} from "./types/CompanyChatwootCreate";
import {
  CompanyChatwootUpdate,
  CompanyChatwootUpdateVariables
} from "./types/CompanyChatwootUpdate";
import { CompanyCreate, CompanyCreateVariables } from "./types/CompanyCreate";
import {
  CompanyDisable,
  CompanyDisableVariables
} from "./types/CompanyDisable";
import { CompanyEnable, CompanyEnableVariables } from "./types/CompanyEnable";
import {
  CompanyEnableStripe,
  CompanyEnableStripeVariables
} from "./types/CompanyEnableStripe";
import {
  CompanyLinkStripeAccount,
  CompanyLinkStripeAccountVariables
} from "./types/CompanyLinkStripeAccount";
import {
  CompanyStripeAccountCreate,
  CompanyStripeAccountCreateVariables
} from "./types/CompanyStripeAccountCreate";
import { CompanyUpdate, CompanyUpdateVariables } from "./types/CompanyUpdate";
import {
  CompanyValidation,
  CompanyValidationVariables
} from "./types/CompanyValidation";
import {
  RemoveCompanyAgent,
  RemoveCompanyAgentVariables
} from "./types/RemoveCompanyAgent";

const companyCreateMutation = gql`
  mutation CompanyCreate($input: CompanyInput!) {
    companyCreate(input: $input) {
      company {
        id
        name
        image
      }
      errors {
        field
        message
      }
    }
  }
`;

export const useCompanyCreateMutation = makeMutation<
  CompanyCreate,
  CompanyCreateVariables
>(companyCreateMutation);

const disableCompany = gql`
  mutation CompanyDisable($id: ID!) {
    companyDisable(id: $id) {
      company {
        isEnabled
      }
      errors {
        message
      }
    }
  }
`;
export const useDisableCompany = makeMutation<
  CompanyDisable,
  CompanyDisableVariables
>(disableCompany);

const enableCompany = gql`
  mutation CompanyEnable($id: ID!) {
    companyEnable(id: $id) {
      company {
        isEnabled
      }
      errors {
        message
      }
    }
  }
`;
export const useEnableCompany = makeMutation<
  CompanyEnable,
  CompanyEnableVariables
>(enableCompany);

const companyUpdate = gql`
  mutation CompanyUpdate($id: ID!, $input: CompanyInput!) {
    companyUpdate(id: $id, input: $input) {
      company {
        status
      }
      errors {
        code
        message
        field
      }
    }
  }
`;
export const useEditCompany = makeMutation<
  CompanyUpdate,
  CompanyUpdateVariables
>(companyUpdate);

const validateBusiness = gql`
  mutation CompanyValidation(
    $id: ID!
    $reason: String!
    $status: CompanyStatusEnum!
  ) {
    companyValidation(id: $id, input: { reason: $reason, status: $status }) {
      errors {
        code
        message
        field
      }
    }
  }
`;
export const useValidationCompany = makeMutation<
  CompanyValidation,
  CompanyValidationVariables
>(validateBusiness);

const companyAddressUpdate = gql`
  mutation CompanyAddressUpdate(
    $id: ID!
    $street: String
    $postalCode: String
    $locality: String
    $region: String
    $country: String
    $streetSecondLine: String
    $latitude: Float!
    $longitude: Float!
  ) {
    companyAddressUpdate(
      id: $id
      input: {
        street: $street
        postalCode: $postalCode
        locality: $locality
        region: $region
        country: $country
        streetSecondLine: $streetSecondLine
        latitude: $latitude
        longitude: $longitude
      }
    ) {
      companyAddress {
        street
        streetSecondLine
        postalCode
        locality
        region
        country
        latitude
        longitude
      }
      errors {
        code
        message
        field
      }
    }
  }
`;
export const useCompanyAddressUpdate = makeMutation<any, any>(
  companyAddressUpdate
);

// Chatwoot
const companyChatwootCreateQuery = gql`
  mutation CompanyChatwootCreate(
    $id: ID!
    $input: CompnayChatwootCreateInput!
  ) {
    companyChatwootCreate(id: $id, input: $input) {
      company {
        id
      }
      errors {
        code
        message
        field
      }
    }
  }
`;
export const useCompanyChatwootCreateQuery = makeMutation<
  CompanyChatwootCreate,
  CompanyChatwootCreateVariables
>(companyChatwootCreateQuery);

const companyChatwootUpdateQuery = gql`
  mutation CompanyChatwootUpdate($id: ID!, $input: CompanyChatwootInput!) {
    companyChatwootUpdate(id: $id, input: $input) {
      errors {
        code
        message
        field
      }
    }
  }
`;
export const useCompanyChatwootUpdateQuery = makeMutation<
  CompanyChatwootUpdate,
  CompanyChatwootUpdateVariables
>(companyChatwootUpdateQuery);

// Agents
const addCompanyAgent = gql`
  mutation AddCompanyAgent($company: ID!, $input: AgentCreateInput!) {
    addCompanyAgent(company: $company, input: $input) {
      errors {
        code
        message
        field
      }
    }
  }
`;
export const useAddCompanyAgent = makeMutation<
  AddCompanyAgent,
  AddCompanyAgentVariables
>(addCompanyAgent);

const removeCompanyAgent = gql`
  ${accountErrorFragment}
  mutation RemoveCompanyAgent($company: ID!, $id: ID!) {
    removeCompanyAgent(company: $company, id: $id) {
      errors {
        ...AccountErrorFragment
      }
    }
  }
`;
export const useRemoveCompanyAgentMutation = makeMutation<
  RemoveCompanyAgent,
  RemoveCompanyAgentVariables
>(removeCompanyAgent);

const bulkRemoveCompanyAgent = gql`
  mutation BulkRemoveCompanyAgent($company: ID!, $ids: [ID]!) {
    bulkRemoveCompanyAgent(company: $company, ids: $ids) {
      errors {
        code
        message
        field
      }
    }
  }
`;
export const useBulkRemoveCompanyAgent = makeMutation<
  BulkRemoveCompanyAgent,
  BulkRemoveCompanyAgentVariables
>(bulkRemoveCompanyAgent);

const companyStripeAccountCreate = gql`
  mutation CompanyStripeAccountCreate($id: ID!) {
    companyStripeAccountCreate(id: $id) {
      errors {
        code
        message
        field
      }
    }
  }
`;
export const useCompanyStripeAccountCreate = makeMutation<
  CompanyStripeAccountCreate,
  CompanyStripeAccountCreateVariables
>(companyStripeAccountCreate);

const companyLinkStripeAccount = gql`
  mutation CompanyLinkStripeAccount(
    $id: ID!
    $input: CompanyLinkStripeAccountInput!
  ) {
    companyLinkStripeAccount(id: $id, input: $input) {
      stripeForm
      errors {
        field
        code
        message
      }
    }
  }
`;
export const useCompanyLinkStripeAccount = makeMutation<
  CompanyLinkStripeAccount,
  CompanyLinkStripeAccountVariables
>(companyLinkStripeAccount);

const companyEnableStripe = gql`
  mutation CompanyEnableStripe($id: ID!) {
    companyEnableStripe(id: $id) {
      errors {
        field
        code
        message
      }
    }
  }
`;
export const useCompanyEnableStripe = makeMutation<
  CompanyEnableStripe,
  CompanyEnableStripeVariables
>(companyEnableStripe);
