import { UilPlus } from "@iconscout/react-unicons";
import { Button, Card, makeStyles } from "@material-ui/core";
import ColumnPicker, {
  ColumnPickerChoice
} from "@saleor/components/ColumnPicker";
import Container from "@saleor/components/Container";
import FilterBar from "@saleor/components/FilterBar";
import PageHeader from "@saleor/components/PageHeader";
import useUser from "@saleor/hooks/useUser";
import { sectionNames } from "@saleor/intl";
import { PermissionEnum } from "@saleor/types/globalTypes";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import BusinessesList from "../BusinessesList";
import { createFilterStructure } from "./filters";
import { BusinessesListPageProps, BusinessListColumns } from "./types";

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
    settings: {
      marginRight: theme.spacing(2)
    }
  }),
  { name: "BussinessesListPage" }
);

const BusinessesListPage: React.FC<BusinessesListPageProps> = ({
  currentTab,
  defaultSettings,
  filterOpts,
  initialSearch,
  onAdd,
  onAll,
  onFilterChange,
  onSearchChange,
  onTabChange,
  onTabDelete,
  onTabSave,
  onUpdateListSettings,
  settings,
  tabs,
  ...businessesListPageProps
}) => {
  const intl = useIntl();
  const classes = useStyles();
  const { user } = useUser();

  const hasPermission = (user?.userPermissions || []).some(
    permission => permission.code === PermissionEnum.MANAGE_COMPANIES
  );

  // Columns section
  const handleSave = (columns: BusinessListColumns[]) =>
    onUpdateListSettings("columns", columns);

  const columns: ColumnPickerChoice[] = [
    {
      label: intl.formatMessage({
        defaultMessage: "Email",
        description: "business email"
      }),
      value: "email"
    },
    {
      label: intl.formatMessage({
        defaultMessage: "Phone",
        description: "business phone"
      }),
      value: "phone"
    },
    {
      label: intl.formatMessage({
        defaultMessage: "Locality",
        description: "business locality"
      }),
      value: "locality"
    },
    {
      label: intl.formatMessage({
        defaultMessage: "Postal code",
        description: "business postal code"
      }),
      value: "postalCode"
    },
    {
      label: intl.formatMessage({
        defaultMessage: "Modification date",
        description: "business modification date"
      }),
      value: "modified"
    }
  ];

  // Filters section
  const filterStructure = createFilterStructure(intl, filterOpts);

  return (
    <Container>
      <PageHeader
        title={
          hasPermission
            ? intl.formatMessage(sectionNames.business)
            : intl.formatMessage(sectionNames.myBusiness)
        }
      >
        <ColumnPicker
          className={classes.columnPicker}
          columns={columns}
          defaultColumns={defaultSettings.columns}
          initialColumns={settings.columns}
          total={columns.length}
          onSave={handleSave}
        />
        {!hasPermission && (
          <Button
            className={classes.addButton}
            color="primary"
            variant="contained"
            onClick={onAdd}
          >
            <UilPlus className={classes.buttonIcon} />{" "}
            <FormattedMessage defaultMessage="New shop" description="button" />
          </Button>
        )}
      </PageHeader>
      <Card>
        <FilterBar
          // 1. FilterContent
          filterStructure={filterStructure}
          onFilterChange={onFilterChange}
          // 2. SearchInput
          onSearchChange={onSearchChange}
          initialSearch={initialSearch}
          searchPlaceholder={intl.formatMessage({
            defaultMessage: "Search shops..."
          })}
          // 3. FilterTabs
          tabs={tabs}
          currentTab={currentTab}
          allTabLabel={intl.formatMessage({
            defaultMessage: "All Shops",
            description: "tab name"
          })}
          onTabChange={onTabChange}
          onAll={onAll}
          // 4. Save/Delete search
          onTabSave={onTabSave}
          onTabDelete={onTabDelete}
        />
        <BusinessesList
          columns={columns}
          settings={settings}
          onUpdateListSettings={onUpdateListSettings}
          {...businessesListPageProps}
        />
      </Card>
    </Container>
  );
};
BusinessesListPage.displayName = "BusinessesListPage";
export default BusinessesListPage;
