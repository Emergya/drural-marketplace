import notAvailableIllustration from "@assets/images/NotAvailableFace.svg";
import { makeStyles } from "@drural/macaw-ui";
import { UilPlus } from "@iconscout/react-unicons";
import { Button, Card, darken } from "@material-ui/core";
import { ResourceList_bookableResources_edges_node } from "@saleor/bookableResources/types/ResourceList";
import { ResourceListUrlSortField } from "@saleor/bookableResources/urls";
import { Container } from "@saleor/components/Container";
import PageHeader from "@saleor/components/PageHeader";
import SearchBar from "@saleor/components/SearchBar";
import useUser from "@saleor/hooks/useUser";
import { sectionNames } from "@saleor/intl";
import {
  FetchMoreProps,
  ListActions,
  PageListProps,
  SearchPageProps,
  SortPage,
  TabPageProps
} from "@saleor/types";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import ResourceList from "../ResourceList/ResourceList";

export interface ResourceListPageProps
  extends PageListProps,
    ListActions,
    FetchMoreProps,
    SearchPageProps,
    TabPageProps,
    SortPage<ResourceListUrlSortField> {
  resources: ResourceList_bookableResources_edges_node[];
}

const useStyles = makeStyles(
  theme => ({
    addButton: {
      [theme.breakpoints.down("xs")]: {
        padding: "12px"
      }
    },
    buttonIcon: {
      marginLeft: "0 !important",
      marginRight: 10
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
    noResources: {
      borderRadius: "8px",
      boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#FFFFFF",
      width: "100%",
      height: "472px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column"
    },
    noResourcesText: {
      fontSize: theme.typography.h6.fontSize,
      fontWeight: theme.typography.h6.fontWeight,
      textAlign: "center",
      lineHeight: theme.typography.h6.lineHeight
    },
    noResourcesImage: {
      width: "210px",
      height: "207px",
      marginBottom: "30px",
      [theme.breakpoints.down("xs")]: {
        width: "162px",
        height: "160px",
        marginBottom: "15px"
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

export const ResourceListPage: React.FC<ResourceListPageProps> = props => {
  const {
    currentTab,
    defaultSettings,
    hasMore,
    initialSearch,
    loading,
    settings,
    tabs,
    onAdd,
    onAll,
    onFetchMore,
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

  return (
    <Container>
      <PageHeader title={intl.formatMessage(sectionNames.resources)}>
        {!user.isStaff && (
          <Button
            className={classes.addButton}
            onClick={onAdd}
            color="primary"
            variant="contained"
            data-test="add-resource"
          >
            <UilPlus className={classes.buttonIcon} />
            <FormattedMessage
              defaultMessage="New resource"
              description="button"
            />
          </Button>
        )}
      </PageHeader>
      {!loading && props.resources?.length === 0 && initialSearch === "" ? (
        <div className={classes.noResources}>
          <img
            src={notAvailableIllustration}
            alt="not-available"
            className={classes.noResourcesImage}
          />
          <p className={classes.noResourcesText}>
            <FormattedMessage defaultMessage="You have not created any resource yet." />
          </p>
        </div>
      ) : (
        <Card>
          <SearchBar
            initialSearch={initialSearch}
            onSearchChange={onSearchChange}
            searchPlaceholder={intl.formatMessage({
              defaultMessage: "Search Resources..."
            })}
            tabs={tabs}
            currentTab={currentTab}
            allTabLabel={intl.formatMessage({
              defaultMessage: "All resources",
              description: "tab name"
            })}
            onTabChange={onTabChange}
            onAll={onAll}
            onTabDelete={onTabDelete}
            onTabSave={onTabSave}
          />
          <ResourceList
            {...listProps}
            loading={loading}
            settings={settings}
            onUpdateListSettings={onUpdateListSettings}
          />
        </Card>
      )}
    </Container>
  );
};
ResourceListPage.displayName = "ResourceListPage";
export default ResourceListPage;
