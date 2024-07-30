const baseUrl = "/";
const slugUrl = ":slug";
const idUrl = ":id";
const accountBaseUrl = `${baseUrl}account/`;
const checkoutBaseUrl = `${baseUrl}checkout/`;

export const paths = {
  // DevExamples
  devExamples: `${baseUrl}dev-expamples`,
  // **
  notFound: `${baseUrl}404`,
  accountConfirm: `${baseUrl}account-confirm`,
  booking: `${baseUrl}booking`,
  cart: `${baseUrl}cart`,
  category: `${baseUrl}category/${slugUrl}`,
  collection: `${baseUrl}collection/${slugUrl}`,
  company: `${baseUrl}company/${idUrl}`,
  guestOrderDetail: `${baseUrl}order-history/:token`,
  home: baseUrl,
  login: `${baseUrl}login`,
  orderFinalized: `${baseUrl}order-finalized`,
  onboarding: `${baseUrl}onboarding`,
  page: `${baseUrl}page/:slug`,
  passwordReset: `${baseUrl}reset-password`,
  product: `${baseUrl}product/${slugUrl}`,
  productReport: `${baseUrl}product/report`,
  productReportSuccess: `${baseUrl}product/report/success`,
  search: `${baseUrl}search`,
  wishlist: `${baseUrl}wish-list`,
  registrationMessage: `${baseUrl}registration-message`,
  registrationSuccess: `${baseUrl}registration-success`,
  /**
   * Checkout
   */
  checkout: checkoutBaseUrl,
  checkoutAddress: `${checkoutBaseUrl}address`,
  checkoutPayment: `${checkoutBaseUrl}payment`,
  checkoutPaymentConfirm: `${checkoutBaseUrl}payment-confirm`,
  checkoutReview: `${checkoutBaseUrl}review`,
  checkoutShipping: `${checkoutBaseUrl}shipping`,
  /**
   * Account section
   */
  account: accountBaseUrl,
  accountAddressBook: `${accountBaseUrl}address-book`,
  accountConfiguration: `${accountBaseUrl}configuration`,
  accountDeleteMessageSent: `${accountBaseUrl}delete-message-sent`,
  accountDeleteConfirm: `${accountBaseUrl}delete-confirm`,
  accountDeleteSuccess: `${accountBaseUrl}delete-success`,
  // FIXME: User order should be accessible via order id
  accountOrderDetail: `${accountBaseUrl}order-history/:token`,
  accountOrderHistory: `${accountBaseUrl}order-history`,
  /**
   * Login management
   */
  forgottenPassword: `${baseUrl}password-recovery`,
  passwordRequested: `${baseUrl}password-requested`,
};

/**
 * Paths which should not be generated at build time.
 */
export const DYNAMIC_REDIRECT_PATHS = [
  paths.accountOrderDetail,
  paths.guestOrderDetail,
];
