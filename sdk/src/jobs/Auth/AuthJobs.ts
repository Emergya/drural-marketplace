import { DataErrorCheckoutTypes } from "../../api/Checkout/types";
import { ApolloClientManager } from "../../data/ApolloClientManager";
import { LocalStorageHandler } from "../../helpers/LocalStorageHandler";
import { DataErrorAuthTypes } from "../../api/Auth/types";

import { JobRunResponse } from "../types";
import { JobsHandler } from "../JobsHandler";

export enum AuthJobsEvents {
  SIGN_IN_TOKEN_REFRESHING,
}
export interface AuthJobsEventsValues {
  [AuthJobsEvents.SIGN_IN_TOKEN_REFRESHING]: boolean;
}

export type PromiseAuthJobRunResponse = Promise<
  JobRunResponse<DataErrorAuthTypes | DataErrorCheckoutTypes>
>;

export class AuthJobs extends JobsHandler<AuthJobsEventsValues> {
  private apolloClientManager: ApolloClientManager;

  private localStorageHandler: LocalStorageHandler;

  constructor(
    localStorageHandler: LocalStorageHandler,
    apolloClientManager: ApolloClientManager
  ) {
    super();
    this.apolloClientManager = apolloClientManager;
    this.localStorageHandler = localStorageHandler;
  }

  provideUser = async (): PromiseAuthJobRunResponse => {
    const { data, error } = await this.apolloClientManager.getUser();

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorAuthTypes.GET_USER,
        },
      };
    }

    return {
      data,
    };
  };

  registerAccount = async ({
    email,
    password,
    redirectUrl,
  }: {
    email: string;
    password: string;
    redirectUrl: string;
  }): PromiseAuthJobRunResponse => {
    const { data, error } = await this.apolloClientManager.registerAccount(
      email,
      password,
      redirectUrl
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorAuthTypes.REGISTER_ACCOUNT,
        },
      };
    }

    return {
      data,
    };
  };

  resetPasswordRequest = async ({
    email,
    redirectUrl,
  }: {
    email: string;
    redirectUrl: string;
  }): PromiseAuthJobRunResponse => {
    const { error } = await this.apolloClientManager.resetPasswordRequest(
      email,
      redirectUrl
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorAuthTypes.RESET_PASSWORD_REQUEST,
        },
      };
    }

    return {};
  };

  signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): PromiseAuthJobRunResponse => {
    const { data, error } = await this.apolloClientManager.signIn(
      email,
      password
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorAuthTypes.SIGN_IN,
        },
      };
    }

    this.localStorageHandler.setSignInToken(data?.token || null);
    this.localStorageHandler.setCsrfToken(data?.csrfToken || null);

    return {
      data,
    };
  };

  signOut = async (): PromiseAuthJobRunResponse => {
    // 1. Get persistance storage data
    const cwAnonymousConversation = LocalStorageHandler.getCwAnonymousConversation();
    const cookiePreferences = LocalStorageHandler.getCookiePreferences();

    // 2. Logout
    this.localStorageHandler.clear();

    // 3. Set persistance data to locale storage
    this.localStorageHandler.setCwAnonymousConversation(
      cwAnonymousConversation
    );
    this.localStorageHandler.setCookiePreferences(cookiePreferences);

    await this.apolloClientManager.signOut();

    return {};
  };

  verifySignInToken = async () => {
    const token = LocalStorageHandler.getSignInToken();

    if (!token) {
      return {
        dataError: {
          error: new Error(
            "Verify sign in token impossible. No token to verify received."
          ),
          type: DataErrorAuthTypes.VERIFY_TOKEN,
        },
      };
    }

    const { data, error } = await this.apolloClientManager.verifySignInToken({
      token,
    });

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorAuthTypes.VERIFY_TOKEN,
        },
      };
    }

    return {
      data,
    };
  };

  refreshSignInToken = async ({
    refreshToken,
  }: {
    refreshToken?: string;
  }): PromiseAuthJobRunResponse => {
    this.notifyEvent(AuthJobsEvents.SIGN_IN_TOKEN_REFRESHING, true);

    const csrfToken = LocalStorageHandler.getCsrfToken();

    if (!csrfToken && !refreshToken) {
      return {
        dataError: {
          error: new Error(
            "Refresh sign in token impossible. No refresh token received."
          ),
          type: DataErrorAuthTypes.REFRESH_TOKEN,
        },
      };
    }

    const { data, error } = await this.apolloClientManager.refreshSignInToken({
      csrfToken,
      refreshToken,
    });

    if (error) {
      this.notifyEvent(AuthJobsEvents.SIGN_IN_TOKEN_REFRESHING, false);

      return {
        dataError: {
          error,
          type: DataErrorAuthTypes.REFRESH_TOKEN,
        },
      };
    }

    this.localStorageHandler.setSignInToken(data?.token || null);

    this.notifyEvent(AuthJobsEvents.SIGN_IN_TOKEN_REFRESHING, false);

    return {
      data,
    };
  };
}
