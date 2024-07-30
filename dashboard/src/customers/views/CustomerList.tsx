import NotFoundPage from "@saleor/components/NotFoundPage";
import useBulkActions from "@saleor/hooks/useBulkActions";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import { createPaginationState } from "@saleor/hooks/usePaginator";
import useUser from "@saleor/hooks/useUser";
import { UserType } from "@saleor/users/_types/UserType";
import {
  userListUrl,
  UserListUrlDialog,
  UserListUrlQueryParams,
  UserSections,
  userUrl
} from "@saleor/users/urls";
import UserList from "@saleor/users/views/UserList";
import { getFilterVariables } from "@saleor/users/views/UserList/filters";
import { getSortQueryVariables } from "@saleor/users/views/UserList/sort";
import createDialogActionHandlers from "@saleor/utils/handlers/dialogActionHandlers";
import React from "react";
import { useIntl } from "react-intl";

import useListSettings from "../../hooks/useListSettings";
import { commonMessages } from "../../intl";
import { ListViews } from "../../types";
import { useBulkRemoveCustomers } from "../mutations";
import { useCustomerListQuery } from "../queries";
import { BulkRemoveCustomers } from "../types/BulkRemoveCustomers";
import { customerAddUrl } from "../urls";

interface CustomerListViewProps {
  params: UserListUrlQueryParams;
}

export const CustomerListView: React.FC<CustomerListViewProps> = ({
  params
}) => {
  // 1. Variables
  const intl = useIntl();
  const { user } = useUser();
  const navigate = useNavigator();
  const notify = useNotifier();
  const listUrl = (params?: UserListUrlQueryParams) =>
    userListUrl(UserSections.customers, params);
  const detailsUrl = (customerId: string) =>
    userUrl(UserSections.customers, customerId);

  const { updateListSettings, settings } = useListSettings(
    ListViews.CUSTOMER_LIST
  );

  const [openModal, closeModal] = createDialogActionHandlers<
    UserListUrlDialog,
    UserListUrlQueryParams
  >(navigate, listUrl, params);

  const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions(
    params.ids
  );

  const paginationState = createPaginationState(settings.rowNumber, params);
  const queryVariables = React.useMemo(
    () => ({
      ...paginationState,
      filter: getFilterVariables(params),
      sort: getSortQueryVariables(params)
    }),
    [params, settings.rowNumber]
  );

  const handleBulkRemoveCustomersComplete = (data: BulkRemoveCustomers) => {
    if (data.customerBulkDelete.errors.length === 0) {
      notify({
        status: "success",
        text: intl.formatMessage(commonMessages.savedChanges)
      });
      reset();
      refetch();
      closeModal();
    }
  };

  const handleBulkRemoveCustomers = () =>
    bulkRemoveCustomers({
      variables: {
        ids: params.ids
      }
    });

  //   2. Data
  const { data, loading, refetch } = useCustomerListQuery({
    displayLoader: true,
    variables: queryVariables
  });
  const customers = data?.customers;

  const [bulkRemoveCustomers, bulkRemoveCustomersOpts] = useBulkRemoveCustomers(
    {
      onCompleted: handleBulkRemoveCustomersComplete
    }
  );

  //   4. Render
  if (customers === null) {
    return <NotFoundPage onBack={() => navigate(listUrl())} />;
  }

  return (
    <UserList
      bulkRemoveUsersOpts={bulkRemoveCustomersOpts}
      hasAddButton={user.isStaff}
      listElements={listElements}
      loading={loading}
      paginationState={paginationState}
      params={params}
      settings={settings}
      type={UserType.CUSTOMER}
      users={customers}
      bulkRemoveUsers={handleBulkRemoveCustomers}
      closeModal={closeModal}
      detailsUrl={detailsUrl}
      isSelected={isSelected}
      listUrl={listUrl}
      onAdd={() => navigate(customerAddUrl)}
      openModal={openModal}
      reset={reset}
      toggle={toggle}
      toggleAll={toggleAll}
      updateListSettings={updateListSettings}
    />
  );
};

export default CustomerListView;
