import { MutationFunction } from "@apollo/react-common";
import { makeStyles } from "@drural/macaw-ui";
import { Button, Card, darken } from "@material-ui/core";
import {
  CollectionAssignProduct,
  CollectionAssignProductVariables
} from "@saleor/collections/types/CollectionAssignProduct";
import {
  UnassignCollectionProduct,
  UnassignCollectionProductVariables
} from "@saleor/collections/types/UnassignCollectionProduct";
import CardMenu from "@saleor/components/CardMenu";
import Container from "@saleor/components/Container";
import FilterBar from "@saleor/components/FilterBar";
import LimitReachedAlert from "@saleor/components/LimitReachedAlert";
import PageHeader from "@saleor/components/PageHeader";
import { RefreshLimits_shop_limits } from "@saleor/components/Shop/types/RefreshLimits";
import useUser from "@saleor/hooks/useUser";
import { sectionNames } from "@saleor/intl";
import { ProductList_products_edges_node } from "@saleor/products/types/ProductList";
import {
  FetchMoreProps,
  FilterPageProps,
  ListActions,
  PageListProps,
  SortPage
} from "@saleor/types";
import { hasLimits, isLimitReached } from "@saleor/utils/limits";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { ProductListUrlSortField } from "../../urls";
import ProductList from "../ProductList";
import {
  createFilterStructure,
  ProductFilterKeys,
  ProductListFilterOpts
} from "./filters";

export interface ProductListPageProps
  extends PageListProps,
    ListActions,
    FilterPageProps<ProductFilterKeys, ProductListFilterOpts>,
    FetchMoreProps,
    SortPage<ProductListUrlSortField> {
  assignProduct: MutationFunction<
    CollectionAssignProduct,
    CollectionAssignProductVariables
  >;
  currencySymbol: string;
  featuredProductsCollectionId: string;
  limits: RefreshLimits_shop_limits;
  products: ProductList_products_edges_node[];
  onExport: () => void;
  onReport: () => void;
  unassignProduct: MutationFunction<
    UnassignCollectionProduct,
    UnassignCollectionProductVariables
  >;
}

const useStyles = makeStyles(
  theme => ({
    addButton: {
      [theme.breakpoints.down("xs")]: {
        padding: "12px"
      }
    },
    columnPicker: {
      marginRight: theme.spacing(3),
      [theme.breakpoints.down("xs")]: {
        marginRight: theme.spacing(1),
        "& > button": {
          padding: "10px 12px",
          width: "100%"
        }
      }
    },
    settings: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.down("xs")]: {
        marginRight: theme.spacing(1)
      },
      "& button": {
        boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
        color: darken(theme.palette.primary.main, 0.1),
        height: 48,
        width: 48,

        "&:hover": {
          color: theme.palette.primary.main
        }
      }
    }
  }),
  { name: "ProductListPage" }
);

export const ProductListPage: React.FC<ProductListPageProps> = props => {
  const {
    currencySymbol,
    currentTab,
    defaultSettings,
    limits,
    filterOpts,
    hasMore,
    initialSearch,
    loading,
    settings,
    tabs,
    onAdd,
    onAll,
    onExport,
    onReport,
    onFetchMore,
    onFilterChange,
    onSearchChange,
    onTabChange,
    onTabDelete,
    onTabSave,
    onUpdateListSettings,
    ...listProps
  } = props;
  const { user } = useUser();
  const intl = useIntl();
  const classes = useStyles(props);

  const filterStructure = createFilterStructure(intl, filterOpts);
  const limitReached = isLimitReached(limits, "productVariants");

  const basicMenuStructure = [
    {
      label: intl.formatMessage({
        defaultMessage: "Export Services",
        description: "export services to csv file, button"
      }),
      onSelect: onExport,
      testId: "export"
    }
  ];

  const menuItems = user.isStaff
    ? [
        {
          label: intl.formatMessage({
            defaultMessage: "Service reports"
          }),
          onSelect: onReport,
          testId: "report"
        },
        ...basicMenuStructure
      ]
    : basicMenuStructure;

  return (
    <Container>
      <PageHeader
        title={intl.formatMessage(sectionNames.services)}
        limitText={
          hasLimits(limits, "productVariants") &&
          intl.formatMessage(
            {
              defaultMessage: "{count}/{max} SKUs used",
              description: "created services counter"
            },
            {
              count: limits.currentUsage.productVariants,
              max: limits.allowedUsage.productVariants
            }
          )
        }
      >
        <CardMenu
          className={classes.settings}
          menuItems={menuItems}
          data-test="menu"
        />
        {!user.isStaff && (
          <Button
            className={classes.addButton}
            disabled={limitReached}
            onClick={onAdd}
            color="primary"
            variant="contained"
            data-test="add-service"
          >
            <FormattedMessage
              defaultMessage="Create Service"
              description="button"
            />
          </Button>
        )}
      </PageHeader>
      {limitReached && (
        <LimitReachedAlert
          title={intl.formatMessage({
            defaultMessage: "SKU limit reached",
            description: "alert"
          })}
        >
          <FormattedMessage defaultMessage="You have reached your SKU limit, you will be no longer able to add SKUs to your store. If you would like to up your limit, contact your administration staff about raising your limits." />
        </LimitReachedAlert>
      )}
      <Card>
        <FilterBar
          // 1. FilterContent
          filterStructure={filterStructure}
          onFilterChange={onFilterChange}
          // 2. SearchInput
          initialSearch={initialSearch}
          onSearchChange={onSearchChange}
          searchPlaceholder={intl.formatMessage({
            defaultMessage: "Search Services..."
          })}
          // 3. FilterTabs
          tabs={tabs}
          currentTab={currentTab}
          allTabLabel={intl.formatMessage({
            defaultMessage: "All Services",
            description: "tab name"
          })}
          onTabChange={onTabChange}
          onAll={onAll}
          // 4. Save/Delete search
          onTabDelete={onTabDelete}
          onTabSave={onTabSave}
          // 5. Price
          currencySymbol={currencySymbol}
        />
        <ProductList
          {...listProps}
          loading={loading}
          settings={settings}
          onUpdateListSettings={onUpdateListSettings}
        />
      </Card>
    </Container>
  );
};
ProductListPage.displayName = "ProductListPage";
export default ProductListPage;
