import { UilAngleUp } from "@iconscout/react-unicons";
import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { Tile } from "@components/atoms";
import { TaxedMoney } from "@components/containers";
import { CartSummaryRow } from "@components/molecules";
import { commonMessages } from "@temp/intl";

import * as S from "./styles";
import { CartSummaryProps, ICostLine, ICosts } from "./types";

const CostLine = ({
  name,
  cost,
  last = false,
  negative = false,
}: ICostLine) => (
  <S.CostLine last={last}>
    <span>{name}</span>
    <span data-test={`cartSummaryCost${name.replace(/\s/g, "")}`}>
      {negative && "- "}
      <TaxedMoney taxedMoney={cost} />
    </span>
  </S.CostLine>
);

const Costs = ({ subtotal, promoCode, shipping, total }: ICosts) => {
  const intl = useIntl();
  return (
    <S.Costs>
      {subtotal && (
        <CostLine
          name={intl.formatMessage(commonMessages.subtotal)}
          cost={subtotal}
        />
      )}
      {shipping && (
        <CostLine
          name={intl.formatMessage(commonMessages.shipping)}
          cost={shipping}
        />
      )}
      {promoCode && promoCode.gross.amount > 0 && (
        <CostLine
          name={intl.formatMessage(commonMessages.promoCode)}
          cost={promoCode}
          negative
        />
      )}
      {total && (
        <CostLine
          name={intl.formatMessage(commonMessages.total)}
          cost={total}
          last
        />
      )}
    </S.Costs>
  );
};

/**
 * Cart summary displayed in checkout page
 */
const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  total,
  shipping,
  promoCode,
  products,
}) => {
  const [mobileCartOpened, setMobileCartOpened] = useState(false);

  return (
    <Tile padding="32px">
      <S.Wrapper mobileCartOpened={mobileCartOpened}>
        <S.Title
          data-test="cartSummaryTitle"
          onClick={() => setMobileCartOpened(!mobileCartOpened)}
        >
          <FormattedMessage defaultMessage="Booking details" />
          <S.ArrowUp mobileCartOpened={mobileCartOpened}>
            <UilAngleUp color="#000" size={24} />
          </S.ArrowUp>
        </S.Title>
        <S.Content>
          <S.CartSummaryProductList>
            {products?.map((product, index) => (
              <div key={product.sku}>
                <S.ProductLine>
                  <CartSummaryRow
                    index={index}
                    bookingId={product.bookingId}
                    quantity={product.quantity}
                    name={product.name}
                    price={product.price}
                    thumbnail={product.thumbnail}
                  />
                </S.ProductLine>
                <S.HR />
              </div>
            ))}
          </S.CartSummaryProductList>
          <Costs
            subtotal={subtotal}
            total={total}
            shipping={shipping}
            promoCode={promoCode}
          />
        </S.Content>
      </S.Wrapper>
    </Tile>
  );
};

export { CartSummary };
export type { CartSummaryProps };
