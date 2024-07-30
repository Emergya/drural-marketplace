import { SidebarMenuItem } from "@drural/macaw-ui";
import { categoryListUrl } from "@saleor/categories/urls";
import { collectionListUrl } from "@saleor/collections/urls";
import { User_userPermissions } from "@saleor/fragments/types/User";
import { sectionNames } from "@saleor/intl";
import { orderDraftListUrl, orderListUrl } from "@saleor/orders/urls";
import { PermissionEnum } from "@saleor/types/globalTypes";
import { useIntl } from "react-intl";
import { matchPath } from "react-router";

export function isMenuActive(location: string, menuItem: SidebarMenuItem) {
  if (menuItem.children) {
    return menuItem.children.reduce(
      (acc, subMenuItem) => acc || isMenuActive(location, subMenuItem),
      false
    );
  }

  const activeUrl = location.split("?")[0];
  const menuItemUrl = menuItem.url.split("?")[0];

  return activeUrl === orderDraftListUrl().split("?")[0] &&
    menuItemUrl === orderListUrl().split("?")[0]
    ? false
    : !!matchPath(activeUrl, {
        exact: menuItemUrl === "/",
        path: menuItemUrl
      });
}

export const checkCategoriesCollectionsPermissions = (
  userPermissions: User_userPermissions[]
) => {
  const intl = useIntl();
  const menuItems: SidebarMenuItem[] = [];
  if (
    userPermissions?.some(
      permission => permission.code === PermissionEnum.MANAGE_CATEGORIES
    )
  ) {
    menuItems.push({
      ariaLabel: "categories",
      label: intl.formatMessage(sectionNames.categories),
      id: "categories",
      url: categoryListUrl()
    });
  }
  if (
    userPermissions?.some(
      permission => permission.code === PermissionEnum.MANAGE_COLLECTIONS
    )
  ) {
    menuItems.push({
      ariaLabel: "collections",
      label: intl.formatMessage(sectionNames.collections),
      id: "collections",
      url: collectionListUrl()
    });
  }

  return menuItems;
};
