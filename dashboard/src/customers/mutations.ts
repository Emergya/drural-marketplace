import { fragmentAddress } from "@saleor/fragments/address";
import {
  customerAddressesFragment,
  customerDetailsFragment
} from "@saleor/fragments/customers";
import { accountErrorFragment } from "@saleor/fragments/errors";
import makeMutation from "@saleor/hooks/makeMutation";
import gql from "graphql-tag";

import { TypedMutation } from "../mutations";
import {
  BulkRemoveCustomers,
  BulkRemoveCustomersVariables
} from "./types/BulkRemoveCustomers";
import {
  CreateCustomer,
  CreateCustomerVariables
} from "./types/CreateCustomer";
import {
  CreateCustomerAddress,
  CreateCustomerAddressVariables
} from "./types/CreateCustomerAddress";
import {
  RemoveCustomer,
  RemoveCustomerVariables
} from "./types/RemoveCustomer";
import {
  RemoveCustomerAddress,
  RemoveCustomerAddressVariables
} from "./types/RemoveCustomerAddress";
import {
  SetCustomerDefaultAddress,
  SetCustomerDefaultAddressVariables
} from "./types/SetCustomerDefaultAddress";
import {
  UpdateCustomer,
  UpdateCustomerVariables
} from "./types/UpdateCustomer";
import {
  UpdateCustomerAddress,
  UpdateCustomerAddressVariables
} from "./types/UpdateCustomerAddress";

const updateCustomer = gql`
  ${accountErrorFragment}
  ${customerDetailsFragment}
  mutation UpdateCustomer($id: ID!, $input: CustomerInput!) {
    customerUpdate(id: $id, input: $input) {
      errors {
        ...AccountErrorFragment
      }
      user {
        ...CustomerDetailsFragment
      }
    }
  }
`;
export const useUpdateCustomerMutation = makeMutation<
  UpdateCustomer,
  UpdateCustomerVariables
>(updateCustomer);

const createCustomer = gql`
  ${accountErrorFragment}
  mutation CreateCustomer($input: UserCreateInput!) {
    customerCreate(input: $input) {
      errors {
        ...AccountErrorFragment
      }
      user {
        id
      }
    }
  }
`;
export const TypedCreateCustomerMutation = TypedMutation<
  CreateCustomer,
  CreateCustomerVariables
>(createCustomer);

const removeCustomer = gql`
  ${accountErrorFragment}
  mutation RemoveCustomer($id: ID!) {
    customerDelete(id: $id) {
      errors {
        ...AccountErrorFragment
      }
    }
  }
`;
export const useRemoveCustomerMutation = makeMutation<
  RemoveCustomer,
  RemoveCustomerVariables
>(removeCustomer);

const setCustomerDefaultAddress = gql`
  ${accountErrorFragment}
  ${customerAddressesFragment}
  mutation SetCustomerDefaultAddress(
    $addressId: ID!
    $userId: ID!
    $type: AddressTypeEnum!
  ) {
    addressSetDefault(addressId: $addressId, userId: $userId, type: $type) {
      errors {
        ...AccountErrorFragment
      }
      user {
        ...CustomerAddressesFragment
      }
    }
  }
`;
export const TypedSetCustomerDefaultAddressMutation = TypedMutation<
  SetCustomerDefaultAddress,
  SetCustomerDefaultAddressVariables
>(setCustomerDefaultAddress);

const createCustomerAddress = gql`
  ${accountErrorFragment}
  ${customerAddressesFragment}
  ${fragmentAddress}
  mutation CreateCustomerAddress($id: ID!, $input: AddressInput!) {
    addressCreate(userId: $id, input: $input) {
      errors {
        ...AccountErrorFragment
      }
      address {
        ...AddressFragment
      }
      user {
        ...CustomerAddressesFragment
      }
    }
  }
`;
export const TypedCreateCustomerAddressMutation = TypedMutation<
  CreateCustomerAddress,
  CreateCustomerAddressVariables
>(createCustomerAddress);

const updateCustomerAddress = gql`
  ${accountErrorFragment}
  ${fragmentAddress}
  mutation UpdateCustomerAddress($id: ID!, $input: AddressInput!) {
    addressUpdate(id: $id, input: $input) {
      errors {
        ...AccountErrorFragment
      }
      address {
        ...AddressFragment
      }
    }
  }
`;
export const TypedUpdateCustomerAddressMutation = TypedMutation<
  UpdateCustomerAddress,
  UpdateCustomerAddressVariables
>(updateCustomerAddress);

const removeCustomerAddress = gql`
  ${accountErrorFragment}
  ${customerAddressesFragment}
  mutation RemoveCustomerAddress($id: ID!) {
    addressDelete(id: $id) {
      errors {
        ...AccountErrorFragment
      }
      user {
        ...CustomerAddressesFragment
      }
    }
  }
`;
export const TypedRemoveCustomerAddressMutation = TypedMutation<
  RemoveCustomerAddress,
  RemoveCustomerAddressVariables
>(removeCustomerAddress);

export const bulkRemoveCustomers = gql`
  ${accountErrorFragment}
  mutation BulkRemoveCustomers($ids: [ID]!) {
    customerBulkDelete(ids: $ids) {
      errors {
        ...AccountErrorFragment
      }
    }
  }
`;
export const useBulkRemoveCustomers = makeMutation<
  BulkRemoveCustomers,
  BulkRemoveCustomersVariables
>(bulkRemoveCustomers);
