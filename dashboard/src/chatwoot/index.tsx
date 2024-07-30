import { sectionNames } from "@saleor/intl";
import React from "react";
import { useIntl } from "react-intl";

import { WindowTitle } from "../components/WindowTitle";
import ChatwootConfiguration from "./views/ChatwootConfiguration";

export const ChatwootSection: React.FC = () => {
  const intl = useIntl();

  return (
    <>
      <WindowTitle title={intl.formatMessage(sectionNames.chatwoot)} />
      <ChatwootConfiguration />
    </>
  );
};

export default ChatwootSection;
