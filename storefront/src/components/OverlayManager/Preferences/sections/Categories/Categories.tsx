import React from "react";
import { FormattedMessage } from "react-intl";

import { CheckboxIconGrid } from "@components/organisms/CheckboxIconGrid";

import * as S from "./styles";
import { IProps } from "./types";

const Categories: React.FC<IProps> = ({ preferences, onChange }) => {
  return (
    <S.Wrapper>
      <S.TextDiv>
        <h2>
          <FormattedMessage defaultMessage="Preferred categories" />
        </h2>
        <p>
          <FormattedMessage defaultMessage="Select your preferred categories, so we can show you first the services you are more interested in. You can select as many as you want." />
        </p>
      </S.TextDiv>
      <S.CategoriesDiv>
        <CheckboxIconGrid preferences={preferences} onChange={onChange} />
      </S.CategoriesDiv>
    </S.Wrapper>
  );
};

export default Categories;
