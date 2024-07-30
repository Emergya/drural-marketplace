import ChannelPickerDialog from "@saleor/channels/components/ChannelPickerDialog";
import useAppChannel from "@saleor/components/AppLayout/AppChannelContext";
import { BusinessContext } from "@saleor/components/BusinessProvider";
import DeleteFilterTabDialog from "@saleor/components/DeleteFilterTabDialog";
import SaveFilterTabDialog, {
  SaveFilterTabDialogFormData
} from "@saleor/components/SaveFilterTabDialog";
import { useShopLimitsQuery } from "@saleor/components/Shop/query";
import { defaultListSettings } from "@saleor/config";
import useListSettings from "@saleor/hooks/useListSettings";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import usePaginator, {
  createPaginationState
} from "@saleor/hooks/usePaginator";
import useUser from "@saleor/hooks/useUser";
import { getStringOrPlaceholder } from "@saleor/misc";
import { OrderListColumns } from "@saleor/orders/components/OrderListPage/types";
import { OrderListVariables } from "@saleor/orders/types/OrderList";
import { PaymentTotalNetVariables } from "@saleor/orders/types/PaymentTotalNet";
import { getCompany } from "@saleor/products/utils/data";
import { ListViews } from "@saleor/types";
import createDialogActionHandlers from "@saleor/utils/handlers/dialogActionHandlers";
import createFilterHandlers from "@saleor/utils/handlers/filterHandlers";
import createSortHandler from "@saleor/utils/handlers/sortHandler";
import { mapEdgesToItems, mapNodeToChoice } from "@saleor/utils/maps";
import { getSortParams } from "@saleor/utils/sort";
import React from "react";
import { useIntl } from "react-intl";

import OrderListPage from "../../components/OrderListPage/OrderListPage";
import { useOrderDraftCreateMutation } from "../../mutations";
import {
  useOrderListQuery,
  usePaymentTotalAverageQuery,
  usePaymentTotalCapturedQuery,
  usePaymentTotalDruralFeeQuery,
  usePaymentTotalFeeQuery,
  usePaymentTotalNetQuery,
  usePaymentTotalQuantityQuery,
  usePaymentTotalQuantityRefundQuery,
  usePaymentTotalRefundsQuery,
  usePaymentTotalStripeFeeQuery
} from "../../queries";
import { OrderDraftCreate } from "../../types/OrderDraftCreate";
import {
  orderListUrl,
  OrderListUrlDialog,
  OrderListUrlQueryParams,
  orderSettingsPath,
  orderUrl
} from "../../urls";
import {
  areFiltersApplied,
  deleteFilterTab,
  getActiveFilters,
  getFilterOpts,
  getFilterQueryParam,
  getFilterTabs,
  getFilterVariables,
  saveFilterTab
} from "./filters";
import { getSortQueryVariables } from "./sort";

interface OrderListProps {
  params: OrderListUrlQueryParams;
}

export const OrderList: React.FC<OrderListProps> = ({ params }) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const paginate = usePaginator();
  const { updateListSettings, settings } = useListSettings<OrderListColumns>(
    ListViews.ORDER_LIST
  );
  const { user } = useUser();
  const intl = useIntl();

  const handleCreateOrderCreateSuccess = (data: OrderDraftCreate) => {
    notify({
      status: "success",
      text: intl.formatMessage({
        defaultMessage: "Order draft successfully created"
      })
    });
    navigate(orderUrl(data.draftOrderCreate.order.id));
  };

  const [createOrder] = useOrderDraftCreateMutation({
    onCompleted: handleCreateOrderCreateSuccess
  });

  const { channel, availableChannels } = useAppChannel(false);
  const limitOpts = useShopLimitsQuery({
    variables: {
      orders: true
    }
  });

  const noChannel = !channel && typeof channel !== "undefined";
  const channelOpts = availableChannels
    ? mapNodeToChoice(availableChannels)
    : null;

  const tabs = getFilterTabs();

  const currentTab =
    params.activeTab === undefined
      ? areFiltersApplied(params)
        ? tabs.length + 1
        : 0
      : parseInt(params.activeTab, 0);

  const [
    changeFilters,
    resetFilters,
    handleSearchChange
  ] = createFilterHandlers({
    createUrl: orderListUrl,
    getFilterQueryParam,
    navigate,
    params
  });

  const [openModal, closeModal] = createDialogActionHandlers<
    OrderListUrlDialog,
    OrderListUrlQueryParams
  >(navigate, orderListUrl, params);

  const handleTabChange = (tab: number) =>
    navigate(
      orderListUrl({
        activeTab: tab.toString(),
        ...getFilterTabs()[tab - 1].data
      })
    );

  const handleFilterTabDelete = () => {
    deleteFilterTab(currentTab);
    navigate(orderListUrl());
  };

  const handleFilterTabSave = (data: SaveFilterTabDialogFormData) => {
    saveFilterTab(data.name, getActiveFilters(params));
    handleTabChange(tabs.length + 1);
  };

  // Query variables
  const { activeBusiness } = React.useContext(BusinessContext);
  const company = getCompany(user.isStaff, activeBusiness?.active.node.id);
  const paginationState = createPaginationState(settings.rowNumber, params);

  const analyticsQueryVariables = React.useMemo<
    PaymentTotalNetVariables
  >(() => {
    const { created, customer, search, status } = getFilterVariables(params);

    return {
      ...company,
      customerSearch: customer,
      period: created,
      search,
      status
    };
  }, [params]);

  const listQueryVariables = React.useMemo<OrderListVariables>(
    () => ({
      ...company,
      ...paginationState,
      filter: getFilterVariables(params),
      sort: getSortQueryVariables(params)
    }),
    [params, settings.rowNumber]
  );

  // Queries
  const {
    data: paymentTotalNetData,
    loading: loadingPaymentTotalNet
  } = usePaymentTotalNetQuery({
    variables: analyticsQueryVariables
  });

  const {
    data: paymentTotalCapturedData,
    loading: loadingPaymentCapture
  } = usePaymentTotalCapturedQuery({
    variables: analyticsQueryVariables
  });

  const {
    data: paymentTotalRefundsData,
    loading: loadingPaymentRefounds
  } = usePaymentTotalRefundsQuery({
    variables: analyticsQueryVariables
  });

  const {
    data: paymentTotalFeeData,
    loading: loadingPaymentTotalFee
  } = usePaymentTotalFeeQuery({
    variables: analyticsQueryVariables
  });

  const {
    data: paymentTotalDruralFeeData,
    loading: loadingPaymentTotalDruralFee
  } = usePaymentTotalDruralFeeQuery({
    variables: analyticsQueryVariables
  });

  const {
    data: paymentTotalStripeFeeData,
    loading: loadingPaymentTotalStripeFee
  } = usePaymentTotalStripeFeeQuery({
    variables: analyticsQueryVariables
  });

  const {
    data: paymentTotalQuantityData,
    loading: loadingPaymentTotalQuantity
  } = usePaymentTotalQuantityQuery({
    variables: analyticsQueryVariables
  });

  const {
    data: paymentTotalQuantityRefundData,
    loading: loadingPaymentTotalQuantityRefund
  } = usePaymentTotalQuantityRefundQuery({
    variables: analyticsQueryVariables
  });

  const {
    data: paymentTotalAverageData,
    loading: loadingPaymentTotalAverage
  } = usePaymentTotalAverageQuery({
    variables: analyticsQueryVariables
  });

  const { data, loading } = useOrderListQuery({
    variables: listQueryVariables
  });

  const { loadNextPage, loadPreviousPage, pageInfo } = paginate(
    data?.orders?.pageInfo,
    paginationState,
    params
  );

  const loadingAnatyticsCards =
    loadingPaymentTotalNet ||
    loadingPaymentCapture ||
    loadingPaymentRefounds ||
    loadingPaymentTotalFee;

  const loadingAnalyticsTable =
    loadingPaymentTotalDruralFee ||
    loadingPaymentTotalStripeFee ||
    loadingPaymentTotalQuantity ||
    loadingPaymentTotalQuantityRefund ||
    loadingPaymentTotalAverage;

  const handleSort = createSortHandler(navigate, orderListUrl, params);

  return (
    <>
      <OrderListPage
        paymentTotalNet={paymentTotalNetData?.paymentTotalNet}
        paymentTotalCaptured={paymentTotalCapturedData?.paymentTotalCaptured}
        paymentTotalRefunds={paymentTotalRefundsData?.paymentTotalRefunds}
        paymentTotalFee={paymentTotalFeeData?.paymentTotalFee}
        paymentTotalDruralFee={paymentTotalDruralFeeData?.paymentTotalDruralFee}
        paymentTotalStripeFee={paymentTotalStripeFeeData?.paymentTotalStripeFee}
        paymentTotalQuantity={paymentTotalQuantityData?.paymentTotalQuantity}
        paymentTotalQuantityRefund={
          paymentTotalQuantityRefundData?.paymentTotalQuantityRefund
        }
        paymentTotalAverage={paymentTotalAverageData?.paymentTotalAverage}
        loadingAnatyticsCards={loadingAnatyticsCards}
        loadingAnalyticsTable={loadingAnalyticsTable}
        defaultSettings={defaultListSettings[ListViews.ORDER_LIST]}
        settings={settings}
        currentTab={currentTab}
        disabled={loading}
        filterOpts={getFilterOpts(params, channelOpts)}
        limits={limitOpts.data?.shop.limits}
        orders={mapEdgesToItems(data?.orders)}
        pageInfo={pageInfo}
        sort={getSortParams(params)}
        onAdd={() => openModal("create-order")}
        onNextPage={loadNextPage}
        onPreviousPage={loadPreviousPage}
        onUpdateListSettings={updateListSettings}
        onRowClick={id => () => navigate(orderUrl(id))}
        onSort={handleSort}
        onSearchChange={handleSearchChange}
        onFilterChange={changeFilters}
        onTabSave={() => openModal("save-search")}
        onTabDelete={() => openModal("delete-search")}
        onTabChange={handleTabChange}
        initialSearch={params.query || ""}
        tabs={getFilterTabs().map(tab => tab.name)}
        onAll={resetFilters}
        onSettingsOpen={() => navigate(orderSettingsPath)}
        totalCount={data?.orders?.totalCount}
      />
      <SaveFilterTabDialog
        open={params.action === "save-search"}
        confirmButtonState="default"
        onClose={closeModal}
        onSubmit={handleFilterTabSave}
      />
      <DeleteFilterTabDialog
        open={params.action === "delete-search"}
        confirmButtonState="default"
        onClose={closeModal}
        onSubmit={handleFilterTabDelete}
        tabName={getStringOrPlaceholder(tabs[currentTab - 1]?.name)}
      />
      {!noChannel && (
        <ChannelPickerDialog
          channelsChoices={mapNodeToChoice(availableChannels)}
          confirmButtonState="success"
          defaultChoice={channel.id}
          open={params.action === "create-order"}
          onClose={closeModal}
          onConfirm={channelId =>
            createOrder({
              variables: {
                input: { channelId }
              }
            })
          }
        />
      )}
    </>
  );
};

export default OrderList;
