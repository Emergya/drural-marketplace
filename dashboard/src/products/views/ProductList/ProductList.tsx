import { makeStyles } from "@drural/macaw-ui";
import { UilStar, UilTrashAlt } from "@iconscout/react-unicons";
import {
  darken,
  DialogContentText,
  IconButton,
  Tooltip
} from "@material-ui/core";
import {
  useCollectionAssignProductMutation,
  useUnassignCollectionProductMutation
} from "@saleor/collections/mutations";
import ActionDialog from "@saleor/components/ActionDialog";
import useAppChannel from "@saleor/components/AppLayout/AppChannelContext";
import { BusinessContext } from "@saleor/components/BusinessProvider";
import DeleteFilterTabDialog from "@saleor/components/DeleteFilterTabDialog";
import SaveFilterTabDialog, {
  SaveFilterTabDialogFormData
} from "@saleor/components/SaveFilterTabDialog";
import { useShopLimitsQuery } from "@saleor/components/Shop/query";
import {
  DEFAULT_INITIAL_PAGINATION_DATA,
  DEFAULT_INITIAL_SEARCH_DATA,
  defaultListSettings
} from "@saleor/config";
import { Task } from "@saleor/containers/BackgroundTasks/types";
import useBackgroundTask from "@saleor/hooks/useBackgroundTask";
import useBulkActions from "@saleor/hooks/useBulkActions";
import useListSettings from "@saleor/hooks/useListSettings";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import usePaginator, {
  createPaginationState
} from "@saleor/hooks/usePaginator";
import useUser from "@saleor/hooks/useUser";
import { commonMessages } from "@saleor/intl";
import { maybe } from "@saleor/misc";
import ProductExportDialog from "@saleor/products/components/ProductExportDialog";
import {
  useGetCollectionBySlug,
  useInitialProductFilterCategoriesQuery,
  useInitialProductFilterCollectionsQuery,
  useProductCountQuery,
  useProductListQuery
} from "@saleor/products/queries";
import {
  productAddUrl,
  productListUrl,
  ProductListUrlDialog,
  ProductListUrlQueryParams,
  productReportListUrl,
  productUrl
} from "@saleor/products/urls";
import { getCompany } from "@saleor/products/utils/data";
import useAttributeSearch from "@saleor/searches/useAttributeSearch";
import useCategorySearch from "@saleor/searches/useCategorySearch";
import useCollectionSearch from "@saleor/searches/useCollectionSearch";
import { ListViews } from "@saleor/types";
import createDialogActionHandlers from "@saleor/utils/handlers/dialogActionHandlers";
import createFilterHandlers from "@saleor/utils/handlers/filterHandlers";
import createSortHandler from "@saleor/utils/handlers/sortHandler";
import { mapEdgesToItems } from "@saleor/utils/maps";
// import { useWarehouseList } from "@saleor/warehouses/queries";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { ExportProductsInput } from "../../../types/globalTypes";
import ProductListPage from "../../components/ProductListPage";
import {
  useProductBulkDeleteMutation,
  useProductExport
} from "../../mutations";
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

interface ProductListProps {
  params: ProductListUrlQueryParams;
}

const useStyles = makeStyles(
  theme => ({
    addToFeatureServiceIcon: {
      backgroundColor: darken(theme.palette.primary.main, 0.1),
      boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
      color: "#ffffff",

      "&:hover": {
        backgroundColor: theme.palette.primary.main
      }
    },
    deleteIcon: {
      backgroundColor: theme.palette.secondary.main,
      boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
      color: "#ffffff",

      "&:hover": {
        backgroundColor: theme.palette.primary.main
      }
    },
    dialogContent: {
      textAlign: "center"
    }
  }),
  { name: "ServiceListWiev" }
);

export const ProductList: React.FC<ProductListProps> = ({ params }) => {
  const classes = useStyles();
  const navigate = useNavigator();
  const notify = useNotifier();
  const paginate = usePaginator();
  const { queue } = useBackgroundTask();
  const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions(
    params.ids
  );
  const { updateListSettings, settings } = useListSettings(
    ListViews.PRODUCT_LIST
  );

  const { user } = useUser();
  const intl = useIntl();
  const {
    data: initialFilterCategories
  } = useInitialProductFilterCategoriesQuery({
    variables: {
      categories: params.categories
    },
    skip: !params.categories?.length
  });
  const {
    data: initialFilterCollections
  } = useInitialProductFilterCollectionsQuery({
    variables: {
      collections: params.collections
    },
    skip: !params.collections?.length
  });
  const {
    data: featuredProductsCollection,
    refetch: refetchFeaturedProductsCollection
  } = useGetCollectionBySlug({
    variables: {
      slug: "featured-products"
    }
  });
  const searchCategories = useCategorySearch({
    variables: {
      ...DEFAULT_INITIAL_SEARCH_DATA,
      first: 5
    }
  });
  const searchCollections = useCollectionSearch({
    variables: {
      ...DEFAULT_INITIAL_SEARCH_DATA,
      first: 5
    }
  });
  // Staying for the moment - this data is used in export CSV, channels are also used in price filter.
  const searchAttributes = useAttributeSearch({
    variables: {
      ...DEFAULT_INITIAL_SEARCH_DATA,
      first: 10
    }
  });
  // const warehouses = useWarehouseList({
  //   variables: {
  //     first: 100
  //   },
  //   skip: params.action !== "export"
  // });
  const { availableChannels } = useAppChannel(false);
  const limitOpts = useShopLimitsQuery({
    variables: {
      productVariants: true
    }
  });

  const selectedChannel = availableChannels.find(
    channel => channel.slug === params.channel
  );
  // -------------------------------

  const [openModal, closeModal] = createDialogActionHandlers<
    ProductListUrlDialog,
    ProductListUrlQueryParams
  >(navigate, productListUrl, params);

  // Reset pagination
  React.useEffect(
    () =>
      navigate(
        productListUrl({
          ...params,
          ...DEFAULT_INITIAL_PAGINATION_DATA
        }),
        true
      ),
    [settings.rowNumber]
  );

  const tabs = getFilterTabs();

  const currentTab =
    params.activeTab === undefined
      ? areFiltersApplied(params)
        ? tabs.length + 1
        : 0
      : parseInt(params.activeTab, 0);

  const countAllProducts = useProductCountQuery({
    skip: params.action !== "export"
  });

  const [exportProducts, exportProductsOpts] = useProductExport({
    onCompleted: data => {
      if (data.exportProducts.errors.length === 0) {
        notify({
          text: intl.formatMessage({
            defaultMessage:
              "We are currently exporting your requested CSV. As soon as it is available it will be sent to your email address"
          }),
          title: intl.formatMessage({
            defaultMessage: "Exporting CSV",
            description: "waiting for export to end, header"
          })
        });
        queue(Task.EXPORT, {
          id: data.exportProducts.exportFile.id
        });
        closeModal();
        reset();
      }
    }
  });

  const [
    changeFilters,
    resetFilters,
    handleSearchChange
  ] = createFilterHandlers({
    cleanupFn: reset,
    createUrl: productListUrl,
    getFilterQueryParam,
    navigate,
    params
  });

  // useEffect(() => {
  //   const sortWithQuery = ProductListUrlSortField.rank;
  //   const sortWithoutQuery =
  //     params.sort === ProductListUrlSortField.rank
  //       ? DEFAULT_SORT_KEY
  //       : params.sort;
  //   navigate(
  //     productListUrl({
  //       ...params,
  //       asc: params.query ? undefined : params.asc,
  //       sort: params.query ? sortWithQuery : sortWithoutQuery
  //     })
  //   );
  // }, [params.query]);

  const handleExportProducts = (data: ExportProductsInput): void => {
    if (!user.isStaff) {
      const { fields } = data.exportInfo || {};
      data.exportInfo = { fields };
    }

    exportProducts({
      variables: {
        input: {
          ...data,
          filter: {
            ...filter,
            ...company
          },
          ids: listElements
        }
      }
    });
  };

  const handleTabChange = (tab: number) => {
    reset();
    navigate(
      productListUrl({
        activeTab: tab.toString(),
        ...getFilterTabs()[tab - 1].data
      })
    );
  };

  const handleFilterTabDelete = () => {
    deleteFilterTab(currentTab);
    reset();
    navigate(productListUrl());
  };

  const handleFilterTabSave = (data: SaveFilterTabDialogFormData) => {
    saveFilterTab(data.name, getActiveFilters(params));
    handleTabChange(tabs.length + 1);
  };

  const handleSort = createSortHandler(navigate, productListUrl, params);

  // Business data
  const { activeBusiness } = React.useContext(BusinessContext);
  const paginationState = createPaginationState(settings.rowNumber, params);
  const filter = getFilterVariables(params, !!selectedChannel);
  const sort = getSortQueryVariables(params /* !!selectedChannel */);
  const company = getCompany(user.isStaff, activeBusiness?.active.node.id);
  const queryVariables = React.useMemo(
    () => ({
      ...paginationState,
      ...company,
      filter,
      sort,
      channel:
        selectedChannel?.slug ||
        (availableChannels && availableChannels[0].slug)
    }),
    [params, settings.rowNumber, company]
  );

  // TODO: When channel is undefined we should skip detailed pricing listings
  const { data, loading, refetch } = useProductListQuery({
    displayLoader: true,
    variables: queryVariables
  });

  const [assignProduct, assignProductOpts] = useCollectionAssignProductMutation(
    {
      onCompleted: data => {
        if (data.collectionAddProducts.errors.length === 0) {
          closeModal();
          notify({
            status: "success",
            text: intl.formatMessage(commonMessages.savedChanges)
          });
          reset();
          refetch();
          refetchFeaturedProductsCollection();
          limitOpts.refetch();
        }
      }
    }
  );

  const [unassignProduct] = useUnassignCollectionProductMutation({
    onCompleted: data => {
      if (data.collectionRemoveProducts.errors.length === 0) {
        closeModal();
        notify({
          status: "success",
          text: intl.formatMessage(commonMessages.savedChanges)
        });
        refetch();
        refetchFeaturedProductsCollection();
        limitOpts.refetch();
      }
    }
  });

  const [
    productBulkDelete,
    productBulkDeleteOpts
  ] = useProductBulkDeleteMutation({
    onCompleted: data => {
      if (data.productBulkDelete.errors.length === 0) {
        closeModal();
        notify({
          status: "success",
          text: intl.formatMessage(commonMessages.savedChanges)
        });
        reset();
        refetch();
        limitOpts.refetch();
      }
    }
  });

  const filterOpts = getFilterOpts(
    params,
    {
      initial: mapEdgesToItems(initialFilterCategories?.categories) || [],
      search: searchCategories
    },
    {
      initial: mapEdgesToItems(initialFilterCollections?.collections) || [],
      search: searchCollections
    }
  );

  const { loadNextPage, loadPreviousPage, pageInfo } = paginate(
    data?.products?.pageInfo,
    paginationState,
    params
  );

  return (
    <>
      <ProductListPage
        currencySymbol={selectedChannel?.currencyCode || ""}
        sort={{
          asc: params.asc,
          sort: params.sort
        }}
        onSort={handleSort}
        currentTab={currentTab}
        defaultSettings={defaultListSettings[ListViews.PRODUCT_LIST]}
        filterOpts={filterOpts}
        settings={settings}
        loading={loading}
        hasMore={false}
        onFetchMore={() => undefined}
        onAdd={() => navigate(productAddUrl())}
        disabled={loading}
        limits={limitOpts.data?.shop.limits}
        products={mapEdgesToItems(data?.products)}
        onNextPage={loadNextPage}
        onPreviousPage={loadPreviousPage}
        onUpdateListSettings={updateListSettings}
        pageInfo={pageInfo}
        onRowClick={id => () => navigate(productUrl(id))}
        onAll={resetFilters}
        toolbar={
          <>
            {user.isStaff && (
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: "Feature services"
                })}
              >
                <IconButton
                  className={classes.addToFeatureServiceIcon}
                  onClick={() =>
                    openModal("feature", {
                      ids: listElements
                    })
                  }
                >
                  <UilStar />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip
              title={intl.formatMessage({
                defaultMessage: "Delete services"
              })}
            >
              <IconButton
                className={classes.deleteIcon}
                color="primary"
                onClick={() =>
                  openModal("delete", {
                    ids: listElements
                  })
                }
              >
                <UilTrashAlt />
              </IconButton>
            </Tooltip>
          </>
        }
        isChecked={isSelected}
        selected={listElements.length}
        toggle={toggle}
        toggleAll={toggleAll}
        onSearchChange={handleSearchChange}
        onFilterChange={changeFilters}
        onTabSave={() => openModal("save-search")}
        onTabDelete={() => openModal("delete-search")}
        onTabChange={handleTabChange}
        initialSearch={params.query || ""}
        tabs={getFilterTabs().map(tab => tab.name)}
        onExport={() => openModal("export")}
        // Custom drural ones
        onReport={() => navigate(productReportListUrl())}
        featuredProductsCollectionId={
          featuredProductsCollection?.collection?.id
        }
        assignProduct={assignProduct}
        unassignProduct={unassignProduct}
        totalCount={data?.products?.totalCount}
      />
      {user.isStaff && (
        <ActionDialog
          open={params.action === "feature"}
          confirmButtonState={assignProductOpts.status}
          onClose={closeModal}
          onConfirm={() =>
            assignProduct({
              variables: {
                collectionId: featuredProductsCollection.collection.id,
                productIds: params.ids,
                first: 12
              }
            })
          }
          title={intl.formatMessage({
            defaultMessage: "Save featured services",
            description: "dialog header"
          })}
          variant="default"
        >
          <DialogContentText className={classes.dialogContent}>
            <FormattedMessage
              defaultMessage="{counter,plural,one{Are you sure you want to feature this service?} other{Are you sure you want to feature {displayQuantity} services?}}"
              description="dialog content"
              values={{
                counter: params?.ids?.length,
                displayQuantity: <strong>{params?.ids?.length}</strong>
              }}
            />
          </DialogContentText>
        </ActionDialog>
      )}
      <ActionDialog
        open={params.action === "delete"}
        confirmButtonState={productBulkDeleteOpts.status}
        onClose={closeModal}
        onConfirm={() =>
          productBulkDelete({
            variables: { ids: params.ids }
          })
        }
        title={intl.formatMessage({
          defaultMessage: "Delete Services",
          description: "dialog header"
        })}
        variant="default"
      >
        <DialogContentText className={classes.dialogContent}>
          <FormattedMessage
            defaultMessage="{counter,plural,one{Are you sure you want to delete this service?} other{Are you sure you want to delete {displayQuantity} services?}}"
            description="dialog content"
            values={{
              counter: params?.ids?.length,
              displayQuantity: <strong>{params?.ids?.length}</strong>
            }}
          />
        </DialogContentText>
      </ActionDialog>
      <ProductExportDialog
        attributes={
          mapEdgesToItems(searchAttributes?.result?.data?.search) || []
        }
        hasMore={searchAttributes.result.data?.search.pageInfo.hasNextPage}
        loading={
          searchAttributes.result.loading || countAllProducts.loading
          // || warehouses.loading
        }
        onFetch={searchAttributes.search}
        onFetchMore={searchAttributes.loadMore}
        open={params.action === "export"}
        confirmButtonState={exportProductsOpts.status}
        errors={exportProductsOpts.data?.exportProducts.errors || []}
        productQuantity={{
          all: countAllProducts.data?.products?.totalCount,
          filter: data?.products?.totalCount
        }}
        selectedProducts={listElements.length}
        // warehouses={mapEdgesToItems(warehouses?.data?.warehouses) || []}
        channels={availableChannels}
        onClose={closeModal}
        onSubmit={handleExportProducts}
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
        tabName={maybe(() => tabs[currentTab - 1].name, "...")}
      />
    </>
  );
};
export default ProductList;
