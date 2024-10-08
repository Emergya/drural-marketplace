const withPlugins = require("next-compose-plugins");
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
const withOptimizedImages = require("next-optimized-images");
const withTM = require("next-transpile-modules")(["register-service-worker"]);

const withServiceWorkerConfig = require("./config/next/config.serviceWorker");
const withBaseConfig = require("./config/next/config.base");
const withDevConfig = require("./config/next/config.dev");
const withProdConfig = require("./config/next/config.prod");

module.exports = withPlugins(
  [
    [withOptimizedImages, { handleImages: ["jpeg", "png", "webp", "gif"] }],
    withTM,
    withBaseConfig,
    withServiceWorkerConfig,
    [withDevConfig, {}, [PHASE_DEVELOPMENT_SERVER]],
    [withProdConfig, {}, ["!" + PHASE_DEVELOPMENT_SERVER]],
  ],
  {
    i18n: {
      locales: [
        "cs",
        "el",
        "en",
        "es",
        "fr",
        "hr",
        "nl",
        "pl",
        "pt",
        "sl",
        "sr",
        "sv",
      ],
      defaultLocale: process.env.NEXT_PUBLIC_DEFAULT_LOCALE || "en",
      localeDetection: false,
    },
  }
);
