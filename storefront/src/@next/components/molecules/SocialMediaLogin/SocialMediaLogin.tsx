/** **ToDo: At the momento only 2 Login Buttons for SocialMedia without function** */
import { UilFacebook, UilGoogle } from "@iconscout/react-unicons";
import React from "react";

import { Button } from "@components/atoms";

import * as S from "./styles";
"use client";
import { useGoogleLogin } from '@react-oauth/google';

export const SocialMediaLogin: React.FC = () => {
  const login =  useGoogleLogin({
    onSuccess: async (tokenResponse )=> {
      console.log(tokenResponse);
      // Extraer el access_token
      const accessToken = tokenResponse.access_token;
      
      // Realizar una solicitud a la API de Google Userinfo con el access_token
      try {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`);
        const userInfo = await response.json();

        // Mostrar la información del usuario
        console.log('User Info:', userInfo);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    },
    scope: 'openid profile email', // Solicitar el scope de OpenID Connect
  });
  
  return (
    <S.Wrapper>
      <Button testingContext="facebook-login" color="secondary" fullWidth>
        <UilFacebook />
        Register with Facebook
      </Button> 

      <Button testingContext="google-login" color="secondary" fullWidth onClick={() => login()}> 
        <UilGoogle />
        Register with Google
      </Button> 
      
      <p className="extraSmallText">
        By clicking on the Register or Register with Facebook or Google buttons,
        you agree to accept the Privacy Policy and conditions of this website.
      </p>
    </S.Wrapper>
  );
};
