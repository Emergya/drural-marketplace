/* eslint-disable chai-friendly/no-unused-expressions */
import { IMessageContext } from "@saleor/components/messages";
import { CHATWOOT_COOKIES } from "@saleor/config";
import { User } from "@saleor/fragments/types/User";
import { generateHmac } from "@saleor/utils/hmac";
import Cookies from "js-cookie";
import { IntlShape } from "react-intl";
import { v4 as uuidv4 } from "uuid";

import { ChatwootAnonymousUser } from "./types";

export const startChatwoot = (
  chatwoodUri: string,
  websiteToken: string,
  onChatwootReady: () => void
) => {
  const tag = "script";
  const g = document.createElement(tag);
  const s = document.getElementsByTagName(tag)[0];
  g.src = `${chatwoodUri}/packs/js/sdk.js`;
  g.defer = true;
  g.async = true;
  s.parentNode?.insertBefore(g, s);
  g.onload = () => {
    (window as any).chatwootSDK?.run({
      websiteToken,
      baseUrl: chatwoodUri
    });
  };

  window.addEventListener("chatwoot:ready", onChatwootReady);
};

export const endChatwoot = (
  websiteToken: string,
  onChatwootReady: () => void,
  onChatwootStop: () => void
) => {
  // Remove chatwoot coockies
  Cookies.remove(CHATWOOT_COOKIES.cw_conversation);
  Cookies.remove(CHATWOOT_COOKIES.get_cw_user(websiteToken));
  // Removes chatwoot window variables
  delete (window as any).$chatwoot;
  delete (window as any).chatwootSDK;
  // Removes chatwoot elements
  const widgetHolder = document.querySelectorAll(".woot-widget-holder");
  const widgetBuble = document.querySelectorAll(".woot--bubble-holder");
  const chatwootScripts = document.querySelectorAll(".chatwoot-script");
  widgetHolder?.forEach(holder => holder.remove());
  widgetBuble?.forEach(bouble => bouble.remove());
  chatwootScripts?.forEach(script => script.remove());
  // Removes chatwoot event listeners
  window.removeEventListener("chatwoot:ready", onChatwootReady);
  onChatwootStop();
};

export const setChatwootLocale = (locale: string) => {
  (window as any).$chatwoot?.setLocale(locale);
};

export const setChatwootUser = (
  hmacTocken: string,
  user: User,
  notify: IMessageContext,
  intl: IntlShape
) => {
  const hmacId = generateHmac(hmacTocken, user.id, notify, intl);
  (window as any).$chatwoot?.setUser(user.id, {
    email: user.email,
    name: user.firstName,
    // If chatwoot don't apply the image is because url restrictions.
    // For example local host, !SSL, ...
    avatar_url: user.avatar?.url,
    identifier_hash: hmacId
  });
};

export const setChatwootAnonymousUser = (
  websiteToken: string,
  hmacTocken: string,
  anonymousUsers: ChatwootAnonymousUser[],
  setAnonymousUsers: (value: ChatwootAnonymousUser[]) => void,
  notify: IMessageContext,
  intl: IntlShape
) => {
  // 1. Find
  const anonymousUser = anonymousUsers?.find(
    user => user.websiteToken === websiteToken
  );
  // 2. Apply
  if (anonymousUser) {
    const hmacId = generateHmac(hmacTocken, anonymousUser.userId, notify, intl);
    (window as any).$chatwoot?.setUser(anonymousUser.userId, {
      name: `anonymous_${anonymousUser.userId}`,
      identifier_hash: hmacId
    });
  } else {
    const userId = uuidv4();
    const hmacId = generateHmac(hmacTocken, userId, notify, intl);
    setAnonymousUsers([...anonymousUsers, { websiteToken, userId }]);
    (window as any).$chatwoot?.setUser(userId, {
      name: `anonymous_${userId}`,
      identifier_hash: hmacId
    });
  }
};
