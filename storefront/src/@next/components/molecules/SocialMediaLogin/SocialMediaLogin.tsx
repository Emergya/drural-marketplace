/** **ToDo: At the momento only 2 Login Buttons for SocialMedia without function** */
import { UilFacebook, UilGoogle } from "@iconscout/react-unicons";
import React from "react";

import { Button } from "@components/atoms";

import * as S from "./styles";
"use client";
import { useGoogleLogin } from '@react-oauth/google';

export const SocialMediaLogin: React.FC = () => {
  const login = useGoogleLogin({
    onSuccess: tokenResponse => console.log(tokenResponse),
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
