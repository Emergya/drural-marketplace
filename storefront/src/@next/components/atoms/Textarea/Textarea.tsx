import React from "react";

import { ErrorMessage } from "@components/atoms";
import { getBackgroundColor } from "@utils/styles";

import { TextAreaLabel } from "../TextAreaLabel";
import * as S from "./styles";
import { IProps } from "./types";

export const TextArea: React.FC<IProps> = ({
  onBlur,
  onFocus,
  contentLeft = null,
  contentRight = null,
  error = false,
  errors,
  disabled = false,
  placeholder,
  label,
  value,
  onChange,
  ...props
}: IProps) => {
  const elementRef = React.useRef(null);
  const [active, setActive] = React.useState(false);
  const [labelBackground, setColor] = React.useState<string>("transparent");

  React.useEffect(() => {
    if (elementRef) {
      const color = getBackgroundColor(elementRef.current);
      setColor(color);
    }
  }, []);

  const handleFocus = React.useCallback(
    e => {
      setActive(true);
      if (onFocus) {
        onFocus(e);
      }
    },
    [setActive, onFocus]
  );
  const handleBlur = React.useCallback(
    e => {
      setActive(false);
      if (onBlur) {
        onBlur(e);
      }
    },
    [setActive, onBlur]
  );

  error = !!(errors && errors.length);

  return (
    <S.Container>
      <S.Wrapper
        active={active}
        error={error}
        disabled={disabled}
        ref={elementRef}
      >
        {contentLeft && <S.Content>{contentLeft}</S.Content>}
        <S.InputWrapper>
          <S.Input
            {...props}
            value={value}
            active={active || !!value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            onChange={onChange}
            labelBackground={labelBackground}
          />
          {label && (
            <TextAreaLabel
              labelBackground={labelBackground}
              active={active || !!value}
            >
              {label}
            </TextAreaLabel>
          )}
        </S.InputWrapper>
        {contentRight && <S.Content>{contentRight}</S.Content>}
      </S.Wrapper>
      <S.ErrorMessages>
        <ErrorMessage errors={errors} />
      </S.ErrorMessages>
    </S.Container>
  );
};
