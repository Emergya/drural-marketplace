import OrderListPage from "@saleor/orders/components/OrderListPage";
import { OrderListPageProps } from "@saleor/orders/components/OrderListPage/types";
import { OrderListUrlSortField } from "@saleor/orders/urls";
import { OrderStatusFilter } from "@saleor/types/globalTypes";
import { storiesOf } from "@storybook/react";
import React from "react";

import {
  filterPageProps,
  limits,
  limitsReached,
  listActionsProps,
  pageListProps,
  sortPageProps
} from "../../../fixtures";
import { OrderListColumns } from "../../../orders/components/OrderListPage/types";
import { orders } from "../../../orders/fixtures";
import Decorator from "../../Decorator";

const props: OrderListPageProps = {
  ...listActionsProps,
  ...pageListProps.default,
  ...filterPageProps,
  ...sortPageProps,
  defaultSettings: {
    rowNumber: 20,
    columns: [
      OrderListColumns.paymentStatus,
      OrderListColumns.status,
      OrderListColumns.totalSeller,
      OrderListColumns.totalFee,
      OrderListColumns.total
    ]
  },
  settings: {
    rowNumber: 10,
    columns: [
      OrderListColumns.paymentStatus,
      OrderListColumns.status,
      OrderListColumns.total
    ]
  },
  filterOpts: {
    channel: {
      active: false,
      value: [
        {
          label: "Channel PLN",
          value: "channelId"
        }
      ]
    },
    created: {
      active: false,
      value: {
        max: "400",
        min: "50"
      }
    },
    customer: {
      active: false,
      value: "Jesse"
    },
    status: {
      active: false,
      value: [OrderStatusFilter.CANCELED, OrderStatusFilter.FULFILLED]
    }
  },
  limits,
  onSettingsOpen: () => undefined,
  orders,
  sort: {
    ...sortPageProps.sort,
    sort: OrderListUrlSortField.number
  },
  paymentTotalAverage: 20.55,
  paymentTotalCaptured: { __typename: "Money", amount: 20, currency: "EUR" },
  paymentTotalDruralFee: { __typename: "Money", amount: 25, currency: "EUR" },
  paymentTotalFee: { __typename: "Money", amount: 10, currency: "EUR" },
  paymentTotalNet: { __typename: "Money", amount: 100, currency: "EUR" },
  paymentTotalQuantity: 20,
  paymentTotalQuantityRefund: 5,
  paymentTotalRefunds: { __typename: "Money", amount: 40, currency: "EUR" },
  paymentTotalStripeFee: { __typename: "Money", amount: 5, currency: "EUR" },

  loadingAnalyticsTable: false,
  loadingAnatyticsCards: false
};

storiesOf("Views / Orders / Order list", module)
  .addDecorator(Decorator)
  .add("default", () => <OrderListPage {...props} />)
  .add("loading", () => (
    <OrderListPage
      {...props}
      orders={undefined}
      currentTab={undefined}
      disabled={true}
    />
  ))
  .add("when no data", () => <OrderListPage {...props} orders={[]} />)
  .add("no limits", () => <OrderListPage {...props} limits={undefined} />)
  .add("limits reached", () => (
    <OrderListPage {...props} limits={limitsReached} />
  ));
