import {
  UilBox,
  UilBrushAlt,
  UilCalculator,
  UilCog,
  UilCommentDots,
  UilCompass,
  UilFileShieldAlt,
  UilFilesLandscapesAlt,
  UilIcons,
  UilPlug,
  UilUsersAlt,
  UilWebGrid
} from "@iconscout/react-unicons";
import { attributeListUrl } from "@saleor/attributes/urls";
import { channelsListUrl } from "@saleor/channels/urls";
import { WindowTitle } from "@saleor/components/WindowTitle";
import { customizationListUrl } from "@saleor/customization/url";
import useNavigator from "@saleor/hooks/useNavigator";
import useUser from "@saleor/hooks/useUser";
import Channels from "@saleor/icons/Channels";
// import ShippingMethods from "@saleor/icons/ShippingMethods";
// import Warehouses from "@saleor/icons/Warehouses";
import { sectionNames } from "@saleor/intl";
import { maybe } from "@saleor/misc";
import { menuListUrl } from "@saleor/navigation/urls";
import { pageListUrl } from "@saleor/pages/urls";
import { pageTypeListUrl } from "@saleor/pageTypes/urls";
import { permissionGroupListUrl } from "@saleor/permissionGroups/urls";
import { pluginListUrl } from "@saleor/plugins/urls";
import { productTypeListUrl } from "@saleor/productTypes/urls";
// import { shippingZonesListUrl } from "@saleor/shipping/urls";
import { siteSettingsUrl } from "@saleor/siteSettings/urls";
import { staffListUrl } from "@saleor/staff/urls";
import { taxSection } from "@saleor/taxes/urls";
import { PermissionEnum } from "@saleor/types/globalTypes";
// import { warehouseSection } from "@saleor/warehouses/urls";
import React from "react";
import { IntlShape, useIntl } from "react-intl";

import { chatwootSection } from "../chatwoot/urls";
import ConfigurationPage, { MenuSection } from "./ConfigurationPage";

export function createConfigurationMenu(intl: IntlShape): MenuSection[] {
  return [
    /*{
      label: intl.formatMessage({
        defaultMessage: "Attributes and Product Types"
      }),
      menuItems: [
        {
          description: intl.formatMessage({
            defaultMessage: "Determine attributes used to create product types",
            id: "configurationMenuAttributes"
          }),
          icon: <UilIcons size="32px" />,
          permission: PermissionEnum.MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES,
          title: intl.formatMessage(sectionNames.attributes),
          url: attributeListUrl(),
          testId: "configurationMenuAttributes"
        },
        {
          description: intl.formatMessage({
            defaultMessage: "Define types of products you sell",
            id: "configurationMenuProductTypes"
          }),
          icon: <UilBox size="32px" />,
          permission: PermissionEnum.MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES,
          title: intl.formatMessage(sectionNames.productTypes),
          url: productTypeListUrl(),
          testId: "configurationMenuProductTypes"
        }
      ]
    },*/
    /*{
      label: intl.formatMessage({
        defaultMessage: "Product Settings"
      }),
      menuItems: [
        {
          description: intl.formatMessage({
            defaultMessage: "Manage how your store charges tax",
            id: "configurationMenuTaxes"
          }),
          icon: <UilCalculator size="32px" />,
          permission: PermissionEnum.MANAGE_SETTINGS,
          title: intl.formatMessage(sectionNames.taxes),
          url: taxSection,
          testId: "configurationMenuTaxes"
        }
      ]
    },*/
    {
      label: intl.formatMessage({
        defaultMessage: "Staff Settings"
      }),
      menuItems: [
        {
          description: intl.formatMessage({
            defaultMessage: "Manage your employees and their permissions",
            id: "configurationMenuStaff"
          }),
          icon: <UilUsersAlt size="32px" />,
          permission: PermissionEnum.MANAGE_STAFF,
          title: intl.formatMessage(sectionNames.staff),
          url: staffListUrl(),
          testId: "configurationMenuStaff"
        },
        {
          description: intl.formatMessage({
            defaultMessage:
              "Manage your permission groups and their permissions",
            id: "configurationMenuPermissionGroups"
          }),
          icon: <UilFileShieldAlt size="32px" />,
          permission: PermissionEnum.MANAGE_STAFF,
          title: intl.formatMessage(sectionNames.permissionGroups),
          url: permissionGroupListUrl(),
          testId: "configurationMenuPermissionGroups"
        }
      ]
    },
    // {
    //   label: intl.formatMessage({
    //     defaultMessage: "Shipping Settings"
    //   }),
    //   menuItems: [
    //     {
    //       description: intl.formatMessage({
    //         defaultMessage: "Manage how you ship out orders",
    //         id: "configurationMenuShipping"
    //       }),
    //       icon: <ShippingMethods fontSize="inherit" viewBox="0 0 44 44" />,
    //       permission: PermissionEnum.MANAGE_SHIPPING,
    //       title: intl.formatMessage(sectionNames.shipping),
    //       url: shippingZonesListUrl(),
    //       testId: "configurationMenuShipping"
    //     }
    //     {
    //       description: intl.formatMessage({
    //         defaultMessage: "Manage and update your warehouse information",
    //         id: "configurationMenuWarehouses"
    //       }),
    //       icon: <Warehouses fontSize="inherit" viewBox="0 0 44 44" />,
    //       permission: PermissionEnum.MANAGE_PRODUCTS,
    //       title: intl.formatMessage(sectionNames.warehouses),
    //       url: warehouseSection,
    //       testId: "configurationMenuWarehouses"
    //     }
    //   ]
    // },
    /*{
      label: intl.formatMessage({
        defaultMessage: "Multichannel"
      }),
      menuItems: [
        {
          description: intl.formatMessage({
            defaultMessage: "Define and manage your sales channels",
            id: "configurationMenuChannels"
          }),
          icon: <Channels fontSize="inherit" viewBox="0 0 44 44" />,
          permission: PermissionEnum.MANAGE_CHANNELS,
          title: intl.formatMessage(sectionNames.channels),
          url: channelsListUrl(),
          testId: "configurationMenuChannels"
        }
      ]
    },*/
    {
      label: intl.formatMessage({
        defaultMessage: "Content Management"
      }),
      menuItems: [
        {
          description: intl.formatMessage({
            defaultMessage: "Define types of content pages used in your store",
            id: "configurationMenuPageTypes"
          }),
          icon: <UilWebGrid size="32px" />,
          permission: PermissionEnum.MANAGE_PAGES,
          title: intl.formatMessage(sectionNames.pageTypes),
          url: pageTypeListUrl(),
          testId: "configurationMenuPageTypes"
        },
        {
          description: intl.formatMessage({
            defaultMessage: "Manage and add additional pages",
            id: "configurationMenuPages"
          }),
          icon: <UilFilesLandscapesAlt size="32px" />,
          permission: PermissionEnum.MANAGE_PAGES,
          title: intl.formatMessage(sectionNames.pages),
          url: pageListUrl(),
          testId: "configurationMenuPages"
        }
      ]
    },
    {
      label: intl.formatMessage({
        defaultMessage: "Miscellaneous"
      }),
      menuItems: [
        {
          description: intl.formatMessage({
            defaultMessage: "Define how users can navigate through your store",
            id: "configurationMenuNavigation"
          }),
          icon: <UilCompass size="32px" />,
          permission: PermissionEnum.MANAGE_MENUS,
          title: intl.formatMessage(sectionNames.navigation),
          url: menuListUrl(),
          testId: "configurationMenuNavigation"
        },
        {
          description: intl.formatMessage({
            defaultMessage: "View and update your site settings",
            id: "configurationMenuSiteSettings"
          }),
          icon: <UilCog size="32px" />,
          permission: PermissionEnum.MANAGE_SETTINGS,
          title: intl.formatMessage(sectionNames.siteSettings),
          url: siteSettingsUrl(),
          testId: "configurationMenuSiteSettings"
        },
        {
          description: intl.formatMessage({
            defaultMessage: "View and update your plugins and their settings.",
            id: "configurationPluginsPages"
          }),
          icon: <UilPlug size="32px" />,
          permission: PermissionEnum.MANAGE_PLUGINS,
          title: intl.formatMessage(sectionNames.plugins),
          url: pluginListUrl(),
          testId: "configurationPluginsPages"
        },
        {
          description: intl.formatMessage({
            defaultMessage: "Customise drural in the way you want",
            id: "configurationMenuCustomization"
          }),
          icon: <UilBrushAlt size="32px" />,
          permission: PermissionEnum.MANAGE_SETTINGS,
          title: intl.formatMessage(sectionNames.siteCustomization),
          url: customizationListUrl(),
          testId: "configurationMenuCustomization"
        },
        {
          description: intl.formatMessage({
            defaultMessage: "Enable chat for admin - seller comunications.",
            id: "chatwoot"
          }),
          icon: <UilCommentDots size="32px" />,
          permission: PermissionEnum.MANAGE_SETTINGS,
          title: intl.formatMessage(sectionNames.chatwoot),
          url: chatwootSection,
          testId: "configurationMenuChatwoot"
        }
      ]
    }
  ];
}

export const configurationMenuUrl = "/configuration/";

export const ConfigurationSection: React.FC = () => {
  const navigate = useNavigator();
  const user = useUser();
  const intl = useIntl();

  return (
    <>
      <WindowTitle title={intl.formatMessage(sectionNames.configuration)} />
      <ConfigurationPage
        menu={createConfigurationMenu(intl)}
        user={maybe(() => user.user)}
        onSectionClick={navigate}
      />
    </>
  );
};
export default ConfigurationSection;
