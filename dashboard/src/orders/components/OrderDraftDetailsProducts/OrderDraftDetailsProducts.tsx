import { makeStyles } from "@drural/macaw-ui";
import { TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import ResponsiveTable from "@saleor/components/ResponsiveTable";
import { AVATAR_MARGIN } from "@saleor/components/TableCellAvatar/Avatar";
import {
  OrderLineDiscountConsumer,
  OrderLineDiscountContextConsumerProps
} from "@saleor/products/components/OrderDiscountProviders/OrderLineDiscountProvider";
import React from "react";
import { FormattedMessage } from "react-intl";

import { maybe, renderCollection } from "../../../misc";
import { OrderDetails_order_lines } from "../../types/OrderDetails";
import TableLine from "./TableLine";

export interface FormData {
  quantity: number;
}

const useStyles = makeStyles(
  theme => ({
    colAction: {
      "&:last-child": {
        paddingRight: 0
      },
      width: theme.spacing(10)
    },
    colName: {
      width: "auto"
    },
    colNameLabel: {
      marginLeft: AVATAR_MARGIN
    },
    colPrice: {
      textAlign: "right"
    },
    colQuantity: {
      textAlign: "right"
    },
    colTotal: {
      textAlign: "right"
    },
    errorInfo: {
      color: theme.palette.error.main
    },
    quantityField: {
      "& input": {
        padding: "12px 12px 10px",
        textAlign: "right"
      },
      width: 60
    },
    table: {
      tableLayout: "fixed"
    }
  }),
  { name: "OrderDraftDetailsProducts" }
);

interface OrderDraftDetailsProductsProps {
  lines: OrderDetails_order_lines[];
  onOrderLineChange: (id: string, data: FormData) => void;
  onOrderLineRemove: (id: string) => void;
}

const OrderDraftDetailsProducts: React.FC<OrderDraftDetailsProductsProps> = props => {
  const { lines, onOrderLineChange, onOrderLineRemove } = props;

  const classes = useStyles(props);

  return (
    <ResponsiveTable className={classes.table}>
      {maybe(() => !!lines.length) && (
        <TableHead>
          <TableRow>
            <TableCell className={classes.colName}>
              <span className={classes.colNameLabel}>
                <FormattedMessage defaultMessage="Product" />
              </span>
            </TableCell>
            <TableCell className={classes.colQuantity}>
              <FormattedMessage
                defaultMessage="Quantity"
                description="quantity of ordered products"
              />
            </TableCell>
            <TableCell className={classes.colPrice}>
              <FormattedMessage
                defaultMessage="Price"
                description="price or ordered products"
              />
            </TableCell>
            <TableCell className={classes.colTotal}>
              <FormattedMessage
                defaultMessage="Total"
                description="total price of ordered products"
              />
            </TableCell>
            <TableCell className={classes.colAction} />
          </TableRow>
        </TableHead>
      )}
      <TableBody>
        {!!lines?.length ? (
          renderCollection(lines, line => (
            <OrderLineDiscountConsumer key={line.id} orderLineId={line.id}>
              {(
                orderLineDiscountProps: OrderLineDiscountContextConsumerProps
              ) => (
                <TableLine
                  {...orderLineDiscountProps}
                  line={line}
                  onOrderLineChange={onOrderLineChange}
                  onOrderLineRemove={onOrderLineRemove}
                />
              )}
            </OrderLineDiscountConsumer>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5}>
              <FormattedMessage defaultMessage="No Products added to Order" />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </ResponsiveTable>
  );
};
OrderDraftDetailsProducts.displayName = "OrderDraftDetailsProducts";
export default OrderDraftDetailsProducts;
