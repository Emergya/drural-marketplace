import { UilSearch } from "@iconscout/react-unicons";
import React, { useContext } from "react";
import { ThemeContext } from "styled-components";

import { DruralTheme } from "@styles";

import * as S from "./styles";
import { IProps } from "./types";

export const SearchInput: React.FC<IProps> = ({
  disabled,
  fullWidth,
  placeholder,
  textSize,
  theming,
  value,
  onChange,
}) => {
  const themeContext = useContext<DruralTheme>(ThemeContext);
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <S.Wrapper
      disabled={disabled}
      fullWidth={fullWidth}
      theming={theming}
      onClick={() => inputRef.current?.focus()}
    >
      <S.Input
        disabled={disabled}
        placeholder={placeholder}
        ref={inputRef}
        textSize={textSize}
        theming={theming}
        value={value}
        type="text"
        onChange={onChange}
      />

      <UilSearch
        color={
          theming === "dark"
            ? themeContext.colors.white
            : themeContext.colors.black
        }
      />
    </S.Wrapper>
  );
};
