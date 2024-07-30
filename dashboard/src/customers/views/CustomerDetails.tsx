import NotFoundPage from "@saleor/components/NotFoundPage";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import { commonMessages } from "@saleor/intl";
import { UserType } from "@saleor/users/_types/UserType";
import { UserDetailsPageFormData } from "@saleor/users/components/UserDetailsPage/types";
import {
  userListUrl,
  UserListUrlQueryParams,
  UserSections,
  userUrl,
  UserUrlQueryParams
} from "@saleor/users/urls";
import UserDetails from "@saleor/users/views/UserDetails";
import createMetadataUpdateHandler from "@saleor/utils/handlers/metadataUpdateHandler";
import {
  useMetadataUpdate,
  usePrivateMetadataUpdate
} from "@saleor/utils/metadata/updateMetadata";
import React from "react";
import { useIntl } from "react-intl";

import {
  useRemoveCustomerMutation,
  useUpdateCustomerMutation
} from "../mutations";
import { useCustomerDetailsQuery } from "../queries";
import { RemoveCustomer } from "../types/RemoveCustomer";
import { UpdateCustomer } from "../types/UpdateCustomer";
import { customerAddressesUrl } from "../urls";

interface CustomerDetailsViewProps {
  id: string;
  params: UserUrlQueryParams;
}

export const CustomerDetailsView: React.FC<CustomerDetailsViewProps> = ({
  id: customerId,
  params
}) => {
  // 1. Variables
  const navigate = useNavigator();
  const notify = useNotifier();
  const intl = useIntl();
  const detailsUrl = (params?: UserUrlQueryParams) =>
    userUrl(UserSections.customers, customerId, params);
  const listUrl = (params?: UserListUrlQueryParams) =>
    userListUrl(UserSections.customers, params);

  // 2. Handlers
  const handleUpdateCustomer = async (data: UserDetailsPageFormData) => {
    const result = await updateCustomer({
      variables: {
        id: customerId,
        input: {
          email: data.email,
          firstName: data.firstName,
          isActive: data.isActive,
          lastName: data.lastName,
          note: data.note
        }
      }
    });

    return result.data.customerUpdate.errors;
  };

  const handleRemoveCustomer = () =>
    removeCustomer({
      variables: { id: customerId }
    });

  const handleUpdateCustomerComplete = (data: UpdateCustomer) => {
    if (data.customerUpdate.errors.length === 0) {
      notify({
        status: "success",
        text: intl.formatMessage(commonMessages.savedChanges)
      });
    }
  };

  const handleRemoveCustomerComplete = (data: RemoveCustomer) => {
    if (data.customerDelete.errors.length === 0) {
      notify({
        status: "success",
        text: intl.formatMessage({
          defaultMessage: "Customer Removed"
        })
      });
      navigate(listUrl());
    }
  };

  const handleBack = () => navigate(listUrl());

  const handleAddressManageClick = () =>
    navigate(customerAddressesUrl(customerId));

  // 3. Query & mutations
  const {
    data: customerDetails,
    loading: customerDetailsLoading
  } = useCustomerDetailsQuery({
    displayLoader: true,
    variables: { id: customerId }
  });
  const customer = customerDetails?.user;

  const [updateCustomer, updateCustomerOpts] = useUpdateCustomerMutation({
    onCompleted: handleUpdateCustomerComplete
  });

  const [updateMetadata] = useMetadataUpdate({});
  const [updatePrivateMetadata] = usePrivateMetadataUpdate({});

  const [removeCustomer, removeCustomerOpts] = useRemoveCustomerMutation({
    onCompleted: handleRemoveCustomerComplete
  });

  const handleSubmit = createMetadataUpdateHandler(
    customer,
    handleUpdateCustomer,
    variables => updateMetadata({ variables }),
    variables => updatePrivateMetadata({ variables })
  );

  const loading =
    customerDetailsLoading ||
    updateCustomerOpts.loading ||
    removeCustomerOpts.loading;

  const errors = updateCustomerOpts.data?.customerUpdate.errors || [];

  // 4. Render
  if (customer === null) {
    return <NotFoundPage onBack={handleBack} />;
  }

  return (
    <UserDetails
      disabled={loading}
      errors={errors}
      params={params}
      removeUserOpts={removeCustomerOpts}
      saveButtonBarStatus={removeCustomerOpts.status}
      type={UserType.CUSTOMER}
      user={customer}
      detailsUrl={detailsUrl}
      handleAddressManageClick={handleAddressManageClick}
      handleBack={handleBack}
      handleSubmit={handleSubmit}
      removeUser={handleRemoveCustomer}
    />
  );
};
export default CustomerDetailsView;
