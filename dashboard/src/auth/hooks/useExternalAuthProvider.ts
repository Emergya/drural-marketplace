import { removeBusinessFromLocalStorage } from "@saleor/components/BusinessProvider/utils";
import { DEMO_MODE } from "@saleor/config";
import { User } from "@saleor/fragments/types/User";
import { SetLocalStorage } from "@saleor/hooks/useLocalStorage";
/* import { commonMessages } from "@saleor/intl"; */
import { getMutationStatus } from "@saleor/misc";
import { isTokenExpired } from "@saleor/services/apollo/links/auth/refreshTokenLink/utils";
import errorTracker from "@saleor/services/errorTracking";
import { useEffect, useRef, useState } from "react";
import { useApolloClient, useMutation } from "react-apollo";

import {
  externalAuthenticationUrlMutation,
  externalObtainAccessTokensMutation,
  externalTokenRefreshMutation,
  externalTokenVerifyMutation
} from "../mutations";
import {
  ExternalAuthenticationUrl,
  ExternalAuthenticationUrlVariables
} from "../types/ExternalAuthenticationUrl";
import {
  ExternalObtainAccessTokens,
  ExternalObtainAccessTokens_externalObtainAccessTokens,
  ExternalObtainAccessTokensVariables
} from "../types/ExternalObtainAccessTokens";
import {
  ExternalRefreshToken,
  ExternalRefreshTokenVariables
} from "../types/ExternalRefreshToken";
import {
  ExternalVerifyToken,
  ExternalVerifyTokenVariables
} from "../types/ExternalVerifyToken";
import {
  displayDemoMessage,
  getTokens,
  removeTokens,
  resetClientStore,
  setAuthToken,
  setTokens
} from "../utils";
import { UseAuthProvider, UseAuthProviderOpts } from "./useAuthProvider";

export interface RequestExternalLoginInput {
  redirectUri: string;
}
export interface ExternalLoginInput {
  code: string;
  state: string;
}

export interface UseExternalAuthProvider extends UseAuthProvider {
  requestLoginByExternalPlugin: (
    pluginId: string,
    input: RequestExternalLoginInput
  ) => Promise<void>;
  loginByExternalPlugin: (
    input: ExternalLoginInput
  ) => Promise<ExternalObtainAccessTokens_externalObtainAccessTokens>;
}
export interface UseExternalAuthProviderOpts extends UseAuthProviderOpts {
  setAuthPlugin: SetLocalStorage<any>;
  authPlugin: string;
}

const persistToken = false;

export function useExternalAuthProvider({
  apolloClient,
  authPlugin,
  intl,
  tokenRefreshLinkError,
  cleanTokenRefreshLinkError,
  notify,
  setAuthPlugin
}: UseExternalAuthProviderOpts): UseExternalAuthProvider {
  const client = useApolloClient();

  const [userContext, setUserContext] = useState<undefined | User>(undefined);
  const autologinPromise = useRef<Promise<any>>();
  const refreshPromise = useRef<Promise<boolean>>();

  // Authenticates for every page reload via tokenVerify
  useEffect(() => {
    const token = getTokens().auth;

    if (authPlugin && !!token && !userContext) {
      const input = JSON.stringify({
        token
      });

      if (isTokenExpired(token)) {
        autologinPromise.current = refreshToken();
      } else {
        autologinPromise.current = tokenVerify({
          variables: { input, pluginId: authPlugin }
        });
      }
    }
  }, []);

  // Logs user out on refresh token link error
  useEffect(() => {
    if (tokenRefreshLinkError) {
      logout();
      cleanTokenRefreshLinkError();
    }
  }, [tokenRefreshLinkError]);

  // Save user data to the error traker
  useEffect(() => {
    if (authPlugin && userContext) {
      const { id, email, firstName, lastName } = userContext;
      errorTracker.setUserData({
        email,
        id,
        username: `${firstName} ${lastName}`
      });
    }
  }, [userContext]);

  const logout = () => {
    setUserContext(undefined);
    setAuthPlugin(undefined);
    removeTokens();
    removeBusinessFromLocalStorage();
    resetClientStore(client);
  };

  const [externalAuthenticationUrl] = useMutation<
    ExternalAuthenticationUrl,
    ExternalAuthenticationUrlVariables
  >(externalAuthenticationUrlMutation, {
    client: apolloClient,
    onError: logout
  });
  const [obtainAccessTokens, obtainAccessTokensResult] = useMutation<
    ExternalObtainAccessTokens,
    ExternalObtainAccessTokensVariables
  >(externalObtainAccessTokensMutation, {
    client: apolloClient,
    onCompleted: ({ externalObtainAccessTokens }) => {
      if (externalObtainAccessTokens.errors.length > 0) {
        logout();
      }

      const user = externalObtainAccessTokens.user;

      setUserContext(user);
      if (user) {
        setTokens(
          externalObtainAccessTokens.token,
          externalObtainAccessTokens.csrfToken,
          persistToken
        );
      }
    },
    onError: logout
  });
  const [tokenRefresh, tokenRefreshResult] = useMutation<
    ExternalRefreshToken,
    ExternalRefreshTokenVariables
  >(externalTokenRefreshMutation, {
    client: apolloClient,
    onError: logout
  });
  const [tokenVerify, tokenVerifyResult] = useMutation<
    ExternalVerifyToken,
    ExternalVerifyTokenVariables
  >(externalTokenVerifyMutation, {
    client: apolloClient,
    onCompleted: result => {
      if (result.externalVerify === null) {
        logout();
      } else {
        const user = result.externalVerify?.user;

        if (!!user) {
          setUserContext(user);
        }
      }
    },
    onError: logout
  });

  const obtainAccessTokensOpts = {
    ...obtainAccessTokensResult,
    status: getMutationStatus(obtainAccessTokensResult)
  };
  const tokenVerifyOpts = {
    ...tokenVerifyResult,
    status: getMutationStatus(tokenVerifyResult)
  };
  const tokenRefreshOpts = {
    ...tokenRefreshResult,
    status: getMutationStatus(tokenRefreshResult)
  };

  const onLogin = () => {
    if (DEMO_MODE) {
      displayDemoMessage(intl, notify);
    }
  };

  const requestLoginByExternalPlugin = async (
    pluginId: string,
    pluginInput: RequestExternalLoginInput
  ) => {
    const input = JSON.stringify(pluginInput);
    const result = await externalAuthenticationUrl({
      variables: {
        input,
        pluginId
      }
    });

    if (result && !result.data.externalAuthenticationUrl.errors.length) {
      setAuthPlugin(pluginId);

      const authenticationData = JSON.parse(
        result.data.externalAuthenticationUrl.authenticationData
      );

      location.href = authenticationData.authorizationUrl;
    } else {
      setAuthPlugin(undefined);
    }
  };

  const loginByExternalPlugin = async (loginInput: ExternalLoginInput) => {
    const input = JSON.stringify(loginInput);
    const result = await obtainAccessTokens({
      variables: { input, pluginId: authPlugin }
    });

    if (result && !result.data?.externalObtainAccessTokens?.errors?.length) {
      if (!!onLogin) {
        onLogin();
      }
    } else {
      setAuthPlugin(undefined);
    }

    return result?.data?.externalObtainAccessTokens;
  };

  const refreshToken = (): Promise<boolean> => {
    if (!!refreshPromise.current) {
      return refreshPromise.current;
    }

    return new Promise(resolve => {
      const token = getTokens().refresh;
      const input = JSON.stringify({
        refreshToken: token
      });

      return tokenRefresh({ variables: { input, pluginId: authPlugin } }).then(
        refreshData => {
          const { externalRefresh } = refreshData?.data || {};
          const { token } = externalRefresh || {};

          if (!token) {
            logout();
          }

          if (!!token) {
            setAuthToken(token, persistToken);
            return resolve(true);
          }

          return resolve(false);
        }
      );
    });
  };

  return {
    autologinPromise,
    loginByExternalPlugin,
    logout,
    requestLoginByExternalPlugin,
    tokenAuthLoading: obtainAccessTokensOpts.loading,
    tokenRefresh: refreshToken,
    tokenRefreshLoading: tokenRefreshOpts.loading,
    tokenVerifyLoading: tokenVerifyOpts.loading,
    user: userContext
  };
}
