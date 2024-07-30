import gql from "graphql-tag";

export const moneyFragment = gql`
  fragment MoneyFragment on Money {
    amount
    currency
  }
`;
