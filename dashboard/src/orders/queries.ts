import { fragmentAddress } from "@saleor/fragments/address";
import { moneyFragment } from "@saleor/fragments/money";
import {
  fragmentOrderDetails,
  fragmentOrderSettings,
  fragmentRefundOrderLine
} from "@saleor/fragments/orders";
import { fragmentMoney } from "@saleor/fragments/products";
import makeQuery from "@saleor/hooks/makeQuery";
import makeTopLevelSearch from "@saleor/hooks/makeTopLevelSearch";
import gql from "graphql-tag";

import { TypedQuery } from "../queries";
import { OrderDetails, OrderDetailsVariables } from "./types/OrderDetails";
import {
  OrderDraftList,
  OrderDraftListVariables
} from "./types/OrderDraftList";
import {
  OrderFulfillData,
  OrderFulfillDataVariables
} from "./types/OrderFulfillData";
import { OrderList, OrderListVariables } from "./types/OrderList";
import {
  OrderRefundData,
  OrderRefundDataVariables
} from "./types/OrderRefundData";
import { OrderSettings } from "./types/OrderSettings";
import {
  PaymentTotalAverage,
  PaymentTotalAverageVariables
} from "./types/PaymentTotalAverage";
import {
  PaymentTotalCaptured,
  PaymentTotalCapturedVariables
} from "./types/PaymentTotalCaptured";
import {
  PaymentTotalDruralFee,
  PaymentTotalDruralFeeVariables
} from "./types/PaymentTotalDruralFee";
import {
  PaymentTotalFee,
  PaymentTotalFeeVariables
} from "./types/PaymentTotalFee";
import {
  PaymentTotalNet,
  PaymentTotalNetVariables
} from "./types/PaymentTotalNet";
import {
  PaymentTotalQuantity,
  PaymentTotalQuantityVariables
} from "./types/PaymentTotalQuantity";
import {
  PaymentTotalQuantityRefund,
  PaymentTotalQuantityRefundVariables
} from "./types/PaymentTotalQuantityRefund";
import {
  PaymentTotalRefunds,
  PaymentTotalRefundsVariables
} from "./types/PaymentTotalRefunds";
import {
  PaymentTotalStripeFee,
  PaymentTotalStripeFeeVariables
} from "./types/PaymentTotalStripeFee";
import {
  SearchOrderVariant as SearchOrderVariantType,
  SearchOrderVariantVariables
} from "./types/SearchOrderVariant";

// Total net
export const paymentTotalNetQuery = gql`
  query PaymentTotalNet(
    $company: ID
    $customerSearch: String
    $period: DateRangeInput
    $status: [OrderStatusFilter]
    $search: String
  ) {
    paymentTotalNet(
      company: $company
      customerSearch: $customerSearch
      period: $period
      status: $status
      search: $search
    ) {
      amount
      currency
    }
  }
`;
export const usePaymentTotalNetQuery = makeQuery<
  PaymentTotalNet,
  PaymentTotalNetVariables
>(paymentTotalNetQuery);

// Total captured
export const paymentTotalCapturedQuery = gql`
  query PaymentTotalCaptured(
    $company: ID
    $customerSearch: String
    $period: DateRangeInput
    $status: [OrderStatusFilter]
    $search: String
  ) {
    paymentTotalCaptured(
      company: $company
      customerSearch: $customerSearch
      period: $period
      status: $status
      search: $search
    ) {
      amount
      currency
    }
  }
`;
export const usePaymentTotalCapturedQuery = makeQuery<
  PaymentTotalCaptured,
  PaymentTotalCapturedVariables
>(paymentTotalCapturedQuery);

// Total refunds
export const paymentTotalRefundsQuery = gql`
  query PaymentTotalRefunds(
    $company: ID
    $customerSearch: String
    $period: DateRangeInput
    $status: [OrderStatusFilter]
    $search: String
  ) {
    paymentTotalRefunds(
      company: $company
      customerSearch: $customerSearch
      period: $period
      status: $status
      search: $search
    ) {
      amount
      currency
    }
  }
`;
export const usePaymentTotalRefundsQuery = makeQuery<
  PaymentTotalRefunds,
  PaymentTotalRefundsVariables
>(paymentTotalRefundsQuery);

// Total fee
export const paymentTotalFeeQuery = gql`
  query PaymentTotalFee(
    $company: ID
    $customerSearch: String
    $period: DateRangeInput
    $status: [OrderStatusFilter]
    $search: String
  ) {
    paymentTotalFee(
      company: $company
      customerSearch: $customerSearch
      period: $period
      status: $status
      search: $search
    ) {
      amount
      currency
    }
  }
`;
export const usePaymentTotalFeeQuery = makeQuery<
  PaymentTotalFee,
  PaymentTotalFeeVariables
>(paymentTotalFeeQuery);

// Total dRural fee
export const paymentTotalDruralFeeQuery = gql`
  query PaymentTotalDruralFee(
    $company: ID
    $customerSearch: String
    $period: DateRangeInput
    $status: [OrderStatusFilter]
    $search: String
  ) {
    paymentTotalDruralFee(
      company: $company
      customerSearch: $customerSearch
      period: $period
      status: $status
      search: $search
    ) {
      amount
      currency
    }
  }
`;
export const usePaymentTotalDruralFeeQuery = makeQuery<
  PaymentTotalDruralFee,
  PaymentTotalDruralFeeVariables
>(paymentTotalDruralFeeQuery);

// Total stripe fee
export const paymentTotalStripeFeeQuery = gql`
  query PaymentTotalStripeFee(
    $company: ID
    $customerSearch: String
    $period: DateRangeInput
    $status: [OrderStatusFilter]
    $search: String
  ) {
    paymentTotalStripeFee(
      company: $company
      customerSearch: $customerSearch
      period: $period
      status: $status
      search: $search
    ) {
      amount
      currency
    }
  }
`;
export const usePaymentTotalStripeFeeQuery = makeQuery<
  PaymentTotalStripeFee,
  PaymentTotalStripeFeeVariables
>(paymentTotalStripeFeeQuery);

// Total quatity
export const paymentTotalQuantityQuery = gql`
  query PaymentTotalQuantity(
    $company: ID
    $customerSearch: String
    $period: DateRangeInput
    $status: [OrderStatusFilter]
    $search: String
  ) {
    paymentTotalQuantity(
      company: $company
      customerSearch: $customerSearch
      period: $period
      status: $status
      search: $search
    )
  }
`;
export const usePaymentTotalQuantityQuery = makeQuery<
  PaymentTotalQuantity,
  PaymentTotalQuantityVariables
>(paymentTotalQuantityQuery);

// Total quatity refund
export const paymentTotalQuantityRefundQuery = gql`
  query PaymentTotalQuantityRefund(
    $company: ID
    $customerSearch: String
    $period: DateRangeInput
    $status: [OrderStatusFilter]
    $search: String
  ) {
    paymentTotalQuantityRefund(
      company: $company
      customerSearch: $customerSearch
      period: $period
      status: $status
      search: $search
    )
  }
`;
export const usePaymentTotalQuantityRefundQuery = makeQuery<
  PaymentTotalQuantityRefund,
  PaymentTotalQuantityRefundVariables
>(paymentTotalQuantityRefundQuery);

// Total avegare
export const paymentTotalAverageQuery = gql`
  query PaymentTotalAverage(
    $company: ID
    $customerSearch: String
    $period: DateRangeInput
    $status: [OrderStatusFilter]
    $search: String
  ) {
    paymentTotalAverage(
      company: $company
      customerSearch: $customerSearch
      period: $period
      status: $status
      search: $search
    )
  }
`;
export const usePaymentTotalAverageQuery = makeQuery<
  PaymentTotalAverage,
  PaymentTotalAverageVariables
>(paymentTotalAverageQuery);

export const orderListQuery = gql`
  ${fragmentAddress}
  ${moneyFragment}
  query OrderList(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $filter: OrderFilterInput
    $sort: OrderSortingInput
    $company: ID
  ) {
    orders(
      before: $before
      after: $after
      first: $first
      last: $last
      filter: $filter
      sortBy: $sort
      company: $company
    ) {
      edges {
        node {
          __typename
          billingAddress {
            ...AddressFragment
          }
          booking {
            bookableResource {
              name
            }
            endDate
            startDate
          }
          created
          id
          number
          paymentStatus
          status
          total {
            gross {
              ...MoneyFragment
            }
          }
          payments {
            totalSeller {
              ...MoneyFragment
            }
            capturedAmount {
              ...MoneyFragment
            }
            refunded {
              ...MoneyFragment
            }
            totalFee {
              ...MoneyFragment
            }
            druralFee {
              ...MoneyFragment
            }
            stripeFee {
              ...MoneyFragment
            }
          }
          userEmail
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
`;
export const useOrderListQuery = makeQuery<OrderList, OrderListVariables>(
  orderListQuery
);

export const orderDraftListQuery = gql`
  ${fragmentAddress}
  query OrderDraftList(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $filter: OrderDraftFilterInput
    $sort: OrderSortingInput
    $company: ID
  ) {
    draftOrders(
      before: $before
      after: $after
      first: $first
      last: $last
      filter: $filter
      sortBy: $sort
      company: $company
    ) {
      edges {
        node {
          __typename
          billingAddress {
            ...AddressFragment
          }
          created
          id
          number
          paymentStatus
          status
          total {
            __typename
            gross {
              __typename
              amount
              currency
            }
          }
          userEmail
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
`;
export const useOrderDraftListQuery = makeQuery<
  OrderDraftList,
  OrderDraftListVariables
>(orderDraftListQuery);

export const orderDetailsQuery = gql`
  ${fragmentOrderDetails}
  ${fragmentMoney}
  query OrderDetails($id: ID!) {
    order(id: $id) {
      ...OrderDetailsFragment
    }
    shop {
      countries {
        code
        country
      }
      defaultWeightUnit
    }
  }
`;

export const TypedOrderDetailsQuery = TypedQuery<
  OrderDetails,
  OrderDetailsVariables
>(orderDetailsQuery);

export const useOrderQuery = makeQuery<OrderDetails, OrderDetailsVariables>(
  orderDetailsQuery
);

export const searchOrderVariant = gql`
  query SearchOrderVariant(
    $channel: String!
    $company: ID
    $first: Int!
    $query: String!
    $after: String
  ) {
    search: products(
      first: $first
      after: $after
      filter: { search: $query }
      channel: $channel
      company: $company
    ) {
      edges {
        node {
          id
          name
          thumbnail {
            url
          }
          channelListings {
            isPublished
          }
          company {
            isEnabled
            status
          }
          variants {
            id
            name
            sku
            channelListings {
              channel {
                id
                isActive
                name
                currencyCode
              }
              price {
                amount
                currency
              }
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;
export const useOrderVariantSearch = makeTopLevelSearch<
  SearchOrderVariantType,
  SearchOrderVariantVariables
>(searchOrderVariant);

const orderFulfillData = gql`
  query OrderFulfillData($orderId: ID!) {
    order(id: $orderId) {
      id
      lines {
        id
        isShippingRequired
        productName
        quantity
        allocations {
          quantity
          warehouse {
            id
          }
        }
        quantityFulfilled
        variant {
          id
          name
          sku
          attributes {
            values {
              id
              name
            }
          }
          stocks {
            id
            warehouse {
              id
            }
            quantity
            quantityAllocated
          }
          trackInventory
        }
        thumbnail(size: 64) {
          url
        }
      }
      number
    }
  }
`;
export const useOrderFulfillData = makeQuery<
  OrderFulfillData,
  OrderFulfillDataVariables
>(orderFulfillData);

export const orderSettingsQuery = gql`
  ${fragmentOrderSettings}
  query OrderSettings {
    orderSettings {
      ...OrderSettingsFragment
    }
  }
`;
export const useOrderSettingsQuery = makeQuery<OrderSettings, never>(
  orderSettingsQuery
);

const orderRefundData = gql`
  ${fragmentMoney}
  ${fragmentRefundOrderLine}
  query OrderRefundData($orderId: ID!) {
    order(id: $orderId) {
      id
      number
      total {
        gross {
          ...Money
        }
      }
      totalCaptured {
        ...Money
      }
      shippingPrice {
        gross {
          ...Money
        }
      }
      lines {
        ...RefundOrderLineFragment
        quantityFulfilled
      }
      fulfillments {
        id
        status
        fulfillmentOrder
        lines {
          id
          quantity
          orderLine {
            ...RefundOrderLineFragment
          }
        }
      }
    }
  }
`;
export const useOrderRefundData = makeQuery<
  OrderRefundData,
  OrderRefundDataVariables
>(orderRefundData);
