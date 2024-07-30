import { Button, Card } from "@material-ui/core";
import Container from "@saleor/components/Container";
import FilterBar from "@saleor/components/FilterBar";
import PageHeader from "@saleor/components/PageHeader";
import { sectionNames } from "@saleor/intl";
import { UserType } from "@saleor/users/_types/UserType";
import { getUserTypeMessage } from "@saleor/users/utils";
import React from "react";
import { useIntl } from "react-intl";

import UserList from "../UserList/UserList";
import { createFilterStructure } from "./filters";
import { UserListPageProps } from "./types";

const UserListPage: React.FC<UserListPageProps> = ({
  currentTab,
  hasAddButton,
  filterOpts,
  initialSearch,
  onAdd,
  onAll,
  onFilterChange,
  onSearchChange,
  onTabChange,
  onTabDelete,
  onTabSave,
  tabs,
  type,
  ...UserListProps
}) => {
  const intl = useIntl();
  const structure = createFilterStructure(intl, filterOpts);

  return (
    <Container>
      <PageHeader
        title={
          type === UserType.CUSTOMER
            ? intl.formatMessage(sectionNames.customers)
            : intl.formatMessage(sectionNames.shopAgents)
        }
      >
        {hasAddButton && (
          <Button
            color="primary"
            variant="contained"
            onClick={onAdd}
            data-test-id="createUser"
          >
            {type === UserType.CUSTOMER
              ? intl.formatMessage({ defaultMessage: "Add customer" })
              : intl.formatMessage({ defaultMessage: "Invite agent" })}
          </Button>
        )}
      </PageHeader>
      <Card>
        <FilterBar
          allTabLabel={intl.formatMessage(
            {
              defaultMessage: "All {users}",
              description: "tab name"
            },
            {
              users: getUserTypeMessage(intl, type, true)
            }
          )}
          currentTab={currentTab}
          filterStructure={structure}
          initialSearch={initialSearch}
          searchPlaceholder={intl.formatMessage(
            {
              defaultMessage: "Search {user}"
            },
            {
              user: getUserTypeMessage(intl, type)
            }
          )}
          tabs={tabs}
          onAll={onAll}
          onFilterChange={onFilterChange}
          onSearchChange={onSearchChange}
          onTabChange={onTabChange}
          onTabDelete={onTabDelete}
          onTabSave={onTabSave}
        />
        <UserList {...UserListProps} type={type} />
      </Card>
    </Container>
  );
};
UserListPage.displayName = "UserListPage";
export default UserListPage;
