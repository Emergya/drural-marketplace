import { WindowTitle } from "@saleor/components/WindowTitle";
import { sectionNames } from "@saleor/intl";
import { RouteWithPermissions, UserRoleEnum } from "@saleor/routes";
import { UserListUrlSortField, UserUrlQueryParams } from "@saleor/users/urls";
import { asSortParams } from "@saleor/utils/sort";
import { parse as parseQs } from "qs";
import React from "react";
import { useIntl } from "react-intl";
import { Route, RouteComponentProps, Switch } from "react-router-dom";

import {
  businessAddressesPath,
  BusinessAddressesUrlQueryParams,
  businessAgentListPath,
  BusinessAgentLisUrlQueryParams,
  businessAgentPath,
  businessCreatePath,
  BusinessesListUrlQueryParams,
  BusinessesListUrlSortField,
  businessListPath,
  businessPath,
  businessStripeConfigurationPath,
  BusinessStripeConfigUrlQueryParams,
  BusinessUrlQueryParams
} from "./urls";
import BusinessAddressesViewComponent from "./views/BusinessAddresses";
import BusinessAgentDetailsViewComponent from "./views/BusinessAgentDetails";
import BusinessAgentListViewComponent from "./views/BusinessAgentList";
import BusinessCreate from "./views/BusinessCreate/BusinessCreate";
import BusinessDetailsViewComponent from "./views/BusinessDetailsView";
import BusinessesListViewComponent from "./views/BusinessesList";
import BusinessStripeConfigurationViewComponent from "./views/BusinessStripeConfiiguration";

interface BusinessStripeConfigurationViewRouteParams {
  id: string;
}
export const BusinessStripeConfigurationView: React.FC<RouteComponentProps<
  BusinessStripeConfigurationViewRouteParams
>> = ({ location, match }) => {
  const qs = parseQs(location.search.substr(1));
  const params: BusinessStripeConfigUrlQueryParams = qs;

  return (
    <BusinessStripeConfigurationViewComponent
      id={decodeURIComponent(match.params.id)}
      params={params}
    />
  );
};

interface BusinessAgentListViewRouteParams {
  id: string;
}
export const BusinessAgentListView: React.FC<RouteComponentProps<
  BusinessAgentListViewRouteParams
>> = ({ location, match }) => {
  const qs = parseQs(location.search.substr(1));
  const params: BusinessAgentLisUrlQueryParams = asSortParams(
    qs,
    UserListUrlSortField
  );

  return (
    <BusinessAgentListViewComponent
      id={decodeURIComponent(match.params.id)}
      params={params}
    />
  );
};

export const BusinessesListView: React.FC<RouteComponentProps<{}>> = ({
  location
}) => {
  const qs = parseQs(location.search.substr(1));
  const params: BusinessesListUrlQueryParams = asSortParams(
    qs,
    BusinessesListUrlSortField
  );

  return <BusinessesListViewComponent params={params} />;
};

interface BusinessDetailRouteParams {
  id: string;
}

const BusinessDetailsView: React.FC<RouteComponentProps<
  BusinessDetailRouteParams
>> = ({ location, match }) => {
  const qs = parseQs(location.search.substr(1));
  const params: BusinessUrlQueryParams = qs;

  return (
    <BusinessDetailsViewComponent
      id={decodeURIComponent(match.params.id)}
      params={params}
    />
  );
};

interface BusinessAgentDetailsRouteParams {
  agentId: string;
  businessId: string;
}

const BusinessAgentDetailsView: React.FC<RouteComponentProps<
  BusinessAgentDetailsRouteParams
>> = ({ location, match }) => {
  const qs = parseQs(location.search.substr(1));
  const params: UserUrlQueryParams = qs;

  return (
    <BusinessAgentDetailsViewComponent
      agentId={decodeURIComponent(match.params.agentId)}
      businessId={decodeURIComponent(match.params.businessId)}
      params={params}
    />
  );
};

interface BussinessAddressRouteParams {
  id: string;
}
const BusinessAddressView: React.FC<RouteComponentProps<
  BussinessAddressRouteParams
>> = ({ match }) => {
  const qs = parseQs(location.search.substr(1));
  const params: BusinessAddressesUrlQueryParams = qs;

  return (
    <BusinessAddressesViewComponent
      id={decodeURIComponent(match.params.id)}
      params={params}
    />
  );
};

export const BusinessSection: React.FC<{}> = () => {
  const intl = useIntl();
  return (
    <>
      <WindowTitle title={intl.formatMessage(sectionNames.business)} />
      <Switch>
        <Route exact path={businessListPath} component={BusinessesListView} />
        <RouteWithPermissions
          exact
          path={businessStripeConfigurationPath(":id")}
          component={BusinessStripeConfigurationView}
          redirectUrl={businessListPath}
          userPermissions={[UserRoleEnum.seller]}
        />
        <Route
          exact
          path={businessAgentListPath(":id")}
          component={BusinessAgentListView}
        />
        <Route
          exact
          path={businessAgentPath(":businessId", ":agentId")}
          component={BusinessAgentDetailsView}
        />
        <RouteWithPermissions
          exact
          path={businessCreatePath}
          component={BusinessCreate}
          redirectUrl={businessListPath}
          userPermissions={[UserRoleEnum.customer, UserRoleEnum.seller]}
        />
        <Route
          exact
          path={businessAddressesPath(":id")}
          component={BusinessAddressView}
        />
        <Route path={businessPath(":id")} component={BusinessDetailsView} />
      </Switch>
    </>
  );
};

export default BusinessSection;
