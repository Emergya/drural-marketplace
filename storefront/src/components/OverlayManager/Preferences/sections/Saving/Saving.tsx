import React from "react";
import { FormattedMessage } from "react-intl";
import ReactSVG from "react-svg";

import savingIllustration from "../../../../../images/dRuralImages/heart_illustration.svg";
import * as S from "./styles";

const Saving: React.FC = () => {
  return (
    <S.Container>
      <h2>
        <FormattedMessage defaultMessage="Preferences saved!" />
      </h2>
      <S.Wrapper>
        <p>
          <FormattedMessage defaultMessage="You can change your preferences at any time in your user profile page. Go to configuration to select your preferred categories and the location preferences." />
        </p>
        <S.ImageDiv>
          <ReactSVG path={savingIllustration} />
        </S.ImageDiv>
      </S.Wrapper>
    </S.Container>
  );
};

export default Saving;
