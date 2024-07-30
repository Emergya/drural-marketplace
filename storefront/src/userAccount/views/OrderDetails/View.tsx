import { useAuth, useOrderDetails } from "@drural/sdk";
import { NextPage } from "next";
import * as React from "react";
import { useAlert } from "react-alert";
import { useMutation } from "react-apollo";
import { useIntl } from "react-intl";

import { Loader } from "@components/atoms";
import { NotFound } from "@temp/components";

import { OrderCancel, OrderCancelVariables } from "./gqlTypes/OrderCancel";
import { orderCancelMutation } from "./mutations";
import Page from "./Page";
import { IProps } from "./types";

const View: NextPage<IProps> = ({ query: { token } }) => {
  // 1. Variables
  const alert = useAlert();
  const intl = useIntl();
  const { user } = useAuth();

  // 2. Data
  const {
    data: order,
    loading: loadingOrder,
    refetch: refetchOrder,
  } = useOrderDetails({ token }, { fetchPolicy: "cache-first" });

  const handleOrderCancelComplete = (data: OrderCancel) => {
    const errors = data.orderCancel?.errors || [];

    if (errors.length > 0) {
      alert.show(
        {
          content: intl.formatMessage({
            defaultMessage: "Unable to cancel the order",
          }),
          title: "Error",
        },
        { type: "error", timeout: 5000 }
      );
    } else {
      alert.show(
        {
          content: intl.formatMessage({
            defaultMessage: "Order canceled",
          }),
          title: "Success",
        },
        { type: "success", timeout: 5000 }
      );
      refetchOrder();
    }
  };

  const [orderCancel, { loading: loadingOrderCancel }] = useMutation<
    OrderCancel,
    OrderCancelVariables
  >(orderCancelMutation, {
    onCompleted(data) {
      handleOrderCancelComplete(data);
    },
  });

  const loading = loadingOrder || loadingOrderCancel;

  // 3. Events
  const handleDownloadInvoice = () => {
    if (order && "invoices" in order && order.invoices?.length > 0) {
      // Always download latest invoice
      const invoice = order.invoices.reduce((a, b) => {
        return new Date(a.createdAt) > new Date(b.createdAt) ? a : b;
      });

      if (invoice) {
        window.open(invoice.url, "_blank");
      }
    }
  };

  const handleOrderCancel = () => {
    orderCancel({
      variables: {
        id: order?.id,
      },
    });
  };

  // 4. Render
  if (loading) {
    return <Loader />;
  }

  if (!order || !user) {
    return <NotFound />;
  }

  return (
    <Page
      order={order}
      downloadInvoice={handleDownloadInvoice}
      orderCancel={handleOrderCancel}
    />
  );
};

export default View;
