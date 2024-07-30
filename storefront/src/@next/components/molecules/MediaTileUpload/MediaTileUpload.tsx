import React from "react";
import { FormattedMessage } from "react-intl";

import imageBars from "../../../../images/dRuralImages/upload-img-back-bars.svg";
import imageBorder from "../../../../images/dRuralImages/upload-img-back-border.svg";
import imageIcon from "../../../../images/dRuralImages/upload-img-icon.svg";
import * as S from "./styles";

export const MediaTileUpload: React.FC = () => (
  <S.Wrapper>
    <S.ImageWrapper>
      <S.ImageBorder path={imageBorder} />
      <S.ImageBars path={imageBars} />
      <S.ImageIcon path={imageIcon} />
    </S.ImageWrapper>

    <S.InfoWrapper>
      <S.Text>
        <FormattedMessage
          defaultMessage="You can upload up to 5 photos."
          description="image upload text description"
        />
      </S.Text>
      <S.Text>
        <FormattedMessage
          defaultMessage="Supported formats: jpeg, gif, png."
          description="image upload text description"
        />
      </S.Text>
      <S.Text>
        <FormattedMessage
          defaultMessage="Max. filesize 2 MB"
          description="image upload text size"
        />
      </S.Text>
    </S.InfoWrapper>
  </S.Wrapper>
);
