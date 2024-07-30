import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import Media from "react-media";

import { Tile } from "@components/atoms";
import { commonMessages } from "@temp/intl";

import CostRow from "./CostRow";
import ProductRow from "./ProductRow";
import * as S from "./styles";
import { TableProps } from "./types";

import "./scss/index.scss";
import { smallScreen } from "../../globalStyles/scss/variables.scss";

const Table: React.FC<TableProps> = ({
  subtotal,
  deliveryCost,
  totalCost,
  discount,
  discountName,
  lines,
  ...rowProps
}) => {
  const intl = useIntl();

  return (
    <Media query={{ minWidth: smallScreen }}>
      {mediumScreen => (
        <Tile padding="24px" mobilePadding="24px">
          <S.Title>
            <FormattedMessage defaultMessage="Payment details" />
          </S.Title>
          <S.CartTable>
            <S.THead>
              <tr>
                <S.Th>
                  <FormattedMessage {...commonMessages.products} />
                </S.Th>
                {mediumScreen && (
                  <S.Th>
                    <FormattedMessage {...commonMessages.price} />
                  </S.Th>
                )}
                {/* <S.Th>
                  <FormattedMessage {...commonMessages.variant} />
                </S.Th> */}
                <S.Th className="cart-table__quantity-header">
                  <FormattedMessage {...commonMessages.qty} />
                </S.Th>
                <S.Th colSpan={2}>
                  {mediumScreen ? (
                    <FormattedMessage {...commonMessages.totalPrice} />
                  ) : (
                    <FormattedMessage {...commonMessages.price} />
                  )}
                </S.Th>
              </tr>
            </S.THead>
            <S.TBody>
              {lines.map(line => (
                <ProductRow
                  key={line.id}
                  line={line}
                  mediumScreen={mediumScreen}
                  {...rowProps}
                />
              ))}
            </S.TBody>
            <S.TFoot>
              <CostRow
                mediumScreen={mediumScreen}
                heading={intl.formatMessage(commonMessages.subtotal)}
                cost={subtotal}
              />
              {discount && (
                <CostRow
                  mediumScreen={mediumScreen}
                  heading={intl.formatMessage(
                    { defaultMessage: "Discount: {discountName}" },
                    { discountName }
                  )}
                  cost={discount}
                />
              )}
              {deliveryCost && (
                <CostRow
                  mediumScreen={mediumScreen}
                  heading={intl.formatMessage({
                    defaultMessage: "Delivery Cost",
                  })}
                  cost={deliveryCost}
                />
              )}
              {totalCost && (
                <CostRow
                  mediumScreen={mediumScreen}
                  heading={intl.formatMessage({ defaultMessage: "Total Cost" })}
                  cost={totalCost}
                />
              )}
            </S.TFoot>
          </S.CartTable>
        </Tile>
      )}
    </Media>
  );
};

export default Table;
