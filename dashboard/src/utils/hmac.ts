import { IMessageContext } from "@saleor/components/messages";
import { createHmac } from "crypto";
import { defineMessages, IntlShape } from "react-intl";

const messages = defineMessages({
  hmacError: {
    defaultMessage: "Unabled to generate hmac token"
  }
});

const hmacAlgorithm = "sha256";
const hmacEncoding = "hex";

export const generateHmac = (
  key: string,
  message: string,
  notify: IMessageContext,
  intl: IntlShape
) => {
  try {
    return createHmac(hmacAlgorithm, key)
      .update(message)
      .digest(hmacEncoding);
  } catch {
    notify({
      status: "error",
      text: intl.formatMessage(messages.hmacError)
    });
  }
};
