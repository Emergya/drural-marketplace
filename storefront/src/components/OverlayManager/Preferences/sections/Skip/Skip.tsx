import React from "react";
import { FormattedMessage } from "react-intl";
import ReactSVG from "react-svg";

import skipIllustration from "../../../../../images/dRuralImages/laptop_illustration.svg";
import * as S from "./styles";

const Skip: React.FC = () => {
  return (
    <S.Container>
      <h2>
        <FormattedMessage defaultMessage="We see you are busy now" />
      </h2>
      <S.Wrapper>
        <p>
          <FormattedMessage defaultMessage="You can set up your preferences at any time in your user profile page. Go to configuration to select your preferred categories and the location preferences." />
        </p>
        <S.ImageDiv>
          <ReactSVG path={skipIllustration} />
        </S.ImageDiv>
      </S.Wrapper>
    </S.Container>
  );
};

export default Skip;
