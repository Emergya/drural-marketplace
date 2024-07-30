import React from "react";

import { Loader } from "../Loader/Loader";
import * as S from "./styles";
import { IProps } from "./types";

export const SearchListTile: React.FC<IProps> = ({ suggestions, onClick }) => {
  return (
    <S.Overlay>
      <ul>
        {suggestions.length > 0 ? (
          suggestions.map(suggestion => (
            <li key={suggestion.id} onClick={() => onClick(suggestion.name!)}>
              {suggestion.name}
            </li>
          ))
        ) : (
          <Loader />
        )}
      </ul>
    </S.Overlay>
  );
};
