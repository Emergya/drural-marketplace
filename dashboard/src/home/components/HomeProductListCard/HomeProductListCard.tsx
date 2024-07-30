import { makeStyles } from "@drural/macaw-ui";
import {
  Card,
  TableBody,
  TableCell,
  TableRow,
  Typography
} from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import Money from "@saleor/components/Money";
import ResponsiveTable from "@saleor/components/ResponsiveTable";
import Skeleton from "@saleor/components/Skeleton";
import TableCellAvatar from "@saleor/components/TableCellAvatar";
import classNames from "classnames";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { maybe, renderCollection } from "../../../misc";
import { Home_featuredProducts_edges_node } from "../../types/Home";

const useStyles = makeStyles(
  theme => ({
    avatarProps: {
      height: 64,
      width: 64
    },
    colAvatar: {
      paddingBottom: theme.spacing(2),
      paddingRight: theme.spacing(),
      paddingTop: theme.spacing(2),
      width: 112
    },
    colName: {
      width: "auto"
    },
    label: {
      paddingLeft: 0
    },
    noProducts: {
      paddingBottom: 20,
      paddingTop: 20
    },
    tableRow: {
      cursor: "pointer"
    }
  }),
  { name: "HomeProductListCard" }
);

interface HomeProductListProps {
  testId?: string;
  featuredProducts: Home_featuredProducts_edges_node[];
  onRowClick: (productId: string) => void;
}

export const HomeProductList: React.FC<HomeProductListProps> = props => {
  const { featuredProducts, onRowClick, testId } = props;
  const classes = useStyles(props);

  const intl = useIntl();

  return (
    <Card data-test-id={testId}>
      <CardTitle
        title={intl.formatMessage({
          defaultMessage: "Featured services",
          description: "header",
          id: "homeProductsListCardHeader"
        })}
      />
      <ResponsiveTable>
        <colgroup>
          <col className={classes.colAvatar} />
          <col className={classes.colName} />
          <col />
        </colgroup>
        <TableBody>
          {renderCollection(
            featuredProducts,
            product => (
              <TableRow
                key={product ? product.id : "skeleton"}
                hover={!!product}
                className={classNames({
                  [classes.tableRow]: !!product
                })}
                onClick={!!product ? () => onRowClick(product.id) : undefined}
              >
                <TableCellAvatar
                  className={classes.colAvatar}
                  thumbnail={maybe(() => product?.thumbnail?.url)}
                  avatarProps={classes.avatarProps}
                />

                <TableCell className={classes.label}>
                  {product ? (
                    <>
                      <Typography color={"primary"}>{product.name}</Typography>
                      {/* <Typography color={"textSecondary"}>
                        {maybe(() =>
                          variant.attributes
                            .map(attribute => attribute.values[0].name)
                            .join(" / ")
                        )}
                      </Typography> */}
                      <Typography color={"textSecondary"}>
                        <FormattedMessage
                          defaultMessage="{amount, plural,one {One ordered}other {{amount} Ordered}}"
                          description="number of ordered products"
                          id="homeProductListCardOrders"
                          values={{
                            amount: product.defaultVariant?.quantityOrdered || 0
                          }}
                        />
                      </Typography>
                    </>
                  ) : (
                    <Skeleton />
                  )}
                </TableCell>

                <TableCell>
                  <Typography align={"right"}>
                    {maybe(
                      () => (
                        <Money
                          money={product?.defaultVariant?.revenue?.gross}
                        />
                      ),
                      <Skeleton />
                    )}
                  </Typography>
                </TableCell>
              </TableRow>
            ),
            () => (
              <TableRow>
                <TableCell colSpan={3} className={classes.noProducts}>
                  <Typography>
                    <FormattedMessage
                      defaultMessage="No products found"
                      id="homeProductsListCardNoProducts"
                    />
                  </Typography>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </ResponsiveTable>
    </Card>
  );
};

HomeProductList.displayName = "HomeProductList";
export default HomeProductList;
