import { IMessageContext } from "@saleor/components/messages";
import { User } from "@saleor/fragments/types/User";
import useLocalStorage from "@saleor/hooks/useLocalStorage";
import ApolloClient from "apollo-client";
import { MutableRefObject } from "react";
import { IntlShape } from "react-intl";

import { UserContext } from "..";
import { useExternalAuthProvider } from "./useExternalAuthProvider";
import { useSaleorAuthProvider } from "./useSaleorAuthProvider";

export interface UseAuthProvider {
  logout: () => void;
  tokenAuthLoading: boolean;
  tokenRefresh: () => Promise<boolean>;
  tokenRefreshLoading: boolean;
  tokenVerifyLoading: boolean;
  user?: User;
  autologinPromise?: MutableRefObject<Promise<any>>;
}
export interface UseAuthProviderOpts {
  intl: IntlShape;
  apolloClient: ApolloClient<any>;
  tokenRefreshLinkError: boolean;
  cleanTokenRefreshLinkError: () => void;
  notify: IMessageContext;
}

export function useAuthProvider(opts: UseAuthProviderOpts): UserContext {
  const [authPlugin, setAuthPlugin] = useLocalStorage("authPlugin", undefined);

  const saleorAuth = useSaleorAuthProvider({
    authPlugin,
    setAuthPlugin,
    ...opts
  });

  const externalAuth = useExternalAuthProvider({
    authPlugin,
    setAuthPlugin,
    ...opts
  });

  const loginAuth = {
    login: saleorAuth.login,
    loginByExternalPlugin: externalAuth.loginByExternalPlugin,
    loginByToken: saleorAuth.loginByToken,
    requestLoginByExternalPlugin: externalAuth.requestLoginByExternalPlugin
  };

  const refetchUser = saleorAuth.refetchUser;

  if (authPlugin) {
    return {
      ...externalAuth,
      ...loginAuth,
      refetchUser
    };
  }

  return {
    ...saleorAuth,
    ...loginAuth
  };
}
