import { getCookieGroupList } from "@components/molecules/CookieWarningModal/utils";

import { CookieEnum, Cookies, ICookie } from "./types";

export const cookieFactory = (
  code: CookieEnum,
  strictlyNecessary?: boolean
): ICookie => ({
  code,
  isEnabled: strictlyNecessary || false,
});

export const cookiesAcceptAllAdapter = (cookies: Cookies) => {
  let adaptedCookies!: Cookies;

  getCookieGroupList(cookies).forEach(group => {
    adaptedCookies = {
      ...adaptedCookies,
      [group]: cookies[group].map(cookie => {
        cookie.isEnabled = true;
        return cookie;
      }),
    };
  });

  return adaptedCookies;
};
