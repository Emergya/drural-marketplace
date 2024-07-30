import { WindowTitle } from "@saleor/components/WindowTitle";
import { sectionNames } from "@saleor/intl";
import { RouteWithPermissions, UserRoleEnum } from "@saleor/routes";
import { asSortParams } from "@saleor/utils/sort";
import { getArrayQueryParam } from "@saleor/utils/urls";
import { parse as parseQs } from "qs";
import React from "react";
import { useIntl } from "react-intl";
import { Route, RouteComponentProps, Switch } from "react-router";

import {
  bookableResourceAddPath,
  BookableResourceCreateUrlQueryParams,
  bookableResourcePath,
  BookableResourceUrlQueryParams,
  resourceListPath,
  ResourceListUrlQueryParams,
  ResourceListUrlSortField
} from "./urls";
import BookableResourceCreateComponent from "./views/BookableResourceCreate";
import BookableResourceUpdateComponent from "./views/BookableResourceUpdate";
import ResourceListComponent from "./views/ResourceList";

const BookableResourceCreate: React.FC<RouteComponentProps<any>> = () => {
  const qs = parseQs(location.search.substr(1));
  const params: BookableResourceCreateUrlQueryParams = qs;

  return <BookableResourceCreateComponent params={params} />;
};

const BookableResourceUpdate: React.FC<RouteComponentProps<any>> = ({
  match
}) => {
  const qs = parseQs(location.search.substr(1));
  const params: BookableResourceUrlQueryParams = qs;

  return (
    <BookableResourceUpdateComponent
      id={decodeURIComponent(match.params.id)}
      params={{
        ...params,
        ids: getArrayQueryParam(qs.ids)
      }}
    />
  );
};

const ResourceList: React.FC<RouteComponentProps<any>> = ({ location }) => {
  const qs = parseQs(location.search.slice(1));
  const params: ResourceListUrlQueryParams = asSortParams(
    qs,
    ResourceListUrlSortField,
    ResourceListUrlSortField.isActive,
    false
  );

  return <ResourceListComponent params={params} />;
};

const Component = () => {
  const intl = useIntl();

  return (
    <>
      <WindowTitle title={intl.formatMessage(sectionNames.bookableResources)} />
      <Switch>
        <RouteWithPermissions
          exact
          path={bookableResourceAddPath}
          component={BookableResourceCreate}
          userPermissions={[UserRoleEnum.seller]}
          redirectUrl={resourceListPath}
        />
        <Route
          path={bookableResourcePath(":id")}
          component={BookableResourceUpdate}
        />
        <Route exact path={resourceListPath} component={ResourceList} />
      </Switch>
    </>
  );
};

export default Component;
