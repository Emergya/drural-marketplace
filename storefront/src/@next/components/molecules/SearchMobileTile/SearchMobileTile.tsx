import { UilSearch } from "@iconscout/react-unicons";
import React from "react";

import { Button } from "@components/atoms";

import dRuralImageHome from "../../../../images/dRuralImages/Home-image.svg";
import { CloseIcon } from "../../atoms/CloseIcon/CloseIcon";
import * as S from "./styles";
import { IProps } from "./types";

export const SearchMobileTile: React.FC<IProps> = ({
  suggestions,
  onChange,
  onItemClick,
  onSubmit,
  onClose,
  query,
}) => {
  const autoFocus = React.useCallback(el => (el ? el.focus() : null), []);
  return (
    <S.Overlay>
      <S.Form onSubmit={onSubmit}>
        <S.Header src={dRuralImageHome}>
          <S.CloseIconContainer>
            <CloseIcon onClose={onClose} />
          </S.CloseIconContainer>

          <S.InputContainer>
            <S.Input
              type="text"
              value={query}
              ref={autoFocus}
              onChange={onChange}
            />
            <S.IconWrapper color="primary" type="submit">
              <UilSearch size="20" color="#fff" />
            </S.IconWrapper>
          </S.InputContainer>
        </S.Header>
        <S.InfoContainer>
          <ul>
            {suggestions.map(suggestion => (
              <li
                key={suggestion.id}
                onClick={() => onItemClick(suggestion.name!)}
              >
                {suggestion.name}
              </li>
            ))}
          </ul>
          <Button
            type="submit"
            color="primary"
            testingContext="searchbar-mobile"
            fullWidth
          >
            Show all results
          </Button>
        </S.InfoContainer>
      </S.Form>
    </S.Overlay>
  );
};
