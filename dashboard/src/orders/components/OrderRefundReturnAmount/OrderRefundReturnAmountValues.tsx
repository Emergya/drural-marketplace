import { makeStyles } from "@drural/macaw-ui";
import Money, { IMoney } from "@saleor/components/Money";
import Skeleton from "@saleor/components/Skeleton";
import classNames from "classnames";
import reduce from "lodash/reduce";
import React from "react";
import { useIntl } from "react-intl";
import { defineMessages } from "react-intl";

const useStyles = makeStyles(
  theme => ({
    container: {
      ...theme.typography.body1,
      lineHeight: 1.9,
      width: "100%"
    },
    highlightedRow: {
      fontWeight: 600
    },
    row: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: theme.spacing(2),
      textAlign: "right"
    }
  }),
  { name: "OrderRefundAmountValues" }
);

export interface OrderRefundAmountValuesProps {
  authorizedAmount: IMoney;
  shipmentCost?: IMoney;
  selectedProductsValue?: IMoney;
  previouslyRefunded: IMoney;
  maxRefund: IMoney;
  proposedRefundAmount?: IMoney;
  replacedProductsValue?: IMoney;
  refundTotalAmount?: IMoney;
}

const messages = defineMessages({
  authorizedAmount: {
    defaultMessage: "Authorized Amount",
    description: "order refund amount"
  },
  maxRefund: {
    defaultMessage: "Max Refund",
    description: "order refund amount"
  },
  previouslyRefunded: {
    defaultMessage: "Previously refunded",
    description: "order refund amount"
  },
  proposedRefundAmount: {
    defaultMessage: "Proposed refund amount",
    description: "order refund amount"
  },
  refundTotalAmount: {
    defaultMessage: "Refund total amount",
    description: "order refund amount"
  },
  replacedProductsValue: {
    defaultMessage: "Replaced Products Value",
    description: "order refund amount"
  },
  selectedProductsValue: {
    defaultMessage: "Selected Products Value",
    description: "order refund amount"
  },
  shipmentCost: {
    defaultMessage: "Shipment Cost",
    description: "order refund amount"
  }
});

const OrderRefundAmountValues: React.FC<OrderRefundAmountValuesProps> = props => {
  const intl = useIntl();
  const classes = useStyles({});

  const orderedKeys: Array<keyof OrderRefundAmountValuesProps> = [
    "authorizedAmount",
    "shipmentCost",
    "selectedProductsValue",
    "previouslyRefunded",
    "replacedProductsValue",
    "maxRefund",
    "refundTotalAmount"
  ];

  const highlightedItems: Array<keyof OrderRefundAmountValuesProps> = [
    "maxRefund",
    "refundTotalAmount"
  ];

  const items = reduce(
    orderedKeys,
    (result, key) => {
      const value = props[key];

      if (!value) {
        return result;
      }

      return [
        ...result,
        { data: value, highlighted: highlightedItems.includes(key), key }
      ];
    },
    []
  );

  return (
    <div className={classes.container}>
      {items.map(({ key, data, highlighted }) => (
        <div
          className={classNames(classes.row, {
            [classes.highlightedRow]: highlighted
          })}
          key={key}
        >
          {intl.formatMessage(messages[key])}
          <div>
            {data?.amount !== undefined ? <Money money={data} /> : <Skeleton />}
          </div>
        </div>
      ))}
    </div>
  );
};

OrderRefundAmountValues.displayName = "OrderRefundAmountValues";
export default OrderRefundAmountValues;
