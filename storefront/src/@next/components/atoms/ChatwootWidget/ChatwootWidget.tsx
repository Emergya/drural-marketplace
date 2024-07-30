import { useAuth } from "@drural/sdk";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useIntl } from "react-intl";

import { useLocalStorage } from "@hooks";
import { chatwootCookies, chatwootUri } from "@temp/constants";

import { ChatwootAnonymousUser, IProps } from "./types";
import {
  endChatwoot,
  setChatwootAnonymousUser,
  setChatwootLocale,
  setChatwootUser,
  startChatwoot,
} from "./utils";

export const ChatwootWidget: React.FC<IProps> = ({
  hmacTocken,
  websiteToken,
}) => {
  const alert = useAlert();
  const intl = useIntl();
  const { locale } = useRouter();
  const { user: druralUser } = useAuth();

  const [isChatwootReady, setChatwootReady] = useState<boolean>(false);
  const {
    storedValue: anonymousConversations = [],
    setValue: setAnonymousConversations,
  } = useLocalStorage<ChatwootAnonymousUser[]>(
    chatwootCookies.cw_anonymous_conversation,
    []
  );

  const onChatwootReady = () => setChatwootReady(true);
  const onChatwootStop = () => setChatwootReady(false);

  // Starts chatwoot
  useEffect(() => {
    if (chatwootUri) {
      startChatwoot(chatwootUri, websiteToken, onChatwootReady);
    }

    return () => {
      endChatwoot(websiteToken, onChatwootReady, onChatwootStop);
    };
  }, [chatwootUri, websiteToken, hmacTocken]);

  // Sets chatwoot locale
  useEffect(() => {
    if (isChatwootReady && locale) {
      setChatwootLocale(locale);
    }
  }, [isChatwootReady, locale]);

  // Restarts chatwoot on druralUser change
  useEffect(() => {
    if (chatwootUri) {
      endChatwoot(websiteToken, onChatwootReady, onChatwootStop);
      startChatwoot(chatwootUri, websiteToken, onChatwootReady);
    }
  }, [chatwootUri, druralUser]);

  // Sets chatwootUser on druralUser && isChatwootReady change
  useEffect(() => {
    if (isChatwootReady) {
      if (druralUser) {
        setChatwootUser(hmacTocken, druralUser, alert, intl);
      } else {
        setChatwootAnonymousUser(
          websiteToken,
          hmacTocken,
          anonymousConversations,
          setAnonymousConversations,
          alert,
          intl
        );
      }
    }
  }, [isChatwootReady, druralUser]);

  return null;
};
