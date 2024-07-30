import { IFilter } from "@saleor/components/Filter";
import { FilterOpts, MinMax } from "@saleor/types";
import { createDateField } from "@saleor/utils/filters/fields";
import { defineMessages, IntlShape } from "react-intl";

export enum UserFilterKeys {
  joined = "joined"
}

export interface UserListFilterOpts {
  joined: FilterOpts<MinMax>;
}

const messages = defineMessages({
  joinDate: {
    defaultMessage: "Join Date",
    description: "user"
  }
});

export function createFilterStructure(
  intl: IntlShape,
  opts: UserListFilterOpts
): IFilter<UserFilterKeys> {
  return [
    {
      ...createDateField(
        UserFilterKeys.joined,
        intl.formatMessage(messages.joinDate),
        opts.joined.value
      ),
      active: opts.joined.active
    }
  ];
}
