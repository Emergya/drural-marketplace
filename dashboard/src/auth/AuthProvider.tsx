import useNotifier from "@saleor/hooks/useNotifier";
import React, { useContext } from "react";
import { useApolloClient } from "react-apollo";
import { useIntl } from "react-intl";

import { UserContext } from "./";
import { useAuthProvider } from "./hooks/useAuthProvider";
import { getTokens } from "./utils";

interface AuthProviderProps {
  tokenRefreshLinkError: boolean;
  children: React.ReactNode;
  cleanTokenRefreshLinkError: () => void;
}

const AuthProvider: React.FC<AuthProviderProps> = ({
  tokenRefreshLinkError,
  children,
  cleanTokenRefreshLinkError
}) => {
  const apolloClient = useApolloClient();
  const intl = useIntl();
  const notify = useNotifier();

  const authProvider = useAuthProvider({
    apolloClient,
    intl,
    tokenRefreshLinkError,
    cleanTokenRefreshLinkError,
    notify
  });

  return (
    <UserContext.Provider value={authProvider}>{children}</UserContext.Provider>
  );
};

export const useAuth = () => {
  const user = useContext(UserContext);
  const isAuthenticated = !!user.user;

  return {
    hasToken: !!getTokens(),
    isAuthenticated,
    tokenAuthLoading: user.tokenAuthLoading,
    tokenRefreshLoading: user.tokenRefreshLoading,
    tokenVerifyLoading: user.tokenVerifyLoading,
    user: user.user
  };
};

export default AuthProvider;
