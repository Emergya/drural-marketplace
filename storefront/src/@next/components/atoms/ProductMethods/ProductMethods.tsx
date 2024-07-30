import {
  UilCreditCard,
  UilMoneyInsert,
  UilShop,
} from "@iconscout/react-unicons";
import React from "react";

import * as S from "./styles";
import { GetMethodIcon, IProps, MethodIdentifierEnum } from "./types";

export const ProductMethods: React.FC<IProps> = ({ title, methods }) => {
  // 1. Methods
  const getMethodIcon: GetMethodIcon = identifier => {
    switch (identifier) {
      case MethodIdentifierEnum.BANK_TRANSFER:
        return <UilMoneyInsert />;
      case MethodIdentifierEnum.CARD:
        return <UilCreditCard />;
      case MethodIdentifierEnum.PAY_AT_STORE:
        return <UilShop />;
      default:
    }
  };

  // 2. Render
  return (
    <S.Wrapper>
      <S.Title>{title}</S.Title>
      <S.ContentWrapper>
        {methods.map(method => (
          <S.ItemWrapper key={method.id}>
            {getMethodIcon(method.identifier)}
            <S.SamllText>{method.name}</S.SamllText>
          </S.ItemWrapper>
        ))}
      </S.ContentWrapper>
    </S.Wrapper>
  );
};
