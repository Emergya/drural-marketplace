import { UserContext } from "@saleor/auth";
import { User } from "@saleor/fragments/types/User";
import React from "react";

export const UserDecorator = (user: User) => storyFn => (
  <UserContext.Provider
    value={{
      login: undefined,
      loginByExternalPlugin: undefined,
      loginByToken: undefined,
      logout: undefined,
      requestLoginByExternalPlugin: undefined,
      tokenAuthLoading: false,
      tokenRefresh: undefined,
      tokenRefreshLoading: false,
      tokenVerifyLoading: false,
      user,
      refetchUser: () => null
    }}
  >
    {storyFn()}
  </UserContext.Provider>
);
export default UserDecorator;
