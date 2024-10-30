import { UilFacebook, UilGoogle } from "@iconscout/react-unicons";
import React from "react";
import { useMutation } from "react-apollo";
import { socialMediaAccountRegister } from "./queries";
import { useRouter } from "next/router";
import { paths } from "@paths";
import { Button } from "@components/atoms";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import * as S from "./styles";
"use client";
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from "@drural/sdk";
import { Google_OAUTH_ClientId, FACEBOOK_APP_ID } from "@temp/constants";


interface userInfo {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export const SocialMediaLogin: React.FC <{ hide: () => void }> = ({ hide }) => {
  const { signInOpenId } = useAuth();
  const [ registerSocialMediaUser ] = useMutation(socialMediaAccountRegister);
  const { push } = useRouter();
  
  const logIn = async (userInfo: userInfo) => {
    let {data: user} = await signInOpenId(userInfo.id);
    
    if (!user){
      await registerSocialMediaUser({
        variables:{
          firstName: userInfo.first_name,
          lastName: userInfo.last_name,
          email: userInfo.email,
          openId: userInfo.id
        }
      });

      ({data: user} = await signInOpenId(userInfo.id));
    }
    
    if (!user?.isOnboard) {
      push(paths.onboarding);
    }

    hide();
  };

  const googleLogin = Google_OAUTH_ClientId
    ? useGoogleLogin({
    onSuccess: async (tokenResponse )=> {
      // Extract the access_token
      const accessToken = tokenResponse.access_token;
      
      // Make a request to the Google Userinfo Api with the access_token
      try {        
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`);
        const googleUserInfo = await response.json();
        
        logIn({
          id: googleUserInfo.id,
          first_name: googleUserInfo.given_name,
          last_name: googleUserInfo.family_name,
          email: googleUserInfo.email
        });
        
      } catch (error) {
        console.error('Error fetching user info or procesing mutation:', error);
      }
    },
    scope: 'openid profile email', // Request the OpenID Connect scope
  })
  : null;

  const responseFacebook = async (response: any) => {
    
    // Extract the access_token
    const accessToken = response.accessToken;
  
    // Make a request to the Facebook API to obtain user information
    try {
    const userInfoResponse = await fetch(`https://graph.facebook.com/me?access_token=${accessToken}&fields=id,last_name,first_name,email`);
    const facebookUserInfo = await userInfoResponse.json();
    
     logIn({
      id: facebookUserInfo.id,
      first_name: facebookUserInfo.first_name,
      last_name: facebookUserInfo.last_name,
      email: facebookUserInfo.email
    }); 
    
    } catch (error) {
      console.error("Authentication or registration failed", error);
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
            <Button testingContext="facebook-login" color="secondary" fullWidth onClick={renderProps.onClick}>
              <UilFacebook />
              Log In with Facebook
            </Button>
          )}
        />
      )}

      {Google_OAUTH_ClientId && googleLogin && (
      <Button testingContext="google-login" color="secondary" fullWidth onClick={() => googleLogin()}> 
        <UilGoogle />
        Log In with Google
      </Button> 
      )}

      <p className="extraSmallText">
        By clicking on the Log In with Facebook or Google buttons,
        you agree to accept the Privacy Policy and conditions of this website.
      </p>
    </S.Wrapper>
  );
};
