import { commonMessages } from "@saleor/intl";
import { IntlShape } from "react-intl";

import { UserType } from "./_types/UserType";

export const getUserTypeMessage = (
  intl: IntlShape,
  userType: UserType,
  plural?: boolean
) => {
  switch (userType) {
    case UserType.AGENT:
      if (plural) {
        return intl.formatMessage(commonMessages.agents);
      }
      return intl.formatMessage(commonMessages.agent);
    case UserType.CUSTOMER:
      if (plural) {
        return intl.formatMessage(commonMessages.customersName);
      }
      return intl.formatMessage(commonMessages.customer);
    default:
      return;
  }
};
