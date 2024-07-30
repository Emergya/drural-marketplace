import { sectionNames } from "@saleor/intl";
import { RouteWithPermissions, UserRoleEnum } from "@saleor/routes";
import {
  UserListUrlQueryParams,
  UserListUrlSortField,
  userPath,
  UserSections,
  UserUrlQueryParams
} from "@saleor/users/urls";
import { asSortParams } from "@saleor/utils/sort";
import { parse as parseQs } from "qs";
import React from "react";
import { useIntl } from "react-intl";
import { Route, RouteComponentProps, Switch } from "react-router-dom";

import { WindowTitle } from "../components/WindowTitle";
import {
  customerAddPath,
  customerAddressesPath,
  CustomerAddressesUrlQueryParams,
  customerListPath
} from "./urls";
import CustomerAddressesViewComponent from "./views/CustomerAddresses";
import CustomerCreateView from "./views/CustomerCreate";
import CustomerDetailsViewComponent from "./views/CustomerDetails";
import CustomerListViewComponent from "./views/CustomerList";

const CustomerListView: React.FC<RouteComponentProps<{}>> = ({ location }) => {
  const qs = parseQs(location.search.substr(1));
  const params: UserListUrlQueryParams = asSortParams(qs, UserListUrlSortField);

  return <CustomerListViewComponent params={params} />;
};

interface CustomerDetailsRouteParams {
  id: string;
}
const CustomerDetailsView: React.FC<RouteComponentProps<
  CustomerDetailsRouteParams
>> = ({ location, match }) => {
  const qs = parseQs(location.search.substr(1));
  const params: UserUrlQueryParams = qs;

  return (
    <CustomerDetailsViewComponent
      id={decodeURIComponent(match.params.id)}
      params={params}
    />
  );
};

interface CustomerAddressesRouteParams {
  id: string;
}
const CustomerAddressesView: React.FC<RouteComponentProps<
  CustomerAddressesRouteParams
>> = ({ match }) => {
  const qs = parseQs(location.search.substr(1));
  const params: CustomerAddressesUrlQueryParams = qs;

  return (
    <CustomerAddressesViewComponent
      id={decodeURIComponent(match.params.id)}
      params={params}
    />
  );
};

export const CustomerSection: React.FC<{}> = () => {
  const intl = useIntl();

  return (
    <>
      <WindowTitle title={intl.formatMessage(sectionNames.customers)} />
      <Switch>
        <Route exact path={customerListPath} component={CustomerListView} />
        <RouteWithPermissions
          exact
          path={customerAddPath}
          component={CustomerCreateView}
          userPermissions={[UserRoleEnum.staff]}
          redirectUrl={customerListPath}
        />
        <Route
          path={customerAddressesPath(":id")}
          component={CustomerAddressesView}
        />
        <Route
          path={userPath(UserSections.customers, ":id")}
          component={CustomerDetailsView}
        />
      </Switch>
    </>
  );
};
