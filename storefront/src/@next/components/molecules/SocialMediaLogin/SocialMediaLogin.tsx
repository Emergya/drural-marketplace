/** **ToDo: At the momento only 2 Login Buttons for SocialMedia without function** */
import { UilFacebook, UilGoogle } from "@iconscout/react-unicons";
import React from "react";
import { useMutation } from "react-apollo";
import { authenticateSocialMediaUser, socialMediaAccountRegister } from "./queries";

import { Button } from "@components/atoms";

import * as S from "./styles";
"use client";
import { useGoogleLogin } from '@react-oauth/google';
//import { useLocalStorage } from "@hooks"
import { useAuth } from "@drural/sdk";


export const SocialMediaLogin: React.FC = () => {
  const { signInOpenId } = useAuth();
  const [checkSocialMediaUser] = useMutation(authenticateSocialMediaUser);
  const [registerSocialMediaUser] = useMutation(socialMediaAccountRegister);

  // const { storedValue: token, setValue: setToken } = useLocalStorage<
  //         string | undefined
  //       >("token", undefined);

  // const { storedValue: csrf_token, setValue: setCsrfToken } = useLocalStorage<
  //         string | undefined
  //        >("csrf_token", undefined);

  const googleLogin =  useGoogleLogin({
    onSuccess: async (tokenResponse )=> {
      //console.log(tokenResponse);
      // Extract the access_token
      const accessToken = tokenResponse.access_token;
      
      // Make a request to the Google Userinfo Api with the access_token
      try {        
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`);
        const userInfo = await response.json();
        console.log('User Info:', userInfo);
        let { data } = await checkSocialMediaUser({
          variables: {openId:userInfo.id}
        });

        if (!data.authenticateSocialMediaUser.user){
          const { data: registerData} = await registerSocialMediaUser({
            variables:{
              firstName: userInfo.given_name,
              lastName: userInfo.family_name,
              email: userInfo.email,
              openId: userInfo.id
            }
          });

          ({ data } = await checkSocialMediaUser({
            variables: {openId:userInfo.id}
          }));

          console.log("googleUser", registerData.socialMediaAccountRegister.user)
        }
      
        // const { token, csrfToken, refreshToken, user } = data.authenticateSocialMediaUser;

        // console.log("token:", token);
        // console.log("csrfToken:", csrfToken);
        // console.log("refreshToken:", refreshToken);
        // console.log("user:", user);

        
        // setToken(token);
        // setCsrfToken(csrfToken);  
        // //refreshUserData();
        // await refreshUserData();

       
      } catch (error) {
        console.error('Error fetching user info or procesing mutation:', error);
      }
    },
    scope: 'openid profile email', // Request the OpenID Connect scope
  });
  
  return (
    <S.Wrapper>
      <Button testingContext="facebook-login" color="secondary" fullWidth>
        <UilFacebook />
        Log In with Facebook
      </Button> 

      <Button testingContext="google-login" color="secondary" fullWidth onClick={() => googleLogin()}> 
        <UilGoogle />
        Log In with Google
      </Button> 
      
      <p className="extraSmallText">
        By clicking on the Log In with Facebook or Google buttons,
        you agree to accept the Privacy Policy and conditions of this website.
      </p>
    </S.Wrapper>
  );
};
