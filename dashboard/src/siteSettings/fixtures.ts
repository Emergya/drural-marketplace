import { SiteSettings_shop } from "./types/SiteSettings";

export const shop: SiteSettings_shop = {
  __typename: "Shop",
  companyAddress: {
    __typename: "Address",
    city: "Kenstad",
    cityArea: "Alabama",
    companyName: "Saleor e-commerce",
    country: {
      __typename: "CountryDisplay",
      code: "UA",
      country: "United Arab Emirates"
    },
    countryArea: null,
    firstName: null,
    id: "1",
    lastName: null,
    phone: "+41 876-373-9137",
    postalCode: "89880-6342",
    streetAddress1: "01419 Bernhard Plain",
    streetAddress2: null
  },
  countries: [
    {
      __typename: "CountryDisplay",
      code: "UA",
      country: "United Arab Emirates"
    }
  ],
  customerSetPasswordUrl: "https://example.com/reset-password",
  defaultLanguage: "en",
  defaultMailSenderAddress: "noreply@example.com",
  defaultMailSenderName: "Saleor",
  description: "Lorem ipsum dolor sit amet",
  domain: {
    __typename: "Domain",
    host: "localhost:8000"
  },
  googleAnalytics: {
    __typename: "ShopGoogleAnalyticsType",
    isActive: false,
    measurementId: "123asd"
  },
  name: "Saleor e-commerce",
  commissionRate: 0.05
};
