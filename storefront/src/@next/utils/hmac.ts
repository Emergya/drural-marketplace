import { createHmac } from "crypto";
import { AlertManager } from "react-alert";
import { defineMessages, IntlShape } from "react-intl";

const messages = defineMessages({
  hmacError: {
    defaultMessage: "Unabled to generate hmac token",
  },
});

const hmacAlgorithm = "sha256";
const hmacEncoding = "hex";

export const generateHmac = (
  key: string,
  message: string,
  alert: AlertManager,
  intl: IntlShape
) => {
  try {
    return createHmac(hmacAlgorithm, key).update(message).digest(hmacEncoding);
  } catch {
    alert.show(
      {
        content: intl.formatMessage(messages.hmacError),
        title: "Error",
      },
      { type: "error", timeout: 5000 }
    );
  }
};
