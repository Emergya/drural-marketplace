import placeholderImage from "@assets/images/placeholder60x60.png";
import { adminUserPermissions } from "@saleor/fixtures";
import { PermissionEnum } from "@saleor/types/globalTypes";
import { mapEdgesToItems } from "@saleor/utils/maps";
import { storiesOf } from "@storybook/react";
import React from "react";

import HomePage, { HomePageProps } from "../../../home/components/HomePage";
import { shop as shopFixture } from "../../../home/fixtures";
import Decorator from "../../Decorator";

const shop = shopFixture(placeholderImage);

const homePageProps: Omit<HomePageProps, "classes"> = {
  activities: mapEdgesToItems(shop.activities),
  noChannel: false,
  onCreateNewChannelClick: () => undefined,
  onOrdersToCaptureClick: () => undefined,
  onOrdersToFulfillClick: () => undefined,
  onProductClick: () => undefined,
  onInactiveProductsClick: () => undefined,
  orders: shop.ordersToday.totalCount,
  ordersToCapture: shop.ordersToCapture.totalCount,
  ordersToFulfill: shop.ordersToFulfill.totalCount,
  inactiveProducts: shop.productsInactive.totalCount,
  sales: shop.salesToday.gross,
  topProducts: mapEdgesToItems(shop.productTopToday),
  userName: "admin@example.com",
  userPermissions: adminUserPermissions,
  featuredProducts: mapEdgesToItems(shop.featuredProducts),
  featuredProductsCollectionId: "featured-products"
};

storiesOf("Views / HomePage", module)
  .addDecorator(Decorator)
  .add("default", () => <HomePage {...homePageProps} />)
  .add("loading", () => (
    <HomePage
      {...homePageProps}
      activities={undefined}
      orders={undefined}
      ordersToCapture={undefined}
      ordersToFulfill={undefined}
      inactiveProducts={undefined}
      sales={undefined}
      topProducts={undefined}
      userName={undefined}
    />
  ))
  .add("no data", () => (
    <HomePage {...homePageProps} topProducts={[]} activities={[]} />
  ))
  .add("no permissions", () => (
    <HomePage {...homePageProps} userPermissions={[]} />
  ))
  .add("product permissions", () => (
    <HomePage
      {...homePageProps}
      userPermissions={adminUserPermissions.filter(
        perm => perm.code === PermissionEnum.MANAGE_PRODUCTS
      )}
    />
  ))
  .add("order permissions", () => (
    <HomePage
      {...homePageProps}
      userPermissions={adminUserPermissions.filter(
        perm => perm.code === PermissionEnum.MANAGE_ORDERS
      )}
    />
  ));
