import { IntlShape } from "react-intl";

import { fixedSlugPages } from "@temp/constants";
import { commonMessages } from "@temp/intl";

import { IPolicyLink } from "../../types/IPolicyLink";

export const getPolicyLinks = (intl: IntlShape): IPolicyLink[] => [
  {
    name: intl.formatMessage(commonMessages.conditions),
    slug: fixedSlugPages.conditionsOfUse,
  },
  {
    name: intl.formatMessage(commonMessages.privacyNotice),
    slug: fixedSlugPages.privacyNotice,
  },
];
