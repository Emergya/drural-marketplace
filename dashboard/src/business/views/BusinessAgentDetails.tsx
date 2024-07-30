import NotFoundPage from "@saleor/components/NotFoundPage";
import { useUpdateCustomerMutation } from "@saleor/customers/mutations";
import { UpdateCustomer } from "@saleor/customers/types/UpdateCustomer";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import useUser from "@saleor/hooks/useUser";
import { commonMessages } from "@saleor/intl";
import { UserType } from "@saleor/users/_types/UserType";
import { UserDetailsPageFormData } from "@saleor/users/components/UserDetailsPage/types";
import { UserListUrlQueryParams, UserUrlQueryParams } from "@saleor/users/urls";
import UserDetails from "@saleor/users/views/UserDetails";
import createMetadataUpdateHandler from "@saleor/utils/handlers/metadataUpdateHandler";
import {
  useMetadataUpdate,
  usePrivateMetadataUpdate
} from "@saleor/utils/metadata/updateMetadata";
import React from "react";
import { useIntl } from "react-intl";

import { useRemoveCompanyAgentMutation } from "../mutations";
import { useAgentDetailsQuery } from "../queries";
import { RemoveCompanyAgent } from "../types/RemoveCompanyAgent";
import { businessAgentListUrl, businessAgentUrl } from "../urls";

interface BusinessAgentDetailsProps {
  agentId: string;
  businessId: string;
  params: UserUrlQueryParams;
}

export const BusinessAgentDetails: React.FC<BusinessAgentDetailsProps> = ({
  agentId,
  businessId,
  params
}) => {
  // 1. Variables
  const navigate = useNavigator();
  const notify = useNotifier();
  const intl = useIntl();
  const {
    user: { isStaff }
  } = useUser();
  const detailsUrl = (params?: UserUrlQueryParams) =>
    businessAgentUrl(businessId, agentId, params);
  const listUrl = (params?: UserListUrlQueryParams) =>
    businessAgentListUrl(businessId, params);

  // 2. Handlers
  const handleUpdateCustomer = async (data: UserDetailsPageFormData) => {
    const result = await updateCustomer({
      variables: {
        id: agentId,
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

  const handleRemoveCompanyAgent = () =>
    removeCompanyAgent({
      variables: {
        company: businessId,
        id: agentId
      }
    });

  const handleUpdateCustomerComplete = (data: UpdateCustomer) => {
    if (data.customerUpdate.errors.length === 0) {
      notify({
        status: "success",
        text: intl.formatMessage(commonMessages.savedChanges)
      });
    }
  };

  const handleRemoveCompanyAgentComplete = (data: RemoveCompanyAgent) => {
    if (data.removeCompanyAgent.errors.length === 0) {
      notify({
        status: "success",
        text: intl.formatMessage({
          defaultMessage: "Agent Removed"
        })
      });
      navigate(listUrl());
    }
  };

  const handleBack = () => navigate(listUrl());

  // 3. Query & mutations
  const {
    data: agentDetails,
    loading: agentDetailsLoading
  } = useAgentDetailsQuery({
    displayLoader: true,
    variables: { id: agentId }
  });
  const agent = agentDetails?.agentUserDetails;

  const [updateCustomer, updateCustomerOpts] = useUpdateCustomerMutation({
    onCompleted: handleUpdateCustomerComplete
  });

  const [updateMetadata] = useMetadataUpdate({});
  const [updatePrivateMetadata] = usePrivateMetadataUpdate({});

  const [
    removeCompanyAgent,
    removeCompanyAgentOpts
  ] = useRemoveCompanyAgentMutation({
    onCompleted: handleRemoveCompanyAgentComplete
  });

  const handleSubmit = isStaff
    ? createMetadataUpdateHandler(
        agent,
        handleUpdateCustomer,
        variables => updateMetadata({ variables }),
        variables => updatePrivateMetadata({ variables })
      )
    : () => null;

  const loading =
    agentDetailsLoading ||
    (isStaff && updateCustomerOpts.loading) ||
    removeCompanyAgentOpts.loading;

  const errors =
    (isStaff && updateCustomerOpts.data?.customerUpdate.errors) || [];

  // 4. Render
  if (agent === null) {
    return <NotFoundPage onBack={handleBack} />;
  }

  return (
    <UserDetails
      disabled={loading}
      errors={errors}
      params={params}
      removeUserOpts={removeCompanyAgentOpts}
      saveButtonBarStatus={removeCompanyAgentOpts.status}
      type={UserType.AGENT}
      user={agent}
      detailsUrl={detailsUrl}
      handleBack={handleBack}
      handleSubmit={handleSubmit}
      removeUser={handleRemoveCompanyAgent}
    />
  );
};
export default BusinessAgentDetails;
