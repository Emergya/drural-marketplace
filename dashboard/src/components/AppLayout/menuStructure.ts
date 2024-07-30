import appsIcon from "@assets/images/dRuralSidebarIcons/apps.svg";
import catalogueIcon from "@assets/images/dRuralSidebarIcons/catalogue.svg";
import clientsIcon from "@assets/images/dRuralSidebarIcons/clients.svg";
import companiesIcon from "@assets/images/dRuralSidebarIcons/companies.svg";
import configurationIcon from "@assets/images/dRuralSidebarIcons/configuration.svg";
import homeIcon from "@assets/images/dRuralSidebarIcons/home.svg";
import ordersIcon from "@assets/images/dRuralSidebarIcons/orders.svg";
import statsIcon from "@assets/images/dRuralSidebarIcons/stats.svg";
import translationsIcon from "@assets/images/dRuralSidebarIcons/traslations.svg";
import { SidebarMenuItem } from "@drural/macaw-ui";
import { resourceListUrl } from "@saleor/bookableResources/urls";
import { businessListPath } from "@saleor/business/urls";
import {
  configurationMenuUrl,
  createConfigurationMenu
} from "@saleor/configuration";
import { MenuItem } from "@saleor/configuration/ConfigurationPage";
import { controlPanelPath } from "@saleor/controlPanel/url";
import { User } from "@saleor/fragments/types/User";
import { commonMessages, sectionNames } from "@saleor/intl";
import { userListUrl, UserSections } from "@saleor/users/urls";
import { IntlShape } from "react-intl";

import { appsListPath } from "../../apps/urls";
import {
  bookingListUrl,
  orderDraftListUrl,
  orderListUrl
} from "../../orders/urls";
import { productListUrl } from "../../products/urls";
import { languageListUrl } from "../../translations/urls";
import { PermissionEnum } from "../../types/globalTypes";
import { checkCategoriesCollectionsPermissions } from "./utils";

interface FilterableMenuItem extends Omit<SidebarMenuItem, "children"> {
  children?: FilterableMenuItem[];
  permissions?: PermissionEnum[];
}

function createMenuStructure(intl: IntlShape, user: User): SidebarMenuItem[] {
  const configurationMenu = createConfigurationMenu(intl);

  const menuItems: FilterableMenuItem[] = [
    {
      ariaLabel: "home",
      iconSrc: homeIcon,
      label: intl.formatMessage(sectionNames.home),
      id: "home",
      url: "/"
    },
    {
      ariaLabel: "shops",
      iconSrc: companiesIcon,
      label: intl.formatMessage(sectionNames.shops),
      id: "shops",
      permissions: [PermissionEnum.MANAGE_COMPANIES],
      url: businessListPath
    },
    {
      ariaLabel: "catalogue",
      children: [
        {
          ariaLabel: "services",
          label: intl.formatMessage(sectionNames.services),
          id: "services",
          url: productListUrl()
        },
        {
          ariaLabel: "Bookable resources",
          label: intl.formatMessage(sectionNames.bookableResources),
          id: "resources",
          url: resourceListUrl()
        },
        ...checkCategoriesCollectionsPermissions(user?.userPermissions)
      ],
      iconSrc: catalogueIcon,
      label: intl.formatMessage(commonMessages.catalog),
      permissions: [PermissionEnum.MANAGE_PRODUCTS],
      id: "catalogue"
    },
    {
      ariaLabel: "orders",
      children: [
        {
          ariaLabel: "orders",
          label: intl.formatMessage(sectionNames.orders),
          permissions: [PermissionEnum.MANAGE_ORDERS],
          id: "orders",
          url: orderListUrl()
        },
        {
          ariaLabel: "bookings",
          label: intl.formatMessage(sectionNames.bookings),
          permissions: [PermissionEnum.MANAGE_ORDERS],
          id: "bookings",
          url: bookingListUrl()
        },
        {
          ariaLabel: "order drafts",
          label: intl.formatMessage(commonMessages.drafts),
          permissions: [PermissionEnum.MANAGE_ORDERS],
          id: "order drafts",
          url: orderDraftListUrl()
        }
      ],
      iconSrc: ordersIcon,
      label: intl.formatMessage(sectionNames.orders),
      permissions: [PermissionEnum.MANAGE_ORDERS],
      id: "orders"
    },
    {
      ariaLabel: "customers",
      iconSrc: clientsIcon,
      label: intl.formatMessage(sectionNames.customers),
      permissions: [PermissionEnum.MANAGE_USERS],
      id: "customers",
      url: userListUrl(UserSections.customers)
    },
    {
      ariaLabel: "statsPanel",
      iconSrc: statsIcon,
      label: intl.formatMessage(sectionNames.statsPanel),
      permissions: [
        PermissionEnum.MANAGE_COMPANY_STATS,
        PermissionEnum.MANAGE_USER_STATS,
        PermissionEnum.MANAGE_PRODUCT_STATS
      ],
      id: "controlPanel",
      url: controlPanelPath
    },
    // {
    //   ariaLabel: "discounts",
    //   children: [
    //     {
    //       ariaLabel: "sales",
    //       label: intl.formatMessage(sectionNames.sales),
    //       id: "sales",
    //       url: saleListUrl()
    //     },
    //     {
    //       ariaLabel: "vouchers",
    //       label: intl.formatMessage(sectionNames.vouchers),
    //       id: "vouchers",
    //       url: voucherListUrl()
    //     }
    //   ],
    //   iconSrc: salesIcon,
    //   label: intl.formatMessage(commonMessages.discounts),
    //   permissions: [PermissionEnum.MANAGE_DISCOUNTS],
    //   id: "discounts"
    // },
    {
      ariaLabel: "apps",
      iconSrc: appsIcon,
      label: intl.formatMessage(sectionNames.apps),
      permissions: [PermissionEnum.MANAGE_APPS],
      id: "apps",
      url: appsListPath
    },
    {
      ariaLabel: "translations",
      iconSrc: translationsIcon,
      label: intl.formatMessage(sectionNames.translations),
      permissions: [PermissionEnum.MANAGE_TRANSLATIONS],
      id: "translations",
      url: languageListUrl
    },
    {
      ariaLabel: "configure",
      iconSrc: configurationIcon,
      label: intl.formatMessage(sectionNames.configuration),
      permissions: configurationMenu
        .reduce(
          (sections, section) => [...sections, ...section.menuItems],
          [] as MenuItem[]
        )
        .map(section => section.permission),
      id: "configure",
      url: configurationMenuUrl
    }
  ];

  return menuItems.filter(
    menuItem =>
      !menuItem.permissions ||
      (user?.userPermissions || []).some(permission =>
        menuItem.permissions.includes(permission.code)
      )
  );
}

export default createMenuStructure;
