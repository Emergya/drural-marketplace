import { MutationFunction } from "@apollo/react-common";
import starStuffed from "@assets/images/dRuralIcons/star-stuffed.svg";
import { makeStyles } from "@drural/macaw-ui";
import { UilCheckCircle, UilStar } from "@iconscout/react-unicons";
import {
  darken,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
  Tooltip
} from "@material-ui/core";
import {
  CollectionAssignProduct,
  CollectionAssignProductVariables
} from "@saleor/collections/types/CollectionAssignProduct";
import {
  UnassignCollectionProduct,
  UnassignCollectionProductVariables
} from "@saleor/collections/types/UnassignCollectionProduct";
import Checkbox from "@saleor/components/Checkbox";
import ResponsiveTable from "@saleor/components/ResponsiveTable";
import Skeleton from "@saleor/components/Skeleton";
import TableCellAvatar from "@saleor/components/TableCellAvatar";
import { AVATAR_MARGIN } from "@saleor/components/TableCellAvatar/Avatar";
import TableCellHeader from "@saleor/components/TableCellHeader";
import TableHead from "@saleor/components/TableHead";
import TablePagination from "@saleor/components/TablePagination";
import useLocale from "@saleor/hooks/useLocale";
import useUser from "@saleor/hooks/useUser";
import { maybe, renderCollection } from "@saleor/misc";
import { ProductList_products_edges_node } from "@saleor/products/types/ProductList";
import { ProductListUrlSortField } from "@saleor/products/urls";
import { ListActions, ListProps, SortPage } from "@saleor/types";
import { dateFormat } from "@saleor/utils/date/contants";
import { mapEdgesToItems } from "@saleor/utils/maps";
import { getArrowDirection } from "@saleor/utils/sort";
import classNames from "classnames";
import React from "react";
import SVG from "react-inlinesvg";
import { FormattedMessage, useIntl } from "react-intl";
import Moment from "react-moment";

const useStyles = makeStyles(
  theme => ({
    [theme.breakpoints.up("lg")]: {
      colName: {
        width: "auto"
      },
      colPrice: {
        width: 300
      },
      colPublished: {
        width: 200
      },
      colType: {
        width: 200
      }
    },
    activeShopIcon: {
      color: darken(theme.palette.primary.main, 0.1)
    },
    checkItemsWrapper: {
      display: "flex",
      alignItems: "center"
    },
    colAttribute: {
      width: 150
    },
    colCategories: {
      maxWidth: 220,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    },
    colCreationDate: {
      textAlign: "right"
    },
    colFill: {
      padding: 0,
      width: "100%"
    },
    colName: {
      "&$colNameFixed": {
        width: 250
      }
    },
    colNameHeader: {
      marginLeft: AVATAR_MARGIN
    },
    colNameWrapper: {
      display: "block"
    },
    colStatus: {
      textAlign: "center"
    },
    colType: {},
    link: {
      cursor: "pointer"
    },
    starEmpty: {
      opacity: 0.5,
      "&:hover": {
        opacity: 1
      }
    },
    startWrapper: {
      lineHeight: theme.spacing(0.75),
      padding: theme.spacing(1.5)
    },
    table: {
      tableLayout: "fixed",
      "& .MuiTableHead-root .MuiTableCell-paddingCheckbox": {
        textAlign: "left"
      }
    },
    tableContainer: {
      overflowX: "scroll"
    },
    textLeft: {
      textAlign: "left"
    },
    textRight: {
      textAlign: "right"
    }
  }),
  { name: "ProductList" }
);

interface ProductListProps
  extends ListProps,
    ListActions,
    SortPage<ProductListUrlSortField> {
  assignProduct: MutationFunction<
    CollectionAssignProduct,
    CollectionAssignProductVariables
  >;
  featuredProductsCollectionId: string;
  loading: boolean;
  products: ProductList_products_edges_node[];
  unassignProduct: MutationFunction<
    UnassignCollectionProduct,
    UnassignCollectionProductVariables
  >;
  totalCount?: number;
}

export const ProductList: React.FC<ProductListProps> = props => {
  const {
    settings,
    disabled,
    isChecked,
    pageInfo,
    products,
    selected,
    sort,
    toggle,
    toggleAll,
    toolbar,
    onNextPage,
    onPreviousPage,
    onUpdateListSettings,
    onRowClick,
    onSort,
    featuredProductsCollectionId,
    assignProduct,
    unassignProduct,
    totalCount
  } = props;

  const { user } = useUser();
  const intl = useIntl();
  const classes = useStyles(props);
  const { locale } = useLocale();
  // const numberOfColumns = 2 + settings.columns.length;
  const numberOfColumns = 6;

  return (
    <div className={classes.tableContainer}>
      <ResponsiveTable className={classes.table}>
        <TableHead
          colSpan={numberOfColumns}
          selected={selected}
          disabled={disabled}
          items={products}
          toggleAll={toggleAll}
          toolbar={toolbar}
        >
          <TableCellHeader
            data-test-id="colNameHeader"
            arrowPosition="right"
            className={classes.colName}
            direction={
              sort.sort === ProductListUrlSortField.name
                ? getArrowDirection(sort.asc)
                : undefined
            }
            onClick={() => onSort(ProductListUrlSortField.name)}
          >
            <span className={classes.colNameHeader}>
              <FormattedMessage defaultMessage="Name" description="service" />
            </span>
          </TableCellHeader>
          <TableCellHeader
            data-test-id="colTypeHeader"
            className={classes.colCategories}
            direction={
              sort.sort === ProductListUrlSortField.category
                ? getArrowDirection(sort.asc)
                : undefined
            }
            onClick={() => onSort(ProductListUrlSortField.category)}
          >
            <FormattedMessage
              defaultMessage="Categories"
              description="service categories"
            />
          </TableCellHeader>
          <TableCellHeader
            data-test-id="colTypeHeader"
            className={classes.colType}
            textAlign="center"
            direction={
              sort.sort === ProductListUrlSortField.status
                ? getArrowDirection(sort.asc)
                : undefined
            }
            onClick={() => onSort(ProductListUrlSortField.status)}
          >
            <FormattedMessage
              defaultMessage="Active"
              description="Active service"
            />
          </TableCellHeader>
          {user.isStaff && (
            <TableCellHeader
              data-test-id="colTypeHeader"
              className={classes.colType}
              direction={
                sort.sort === ProductListUrlSortField.shop
                  ? getArrowDirection(sort.asc)
                  : undefined
              }
              onClick={() => onSort(ProductListUrlSortField.shop)}
            >
              <FormattedMessage
                defaultMessage="Shop"
                description="service shop"
              />
            </TableCellHeader>
          )}
          <TableCellHeader
            data-test-id="colTypeHeader"
            className={classes.colType}
            textAlign="right"
            direction={
              sort.sort === ProductListUrlSortField.createdDate
                ? getArrowDirection(sort.asc)
                : undefined
            }
            onClick={() => onSort(ProductListUrlSortField.createdDate)}
          >
            <FormattedMessage
              defaultMessage="Creation date"
              description="service creation date"
            />
          </TableCellHeader>
        </TableHead>
        <TableFooter>
          <TableRow>
            <TablePagination
              colSpan={numberOfColumns}
              settings={settings}
              hasNextPage={pageInfo && !disabled ? pageInfo.hasNextPage : false}
              onNextPage={onNextPage}
              onUpdateListSettings={onUpdateListSettings}
              hasPreviousPage={
                pageInfo && !disabled ? pageInfo.hasPreviousPage : false
              }
              onPreviousPage={onPreviousPage}
              // Table total count data
              numberOfRows={products?.length}
              tableName={
                products?.length === 1
                  ? intl.formatMessage({
                      defaultMessage: "service"
                    })
                  : intl.formatMessage({
                      defaultMessage: "services"
                    })
              }
              totalCount={totalCount}
            />
          </TableRow>
        </TableFooter>
        <TableBody>
          {renderCollection(
            products,
            product => {
              const isSelected = product ? isChecked(product.id) : false;
              const featureIndex = product?.collections?.findIndex(
                collection => collection.id === featuredProductsCollectionId
              );

              return (
                <TableRow
                  selected={isSelected}
                  hover={!!product}
                  key={product ? product.id : "skeleton"}
                  onClick={product && onRowClick(product.id)}
                  className={classes.link}
                  data-test="id"
                  data-test-id={product ? product?.id : "skeleton"}
                >
                  <TableCell padding="checkbox">
                    <div className={classes.checkItemsWrapper}>
                      <Checkbox
                        checked={isSelected}
                        disabled={disabled}
                        disableClickPropagation
                        onChange={() => toggle(product.id)}
                      />

                      <div className={classes.startWrapper}>
                        {product && (
                          <Tooltip
                            title={
                              featureIndex !== -1
                                ? intl.formatMessage({
                                    defaultMessage: "Featured service"
                                  })
                                : intl.formatMessage({
                                    defaultMessage: "Unfeatured service"
                                  })
                            }
                          >
                            <div>
                              {featureIndex !== -1 ? (
                                <SVG
                                  src={starStuffed}
                                  onClick={e => {
                                    e.stopPropagation();
                                    if (user.isStaff) {
                                      unassignProduct({
                                        variables: {
                                          collectionId: featuredProductsCollectionId,
                                          productIds: [product.id],
                                          first: 12
                                        }
                                      });
                                    }
                                  }}
                                />
                              ) : (
                                <UilStar
                                  className={classes.starEmpty}
                                  onClick={e => {
                                    e.stopPropagation();
                                    if (user.isStaff) {
                                      assignProduct({
                                        variables: {
                                          collectionId: featuredProductsCollectionId,
                                          productIds: [product.id],
                                          first: 12
                                        }
                                      });
                                    }
                                  }}
                                />
                              )}
                            </div>
                          </Tooltip>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCellAvatar
                    className={classes.colName}
                    thumbnail={maybe(() => product.thumbnail.url)}
                  >
                    {product ? (
                      <div className={classes.colNameWrapper}>
                        <span data-test="name">{product.name}</span>
                      </div>
                    ) : (
                      <Skeleton />
                    )}
                  </TableCellAvatar>
                  <TableCell
                    className={classes.colCategories}
                    data-test="categories"
                  >
                    {product && product.categories ? (
                      <Tooltip
                        title={mapEdgesToItems(product.categories)
                          .map(category => category.name)
                          .join(", ")}
                      >
                        <span>
                          {mapEdgesToItems(product.categories)
                            .map(category => category.name)
                            .join(", ")}
                        </span>
                      </Tooltip>
                    ) : (
                      <Skeleton />
                    )}
                  </TableCell>
                  <TableCell
                    className={classes.colStatus}
                    data-test="product-status"
                  >
                    {product &&
                      (product?.channelListings[0]?.isPublished ? (
                        <UilCheckCircle className={classes.activeShopIcon} />
                      ) : (
                        "-"
                      ))}
                  </TableCell>
                  {user.isStaff && (
                    <TableCell className={classes.colType} data-test="shop">
                      {product?.company.publicName || <Skeleton />}
                    </TableCell>
                  )}
                  <TableCell
                    className={classNames(
                      classes.colType,
                      classes.colCreationDate
                    )}
                    data-test="creation-date"
                  >
                    {maybe<React.ReactNode>(
                      () => (
                        <Moment format={dateFormat} locale={locale}>
                          {product.createdAt as string}
                        </Moment>
                      ),
                      <Skeleton />
                    )}
                  </TableCell>
                </TableRow>
              );
            },
            () => (
              <TableRow>
                <TableCell colSpan={numberOfColumns}>
                  <FormattedMessage defaultMessage="No services found" />
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </ResponsiveTable>
    </div>
  );
};
ProductList.displayName = "ProductList";
export default ProductList;
