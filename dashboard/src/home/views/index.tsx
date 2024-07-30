import { channelsListUrl } from "@saleor/channels/urls";
import useAppChannel from "@saleor/components/AppLayout/AppChannelContext";
import { BusinessContext } from "@saleor/components/BusinessProvider";
import useNavigator from "@saleor/hooks/useNavigator";
import useUser from "@saleor/hooks/useUser";
import { ServiceStatusEnum } from "@saleor/products/components/ProductListPage";
import { useGetCollectionBySlug } from "@saleor/products/queries";
import { getCompany } from "@saleor/products/utils/data";
import { mapEdgesToItems } from "@saleor/utils/maps";
import React from "react";

import { getDatePeriod, getUserName } from "../../misc";
import { orderListUrl } from "../../orders/urls";
import { productListUrl, productUrl } from "../../products/urls";
import { OrderStatusFilter } from "../../types/globalTypes";
import HomePage from "../components/HomePage";
import { useHomePage } from "../queries";

const HomeSection = () => {
  const navigate = useNavigator();
  const { user } = useUser();
  const { channel } = useAppChannel();

  const { activeBusiness } = React.useContext(BusinessContext);
  const company = getCompany(user.isStaff, activeBusiness?.active.node.id);
  const noChannel = !channel && typeof channel !== "undefined";

  const { data: featuredProductsCollection } = useGetCollectionBySlug({
    variables: {
      slug: "featured-products"
    }
  });
  const featuredProductsCollectionId =
    featuredProductsCollection?.collection?.id;

  const { data } = useHomePage({
    displayLoader: true,
    skip: noChannel,
    variables: {
      ...company,
      channel: channel?.slug,
      datePeriod: getDatePeriod(1),
      collections: featuredProductsCollectionId
        ? [featuredProductsCollectionId]
        : null
    }
  });

  return (
    <HomePage
      activities={mapEdgesToItems(data?.activities)?.reverse()}
      orders={data?.ordersToday?.totalCount}
      sales={data?.salesToday?.gross}
      topProducts={mapEdgesToItems(data?.productTopToday)}
      featuredProducts={mapEdgesToItems(data?.featuredProducts)}
      onProductClick={productId => navigate(productUrl(productId))}
      onCreateNewChannelClick={() => {
        navigate(channelsListUrl());
      }}
      onOrdersToCaptureClick={() =>
        navigate(
          orderListUrl({
            status: [OrderStatusFilter.READY_TO_CAPTURE],
            channel: [channel?.id]
          })
        )
      }
      onOrdersToFulfillClick={() =>
        navigate(
          orderListUrl({
            status: [OrderStatusFilter.READY_TO_FULFILL],
            channel: [channel?.id]
          })
        )
      }
      onInactiveProductsClick={() =>
        navigate(
          productListUrl({
            status: ServiceStatusEnum.DEACTIVE
          })
        )
      }
      ordersToCapture={data?.ordersToCapture?.totalCount}
      ordersToFulfill={data?.ordersToFulfill?.totalCount}
      inactiveProducts={data?.productsInactive?.totalCount}
      userName={getUserName(user, true)}
      userPermissions={user?.userPermissions}
      noChannel={noChannel}
      featuredProductsCollectionId={featuredProductsCollectionId}
    />
  );
};

export default HomeSection;
