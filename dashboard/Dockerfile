FROM node:14.16 as builder

# Env variables --------------------------------------
ARG API_URI
ENV API_URI=$API_URI

ARG MAPBOX_TOKEN
ENV MAPBOX_TOKEN=$MAPBOX_TOKEN

ARG MAPBOX_STYLES_URL
ENV MAPBOX_STYLES_URL=$MAPBOX_STYLES_URL

ARG MK_DEFAULT_LATITUDE
ENV MK_DEFAULT_LATITUDE=$MK_DEFAULT_LATITUDE

ARG MK_DEFAULT_LONGITUDE
ENV MK_DEFAULT_LONGITUDE=$MK_DEFAULT_LONGITUDE

ARG STOREFRONT_URI
ENV STOREFRONT_URI=$STOREFRONT_URI

ARG CW_FRONTEND_URI
ENV CW_FRONTEND_URI=$CW_FRONTEND_URI

ARG EUR_TO_HRK_RATE
ENV EUR_TO_HRK_RATE=$EUR_TO_HRK_RATE

# Extends node memory
ENV NODE_OPTIONS=--max-old-space-size=8192
# ---------------------------------------------------

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:stable
WORKDIR /app
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build/ /app/
