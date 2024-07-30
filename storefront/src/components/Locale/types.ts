export interface LocaleContextType {
  userPreferredLocale: string;
  setUserPreferredLocale: (locale: string) => void;
}

interface StructuredMessage {
  type: number;
  value: string;
}

export type LocaleMessages = Record<string, StructuredMessage[]>;

export enum Locale {
  EN = "en",
  PL = "pl",
  AR = "ar",
  AZ = "az",
  BG = "bg",
  BN = "bn",
  CA = "ca",
  CS = "cs",
  DA = "da",
  DE = "de",
  EL = "el",
  ES = "es",
  ES_CO = "es_CO",
  ET = "et",
  FA = "fa",
  FI = "fi",
  FR = "fr",
  HI = "hi",
  HR = "hr",
  HU = "hu",
  HY = "hy",
  ID = "id",
  IS = "is",
  IT = "it",
  JA = "ja",
  KO = "ko",
  LT = "lt",
  MN = "mn",
  NB = "nb",
  NL = "nl",
  PT = "pt",
  PT_BR = "pt_BR",
  RO = "ro",
  RU = "ru",
  SK = "sk",
  SL = "sl",
  SQ = "sq",
  SR = "sr",
  SV = "sv",
  TH = "th",
  TR = "tr",
  UK = "uk",
  VI = "vi",
  ZH_HANS = "zh-Hans",
  ZH_HANT = "zh-Hant",
}
