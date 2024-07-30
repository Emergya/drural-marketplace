## Features added:

### 1. Report fraudulent product views

#### Views:

- Adds new view for the service report list --> src/products/views/ProductReportList/ProductReportList.tsx.
- Adds new modal for the service report details --> src/products/components/ProductReportDialog/ProductReportDialog.tsx

#### Components:

- New slider component for any kind of html tag --> src/components/Slider/Slider.tsx
- Styled link --> src/components/StyledLink/StyledLink.tsx
- Back link: use as bradcrumb back page link --> src/components/BackLink/BackLink.tsx

#### Dependencies:

- react-slick

#### 2. Bugfix/US-GMS-005-ver-servicio

- Adds company card info. to product update view.

#### Components:

- StarsRating --> component for stars rating like storefront.

#### Dependencies:

- react-rating

### 3. [US-GMS-003]-publish-billable-service

Adds functionallity to ProductCreate & ProductUpdate pages:

- Adds the posibility to set a service as billable + set its payment methods --> through payment config card. --> src/products/components/ProductConfiguration/ProductConfiguration.tsx

- Adds product price field + set it to required if product is simple. --> src/products/components/ProductDetailsForm/ProductDetailsForm.tsx

### 4. [US-PN] Panel control

- Stats panel with stadistics

### Components:

- DruralCalendar
- DatePicker
- DruralRatinig

### Dependencies:

- react-datepicker
- react-rating

### 5. [US-GMS-002]-publish-bookable-service

- Adds functionallity to ProductCreate & ProductUpdate pages to create bookableServices.

### Components

- ProductExpandableCard
- TimePicker
- ProductBookableResourceList

### 6. Feature/403618 mapa creación servicio

- Includes branches:
  - ### feature/403619 mapa creación negocio
  - ### feature/404168-Mapa_edicion_negocio

During the creation/editing of businesses and services, the user is offered address options to choose based on the text entered and the location of the selected address is displayed on a map.

### New Components

- Deletes: BusinessAddressEdit due to no longer use
- ServiceAddressDialog
- BusinessMapUpdate

#### Dependencies:

- @mapbox/mapbox-sdk
- mapbox-gl
- react-map-gl

### 7. Feature/386690-Crear-categoria

Adds the possibility to assign icons to categories

### New Components

- CategoryIconSelect
- IconTile
- SelectIconTile
- SelectIconDialog

#### Dependencies:

- react-window

### 8. feature/us-cm-004-cambiar-interfaz

Adds new section in configuration "site customization" that allows to modify the main images, the logo and the primary and secondary colour of the platform.

### New Components

- Refactors CompanyBannerImageCropDialog into BannerImageCropDialog
- ColorPicker
- ImageUploadWithCrop
- CustomizationPage --> new Page

#### Dependencies:

- react-color

### 9. feature/chatwoot

Enables seller-customer & admin-seller comunications by adding the chat config. forms and adding the chatwoot widget inside the dashboard.

### New componens

- Chatwoot configuration > chatwoot config form card
- Chatwoot configuration view > new page
- Chatwoot widget > chat widget

### Dependencies

- js-cookie
- uuid

### 9. feature/company-agents

Creates a new seccion inside company to manage company agents: list | add | details | update | delete

### New componens

- Creates a UserList and UserDetails strategy components, and reuse them inside Customers and BusinessAgents sections

### 10. feature/google-analytics

- Adds a ga (google analytics) form to activate / deactivate ga4 by entering the ga4 measurement id.
- The form is been added to the site-settings page.

### New componens

- GA4Tag
