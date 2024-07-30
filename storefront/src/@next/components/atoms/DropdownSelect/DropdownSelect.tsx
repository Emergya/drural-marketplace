import { UilAngleDown } from "@iconscout/react-unicons";
import React from "react";
import { components } from "react-select";
import { ThemeContext } from "styled-components";

import { dRuralTheme } from "@styles";

import { useHandlerWhenClickedOutside } from "../../../hooks";
import { Select } from "../Select";
import * as S from "./styles";
import { IProps } from "./types";

export const DropdownSelect: React.FC<IProps> = ({
  options,
  name,
  placeholder,
  value,
  onChange,
}: IProps) => {
  const [menuIsOpen, setMenuIsOpen] = React.useState(false);
  const { setElementRef } = useHandlerWhenClickedOutside(() => {
    setMenuIsOpen(false);
  });

  const customComponents = {
    Control: () => (
      <S.SortLine onClick={() => setMenuIsOpen(!menuIsOpen)}>
        <S.Value>{value?.label || placeholder || ""}</S.Value>
        <S.Indicator rotate={String(menuIsOpen)}>
          <UilAngleDown size={24} color={dRuralTheme.colors.druralGray_400} />
        </S.Indicator>
      </S.SortLine>
    ),
    IndicatorSeparator: () => null,
    IndicatorsContainer: () => null,
    Option: (props: any) => {
      const customTheme = React.useContext(ThemeContext);
      return <components.Option {...{ customTheme, ...props }} />;
    },
  };

  return (
    <S.Wrapper data-test="sortingDropdown" ref={setElementRef()}>
      <Select
        options={options}
        value={value}
        onChange={value => {
          setMenuIsOpen(false);
          onChange(value);
        }}
        name={name}
        menuIsOpen={menuIsOpen}
        customComponents={customComponents}
      />
    </S.Wrapper>
  );
};
