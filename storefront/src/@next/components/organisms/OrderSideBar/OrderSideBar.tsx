import React from "react";
import { FormattedMessage } from "react-intl";

import { CloseIcon } from "@components/atoms/CloseIcon";
import { useHandlerWhenClickedOutside } from "@hooks";
import { commonMessages } from "@temp/intl";

import { Overlay } from "..";
import * as S from "./styles";
import { IProps } from "./types";

export const OrderSideBar: React.FC<IProps> = ({
  hide,
  onChange,
  show,
  sortOptions,
}: IProps) => {
  const { setElementRef } = useHandlerWhenClickedOutside(() => {
    hide();
  });

  return (
    <Overlay duration={0} position="right" show={show} hide={hide}>
      <S.Wrapper ref={setElementRef()} data-test="filterSidebar">
        <S.FiltersContainer>
          <S.Header>
            <span>
              <FormattedMessage {...commonMessages.orderfilterHeader} />
            </span>
            <S.CloseIconWrapper
              onClick={() => {
                hide();
              }}
            >
              <CloseIcon size={18} backGroundColor />
            </S.CloseIconWrapper>
          </S.Header>
          <S.OptionsList>
            {sortOptions.map((option, index) => (
              <li
                key={index}
                onClick={() => {
                  onChange({
                    label: option.label as string,
                    value: option.value as string,
                  });
                  hide();
                }}
              >
                {option.label}
              </li>
            ))}
          </S.OptionsList>
        </S.FiltersContainer>
      </S.Wrapper>
    </Overlay>
  );
};
