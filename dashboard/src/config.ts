import packageInfo from "../package.json";
import { BusinessListColumns } from "./business/components/BusinessesListPage/types";
import { centerEuropeCoordinates } from "./fixtures";
import { SearchVariables } from "./hooks/makeSearch";
import { OrderListColumns } from "./orders/components/OrderListPage/types";
import { ListSettings, ListViews, Pagination } from "./types";

export const APP_MOUNT_URI = process.env.APP_MOUNT_URI;
export const APP_DEFAULT_URI = "/";
export const API_URI = process.env.API_URI;
export const BASE_URI = API_URI?.replace("/graphql/", "");
export const SW_INTERVAL = parseInt(process.env.SW_INTERVAL, 0);

export const STOREFRONT_URI = process.env.STOREFRONT_URI;

export const CHATWOOT_URI = process.env.CW_FRONTEND_URI;
export const CHATWOOT_COOKIES = {
  cw_conversation: "cw_conversation",
  cw_anonymous_conversation: "cw_anonymous_conversation",
  get_cw_user: (id: string) => `cw_user_${id}`
};

export const EUR_TO_HRK_RATE = process.env.EUR_TO_HRK_RATE
  ? parseFloat(process.env.EUR_TO_HRK_RATE)
  : null;

export const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;
export const MAPBOX_STYLES_URL = process.env.MAPBOX_STYLES_URL;
export const MAPBOX_DEFAULT_COORDS = {
  latitude:
    parseFloat(process.env.MK_DEFAULT_LATITUDE) ||
    centerEuropeCoordinates.latitude,
  longitude:
    parseFloat(process.env.MK_DEFAULT_LONGITUDE) ||
    centerEuropeCoordinates.longitude
};
export const MAPBOX_DEFAULT_ZOOM = 14;
export const MAPBOX_DEFAULT_ZOOM_OUT = 2.5;

export const DEFAULT_INITIAL_SEARCH_DATA: SearchVariables = {
  after: null,
  first: 20,
  query: ""
};

export const DEFAULT_INITIAL_PAGINATION_DATA: Pagination = {
  after: undefined,
  before: undefined
};

export const PAGINATE_BY = 20;
export const VALUES_PAGINATE_BY = 10;

export interface AppListViewSettings {
  [ListViews.APPS_LIST]: ListSettings;
  [ListViews.ATTRIBUTE_VALUE_LIST]: ListSettings;
  [ListViews.BOOKING_LIST]: ListSettings;
  [ListViews.BUSINESS_AGENT_LIST]: ListSettings;
  [ListViews.BUSINESSES_LIST]: ListSettings<BusinessListColumns>;
  [ListViews.CATEGORY_LIST]: ListSettings;
  [ListViews.COLLECTION_LIST]: ListSettings;
  [ListViews.CUSTOMER_LIST]: ListSettings;
  [ListViews.DRAFT_LIST]: ListSettings;
  [ListViews.NAVIGATION_LIST]: ListSettings;
  [ListViews.ORDER_LIST]: ListSettings<OrderListColumns>;
  [ListViews.PAGES_LIST]: ListSettings;
  [ListViews.PLUGINS_LIST]: ListSettings;
  [ListViews.PRODUCT_LIST]: ListSettings;
  [ListViews.PRODUCT_REPORT_LIST]: ListSettings;
  [ListViews.SALES_LIST]: ListSettings;
  [ListViews.SHIPPING_METHODS_LIST]: ListSettings;
  [ListViews.STAFF_MEMBERS_LIST]: ListSettings;
  [ListViews.PERMISSION_GROUP_LIST]: ListSettings;
  [ListViews.RESOURCE_LIST]: ListSettings;
  [ListViews.VOUCHER_LIST]: ListSettings;
  [ListViews.WAREHOUSE_LIST]: ListSettings;
  [ListViews.WEBHOOK_LIST]: ListSettings;
  [ListViews.TRANSLATION_ATTRIBUTE_VALUE_LIST]: ListSettings;
}
export const defaultListSettings: AppListViewSettings = {
  [ListViews.APPS_LIST]: {
    rowNumber: 10
  },
  [ListViews.ATTRIBUTE_VALUE_LIST]: {
    rowNumber: 10
  },
  [ListViews.BOOKING_LIST]: {
    rowNumber: PAGINATE_BY
  },
  [ListViews.BUSINESS_AGENT_LIST]: {
    rowNumber: PAGINATE_BY
  },
  [ListViews.BUSINESSES_LIST]: {
    columns: [BusinessListColumns.email, BusinessListColumns.locality],
    rowNumber: PAGINATE_BY
  },
  [ListViews.CATEGORY_LIST]: {
    rowNumber: PAGINATE_BY
  },
  [ListViews.COLLECTION_LIST]: {
    rowNumber: PAGINATE_BY
  },
  [ListViews.CUSTOMER_LIST]: {
    rowNumber: PAGINATE_BY
  },
  [ListViews.DRAFT_LIST]: {
    rowNumber: PAGINATE_BY
  },
  [ListViews.NAVIGATION_LIST]: {
    rowNumber: PAGINATE_BY
  },
  [ListViews.ORDER_LIST]: {
    columns: [
      OrderListColumns.status,
      OrderListColumns.paymentStatus,
      OrderListColumns.totalSeller,
      OrderListColumns.totalFee,
      OrderListColumns.total
    ],
    rowNumber: PAGINATE_BY
  },
  [ListViews.PAGES_LIST]: {
    rowNumber: PAGINATE_BY
  },
  [ListViews.PLUGINS_LIST]: {
    rowNumber: PAGINATE_BY
  },
  [ListViews.PRODUCT_LIST]: {
    rowNumber: PAGINATE_BY
  },
  [ListViews.PRODUCT_REPORT_LIST]: {
    rowNumber: VALUES_PAGINATE_BY
  },
  [ListViews.SALES_LIST]: {
    rowNumber: PAGINATE_BY
  },
  [ListViews.SHIPPING_METHODS_LIST]: {
    rowNumber: PAGINATE_BY
  },
  [ListViews.STAFF_MEMBERS_LIST]: {
    rowNumber: PAGINATE_BY
  },
  [ListViews.PERMISSION_GROUP_LIST]: {
    rowNumber: PAGINATE_BY
  },
  [ListViews.RESOURCE_LIST]: {
    rowNumber: PAGINATE_BY
  },
  [ListViews.VOUCHER_LIST]: {
    rowNumber: PAGINATE_BY
  },
  [ListViews.WAREHOUSE_LIST]: {
    rowNumber: PAGINATE_BY
  },
  [ListViews.WEBHOOK_LIST]: {
    rowNumber: PAGINATE_BY
  },
  [ListViews.TRANSLATION_ATTRIBUTE_VALUE_LIST]: {
    rowNumber: 10
  }
};

export const APP_VERSION = packageInfo.version;
export const DEMO_MODE = process.env.DEMO_MODE === "true";
export const GTM_ID = process.env.GTM_ID;

export const DEFAULT_NOTIFICATION_SHOW_TIME = 3000;
