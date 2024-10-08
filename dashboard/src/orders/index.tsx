import { sectionNames } from "@saleor/intl";
import { RouteWithPermissions, UserRoleEnum } from "@saleor/routes";
import { asSortParams } from "@saleor/utils/sort";
import { parse as parseQs } from "qs";
import React from "react";
import { useIntl } from "react-intl";
import { Route, RouteComponentProps, Switch } from "react-router-dom";

import { WindowTitle } from "../components/WindowTitle";
import {
  bookingListPath,
  BookingListUrlQueryParams,
  BookingListUrlSortField,
  orderDraftListPath,
  OrderDraftListUrlQueryParams,
  OrderDraftListUrlSortField,
  // orderFulfillPath,
  orderListPath,
  OrderListUrlQueryParams,
  OrderListUrlSortField,
  orderPath,
  orderRefundPath,
  orderReturnPath,
  orderSettingsPath,
  OrderUrlQueryParams
} from "./urls";
import BookingListComponent from "./views/BookingList";
import OrderDetailsComponent from "./views/OrderDetails";
import OrderDraftListComponent from "./views/OrderDraftList";
// import OrderFulfillComponent from "./views/OrderFulfill";
import OrderListComponent from "./views/OrderList";
import OrderRefundComponent from "./views/OrderRefund";
import OrderReturnComponent from "./views/OrderReturn";
import OrderSettings from "./views/OrderSettings";

const OrderList: React.FC<RouteComponentProps<any>> = ({ location }) => {
  const qs = parseQs(location.search.substr(1));
  const params: OrderListUrlQueryParams = asSortParams(
    qs,
    OrderListUrlSortField,
    OrderListUrlSortField.number,
    false
  );
  return <OrderListComponent params={params} />;
};

const BookingList: React.FC<RouteComponentProps<any>> = ({ location }) => {
  const qs = parseQs(location.search.substr(1));
  const params: BookingListUrlQueryParams = asSortParams(
    qs,
    BookingListUrlSortField,
    BookingListUrlSortField.number,
    false
  );
  return <BookingListComponent params={params} />;
};

const OrderDraftList: React.FC<RouteComponentProps<any>> = ({ location }) => {
  const qs = parseQs(location.search.substr(1));
  const params: OrderDraftListUrlQueryParams = asSortParams(
    qs,
    OrderDraftListUrlSortField,
    OrderDraftListUrlSortField.number,
    false
  );

  return <OrderDraftListComponent params={params} />;
};

const OrderDetails: React.FC<RouteComponentProps<any>> = ({
  location,
  match
}) => {
  const qs = parseQs(location.search.substr(1));
  const params: OrderUrlQueryParams = qs;
  const id = match.params.id;

  return <OrderDetailsComponent id={decodeURIComponent(id)} params={params} />;
};

// const OrderFulfill: React.FC<RouteComponentProps<any>> = ({ match }) => (
//   <OrderFulfillComponent orderId={decodeURIComponent(match.params.id)} />
// );

const OrderRefund: React.FC<RouteComponentProps<any>> = ({ match }) => (
  <OrderRefundComponent orderId={decodeURIComponent(match.params.id)} />
);

const OrderReturn: React.FC<RouteComponentProps<any>> = ({ match }) => (
  <OrderReturnComponent orderId={decodeURIComponent(match.params.id)} />
);

const Component = () => {
  const intl = useIntl();

  return (
    <>
      <WindowTitle title={intl.formatMessage(sectionNames.orders)} />
      <Switch>
        <RouteWithPermissions
          exact
          path={orderSettingsPath}
          component={OrderSettings}
          redirectUrl={orderListPath}
          userPermissions={[UserRoleEnum.staff]}
        />
        <Route exact path={orderDraftListPath} component={OrderDraftList} />
        <Route exact path={bookingListPath} component={BookingList} />
        <Route exact path={orderListPath} component={OrderList} />
        {/* <Route path={orderFulfillPath(":id")} component={OrderFulfill} /> */}
        <Route path={orderReturnPath(":id")} component={OrderReturn} />
        <Route path={orderRefundPath(":id")} component={OrderRefund} />
        <Route path={orderPath(":id")} component={OrderDetails} />
      </Switch>
    </>
  );
};

export default Component;
