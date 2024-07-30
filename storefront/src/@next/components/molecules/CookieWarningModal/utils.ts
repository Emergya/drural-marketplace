import { IntlShape } from "react-intl";

import {
  CookieEnum,
  CookieGroupEnum,
  Cookies,
} from "@components/organisms/CookieWarning/types";

import { messages } from "./messages";
import { ICookieGroupMessage, Preferences } from "./types";

export const isStrictlyNecessary = (group: CookieGroupEnum): boolean =>
  group === CookieGroupEnum.strictlyNecessary;

export const getCookieGroupList = (
  cookieObject: Record<CookieGroupEnum, any>
) => Object.keys(cookieObject) as CookieGroupEnum[];

export const cookiesToStateAdapter = (cookies: Cookies) => {
  let state!: Preferences;

  getCookieGroupList(cookies).forEach(group => {
    state = {
      ...state,
      [group]: {
        selectAll: isStrictlyNecessary(group) || false,
        cookies: cookies[group],
      },
    };
  });

  return state;
};

export const stateToCookiesAdapter = (state: Preferences) => {
  let cookies!: Cookies;

  getCookieGroupList(state).forEach(group => {
    cookies = {
      ...cookies,
      [group]: state[group].cookies,
    };
  });

  return cookies;
};

const cookieGroupMessageFactory = (
  title: string,
  description: string
): ICookieGroupMessage => ({
  title,
  description,
});

export const getCookieLabel = (
  code: CookieEnum,
  intl: IntlShape
): string | null => {
  switch (code) {
    case CookieEnum.CHATWOOT:
      return intl.formatMessage(messages.chatwoot);
    case CookieEnum.DRURAL:
      return intl.formatMessage(messages.dRural);
    case CookieEnum.GOOGLE_ANALYTICS:
      return intl.formatMessage(messages.googleAnalytics);
    case CookieEnum.STRIPE:
      return intl.formatMessage(messages.stripe);
    default:
      return null;
  }
};

export const getCookieGroupMessages = (
  code: CookieGroupEnum,
  intl: IntlShape
): ICookieGroupMessage | null => {
  switch (code) {
    case CookieGroupEnum.strictlyNecessary:
      return cookieGroupMessageFactory(
        intl.formatMessage(messages.strictlyNecessaryCookiesTitle),
        intl.formatMessage(messages.strictlyNecessaryCookiesDescription)
      );
    case CookieGroupEnum.targeting:
      return cookieGroupMessageFactory(
        intl.formatMessage(messages.targetingCookiesTitle),
        intl.formatMessage(messages.targetingCookiesDescription)
      );
    default:
      return null;
  }
};

export const isCookieEnabled = (
  cookies: Cookies | undefined,
  code: CookieEnum
) => {
  let isEnabled: boolean = false;

  if (cookies) {
    getCookieGroupList(cookies).find(group =>
      cookies[group].find(cookie => {
        const targetCookie = cookie.code === code;

        if (targetCookie) {
          isEnabled = cookie.isEnabled;
        }

        return targetCookie;
      })
    );
  }

  return isEnabled;
};
