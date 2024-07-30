import { UserType } from "@saleor/users/_types/UserType";
import UserListPage from "@saleor/users/components/UserListPage";
import { UserListPageProps } from "@saleor/users/components/UserListPage/types";
import { UserListUrlSortField } from "@saleor/users/urls";
import { storiesOf } from "@storybook/react";
import React from "react";

import { customerList } from "../../../customers/fixtures";
import {
  filterPageProps,
  listActionsProps,
  pageListProps,
  searchPageProps,
  sortPageProps,
  tabPageProps
} from "../../../fixtures";
import Decorator from "../../Decorator";

const props: UserListPageProps = {
  ...filterPageProps,
  ...listActionsProps,
  ...pageListProps.default,
  ...searchPageProps,
  ...sortPageProps,
  ...tabPageProps,
  users: customerList,
  filterOpts: {
    joined: {
      active: false,
      value: {
        max: undefined,
        min: undefined
      }
    }
  },
  sort: {
    ...sortPageProps.sort,
    sort: UserListUrlSortField.name
  },
  hasAddButton: true,
  type: UserType.CUSTOMER
};

storiesOf("Views / Customers / Customer list", module)
  .addDecorator(Decorator)
  .add("default", () => <UserListPage {...props} />)
  .add("loading", () => (
    <UserListPage {...props} disabled={true} users={undefined} />
  ))
  .add("no data", () => <UserListPage {...props} users={[]} />);
