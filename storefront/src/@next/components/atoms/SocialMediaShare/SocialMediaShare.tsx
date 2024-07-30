import {
  UilEnvelopeAlt,
  UilFacebookF,
  UilTwitter,
  UilWhatsapp,
} from "@iconscout/react-unicons";
import React from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import { socialMediaColors } from "@styles/constants-drural";

import * as S from "./styles";
import { IProps } from "./types";

export const SocialMediaShare: React.FC<IProps> = ({
  disabled = false,
  url,
}) => (
  <S.Wrapper>
    <TwitterShareButton disabled={disabled} url={url}>
      <S.IconWrapper>
        <UilTwitter color={socialMediaColors.twitter} />
      </S.IconWrapper>
    </TwitterShareButton>
    <FacebookShareButton disabled={disabled} url={url}>
      <S.IconWrapper>
        <UilFacebookF color={socialMediaColors.facebook} />
      </S.IconWrapper>
    </FacebookShareButton>
    <EmailShareButton
      disabled={disabled}
      openShareDialogOnClick
      url={url}
      onClick={() => null}
    >
      <S.IconWrapper>
        <UilEnvelopeAlt color={socialMediaColors.email} />
      </S.IconWrapper>
    </EmailShareButton>
    <WhatsappShareButton disabled={disabled} url={url}>
      <S.IconWrapper>
        <UilWhatsapp color={socialMediaColors.whatsapp} />
      </S.IconWrapper>
    </WhatsappShareButton>
  </S.Wrapper>
);
