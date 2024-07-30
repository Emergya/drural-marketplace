import { removeBusinessFromLocalStorage } from "@saleor/components/BusinessProvider/utils";
import { DEMO_MODE } from "@saleor/config";
import { User } from "@saleor/fragments/types/User";
import { SetLocalStorage } from "@saleor/hooks/useLocalStorage";
import { getMutationStatus } from "@saleor/misc";
import { isTokenExpired } from "@saleor/services/apollo/links/auth/refreshTokenLink/utils";
import errorTracker from "@saleor/services/errorTracking";
import {
  isSupported as isCredentialsManagementAPISupported,
  login as loginWithCredentialsManagementAPI,
  saveCredentials
} from "@saleor/utils/credentialsManagement";
import { useEffect, useRef, useState } from "react";
import { useApolloClient, useMutation, useQuery } from "react-apollo";

import {
  tokenAuthMutation,
  tokenRefreshMutation,
  tokenVerifyMutation
} from "../mutations";
import { userQuery } from "../queries";
import { RefreshToken, RefreshTokenVariables } from "../types/RefreshToken";
import {
  TokenAuth,
  TokenAuth_tokenCreate,
  TokenAuthVariables
} from "../types/TokenAuth";
import {
  User as UserQueryTypes,
  UserVariables as UserVariablesQueryTypes
} from "../types/User";
import { VerifyToken, VerifyTokenVariables } from "../types/VerifyToken";
import {
  displayDemoMessage,
  getTokens,
  persistToken,
  removeTokens,
  resetClientStore,
  setAuthToken,
  setTokens
} from "../utils";
import { UseAuthProvider, UseAuthProviderOpts } from "./useAuthProvider";

export interface UseSaleorAuthProvider extends UseAuthProvider {
  login: (username: string, password: string) => Promise<TokenAuth_tokenCreate>;
  loginByToken: (auth: string, csrf: string, user: User) => void;
  refetchUser: () => void;
}
export interface UseSaleorAuthProviderOpts extends UseAuthProviderOpts {
  setAuthPlugin: SetLocalStorage<any>;
  authPlugin: string;
}

export function useSaleorAuthProvider({
  apolloClient,
  authPlugin,
  intl,
  tokenRefreshLinkError,
  cleanTokenRefreshLinkError,
  notify,
  setAuthPlugin
}: UseSaleorAuthProviderOpts): UseSaleorAuthProvider {
  const client = useApolloClient();

  const [userContext, setUserContext] = useState<undefined | User>(undefined);
  const autologinPromise = useRef<Promise<any>>();
  const refreshPromise = useRef<Promise<boolean>>();

  // Authenticates for every page reload via tokenVerify
  useEffect(() => {
    const token = getTokens().auth;

    if (!authPlugin && !!token && !userContext) {
      if (isTokenExpired(token)) {
        autologinPromise.current = refreshToken();
      } else {
        autologinPromise.current = tokenVerify({ variables: { token } });
      }
    } else if (!authPlugin) {
      autologinPromise.current = loginWithCredentialsManagementAPI(login);
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
    if (!authPlugin && userContext) {
      const { id, email, firstName, lastName } = userContext;
      errorTracker.setUserData({
        email,
        id,
        username: `${firstName} ${lastName}`
      });
    }
  }, [userContext]);

  const logout = () => {
    // Reset user context
    setUserContext(undefined);
    if (isCredentialsManagementAPISupported) {
      navigator.credentials.preventSilentAccess();
    }
    // Reset local storage
    removeTokens();
    removeBusinessFromLocalStorage();
    // Reset apollo store
    resetClientStore(client);
  };

  const { refetch: refetchUserQuery } = useQuery<
    UserQueryTypes,
    UserVariablesQueryTypes
  >(userQuery, {
    variables: {
      id: userContext?.id
    },
    skip: !userContext?.id
  });

  const [tokenAuth, tokenAuthResult] = useMutation<
    TokenAuth,
    TokenAuthVariables
  >(tokenAuthMutation, {
    client: apolloClient,
    onCompleted: ({ tokenCreate }) => {
      if (tokenCreate.errors.length > 0) {
        logout();
      }

      const user = tokenCreate.user;

      setUserContext(user);
      if (user) {
        setTokens(tokenCreate.token, tokenCreate.csrfToken, persistToken);
      }
    },
    onError: logout
  });
  const [tokenRefresh, tokenRefreshResult] = useMutation<
    RefreshToken,
    RefreshTokenVariables
  >(tokenRefreshMutation, {
    client: apolloClient,
    onError: logout
  });
  const [tokenVerify, tokenVerifyResult] = useMutation<
    VerifyToken,
    VerifyTokenVariables
  >(tokenVerifyMutation, {
    client: apolloClient,
    onCompleted: result => {
      if (result.tokenVerify === null) {
        logout();
      } else {
        const user = result.tokenVerify?.user;

        if (!!user) {
          setUserContext(user);
        }
      }
    },
    onError: logout
  });

  const tokenAuthOpts = {
    ...tokenAuthResult,
    status: getMutationStatus(tokenAuthResult)
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

  const login = async (email: string, password: string) => {
    setAuthPlugin(undefined);
    const result = await tokenAuth({ variables: { email, password } });

    if (result && !result.data?.tokenCreate.errors.length) {
      if (!!onLogin) {
        onLogin();
      }
      saveCredentials(result.data.tokenCreate.user, password);
    }

    return result?.data?.tokenCreate;
  };

  const loginByToken = (auth: string, refresh: string, user: User) => {
    setAuthPlugin(undefined);
    setUserContext(user);
    setTokens(auth, refresh, persistToken);
  };

  const refreshToken = (): Promise<boolean> => {
    if (!!refreshPromise.current) {
      return refreshPromise.current;
    }

    return new Promise(resolve => {
      const token = getTokens().refresh;

      return tokenRefresh({ variables: { token } }).then(refreshData => {
        const { tokenRefresh } = refreshData?.data || {};
        const { errors, token, user } = tokenRefresh || {};

        if (errors.length || !token) {
          logout();
        }

        if (!!token) {
          setAuthToken(token, persistToken);
          if (!!user) {
            setUserContext(user);
          }
          return resolve(true);
        }

        return resolve(false);
      });
    });
  };

  const refetchUser = async () => {
    try {
      const userData = await refetchUserQuery();
      const user = userData.data?.user;

      if (user) {
        setUserContext(user);
      } else {
        throw new Error("Unable to refetch user. Not user found");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return {
    autologinPromise,
    login,
    loginByToken,
    logout,
    refetchUser,
    tokenAuthLoading: tokenAuthOpts.loading,
    tokenRefresh: refreshToken,
    tokenRefreshLoading: tokenRefreshOpts.loading,
    tokenVerifyLoading: tokenVerifyOpts.loading,
    user: userContext
  };
}
