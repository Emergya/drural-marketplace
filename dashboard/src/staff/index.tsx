import SectionRoute from "@saleor/auth/components/SectionRoute";
import useUser from "@saleor/hooks/useUser";
import { sectionNames } from "@saleor/intl";
import { PermissionEnum } from "@saleor/types/globalTypes";
import { asSortParams } from "@saleor/utils/sort";
import { parse as parseQs } from "qs";
import React from "react";
import { useIntl } from "react-intl";
import { RouteComponentProps, Switch } from "react-router-dom";

import { WindowTitle } from "../components/WindowTitle";
import {
  staffListPath,
  StaffListUrlQueryParams,
  StaffListUrlSortField,
  staffMemberDetailsPath,
  StaffMemberDetailsUrlQueryParams
} from "./urls";
import StaffDetailsComponent from "./views/StaffDetails";
import StaffListComponent from "./views/StaffList";

const StaffList: React.FC<RouteComponentProps<{}>> = ({ location }) => {
  const qs = parseQs(location.search.substr(1));
  const params: StaffListUrlQueryParams = asSortParams(
    qs,
    StaffListUrlSortField
  );

  return <StaffListComponent params={params} />;
};

interface StaffDetailsRouteProps {
  id: string;
}
const StaffDetails: React.FC<RouteComponentProps<StaffDetailsRouteProps>> = ({
  match
}) => {
  const qs = parseQs(location.search.substr(1));
  const params: StaffMemberDetailsUrlQueryParams = qs;

  return (
    <StaffDetailsComponent
      id={decodeURIComponent(match.params.id)}
      params={params}
    />
  );
};

const Component = ({ match }) => {
  const intl = useIntl();
  const user = useUser();

  return (
    <>
      <WindowTitle title={intl.formatMessage(sectionNames.staff)} />
      <Switch>
        <SectionRoute
          exact
          path={staffListPath}
          component={StaffList}
          permissions={[PermissionEnum.MANAGE_STAFF]}
        />
        <SectionRoute
          path={staffMemberDetailsPath(":id")}
          component={StaffDetails}
          permissions={
            user.user.id === decodeURIComponent(match.params.id)
              ? null
              : [PermissionEnum.MANAGE_STAFF]
          }
        />
      </Switch>
    </>
  );
};

export default Component;
