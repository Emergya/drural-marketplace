FROM node:14.16 AS base

# 1. Build the source code
FROM base AS builder

# Env variables -------------------------------
ARG NEXT_PUBLIC_API_URI
ENV NEXT_PUBLIC_API_URI=$NEXT_PUBLIC_API_URI

ARG NEXT_PUBLIC_SALEOR_CHANNEL_SLUG=default-channel
ENV NEXT_PUBLIC_SALEOR_CHANNEL_SLUG=$NEXT_PUBLIC_SALEOR_CHANNEL_SLUG

ARG NEXT_PUBLIC_DEMO_MODE=false
ENV NEXT_PUBLIC_DEMO_MODE=$NEXT_PUBLIC_DEMO_MODE

ARG NEXT_PUBLIC_GTM_ID
ENV NEXT_PUBLIC_GTM_ID=$NEXT_PUBLIC_GTM_ID

ARG NEXT_PUBLIC_SENTRY_APM=0
ENV NEXT_PUBLIC_SENTRY_APM=$NEXT_PUBLIC_SENTRY_APM

ARG NEXT_PUBLIC_SENTRY_DSN
ENV NEXT_PUBLIC_SENTRY_DSN=$NEXT_PUBLIC_SENTRY_DSN

ARG INCREMENTAL_STATIC_REGENERATION_REVALIDATE=3600
ENV INCREMENTAL_STATIC_REGENERATION_REVALIDATE=$INCREMENTAL_STATIC_REGENERATION_REVALIDATE

ARG NEXT_PUBLIC_STATIC_PATHS_FALLBACK=blocking
ENV NEXT_PUBLIC_STATIC_PATHS_FALLBACK=$NEXT_PUBLIC_STATIC_PATHS_FALLBACK

ARG NEXT_PUBLIC_MK_DEFAULT_LATITUDE
ENV NEXT_PUBLIC_MK_DEFAULT_LATITUDE=$NEXT_PUBLIC_MK_DEFAULT_LATITUDE

ARG NEXT_PUBLIC_MK_DEFAULT_LONGITUDE
ENV NEXT_PUBLIC_MK_DEFAULT_LONGITUDE=$NEXT_PUBLIC_MK_DEFAULT_LONGITUDE

ARG NEXT_PUBLIC_RADIUS=100
ENV NEXT_PUBLIC_RADIUS=$NEXT_PUBLIC_RADIUS

ARG NEXT_PUBLIC_MAPBOX_TOKEN
ENV NEXT_PUBLIC_MAPBOX_TOKEN=$NEXT_PUBLIC_MAPBOX_TOKEN

ARG NEXT_PUBLIC_MAPBOX_STYLES_URL
ENV NEXT_PUBLIC_MAPBOX_STYLES_URL=$NEXT_PUBLIC_MAPBOX_STYLES_URL

ARG NEXT_PUBLIC_DASHBOARD
ENV NEXT_PUBLIC_DASHBOARD=$NEXT_PUBLIC_DASHBOARD

ARG NEXT_PUBLIC_CW_FRONTEND_URI
ENV NEXT_PUBLIC_CW_FRONTEND_URI=$NEXT_PUBLIC_CW_FRONTEND_URI

ARG NEXT_PUBLIC_TZ=Europe/Madrid
ENV NEXT_PUBLIC_TZ=$NEXT_PUBLIC_TZ

ARG NEXT_PUBLIC_EUR_TO_HRK_RATE
ENV NEXT_PUBLIC_EUR_TO_HRK_RATE=$NEXT_PUBLIC_EUR_TO_HRK_RATE

ARG NEXT_PUBLIC_DEFAULT_LOCALE
ENV NEXT_PUBLIC_DEFAULT_LOCALE=$NEXT_PUBLIC_DEFAULT_LOCALE
# ----------------------------------------------

WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

# 2. Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy images
COPY --from=builder /app/public ./public
# Copy builded app
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
# Copy node modules
COPY --from=builder /app/node_modules ./node_modules
# Copy package.json
COPY --from=builder /app/package.json ./package.json
# Copy next config to make i18n locales working
COPY --from=builder /app/config/next ./config/next
COPY --from=builder /app/next.config.js ./next.config.js
# Copy apollo cofig to expose API_URI
COPY --from=builder /app/apollo.config.js ./apollo.config.js

USER nextjs

EXPOSE 3000

ENV NEXT_TELEMETRY_DISABLED 1

CMD ["npm", "start"]