import { PaymentChargeStatusEnum } from "@drural/sdk";
import { defineMessages, IntlShape } from "react-intl";

import { OrderStatus } from "../gqlTypes/globalTypes";

export const commonMessages = defineMessages({
  search: {
    defaultMessage: "search",
  },
  outOfStock: {
    defaultMessage: "Out of stock",
  },
  mutationError: {
    defaultMessage: "Something went wrong",
  },
  lowStock: {
    defaultMessage: "Low stock",
  },
  noItemsAvailable: {
    defaultMessage: "No items available",
  },
  noPurchaseAvailable: {
    defaultMessage: "Not available for purchase",
  },
  purchaseAvailableOn: {
    defaultMessage: `Will become available for purchase on {date} at {time}`,
  },
  youMightLike: {
    defaultMessage: "You might like",
  },
  choosePaymentMethod: {
    defaultMessage: "Please choose payment method.",
  },
  provideEmailAddress: {
    defaultMessage: "Please provide email address.",
  },
  account: {
    defaultMessage: "Account",
  },
  mapBox: {
    defaultMessage: "Something went wrong with the map Application",
  },
  myAccount: {
    defaultMessage: "My Account",
  },
  myWishLists: {
    defaultMessage: "My wish lists",
  },
  orderHistory: {
    defaultMessage: "Order history",
  },
  addressBook: {
    defaultMessage: "Address book",
  },
  firstName: {
    defaultMessage: "First Name",
  },
  lastName: {
    defaultMessage: "Last Name",
  },
  logIn: {
    defaultMessage: "Log In",
  },
  logOut: {
    defaultMessage: "Log Out",
  },
  password: {
    defaultMessage: "Password",
  },
  quantity: {
    defaultMessage: "Quantity",
  },
  sku: {
    defaultMessage: "SKU",
  },
  maxQtyIs: {
    defaultMessage: "Maximum quantity is {maxQuantity}",
  },
  qty: {
    defaultMessage: "Quantity",
  },
  subtotal: {
    defaultMessage: "Subtotal",
  },
  shipping: {
    defaultMessage: "Shipping",
  },
  promoCode: {
    defaultMessage: "Enter code",
  },
  total: {
    defaultMessage: "Total",
  },
  totalPrice: {
    defaultMessage: "Total Price",
  },
  checkout: {
    defaultMessage: "Checkout",
  },
  eMail: {
    defaultMessage: "Email Address",
  },
  shortEmail: {
    defaultMessage: "Email",
  },
  loading: {
    defaultMessage: "Loading",
  },
  products: {
    defaultMessage: "Products",
  },
  price: {
    defaultMessage: "Price",
  },
  variant: {
    defaultMessage: "Variant",
  },
  phone: {
    defaultMessage: "Phone",
  },
  phoneNumber: {
    defaultMessage: "Phone number: {phone}",
  },
  showEmail: {
    defaultMessage: "Email: {email}",
  },
  save: {
    defaultMessage: "Save",
  },
  add: {
    defaultMessage: "Add",
  },
  filterHeader: {
    defaultMessage: "Filters",
  },
  orderfilterHeader: {
    defaultMessage: "Sort by",
  },
  clearFilterHeader: {
    defaultMessage: "CLEAR FILTERS",
  },
  status: {
    defaultMessage: "Status",
  },
  cancel: {
    defaultMessage: "Cancel",
  },
  home: {
    defaultMessage: "Home",
  },
  // New ones
  aboutDrural: {
    defaultMessage: "About dRural",
  },
  accept: {
    defaultMessage: "Accept",
  },
  allServices: {
    defaultMessage: "All services",
  },
  available: {
    defaultMessage: "Available",
  },
  availableDay: {
    defaultMessage: "Available day",
  },
  bestSelling: {
    defaultMessage: "Best selling",
  },
  bookService: {
    defaultMessage: "Book service",
  },
  bookingDetails: {
    defaultMessage: "Booking details",
  },
  bookingReference: {
    defaultMessage: "Booking Reference",
  },
  bookingService: {
    defaultMessage: "Booking service",
  },
  buy: {
    defaultMessage: "Buy",
  },
  categories: {
    defaultMessage: "Categories",
  },
  categoriesPreferences: {
    defaultMessage: "Categories preferences",
  },
  conditions: {
    defaultMessage: "Conditions of use",
  },
  configuration: {
    defaultMessage: "Configuration",
  },
  collections: {
    defaultMessage: "Collections",
  },
  date: {
    defaultMessage: "Date",
  },
  deleteAccount: {
    defaultMessage: "Delete account",
  },
  description: {
    defaultMessage: "Description",
  },
  fullyBooked: {
    defaultMessage: "Fully booked",
  },
  invalidEmail: {
    defaultMessage: "Must be a valid email",
  },
  help: {
    defaultMessage: "Help",
  },
  hour: {
    defaultMessage: "Hour",
  },
  invalidPhone: {
    defaultMessage:
      "Phone number is not valid. Please provide country code followed by number with out spaces.",
  },
  location: {
    defaultMessage: "Location",
  },
  loadMore: {
    defaultMessage: "Load More",
  },
  myAdresses: {
    defaultMessage: "My addresses",
  },
  maxPhoneLength: {
    defaultMessage: "Phone number must cotains 15 or less digits",
  },
  maxFileUpload: {
    defaultMessage: "Max. file upload is 5",
  },
  messages: {
    defaultMessage: "Messages",
  },
  newIn: {
    defaultMessage: "New in",
  },
  noLimint: {
    defaultMessage: "No limit",
  },
  nonStatusFound: {
    defaultMessage: "Non status found",
  },
  notifications: {
    defaultMessage: "Notifications",
  },
  myCreditCards: {
    defaultMessage: "My credit cards",
  },
  nextStep: {
    defaultMessage: "Next Step",
  },
  orderDetails: {
    defaultMessage: "Order Details",
  },
  paymentMethods: {
    defaultMessage: "Payment methods",
  },
  personalData: {
    defaultMessage: "Personal data",
  },
  priceRange: {
    defaultMessage: "Price range",
  },
  privacyNotice: {
    defaultMessage: "Privacy notice",
  },
  reportingService: {
    defaultMessage: "Reporting service",
  },
  reportService: {
    defaultMessage: "Report service",
  },
  required: {
    defaultMessage: "Required",
  },
  resource: {
    defaultMessage: "Resource",
  },
  sell: {
    defaultMessage: "Sell",
  },
  service: {
    defaultMessage: "Service",
  },
  serviceDetails: {
    defaultMessage: "Service details",
  },
  searchInTheShop: {
    defaultMessage: "Search in the shop",
  },
  shippingMethods: {
    defaultMessage: "Shipping methods",
  },
  shopManager: {
    defaultMessage: "Shop manager",
  },
  review: {
    defaultMessage: "Review",
  },
  reviews: {
    defaultMessage: "Reviews",
  },
  yourPrivacy: {
    defaultMessage: "Your privacy",
  },
});

export const checkoutMessages = defineMessages({
  bookingDetails: {
    defaultMessage: "Booking details",
  },
  stepNameAddress: {
    defaultMessage: "Address",
  },
  stepNameShipping: {
    defaultMessage: "Shipping",
  },
  stepNamePayment: {
    defaultMessage: "Payment",
  },
  stepNameDetails: {
    defaultMessage: "Details",
  },
  addressNextActionName: {
    defaultMessage: "Continue to Shipping",
  },
  shippingNextActionName: {
    defaultMessage: "Continue to Payment",
  },
  paymentNextActionName: {
    defaultMessage: "Continue to Review",
  },
  reviewNextActionName: {
    defaultMessage: "Place order",
  },
  addNewAddress: {
    defaultMessage: "Add new address",
  },
  shippingMethod: {
    defaultMessage: "Shipping method",
  },
  billingAddress: {
    defaultMessage: "Billing address",
  },
  paymentMethod: {
    defaultMessage: "Payment",
  },
  reviewOrder: {
    defaultMessage: "Checkout details",
  },
  shippingAddress: {
    defaultMessage: "Shipping Address",
  },
  continueShopping: {
    defaultMessage: "Continue shopping",
  },
});

export const prodListHeaderCommonMsg = defineMessages({
  sortOptionsClear: {
    defaultMessage: "Clear...",
  },
  sortOptionsPrice: {
    defaultMessage: "Price Low-High",
  },
  sortOptionsPriceDsc: {
    defaultMessage: "Price High-Low",
  },
  sortOptionsName: {
    defaultMessage: "Name Increasing",
  },
  sortOptionsNameDsc: {
    defaultMessage: "Name Decreasing",
  },
  sortOptionsUpdatedAt: {
    defaultMessage: "Last updated Ascending",
  },
  sortOptionsUpdatedAtDsc: {
    defaultMessage: "Last updated Descending",
  },
  sortOptionsCloseness: {
    defaultMessage: "Nearest me",
  },
  sortOptionsPopular: {
    defaultMessage: "Most popular",
  },
});

export const paymentStatusMessages = defineMessages({
  fullyCharged: {
    defaultMessage: "Fully charged",
  },
  fullyRefunded: {
    defaultMessage: "Fully refunded",
  },
  notCharged: {
    defaultMessage: "Not charged",
  },
  partiallyCharged: {
    defaultMessage: "Partially charged",
  },
  partiallyRefunded: {
    defaultMessage: "Partially refunded",
  },
  pending: {
    defaultMessage: "Pending",
  },
  refused: {
    defaultMessage: "Refused",
  },
});

export const paymentErrorMessages = defineMessages({
  paymentNoConfirmationData: {
    defaultMessage:
      "Payment needs confirmation but data required for confirmation not received from the server.",
    description: "payment gateway error",
  },
  paymentMalformedConfirmationData: {
    defaultMessage:
      "Payment needs confirmation but data required for confirmation received from the server is malformed.",
    description: "payment gateway error",
  },
  cannotHandlePaymentConfirmation: {
    defaultMessage:
      "Payment gateway did not provide payment confirmation handler.",
    description: "payment gateway error",
  },
});

export const orderStatusMessages = defineMessages({
  draft: {
    defaultMessage: "Draft",
  },
  unfulfilled: {
    defaultMessage: "Unfulfilled",
  },
  partiallyFulfilled: {
    defaultMessage: "Partially fulfilled",
  },
  partiallyReturned: {
    defaultMessage: "Partially returned",
  },
  fulfilled: {
    defaultMessage: "Fulfilled",
  },
  canceled: {
    defaultMessage: "Canceled",
  },
  returned: {
    defaultMessage: "Returned",
  },
  unconfirmed: {
    defaultMessage: "Unconfirmed",
  },
});

export function translatePaymentStatusCode(
  status: PaymentChargeStatusEnum,
  intl: IntlShape
): string {
  switch (status) {
    case PaymentChargeStatusEnum.FULLY_CHARGED:
      return intl.formatMessage(paymentStatusMessages.fullyCharged);
    case PaymentChargeStatusEnum.FULLY_REFUNDED:
      return intl.formatMessage(paymentStatusMessages.fullyRefunded);
    case PaymentChargeStatusEnum.NOT_CHARGED:
      return intl.formatMessage(paymentStatusMessages.notCharged);
    case PaymentChargeStatusEnum.PARTIALLY_CHARGED:
      return intl.formatMessage(paymentStatusMessages.partiallyCharged);
    case PaymentChargeStatusEnum.PARTIALLY_REFUNDED:
      return intl.formatMessage(paymentStatusMessages.partiallyRefunded);
    case PaymentChargeStatusEnum.PENDING:
      return intl.formatMessage(paymentStatusMessages.pending);
    case PaymentChargeStatusEnum.REFUSED:
      return intl.formatMessage(paymentStatusMessages.refused);
    default:
      return intl.formatMessage(commonMessages.nonStatusFound);
  }
}

export function translateOrderStatusCode(
  status: OrderStatus,
  intl: IntlShape
): string {
  switch (status) {
    case OrderStatus.CANCELED:
      return intl.formatMessage(orderStatusMessages.canceled);
    case OrderStatus.DRAFT:
      return intl.formatMessage(orderStatusMessages.draft);
    case OrderStatus.FULFILLED:
      return intl.formatMessage(orderStatusMessages.fulfilled);
    case OrderStatus.PARTIALLY_FULFILLED:
      return intl.formatMessage(orderStatusMessages.partiallyFulfilled);
    case OrderStatus.PARTIALLY_RETURNED:
      return intl.formatMessage(orderStatusMessages.partiallyReturned);
    case OrderStatus.RETURNED:
      return intl.formatMessage(orderStatusMessages.returned);
    case OrderStatus.UNCONFIRMED:
      return intl.formatMessage(orderStatusMessages.unconfirmed);
    case OrderStatus.UNFULFILLED:
      return intl.formatMessage(orderStatusMessages.unfulfilled);
    default:
      return intl.formatMessage(commonMessages.nonStatusFound);
  }
}

export const languageMessages = defineMessages({
  czech: {
    defaultMessage: "Czech",
  },
  croatian: {
    defaultMessage: "Croatian",
  },
  dutch: {
    defaultMessage: "Dutch",
  },
  greek: {
    defaultMessage: "Greek",
  },
  english: {
    defaultMessage: "English",
  },
  french: {
    defaultMessage: "French",
  },
  polish: {
    defaultMessage: "Polish",
  },
  portuguese: {
    defaultMessage: "Portuguese",
  },
  serbian: {
    defaultMessage: "Serbian",
  },
  slovenian: {
    defaultMessage: "Slovenian",
  },
  spanish: {
    defaultMessage: "Spanish",
  },
  swedish: {
    defaultMessage: "Swedish",
  },
});
