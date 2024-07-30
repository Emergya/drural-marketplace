import { IProps, MethodIdentifierEnum } from "./types";

export const DEFAULT_PROPS: IProps = {
  title: "Payment methods",
  methods: [
    {
      __typename: "PaymentMethod",
      id: "1",
      name: "Bank transfer",
      identifier: MethodIdentifierEnum.BANK_TRANSFER,
      isActive: true,
    },
    {
      __typename: "PaymentMethod",
      id: "1",
      name: "Card",
      identifier: MethodIdentifierEnum.CARD,
      isActive: true,
    },
    {
      __typename: "PaymentMethod",
      id: "1",
      name: "Pay at store",
      identifier: MethodIdentifierEnum.PAY_AT_STORE,
      isActive: true,
    },
  ],
};
