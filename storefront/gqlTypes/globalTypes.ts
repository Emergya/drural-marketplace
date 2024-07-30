/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * An enumeration.
 */
export enum AccountErrorCode {
  ACCOUNT_NOT_CONFIRMED = "ACCOUNT_NOT_CONFIRMED",
  ACTIVATE_OWN_ACCOUNT = "ACTIVATE_OWN_ACCOUNT",
  ACTIVATE_SUPERUSER_ACCOUNT = "ACTIVATE_SUPERUSER_ACCOUNT",
  CHANNEL_INACTIVE = "CHANNEL_INACTIVE",
  DEACTIVATE_OWN_ACCOUNT = "DEACTIVATE_OWN_ACCOUNT",
  DEACTIVATE_SUPERUSER_ACCOUNT = "DEACTIVATE_SUPERUSER_ACCOUNT",
  DELETE_NON_STAFF_USER = "DELETE_NON_STAFF_USER",
  DELETE_OWN_ACCOUNT = "DELETE_OWN_ACCOUNT",
  DELETE_STAFF_ACCOUNT = "DELETE_STAFF_ACCOUNT",
  DELETE_SUPERUSER_ACCOUNT = "DELETE_SUPERUSER_ACCOUNT",
  DUPLICATED_INPUT_ITEM = "DUPLICATED_INPUT_ITEM",
  GRAPHQL_ERROR = "GRAPHQL_ERROR",
  INACTIVE = "INACTIVE",
  INVALID = "INVALID",
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
  INVALID_PASSWORD = "INVALID_PASSWORD",
  JWT_DECODE_ERROR = "JWT_DECODE_ERROR",
  JWT_INVALID_CSRF_TOKEN = "JWT_INVALID_CSRF_TOKEN",
  JWT_INVALID_TOKEN = "JWT_INVALID_TOKEN",
  JWT_MISSING_TOKEN = "JWT_MISSING_TOKEN",
  JWT_SIGNATURE_EXPIRED = "JWT_SIGNATURE_EXPIRED",
  LEFT_NOT_MANAGEABLE_PERMISSION = "LEFT_NOT_MANAGEABLE_PERMISSION",
  MISSING_CHANNEL_SLUG = "MISSING_CHANNEL_SLUG",
  NOT_FOUND = "NOT_FOUND",
  OUT_OF_SCOPE_GROUP = "OUT_OF_SCOPE_GROUP",
  OUT_OF_SCOPE_PERMISSION = "OUT_OF_SCOPE_PERMISSION",
  OUT_OF_SCOPE_USER = "OUT_OF_SCOPE_USER",
  PASSWORD_ENTIRELY_NUMERIC = "PASSWORD_ENTIRELY_NUMERIC",
  PASSWORD_REPEAT_NOT_MATCH = "PASSWORD_REPEAT_NOT_MATCH",
  PASSWORD_TOO_COMMON = "PASSWORD_TOO_COMMON",
  PASSWORD_TOO_SHORT = "PASSWORD_TOO_SHORT",
  PASSWORD_TOO_SIMILAR = "PASSWORD_TOO_SIMILAR",
  REQUIRED = "REQUIRED",
  UNIQUE = "UNIQUE",
}

/**
 * An enumeration.
 */
export enum BookableResourceDayEnum {
  FRIDAY = "FRIDAY",
  MONDAY = "MONDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
  THURSDAY = "THURSDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
}

/**
 * An enumeration.
 */
export enum CountryCode {
  AD = "AD",
  AE = "AE",
  AF = "AF",
  AG = "AG",
  AI = "AI",
  AL = "AL",
  AM = "AM",
  AO = "AO",
  AQ = "AQ",
  AR = "AR",
  AS = "AS",
  AT = "AT",
  AU = "AU",
  AW = "AW",
  AX = "AX",
  AZ = "AZ",
  BA = "BA",
  BB = "BB",
  BD = "BD",
  BE = "BE",
  BF = "BF",
  BG = "BG",
  BH = "BH",
  BI = "BI",
  BJ = "BJ",
  BL = "BL",
  BM = "BM",
  BN = "BN",
  BO = "BO",
  BQ = "BQ",
  BR = "BR",
  BS = "BS",
  BT = "BT",
  BV = "BV",
  BW = "BW",
  BY = "BY",
  BZ = "BZ",
  CA = "CA",
  CC = "CC",
  CD = "CD",
  CF = "CF",
  CG = "CG",
  CH = "CH",
  CI = "CI",
  CK = "CK",
  CL = "CL",
  CM = "CM",
  CN = "CN",
  CO = "CO",
  CR = "CR",
  CU = "CU",
  CV = "CV",
  CW = "CW",
  CX = "CX",
  CY = "CY",
  CZ = "CZ",
  DE = "DE",
  DJ = "DJ",
  DK = "DK",
  DM = "DM",
  DO = "DO",
  DZ = "DZ",
  EC = "EC",
  EE = "EE",
  EG = "EG",
  EH = "EH",
  ER = "ER",
  ES = "ES",
  ET = "ET",
  EU = "EU",
  FI = "FI",
  FJ = "FJ",
  FK = "FK",
  FM = "FM",
  FO = "FO",
  FR = "FR",
  GA = "GA",
  GB = "GB",
  GD = "GD",
  GE = "GE",
  GF = "GF",
  GG = "GG",
  GH = "GH",
  GI = "GI",
  GL = "GL",
  GM = "GM",
  GN = "GN",
  GP = "GP",
  GQ = "GQ",
  GR = "GR",
  GS = "GS",
  GT = "GT",
  GU = "GU",
  GW = "GW",
  GY = "GY",
  HK = "HK",
  HM = "HM",
  HN = "HN",
  HR = "HR",
  HT = "HT",
  HU = "HU",
  ID = "ID",
  IE = "IE",
  IL = "IL",
  IM = "IM",
  IN = "IN",
  IO = "IO",
  IQ = "IQ",
  IR = "IR",
  IS = "IS",
  IT = "IT",
  JE = "JE",
  JM = "JM",
  JO = "JO",
  JP = "JP",
  KE = "KE",
  KG = "KG",
  KH = "KH",
  KI = "KI",
  KM = "KM",
  KN = "KN",
  KP = "KP",
  KR = "KR",
  KW = "KW",
  KY = "KY",
  KZ = "KZ",
  LA = "LA",
  LB = "LB",
  LC = "LC",
  LI = "LI",
  LK = "LK",
  LR = "LR",
  LS = "LS",
  LT = "LT",
  LU = "LU",
  LV = "LV",
  LY = "LY",
  MA = "MA",
  MC = "MC",
  MD = "MD",
  ME = "ME",
  MF = "MF",
  MG = "MG",
  MH = "MH",
  MK = "MK",
  ML = "ML",
  MM = "MM",
  MN = "MN",
  MO = "MO",
  MP = "MP",
  MQ = "MQ",
  MR = "MR",
  MS = "MS",
  MT = "MT",
  MU = "MU",
  MV = "MV",
  MW = "MW",
  MX = "MX",
  MY = "MY",
  MZ = "MZ",
  NA = "NA",
  NC = "NC",
  NE = "NE",
  NF = "NF",
  NG = "NG",
  NI = "NI",
  NL = "NL",
  NO = "NO",
  NP = "NP",
  NR = "NR",
  NU = "NU",
  NZ = "NZ",
  OM = "OM",
  PA = "PA",
  PE = "PE",
  PF = "PF",
  PG = "PG",
  PH = "PH",
  PK = "PK",
  PL = "PL",
  PM = "PM",
  PN = "PN",
  PR = "PR",
  PS = "PS",
  PT = "PT",
  PW = "PW",
  PY = "PY",
  QA = "QA",
  RE = "RE",
  RO = "RO",
  RS = "RS",
  RU = "RU",
  RW = "RW",
  SA = "SA",
  SB = "SB",
  SC = "SC",
  SD = "SD",
  SE = "SE",
  SG = "SG",
  SH = "SH",
  SI = "SI",
  SJ = "SJ",
  SK = "SK",
  SL = "SL",
  SM = "SM",
  SN = "SN",
  SO = "SO",
  SR = "SR",
  SS = "SS",
  ST = "ST",
  SV = "SV",
  SX = "SX",
  SY = "SY",
  SZ = "SZ",
  TC = "TC",
  TD = "TD",
  TF = "TF",
  TG = "TG",
  TH = "TH",
  TJ = "TJ",
  TK = "TK",
  TL = "TL",
  TM = "TM",
  TN = "TN",
  TO = "TO",
  TR = "TR",
  TT = "TT",
  TV = "TV",
  TW = "TW",
  TZ = "TZ",
  UA = "UA",
  UG = "UG",
  UM = "UM",
  US = "US",
  UY = "UY",
  UZ = "UZ",
  VA = "VA",
  VC = "VC",
  VE = "VE",
  VG = "VG",
  VI = "VI",
  VN = "VN",
  VU = "VU",
  WF = "WF",
  WS = "WS",
  YE = "YE",
  YT = "YT",
  ZA = "ZA",
  ZM = "ZM",
  ZW = "ZW",
}

export enum OrderDirection {
  ASC = "ASC",
  DESC = "DESC",
}

/**
 * An enumeration.
 */
export enum OrderErrorCode {
  BILLING_ADDRESS_NOT_SET = "BILLING_ADDRESS_NOT_SET",
  CANNOT_CANCEL_FULFILLMENT = "CANNOT_CANCEL_FULFILLMENT",
  CANNOT_CANCEL_ORDER = "CANNOT_CANCEL_ORDER",
  CANNOT_DELETE = "CANNOT_DELETE",
  CANNOT_DISCOUNT = "CANNOT_DISCOUNT",
  CANNOT_REFUND = "CANNOT_REFUND",
  CAPTURE_INACTIVE_PAYMENT = "CAPTURE_INACTIVE_PAYMENT",
  CHANNEL_INACTIVE = "CHANNEL_INACTIVE",
  DUPLICATED_INPUT_ITEM = "DUPLICATED_INPUT_ITEM",
  FULFILL_ORDER_LINE = "FULFILL_ORDER_LINE",
  GRAPHQL_ERROR = "GRAPHQL_ERROR",
  INSUFFICIENT_STOCK = "INSUFFICIENT_STOCK",
  INVALID = "INVALID",
  INVALID_QUANTITY = "INVALID_QUANTITY",
  NOT_AVAILABLE_IN_CHANNEL = "NOT_AVAILABLE_IN_CHANNEL",
  NOT_EDITABLE = "NOT_EDITABLE",
  NOT_FOUND = "NOT_FOUND",
  ORDER_NO_SHIPPING_ADDRESS = "ORDER_NO_SHIPPING_ADDRESS",
  PAYMENT_ERROR = "PAYMENT_ERROR",
  PAYMENT_MISSING = "PAYMENT_MISSING",
  PRODUCT_NOT_PUBLISHED = "PRODUCT_NOT_PUBLISHED",
  PRODUCT_UNAVAILABLE_FOR_PURCHASE = "PRODUCT_UNAVAILABLE_FOR_PURCHASE",
  REQUIRED = "REQUIRED",
  SHIPPING_METHOD_NOT_APPLICABLE = "SHIPPING_METHOD_NOT_APPLICABLE",
  SHIPPING_METHOD_REQUIRED = "SHIPPING_METHOD_REQUIRED",
  TAX_ERROR = "TAX_ERROR",
  UNIQUE = "UNIQUE",
  VOID_INACTIVE_PAYMENT = "VOID_INACTIVE_PAYMENT",
  ZERO_QUANTITY = "ZERO_QUANTITY",
}

/**
 * An enumeration.
 */
export enum OrderStatus {
  CANCELED = "CANCELED",
  DRAFT = "DRAFT",
  FULFILLED = "FULFILLED",
  PARTIALLY_FULFILLED = "PARTIALLY_FULFILLED",
  PARTIALLY_RETURNED = "PARTIALLY_RETURNED",
  RETURNED = "RETURNED",
  UNCONFIRMED = "UNCONFIRMED",
  UNFULFILLED = "UNFULFILLED",
}

export enum ProductOrderField {
  CATEGORY = "CATEGORY",
  CLOSENESS = "CLOSENESS",
  COLLECTION = "COLLECTION",
  COMPANY_NAME = "COMPANY_NAME",
  COMPANY_RATING = "COMPANY_RATING",
  CONSUMPTION = "CONSUMPTION",
  CREATED_DATE = "CREATED_DATE",
  DATE = "DATE",
  MINIMAL_PRICE = "MINIMAL_PRICE",
  MODIFIED_DATE = "MODIFIED_DATE",
  NAME = "NAME",
  POPULAR = "POPULAR",
  PRICE = "PRICE",
  PUBLICATION_DATE = "PUBLICATION_DATE",
  PUBLISHED = "PUBLISHED",
  RANK = "RANK",
  RATING = "RATING",
  RATING_IN_RANGE = "RATING_IN_RANGE",
  TYPE = "TYPE",
}

export enum ProductRatingSortingField {
  DATE = "DATE",
  MINE = "MINE",
  RATING = "RATING",
}

/**
 * An enumeration.
 */
export enum ReportErrorCode {
  ATTRIBUTE_ALREADY_ASSIGNED = "ATTRIBUTE_ALREADY_ASSIGNED",
  DUPLICATED_INPUT_ITEM = "DUPLICATED_INPUT_ITEM",
  GRAPHQL_ERROR = "GRAPHQL_ERROR",
  INVALID = "INVALID",
  NOT_FOUND = "NOT_FOUND",
  PRODUCT_NOT_ASSIGNED_TO_CHANNEL = "PRODUCT_NOT_ASSIGNED_TO_CHANNEL",
  PRODUCT_WITHOUT_CATEGORY = "PRODUCT_WITHOUT_CATEGORY",
  REQUIRED = "REQUIRED",
  UNIQUE = "UNIQUE",
}

export enum StockAvailability {
  IN_STOCK = "IN_STOCK",
  OUT_OF_STOCK = "OUT_OF_STOCK",
}

export interface AccountLocationPreferencesInput {
  distance?: number | null;
  isLocationAllowed: boolean;
}

export interface AttributeInput {
  slug: string;
  values?: (string | null)[] | null;
  valuesRange?: IntRangeInput | null;
  dateTime?: DateTimeRangeInput | null;
  date?: DateRangeInput | null;
  boolean?: boolean | null;
}

export interface BookResourceInput {
  period: DateTimeRangeInput;
  bookableResource: string;
  variant: string;
}

export interface ClosenessRangeInput {
  radius: number;
  latitude: number;
  longitude: number;
}

export interface DateRangeInput {
  gte?: any | null;
  lte?: any | null;
}

export interface DateTimeRangeInput {
  gte?: any | null;
  lte?: any | null;
}

export interface IntRangeInput {
  gte?: number | null;
  lte?: number | null;
}

export interface MetadataFilter {
  key: string;
  value?: string | null;
}

export interface PriceRangeInput {
  gte?: number | null;
  lte?: number | null;
}

export interface ProductFilterInput {
  isPublished?: boolean | null;
  collections?: (string | null)[] | null;
  category?: string | null;
  company?: string | null;
  categories?: (string | null)[] | null;
  hasCategory?: boolean | null;
  attributes?: (AttributeInput | null)[] | null;
  stockAvailability?: StockAvailability | null;
  stocks?: ProductStockFilterInput | null;
  search?: string | null;
  createdDate?: DateTimeRangeInput | null;
  modifiedDate?: DateTimeRangeInput | null;
  metadata?: (MetadataFilter | null)[] | null;
  price?: PriceRangeInput | null;
  minimalPrice?: PriceRangeInput | null;
  closeness?: ClosenessRangeInput | null;
  consumption?: DateTimeRangeInput | null;
  productTypes?: (string | null)[] | null;
  ids?: (string | null)[] | null;
  hasReviewInRange?: DateTimeRangeInput | null;
  channel?: string | null;
}

export interface ProductOrder {
  direction: OrderDirection;
  channel?: string | null;
  attributeId?: string | null;
  field?: ProductOrderField | null;
}

export interface ProductRatingFilterInput {
  rating?: number | null;
  metadata?: (MetadataFilter | null)[] | null;
}

export interface ProductRatingSortingInput {
  direction: OrderDirection;
  field: ProductRatingSortingField;
}

export interface ProductStockFilterInput {
  warehouseIds?: string[] | null;
  quantity?: IntRangeInput | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
