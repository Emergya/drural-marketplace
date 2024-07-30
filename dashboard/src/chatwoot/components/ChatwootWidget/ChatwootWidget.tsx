import { CHATWOOT_COOKIES, CHATWOOT_URI } from "@saleor/config";
import useLocale from "@saleor/hooks/useLocale";
import useLocalStorage from "@saleor/hooks/useLocalStorage";
import useNotifier from "@saleor/hooks/useNotifier";
import useUser from "@saleor/hooks/useUser";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";

import { ChatwootAnonymousUser, IProps } from "./types";
import {
  endChatwoot,
  setChatwootAnonymousUser,
  setChatwootLocale,
  setChatwootUser,
  startChatwoot
} from "./utils";

export const ChatwootWidget: React.FC<IProps> = ({
  hmacToken,
  websiteToken
}) => {
  const notify = useNotifier();
  const intl = useIntl();
  const { locale } = useLocale();
  const { user: druralUser } = useUser();

  const [isChatwootReady, setChatwootReady] = useState<boolean>(false);
  const [
    anonymousConversations = [],
    setAnonymousConversations
  ] = useLocalStorage<ChatwootAnonymousUser[]>(
    CHATWOOT_COOKIES.cw_anonymous_conversation,
    []
  );

  const onChatwootReady = () => setChatwootReady(true);
  const onChatwootStop = () => setChatwootReady(false);

  // Starts chatwoot
  useEffect(() => {
    if (CHATWOOT_URI) {
      startChatwoot(CHATWOOT_URI, websiteToken, onChatwootReady);
    }

    return () => {
      endChatwoot(websiteToken, onChatwootReady, onChatwootStop);
    };
  }, [CHATWOOT_URI, websiteToken, hmacToken]);

  // Sets chatwoot locale
  useEffect(() => {
    if (isChatwootReady && locale) {
      setChatwootLocale(locale);
    }
  }, [isChatwootReady, locale]);

  // Restarts chatwoot on druralUser change
  useEffect(() => {
    if (CHATWOOT_URI) {
      endChatwoot(websiteToken, onChatwootReady, onChatwootStop);
      startChatwoot(CHATWOOT_URI, websiteToken, onChatwootReady);
    }
  }, [CHATWOOT_URI, druralUser]);

  // Sets chatwootUser on druralUser && isChatwootReady change
  useEffect(() => {
    if (isChatwootReady) {
      if (druralUser) {
        setChatwootUser(hmacToken, druralUser, notify, intl);
      } else {
        setChatwootAnonymousUser(
          websiteToken,
          hmacToken,
          anonymousConversations,
          setAnonymousConversations,
          notify,
          intl
        );
      }
    }
  }, [isChatwootReady, druralUser]);

  return null;
};
