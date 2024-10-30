import { useAuth } from "@drural/sdk";
import { UilFacebook, UilGoogle } from "@iconscout/react-unicons";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/router";
import React from "react";
import { useAlert } from "react-alert";
import { useMutation } from "react-apollo";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useIntl } from "react-intl";

import { Button } from "@components/atoms";
import { paths } from "@paths";
import { FACEBOOK_APP_ID, Google_OAUTH_ClientId } from "@temp/constants";

import { socialMediaAccountRegister } from "./queries";
import * as S from "./styles";

"use client";

interface userInfo {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export const SocialMediaLogin: React.FC<{ hide: () => void }> = ({ hide }) => {
  const { signInOpenId } = useAuth();
  const alert = useAlert();
  const intl = useIntl();
  const [registerSocialMediaUser] = useMutation(socialMediaAccountRegister);
  const { push } = useRouter();

  const logIn = async (userInfo: userInfo) => {
    let { data: user } = await signInOpenId(userInfo.id);

    if (!user) {
      await registerSocialMediaUser({
        variables: {
          firstName: userInfo.first_name,
          lastName: userInfo.last_name,
          email: userInfo.email,
          openId: userInfo.id,
        },
      });

      ({ data: user } = await signInOpenId(userInfo.id));
    }

    if (!user?.isOnboard) {
      push(paths.onboarding);
    }

    hide();
  };

  const googleLogin = Google_OAUTH_ClientId
    ? useGoogleLogin({
        onSuccess: async (tokenResponse: any) => {
          // Extract the access_token
          const accessToken = tokenResponse.access_token;

          // Make a request to the Google Userinfo Api with the access_token
          try {
            const response = await fetch(
              `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`
            );
            const googleUserInfo = await response.json();

            logIn({
              id: googleUserInfo.id,
              first_name: googleUserInfo.given_name,
              last_name: googleUserInfo.family_name,
              email: googleUserInfo.email,
            });
          } catch (error) {
            alert.show(
              {
                content: intl.formatMessage({
                  defaultMessage: "Authentication or registration failed",
                }),
                title: "Error",
              },
              { type: "error", timeout: 5000 }
            );
          }
        },
        scope: "openid profile email", // Request the OpenID Connect scope
      })
    : null;

  const responseFacebook = async (response: any) => {
    // Extract the access_token
    const { accessToken } = response;

    // Make a request to the Facebook API to obtain user information
    try {
      const userInfoResponse = await fetch(
        `https://graph.facebook.com/me?access_token=${accessToken}&fields=id,last_name,first_name,email`
      );
      const facebookUserInfo = await userInfoResponse.json();

      logIn({
        id: facebookUserInfo.id,
        first_name: facebookUserInfo.first_name,
        last_name: facebookUserInfo.last_name,
        email: facebookUserInfo.email,
      });
    } catch (error) {
      alert.show(
        {
          content: intl.formatMessage({
            defaultMessage: "Authentication or registration failed",
          }),
          title: "Error",
        },
        { type: "error", timeout: 5000 }
      );
    }
  };

  return (
    <S.Wrapper>
      {FACEBOOK_APP_ID && (
        <FacebookLogin
          appId={FACEBOOK_APP_ID}
          autoLoad={false}
          callback={responseFacebook}
          render={renderProps => (
            <Button
              testingContext="facebook-login"
              color="secondary"
              fullWidth
              onClick={renderProps.onClick}
            >
              <UilFacebook />
              Log In with Facebook
            </Button>
          )}
        />
      )}

      {Google_OAUTH_ClientId && googleLogin && (
        <Button
          testingContext="google-login"
          color="secondary"
          fullWidth
          onClick={() => googleLogin()}
        >
          <UilGoogle />
          Log In with Google
        </Button>
      )}

      <p className="extraSmallText">
        By clicking on the Log In with Facebook or Google buttons, you agree to
        accept the Privacy Policy and conditions of this website.
      </p>
    </S.Wrapper>
  );
};
