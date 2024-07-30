import { makeStyles } from "@drural/macaw-ui";
import { TableBody, TableCell, TableFooter, TableRow } from "@material-ui/core";
import { ResourceList_bookableResources_edges_node } from "@saleor/bookableResources/types/ResourceList";
import { ResourceListUrlSortField } from "@saleor/bookableResources/urls";
import Checkbox from "@saleor/components/Checkbox";
import ResponsiveTable from "@saleor/components/ResponsiveTable";
import Skeleton from "@saleor/components/Skeleton";
import StatusLabel from "@saleor/components/StatusLabel";
import { AVATAR_MARGIN } from "@saleor/components/TableCellAvatar/Avatar";
import TableCellHeader from "@saleor/components/TableCellHeader";
import TableHead from "@saleor/components/TableHead";
import TablePagination from "@saleor/components/TablePagination";
import useUser from "@saleor/hooks/useUser";
import { renderCollection } from "@saleor/misc";
import { ListActions, ListProps, SortPage } from "@saleor/types";
import { getArrowDirection } from "@saleor/utils/sort";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

const useStyles = makeStyles(
  () => ({
    colName: {
      width: "35%"
    },

    colShop: {
      width: "30%"
    },

    checkItemsWrapper: {
      display: "flex",
      alignItems: "center"
    },

    colQuantity: {
      width: "20%",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    },
    colState: {
      // marginRight: "20px",
      display: "flex",
      justifyContent: "flex-end",
      "& > div": {
        width: "85px"
      }
    },

    colNameHeader: {
      marginLeft: AVATAR_MARGIN
    },

    link: {
      cursor: "pointer"
    },

    table: {
      tableLayout: "fixed",
      "& .MuiTableHead-root .MuiTableCell-paddingCheckbox": {
        textAlign: "left"
      }
    },
    tableContainer: {
      overflowX: "scroll"
    }
  }),
  { name: "ResourceList" }
);

interface ResourceListProps
  extends ListProps,
    ListActions,
    SortPage<ResourceListUrlSortField> {
  loading: boolean;
  resources: ResourceList_bookableResources_edges_node[];
  totalCount?: number;
}

export const ResourceList: React.FC<ResourceListProps> = props => {
  const {
    settings,
    disabled,
    isChecked,
    pageInfo,
    resources,
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
    totalCount
  } = props;

  const { user } = useUser();
  const intl = useIntl();
  const classes = useStyles(props);
  const numberOfColumns = 6;

  return (
    <div className={classes.tableContainer}>
      <ResponsiveTable className={classes.table}>
        <TableHead
          colSpan={numberOfColumns}
          selected={selected}
          disabled={disabled}
          items={resources}
          toggleAll={toggleAll}
          toolbar={toolbar}
        >
          <TableCellHeader
            data-test-id="colNameHeader"
            arrowPosition="right"
            className={classes.colName}
            direction={
              sort.sort === ResourceListUrlSortField.name
                ? getArrowDirection(sort.asc)
                : undefined
            }
            onClick={() => onSort(ResourceListUrlSortField.name)}
          >
            <FormattedMessage defaultMessage="Name" description="resource" />
          </TableCellHeader>
          <TableCellHeader
            data-test-id="colTypeHeader"
            className={classes.colQuantity}
            direction={
              sort.sort === ResourceListUrlSortField.quantity
                ? getArrowDirection(sort.asc)
                : undefined
            }
            onClick={() => onSort(ResourceListUrlSortField.quantity)}
          >
            <FormattedMessage
              defaultMessage="Quantity"
              description="resource quantity"
            />
          </TableCellHeader>
          {user.isStaff && (
            <TableCellHeader
              data-test-id="colTypeHeader"
              className={classes.colShop}
              direction={
                sort.sort === ResourceListUrlSortField.shop
                  ? getArrowDirection(sort.asc)
                  : undefined
              }
              onClick={() => onSort(ResourceListUrlSortField.shop)}
            >
              <FormattedMessage
                defaultMessage="Shop"
                description="resource shop"
              />
            </TableCellHeader>
          )}
          <TableCellHeader
            arrowPosition="right"
            data-test-id="colTypeHeader"
            className={classes.colState}
            textAlign="right"
            direction={
              sort.sort === ResourceListUrlSortField.isActive
                ? getArrowDirection(sort.asc)
                : undefined
            }
            onClick={() => onSort(ResourceListUrlSortField.isActive)}
          >
            <FormattedMessage
              defaultMessage="State"
              description="resource activation state"
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
              numberOfRows={resources?.length}
              tableName={
                resources?.length === 1
                  ? intl.formatMessage({
                      defaultMessage: "resource"
                    })
                  : intl.formatMessage({
                      defaultMessage: "resources"
                    })
              }
              totalCount={totalCount}
            />
          </TableRow>
        </TableFooter>
        <TableBody>
          {renderCollection(
            resources,
            resource => {
              const isSelected = resource ? isChecked(resource.id) : false;

              return (
                <TableRow
                  selected={isSelected}
                  hover={!!resource}
                  key={resource ? resource.id : "skeleton"}
                  onClick={resource && onRowClick(resource.id)}
                  className={classes.link}
                  data-test="id"
                  data-test-id={resource ? resource?.id : "skeleton"}
                >
                  <TableCell padding="checkbox">
                    <div className={classes.checkItemsWrapper}>
                      <Checkbox
                        checked={isSelected}
                        disabled={disabled}
                        disableClickPropagation
                        onChange={() => toggle(resource.id)}
                      />
                    </div>
                  </TableCell>
                  <TableCell className={classes.colName} data-test="name">
                    {resource?.name || <Skeleton />}
                  </TableCell>
                  <TableCell
                    className={classes.colQuantity}
                    data-test="quantity"
                  >
                    {resource?.quantityInfinite ? (
                      <FormattedMessage defaultMessage="Inexhaustible" />
                    ) : resource?.quantity || resource?.quantity === 0 ? (
                      resource?.quantity
                    ) : (
                      <Skeleton />
                    )}
                  </TableCell>
                  {user.isStaff && (
                    <TableCell className={classes.colShop} data-test="shop">
                      {resource?.company.name || <Skeleton />}
                    </TableCell>
                  )}
                  <TableCell
                    className={classes.colState}
                    data-test="resource-state"
                  >
                    {resource ? (
                      <StatusLabel
                        status={resource?.isActive ? "success" : "neutral"}
                        label={resource?.isActive ? "Active" : "Inactive"}
                      />
                    ) : (
                      <Skeleton />
                    )}
                  </TableCell>
                </TableRow>
              );
            },
            () => (
              <TableRow>
                <TableCell colSpan={numberOfColumns}>
                  <FormattedMessage defaultMessage="No resources found" />
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </ResponsiveTable>
    </div>
  );
};

ResourceList.displayName = "ResourceList";
export default ResourceList;
