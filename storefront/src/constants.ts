import { centerEuropeCoordinates } from "@utils/mapbox";

import { Locale } from "./components/Locale/types";

export const apiUrl = process.env.NEXT_PUBLIC_API_URI!;

export const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD;

export const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
export const MAPBOX_STYLES_URL = process.env.NEXT_PUBLIC_MAPBOX_STYLES_URL;
export const MAPBOX_DEFAULT_COORDS = {
  latitude:
    parseFloat(process.env.NEXT_PUBLIC_MK_DEFAULT_LATITUDE) ||
    centerEuropeCoordinates.latitude,
  longitude:
    parseFloat(process.env.NEXT_PUBLIC_MK_DEFAULT_LONGITUDE) ||
    centerEuropeCoordinates.longitude,
};
export const MAPBOX_DEFAULT_ZOOM = 14;

export const chatwootUri = process.env.NEXT_PUBLIC_CW_FRONTEND_URI;
export const chatwootCookies = {
  cw_conversation: "cw_conversation",
  cw_anonymous_conversation: "cw_anonymous_conversation",
  get_cw_user: (id: string) => `cw_user_${id}`,
};

export const tz = process.env.NEXT_PUBLIC_TZ || undefined;

export const cookiePreferencesKey = "cookie_preferences";

export const EUR_TO_HRK_RATE = process.env.NEXT_PUBLIC_EUR_TO_HRK_RATE
  ? parseFloat(process.env.NEXT_PUBLIC_EUR_TO_HRK_RATE)
  : null;

export const DEFAULT_LOCALE =
  (process.env.NEXT_PUBLIC_DEFAULT_LOCALE as Locale) || Locale.EN;

export const sentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

const sampleRate = parseFloat(process.env.NEXT_PUBLIC_SENTRY_APM || "");

export const sentrySampleRate = isNaN(sampleRate) ? 0 : sampleRate;

export const serviceWorkerTimeout =
  parseInt(process.env.SERVICE_WORKER_TIMEOUT || "", 10) || 60 * 1000;

export const demoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

export const channelSlug = process.env.NEXT_PUBLIC_SALEOR_CHANNEL_SLUG!;

export const exportMode = process.env.NEXT_EXPORT === "true";

export const ssrMode = typeof window === "undefined";

export const incrementalStaticRegenerationRevalidate = parseInt(
  process.env.INCREMENTAL_STATIC_REGENERATION_REVALIDATE!,
  10
);

export const staticPathsFetchBatch = 50;

export const staticPathsFallback = (exportMode
  ? false
  : process.env.NEXT_PUBLIC_STATIC_PATHS_FALLBACK) as boolean | "blocking";

export const paymentGatewayNames = {
  dummy: "mirumee.payments.dummy",
  adyen: "mirumee.payments.adyen",
  stripe: "saleor.payments.stripe",
};

export const fixedSlugPages = {
  conditionsOfUse: "conditions-of-use",
  privacyNotice: "privacy-notice",
};

export const fixedSlugMenus = {
  footer: "footer",
  navbar: "navbar",
};

export const locationFilterMaxValue = 1000;
export const priceFilterMaxValue = 1000;
