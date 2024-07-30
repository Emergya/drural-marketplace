import { AccountErrorCode } from "@saleor/types/globalTypes";
import { UserType } from "@saleor/users/_types/UserType";
import { UserDetailsPageProps } from "@saleor/users/components/UserDetailsPage/types";
import { storiesOf } from "@storybook/react";
import React from "react";

import { customer as user } from "../../../customers/fixtures";
import UserDetailsPage from "../../../users/components/UserDetailsPage";
import Decorator from "../../Decorator";

const props: Omit<UserDetailsPageProps, "classes"> = {
  user,
  disabled: false,
  errors: [],
  onAddressManageClick: () => undefined,
  onBack: () => undefined,
  onDelete: () => undefined,
  onRowClick: () => undefined,
  onSubmit: () => undefined,
  onViewAllOrdersClick: () => undefined,
  saveButtonBar: "default",
  type: UserType.CUSTOMER
};

interface UserDetailsPageErrors {
  firstName: string;
  email: string;
  lastName: string;
  note: string;
}

storiesOf("Views / Customers / Customer details", module)
  .addDecorator(Decorator)
  .add("default", () => <UserDetailsPage {...props} />)
  .add("loading", () => (
    <UserDetailsPage {...props} user={undefined} disabled={true} />
  ))
  .add("form errors", () => (
    <UserDetailsPage
      {...props}
      errors={(["email", "firstName", "lastName"] as Array<
        keyof UserDetailsPageErrors
      >).map(field => ({
        __typename: "AccountError",
        code: AccountErrorCode.INVALID,
        field,
        addressType: null
      }))}
    />
  ))
  .add("different addresses", () => (
    <UserDetailsPage
      {...props}
      user={{
        ...user,
        defaultBillingAddress: {
          ...user.defaultBillingAddress,
          id: "AvSduf72="
        }
      }}
    />
  ))
  .add("never logged", () => (
    <UserDetailsPage
      {...props}
      user={{
        ...user,
        lastLogin: null
      }}
    />
  ))
  .add("never placed order", () => (
    <UserDetailsPage
      {...props}
      user={{
        ...user,
        lastPlacedOrder: {
          ...user.lastPlacedOrder,
          edges: []
        }
      }}
    />
  ))
  .add("no default billing address", () => (
    <UserDetailsPage
      {...props}
      user={{
        ...user,
        defaultBillingAddress: null
      }}
    />
  ))
  .add("no default shipping address", () => (
    <UserDetailsPage
      {...props}
      user={{
        ...user,
        defaultShippingAddress: null
      }}
    />
  ))
  .add("no address at all", () => (
    <UserDetailsPage
      {...props}
      user={{
        ...user,
        defaultBillingAddress: null,
        defaultShippingAddress: null
      }}
    />
  ));
