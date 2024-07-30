import { CookieEnum, CookieGroupEnum, Cookies, ICookie } from "./types";
import { cookieFactory } from "./utils";

const strictlyNecessaryCookies: ICookie[] = [
  cookieFactory(CookieEnum.STRIPE, true),
  cookieFactory(CookieEnum.CHATWOOT, true),
  cookieFactory(CookieEnum.DRURAL, true),
];

const targetingCookies: ICookie[] = [
  cookieFactory(CookieEnum.GOOGLE_ANALYTICS),
];

export const cookies: Cookies = {
  [CookieGroupEnum.strictlyNecessary]: strictlyNecessaryCookies,
  [CookieGroupEnum.targeting]: targetingCookies,
};
