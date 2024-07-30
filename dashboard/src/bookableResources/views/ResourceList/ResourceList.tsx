import { makeStyles } from "@drural/macaw-ui";
import { UilTrashAlt } from "@iconscout/react-unicons";
import { DialogContentText, IconButton, Tooltip } from "@material-ui/core";
import ResourceListPage from "@saleor/bookableResources/components/ResourceListPage";
import { useBookableResourceBulkDeleteMutation } from "@saleor/bookableResources/mutations";
import { useResourceListQuery } from "@saleor/bookableResources/queries";
import {
  bookableResourceAddPath,
  bookableResourceUrl,
  resourceListUrl,
  ResourceListUrlDialog,
  ResourceListUrlQueryParams
} from "@saleor/bookableResources/urls";
import ActionDialog from "@saleor/components/ActionDialog";
import { BusinessContext } from "@saleor/components/BusinessProvider";
import DeleteFilterTabDialog from "@saleor/components/DeleteFilterTabDialog";
import SaveFilterTabDialog, {
  SaveFilterTabDialogFormData
} from "@saleor/components/SaveFilterTabDialog";
import {
  DEFAULT_INITIAL_PAGINATION_DATA,
  defaultListSettings
} from "@saleor/config";
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
import { getCompany } from "@saleor/products/utils/data";
import { ListViews } from "@saleor/types";
import createDialogActionHandlers from "@saleor/utils/handlers/dialogActionHandlers";
import createSortHandler from "@saleor/utils/handlers/sortHandler";
import { mapEdgesToItems } from "@saleor/utils/maps";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import {
  areFiltersApplied,
  deleteFilterTab,
  getActiveFilters,
  getFilterTabs,
  getFilterVariables,
  saveFilterTab
} from "./filters";
import { getSortQueryVariables } from "./sort";

interface ResourceListProps {
  params: ResourceListUrlQueryParams;
}

const useStyles = makeStyles(
  theme => ({
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

export const ResourceList: React.FC<ResourceListProps> = ({ params }) => {
  const classes = useStyles();
  const navigate = useNavigator();
  const notify = useNotifier();
  const paginate = usePaginator();
  const { updateListSettings, settings } = useListSettings(
    ListViews.RESOURCE_LIST
  );
  const { user } = useUser();
  const intl = useIntl();

  const { activeBusiness } = React.useContext(BusinessContext);
  const paginationState = createPaginationState(settings.rowNumber, params);
  const filter = getFilterVariables(params);
  const sort = getSortQueryVariables(params);
  const company = getCompany(user.isStaff, activeBusiness?.active.node.id);

  const queryVariables = React.useMemo(
    () => ({
      ...paginationState,
      ...company,
      filter,
      sort,
      channel: "default-channel"
    }),
    [params, settings.rowNumber, company]
  );

  const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions(
    params.ids
  );

  const [openModal, closeModal] = createDialogActionHandlers<
    ResourceListUrlDialog,
    ResourceListUrlQueryParams
  >(navigate, resourceListUrl, params);

  // Reset pagination
  React.useEffect(
    () =>
      navigate(
        resourceListUrl({
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

  const resetFilters = () => {
    if (!!reset) {
      reset();
    }

    navigate(
      resourceListUrl({
        asc: params.asc,
        sort: params.sort
      })
    );
  };

  const handleSearchChange = (query: string) => {
    if (!!reset) {
      reset();
    }

    navigate(
      resourceListUrl({
        ...params,
        after: undefined,
        before: undefined,
        activeTab: undefined,
        query
      })
    );
  };
  const handleTabChange = (tab: number) => {
    reset();
    navigate(
      resourceListUrl({
        activeTab: tab.toString(),
        ...getFilterTabs()[tab - 1].data
      })
    );
  };

  const handleFilterTabDelete = () => {
    deleteFilterTab(currentTab);
    reset();
    navigate(resourceListUrl());
  };

  const handleFilterTabSave = (data: SaveFilterTabDialogFormData) => {
    saveFilterTab(data.name, getActiveFilters(params));
    handleTabChange(tabs.length + 1);
  };

  const handleSort = createSortHandler(navigate, resourceListUrl, params);

  const { data, loading, refetch } = useResourceListQuery({
    displayLoader: true,
    variables: queryVariables
  });

  const [
    resourceBulkDelete,
    resourceBulkDeleteOpts
  ] = useBookableResourceBulkDeleteMutation({
    onCompleted: data => {
      if (data.bookableResourceBulkDelete.errors.length === 0) {
        closeModal();
        notify({
          status: "success",
          text: intl.formatMessage(commonMessages.savedChanges)
        });
        reset();
        refetch();
      } else if (data.bookableResourceBulkDelete.errors.length > 0) {
        closeModal();
        notify({
          status: "error",
          text: intl.formatMessage(commonMessages.somethingWentWrong)
        });
        reset();
        refetch();
      }
    },
    onError: () => {
      closeModal();
      notify({
        status: "error",
        text: intl.formatMessage(commonMessages.somethingWentWrong)
      });
      reset();
      refetch();
    }
  });

  const { loadNextPage, loadPreviousPage, pageInfo } = paginate(
    data?.bookableResources.pageInfo,
    paginationState,
    params
  );

  return (
    <>
      <ResourceListPage
        sort={{
          asc: params.asc,
          sort: params.sort
        }}
        onSort={handleSort}
        currentTab={currentTab}
        defaultSettings={defaultListSettings[ListViews.RESOURCE_LIST]}
        settings={settings}
        loading={loading}
        hasMore={false}
        onFetchMore={() => undefined}
        onAdd={() => navigate(bookableResourceAddPath)}
        disabled={loading}
        resources={mapEdgesToItems(data?.bookableResources)}
        onNextPage={loadNextPage}
        onPreviousPage={loadPreviousPage}
        onUpdateListSettings={updateListSettings}
        pageInfo={pageInfo}
        onRowClick={id => () => navigate(bookableResourceUrl(id))}
        onAll={resetFilters}
        toolbar={
          <Tooltip
            title={intl.formatMessage({
              defaultMessage: "Delete resources"
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
        }
        isChecked={isSelected}
        selected={listElements.length}
        toggle={toggle}
        toggleAll={toggleAll}
        onSearchChange={handleSearchChange}
        onTabSave={() => openModal("save-search")}
        onTabDelete={() => openModal("delete-search")}
        onTabChange={handleTabChange}
        initialSearch={params.query || ""}
        tabs={getFilterTabs().map(tab => tab.name)}
        totalCount={data?.bookableResources.totalCount}
      />
      <ActionDialog
        open={params.action === "delete"}
        confirmButtonState={resourceBulkDeleteOpts.status}
        onClose={closeModal}
        onConfirm={() =>
          resourceBulkDelete({
            variables: { ids: params.ids }
          })
        }
        title={intl.formatMessage({
          defaultMessage: "Delete Resources",
          description: "dialog header"
        })}
        variant="default"
      >
        <DialogContentText className={classes.dialogContent}>
          <FormattedMessage
            defaultMessage="{counter,plural,one{Are you sure you want to delete this resource?} other{Are you sure you want to delete {displayQuantity} resources?}}"
            description="dialog content"
            values={{
              counter: params?.ids?.length,
              displayQuantity: <strong>{params?.ids?.length}</strong>
            }}
          />
        </DialogContentText>
      </ActionDialog>
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

export default ResourceList;
