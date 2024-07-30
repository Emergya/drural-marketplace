import { User } from "@drural/sdk/lib/fragments/gqlTypes/User";
import Cookies from "js-cookie";
import { AlertManager } from "react-alert";
import { IntlShape } from "react-intl";
import { v4 as uuidv4 } from "uuid";

import { chatwootCookies } from "@temp/constants";
import { generateHmac } from "@utils/hmac";

import { ChatwootAnonymousUser } from "./types";

export const startChatwoot = (
  chatwootUri: string,
  websiteToken: string,
  onChatwootReady: () => void
) => {
  const tag = "script";
  const g = document.createElement(tag);
  const s = document.getElementsByTagName(tag)[0];
  g.src = `${chatwootUri}/packs/js/sdk.js`;
  g.defer = true;
  g.async = true;
  s.parentNode?.insertBefore(g, s);
  g.onload = () => {
    (window as any).chatwootSDK?.run({
      websiteToken,
      baseUrl: chatwootUri,
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
  Cookies.remove(chatwootCookies.cw_conversation);
  Cookies.remove(chatwootCookies.get_cw_user(websiteToken));
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
  alert: AlertManager,
  intl: IntlShape
) => {
  const hmacId = generateHmac(hmacTocken, user.id, alert, intl);
  (window as any).$chatwoot?.setUser(user.id, {
    email: user.email,
    name: user.firstName,
    // If chatwoot don't apply the image is because url restrictions.
    // For example local host, !SSL, ...
    avatar_url: user.avatar?.url,
    identifier_hash: hmacId,
  });
};

export const setChatwootAnonymousUser = (
  websiteToken: string,
  hmacTocken: string,
  anonymousUsers: ChatwootAnonymousUser[],
  setAnonymousUsers: (value: ChatwootAnonymousUser[]) => void,
  alert: AlertManager,
  intl: IntlShape
) => {
  // 1. Find
  const anonymousUser = anonymousUsers?.find(
    user => user.websiteToken === websiteToken
  );
  // 2. Apply
  if (anonymousUser) {
    const hmacId = generateHmac(hmacTocken, anonymousUser.userId, alert, intl);
    (window as any).$chatwoot?.setUser(anonymousUser.userId, {
      name: `anonymous_${anonymousUser.userId}`,
      identifier_hash: hmacId,
    });
  } else {
    const userId = uuidv4();
    const hmacId = generateHmac(hmacTocken, userId, alert, intl);
    setAnonymousUsers([...anonymousUsers, { websiteToken, userId }]);
    (window as any).$chatwoot?.setUser(userId, {
      name: `anonymous_${userId}`,
      identifier_hash: hmacId,
    });
  }
};

export const toggleChatwootVisibility = () => {
  if ((window as any).$chatwoot) {
    (window as any).$chatwoot?.toggle();
  }
};
