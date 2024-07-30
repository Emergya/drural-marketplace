export interface IProps {
  cookiePreferences: Cookies;
  setCookiePreferences: (value: Cookies) => void;
}

export type Cookies = Record<CookieGroupEnum, ICookie[]>;

export enum CookieGroupEnum {
  strictlyNecessary = "strictlyNecessary",
  targeting = "targeting",
}
export interface ICookie {
  code: CookieEnum;
  isEnabled: boolean;
}

export enum CookieEnum {
  STRIPE = "STRIPE",
  CHATWOOT = "CHATWOOT",
  DRURAL = "DRURAL",
  GOOGLE_ANALYTICS = "GOOGLE_ANALYTICS",
}
