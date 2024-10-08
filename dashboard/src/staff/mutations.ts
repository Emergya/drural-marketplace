import {
  accountErrorFragment,
  staffErrorFragment
} from "@saleor/fragments/errors";
import { staffMemberDetailsFragment } from "@saleor/fragments/staff";
import makeMutation from "@saleor/hooks/makeMutation";
import gql from "graphql-tag";

import { TypedMutation } from "../mutations";
import { AccountUpdate, AccountUpdateVariables } from "./types/AccountUpdate";
import {
  ChangeStaffPassword,
  ChangeStaffPasswordVariables
} from "./types/ChangeStaffPassword";
import { StaffAvatarDelete } from "./types/StaffAvatarDelete";
import {
  StaffAvatarUpdate,
  StaffAvatarUpdateVariables
} from "./types/StaffAvatarUpdate";
import {
  StaffMemberAdd,
  StaffMemberAddVariables
} from "./types/StaffMemberAdd";
import {
  StaffMemberDelete,
  StaffMemberDeleteVariables
} from "./types/StaffMemberDelete";
import {
  StaffMemberUpdate,
  StaffMemberUpdateVariables
} from "./types/StaffMemberUpdate";

const staffMemberAddMutation = gql`
  ${staffErrorFragment}
  ${staffMemberDetailsFragment}
  mutation StaffMemberAdd($input: StaffCreateInput!) {
    staffCreate(input: $input) {
      errors {
        ...StaffErrorFragment
      }
      user {
        ...StaffMemberDetailsFragment
      }
    }
  }
`;
export const useStaffMemberAddMutation = makeMutation<
  StaffMemberAdd,
  StaffMemberAddVariables
>(staffMemberAddMutation);

const staffMemberUpdateMutation = gql`
  ${staffErrorFragment}
  ${staffMemberDetailsFragment}
  mutation StaffMemberUpdate($id: ID!, $input: StaffUpdateInput!) {
    staffUpdate(id: $id, input: $input) {
      errors {
        ...StaffErrorFragment
      }
      user {
        ...StaffMemberDetailsFragment
      }
    }
  }
`;
export const TypedStaffMemberUpdateMutation = TypedMutation<
  StaffMemberUpdate,
  StaffMemberUpdateVariables
>(staffMemberUpdateMutation);

export const accountUpdate = gql`
  mutation AccountUpdate($input: AccountInput!) {
    accountUpdate(input: $input) {
      errors {
        code
        field
        message
      }
    }
  }
`;

export const useAccountUpdate = makeMutation<
  AccountUpdate,
  AccountUpdateVariables
>(accountUpdate);

const staffMemberDeleteMutation = gql`
  ${staffErrorFragment}
  mutation StaffMemberDelete($id: ID!) {
    staffDelete(id: $id) {
      errors {
        ...StaffErrorFragment
      }
    }
  }
`;
export const TypedStaffMemberDeleteMutation = TypedMutation<
  StaffMemberDelete,
  StaffMemberDeleteVariables
>(staffMemberDeleteMutation);

const staffAvatarUpdateMutation = gql`
  ${accountErrorFragment}
  mutation StaffAvatarUpdate($image: Upload!) {
    userAvatarUpdate(image: $image) {
      errors {
        ...AccountErrorFragment
      }
      user {
        id
        avatar {
          url
        }
      }
    }
  }
`;
export const TypedStaffAvatarUpdateMutation = TypedMutation<
  StaffAvatarUpdate,
  StaffAvatarUpdateVariables
>(staffAvatarUpdateMutation);

const staffAvatarDeleteMutation = gql`
  ${accountErrorFragment}
  mutation StaffAvatarDelete {
    userAvatarDelete {
      errors {
        ...AccountErrorFragment
      }
      user {
        id
        avatar {
          url
        }
      }
    }
  }
`;
export const TypedStaffAvatarDeleteMutation = TypedMutation<
  StaffAvatarDelete,
  StaffMemberDeleteVariables
>(staffAvatarDeleteMutation);

const changeStaffPassword = gql`
  ${accountErrorFragment}
  mutation ChangeStaffPassword(
    $newPassword: String!
    $newPasswordRepeat: String!
    $oldPassword: String!
  ) {
    passwordChange(
      newPassword: $newPassword
      newPasswordRepeat: $newPasswordRepeat
      oldPassword: $oldPassword
    ) {
      errors {
        ...AccountErrorFragment
      }
    }
  }
`;
export const useChangeStaffPassword = makeMutation<
  ChangeStaffPassword,
  ChangeStaffPasswordVariables
>(changeStaffPassword);
