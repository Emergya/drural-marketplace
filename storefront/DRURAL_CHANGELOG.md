# Drural Changelog

### [US-CS-004] Book a service

Creates a booking services page to book a service.

**Components**

- Calendar
- CaptionBox
- CaptionDot

**Packages**

- react-calendar
- moment-timezone

### feature/409835-dRural-DropDown-UserMenu

Adapts drop-down usermenu to dRural styles

**Components**

- UserMenu

### feature/410452-Añadir-selector-idioma

Adds Language Selector and fixes translations problems:

- New translations into ./content
- Run "npm run i18n" to extract messages and generate translations

**Components**

- LanguageSelect

**Packages**

- @formatjs/cli
- babel-plugin-formatjs

### feature/chatwoot

Enables chat comunications between sellers and customers via chatwoot.

**Components**

- ChatwootWidget > chat widget applied inside product and company views.

**Packages**

- js-cookie
- uuid

### feature/social-media-share

Adds social media share buttons to product details page.

**Components**

- SocialMediaShare

**Packages**

- react-share

### feature/google-analytics

Adds react-ga4 package and creates the new GA4Tag component to manage ga4 (google analytics 4) integration in the storefront.

**Components**

- GA4Tag

**Packages**

- react-ga4
