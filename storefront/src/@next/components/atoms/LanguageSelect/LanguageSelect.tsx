import React from "react";
import ReactSelect from "react-select";
import { ValueType } from "react-select/lib/types";
import { ThemeContext } from "styled-components";

import * as S from "./styles";
import { IProps } from "./types";
import { ILanguageObject } from "./utils";

const defaultStyles = (
  customTheme: any,
  menuPlacement: "auto" | "bottom" | "top"
) => ({
  option: (provided: any, state: any) => ({
    ...provided,
    color: "#000",
    padding: "10px 12px 10px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    backgroundColor: state.isSelected ? "transparent" : "transparent",
    "&:hover": {
      backgroundColor: customTheme.colors.primaryLight,
    },
  }),
  control: () => ({
    // none of react-select's styles are passed to <Control />
    display: "flex",
    height: "40px",
    borderRadius: "20px",
    paddingLeft: "4px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.15)",
    },
  }),
  indicatorSeparator: () => ({
    backgroundColor: "transparent",
  }),
  menu: (provided: any) => ({
    ...provided,
    borderRadius: "8px",
  }),
  singleValue: (provided: any) => {
    const color = "#FFFFFF";

    return { ...provided, color };
  },
  placeholder: () => ({
    color: "#FFFFFF",
  }),
  dropdownIndicator: (provided: any, state: any) => ({
    ...provided,
    transform:
      state.selectProps.menuIsOpen &&
      menuPlacement === "top" &&
      "rotate(180deg)",
    color: "#FFFFFF",
    "&:hover": {
      color: "#FFFFFF",
    },
  }),
});

export const LanguageSelect: React.FC<IProps> = ({
  value,
  onChange,
  options,
  menuIsOpen,
  customStyles,
  optionLabelKey = "label",
  optionValueKey = "value",
  menuPlacement = "top",
  ...props
}: IProps) => {
  const customTheme = React.useContext(ThemeContext);

  const handdleChange = (selectedOption: ValueType<ILanguageObject>) => {
    const { value } = selectedOption as ILanguageObject;
    onChange(value);
  };

  return (
    <S.Wrapper>
      <ReactSelect
        value={value}
        onChange={handdleChange}
        menuIsOpen={menuIsOpen}
        menuShouldScrollIntoView
        tabSelectsValue={false}
        openMenuOnFocus
        styles={{
          ...defaultStyles(customTheme, menuPlacement),
          ...customStyles,
        }}
        options={options}
        menuPlacement={menuPlacement}
        {...props}
      />
    </S.Wrapper>
  );
};
