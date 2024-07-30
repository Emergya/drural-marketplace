import { RefreshLimits_shop_limits } from "@saleor/components/Shop/types/RefreshLimits";
import { PaymentTotalCaptured_paymentTotalCaptured } from "@saleor/orders/types/PaymentTotalCaptured";
import { PaymentTotalDruralFee_paymentTotalDruralFee } from "@saleor/orders/types/PaymentTotalDruralFee";
import { PaymentTotalFee_paymentTotalFee } from "@saleor/orders/types/PaymentTotalFee";
import { PaymentTotalNet_paymentTotalNet } from "@saleor/orders/types/PaymentTotalNet";
import { PaymentTotalRefunds_paymentTotalRefunds } from "@saleor/orders/types/PaymentTotalRefunds";
import { PaymentTotalStripeFee_paymentTotalStripeFee } from "@saleor/orders/types/PaymentTotalStripeFee";
import { OrderListUrlSortField } from "@saleor/orders/urls";
import { FilterPageProps, PageListProps, SortPage } from "@saleor/types";

import { OrderList_orders_edges_node } from "../../types/OrderList";
import { OrderFilterKeys, OrderListFilterOpts } from "./filters";

export interface OrderListPageProps
  extends PageListProps<OrderListColumns>,
    FilterPageProps<OrderFilterKeys, OrderListFilterOpts>,
    SortPage<OrderListUrlSortField> {
  paymentTotalNet: PaymentTotalNet_paymentTotalNet;
  paymentTotalCaptured: PaymentTotalCaptured_paymentTotalCaptured;
  paymentTotalRefunds: PaymentTotalRefunds_paymentTotalRefunds;
  paymentTotalFee: PaymentTotalFee_paymentTotalFee;
  paymentTotalDruralFee: PaymentTotalDruralFee_paymentTotalDruralFee;
  paymentTotalStripeFee: PaymentTotalStripeFee_paymentTotalStripeFee;
  paymentTotalQuantity: number;
  paymentTotalQuantityRefund: number;
  paymentTotalAverage: number;
  loadingAnatyticsCards: boolean;
  loadingAnalyticsTable: boolean;

  limits: RefreshLimits_shop_limits;
  orders: OrderList_orders_edges_node[];
  onSettingsOpen: () => void;
}

export enum OrderListColumns {
  paymentStatus = "paymentStatus",
  status = "status",

  totalSeller = "totalSeller",
  capturedAmount = "capturedAmount",
  refunded = "refunded",
  druralFee = "druralFee",
  stripeFee = "stripeFee",
  totalFee = "totalFee",

  total = "total"
}
