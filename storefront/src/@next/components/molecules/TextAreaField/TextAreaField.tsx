import React from "react";

import { ErrorMessage, TextArea } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

export const TextAreaField: React.FC<IProps> = ({
  errors,
  helpText,
  ...rest
}: IProps) => {
  const hasErrors = !!(errors && errors.length);

  return (
    <>
      <S.TextField>
        <TextArea {...rest} error={hasErrors} />
        <S.ErrorMessages>
          <ErrorMessage errors={errors} />
          {helpText && <S.HelpText>{helpText}</S.HelpText>}
        </S.ErrorMessages>
      </S.TextField>
    </>
  );
};
