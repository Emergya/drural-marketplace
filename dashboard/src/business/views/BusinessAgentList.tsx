import { newPasswordUrl } from "@saleor/auth/urls";
import { AddCompanyAgent } from "@saleor/business/types/AddCompanyAgent";
import {
  businessAgentListUrl,
  BusinessAgentListUrlDialog,
  BusinessAgentLisUrlQueryParams,
  businessAgentUrl
} from "@saleor/business/urls";
import AddMemberDialog from "@saleor/components/AddMemberDialog";
import { AddMemberFormData } from "@saleor/components/AddMemberDialog/types";
import NotFoundPage from "@saleor/components/NotFoundPage";
import { APP_MOUNT_URI } from "@saleor/config";
import useBulkActions from "@saleor/hooks/useBulkActions";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import { createPaginationState } from "@saleor/hooks/usePaginator";
import useUser from "@saleor/hooks/useUser";
import { UserType } from "@saleor/users/_types/UserType";
import { UserListUrlQueryParams } from "@saleor/users/urls";
import UserList from "@saleor/users/views/UserList";
import { getFilterVariables } from "@saleor/users/views/UserList/filters";
import { getSortQueryVariables } from "@saleor/users/views/UserList/sort";
import createDialogActionHandlers from "@saleor/utils/handlers/dialogActionHandlers";
import { formatApppMountUriToURLJoin } from "@saleor/utils/urls";
import React from "react";
import { useIntl } from "react-intl";
import urljoin from "url-join";

import useListSettings from "../../hooks/useListSettings";
import { commonMessages } from "../../intl";
import { ListViews } from "../../types";
import { useAddCompanyAgent, useBulkRemoveCompanyAgent } from "../mutations";
import { useBusinessAgentListQuery } from "../queries";
import { BulkRemoveCompanyAgent } from "../types/BulkRemoveCompanyAgent";
import { businessListPath } from "../urls";

interface BusinessAgentListViewProps {
  id: string;
  params: BusinessAgentLisUrlQueryParams;
}

export const BusinessAgentListView: React.FC<BusinessAgentListViewProps> = ({
  id: businessId,
  params
}) => {
  // 1. Variables
  const intl = useIntl();
  const navigate = useNavigator();
  const notify = useNotifier();
  const { user } = useUser();
  const listUrl = (params?: UserListUrlQueryParams) =>
    businessAgentListUrl(businessId, params);
  const detailsUrl = (agentId: string) => businessAgentUrl(businessId, agentId);

  const { updateListSettings, settings } = useListSettings(
    ListViews.BUSINESS_AGENT_LIST
  );

  const [openModal, closeModal] = createDialogActionHandlers<
    BusinessAgentListUrlDialog,
    BusinessAgentLisUrlQueryParams
  >(navigate, listUrl, params);

  const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions(
    params.ids
  );

  const paginationState = createPaginationState(settings.rowNumber, params);
  const queryVariables = React.useMemo(
    () => ({
      ...paginationState,
      company: businessId,
      filter: getFilterVariables(params),
      sort: getSortQueryVariables(params)
    }),
    [params, settings.rowNumber]
  );

  // 2. Handlers
  const onAddCompanyAgent = (variables: AddMemberFormData) =>
    addCompanyAgent({
      variables: {
        company: businessId,
        input: {
          email: variables.email,
          firstName: variables.firstName,
          lastName: variables.lastName,
          redirectUrl: urljoin(
            window.location.origin,
            formatApppMountUriToURLJoin(APP_MOUNT_URI),
            newPasswordUrl().replace(/\?/, "")
          )
        }
      }
    });

  const onAddCompanyAgentComplete = (data: AddCompanyAgent) => {
    const { errors } = data.addCompanyAgent;

    if (!errors.length) {
      notify({
        status: "success",
        text: intl.formatMessage({ defaultMessage: "Agent invited" })
      });
      refetchAgentList();
      closeModal();
    }
  };

  const handleBulkRemoveCompanyAgentComplete = (
    data: BulkRemoveCompanyAgent
  ) => {
    if (data.bulkRemoveCompanyAgent.errors.length === 0) {
      notify({
        status: "success",
        text: intl.formatMessage(commonMessages.savedChanges)
      });
      reset();
      refetchAgentList();
      closeModal();
    }
  };

  const handleBulkRemoveCompanyAgent = () =>
    bulkRemoveCompanyAgent({
      variables: {
        ids: params.ids,
        company: businessId
      }
    });

  // 3. Queries & mutations
  const {
    data: agentListData,
    loading: agentListLoading,
    refetch: refetchAgentList
  } = useBusinessAgentListQuery({
    displayLoader: true,
    variables: queryVariables,
    skip: !businessId
  });
  const agentUsers = agentListData?.agentUsers;

  const [addCompanyAgent, addCompanyAgentOps] = useAddCompanyAgent({
    onCompleted: onAddCompanyAgentComplete
  });

  const [
    bulkRemoveCompanyAgent,
    bulkRemoveCompanyAgentOpts
  ] = useBulkRemoveCompanyAgent({
    onCompleted: handleBulkRemoveCompanyAgentComplete
  });

  //   4. Render
  if (agentUsers === null) {
    return <NotFoundPage onBack={() => navigate(businessListPath)} />;
  }

  return (
    <>
      <UserList
        bulkRemoveUsersOpts={bulkRemoveCompanyAgentOpts}
        bulkRemoveUsers={handleBulkRemoveCompanyAgent}
        closeModal={closeModal}
        detailsUrl={detailsUrl}
        hasAddButton={user.isSeller}
        isSelected={isSelected}
        listElements={listElements}
        listUrl={listUrl}
        loading={agentListLoading}
        onAdd={() => openModal("invite-agent")}
        openModal={openModal}
        paginationState={paginationState}
        params={params as UserListUrlQueryParams}
        reset={reset}
        settings={settings}
        toggle={toggle}
        toggleAll={toggleAll}
        type={UserType.AGENT}
        updateListSettings={updateListSettings}
        users={agentUsers}
      />
      <AddMemberDialog
        confirmButtonState={addCompanyAgentOps.status}
        initialSearch=""
        disabled={addCompanyAgentOps.loading}
        errors={addCompanyAgentOps.data?.addCompanyAgent.errors || []}
        open={params.action === "invite-agent"}
        title={intl.formatMessage({ defaultMessage: "Invite Shop Agent" })}
        onClose={closeModal}
        onConfirm={onAddCompanyAgent}
        onSearchChange={() => null}
      />
    </>
  );
};

export default BusinessAgentListView;
