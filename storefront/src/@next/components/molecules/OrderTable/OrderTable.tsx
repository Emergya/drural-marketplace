import Link from "next/link";
import React from "react";
import { FormattedDate, FormattedMessage, useIntl } from "react-intl";
import Media from "react-media";
import { generatePath } from "react-router";
import { ThemeContext } from "styled-components";

import { StatusLabel } from "@components/atoms/StatusLabel";
import { TaxedMoney } from "@components/containers";
import { paths } from "@paths";
import {
  translateOrderStatusCode,
  translatePaymentStatusCode,
} from "@temp/intl";
import { getOrderStatusCode } from "@utils/orders/getOrderStatusCode";
import { getPaymentStatusCode } from "@utils/orders/getPaymentStatusCode";

import * as S from "./styles";
import { IProps } from "./types";

const header = (matches: boolean) => (
  <S.HeaderRow>
    <S.IndexNumber>
      <FormattedMessage defaultMessage="Order #" />
    </S.IndexNumber>
    {matches && (
      <>
        <S.ProductsOrdered>
          <FormattedMessage defaultMessage="Service" />
        </S.ProductsOrdered>
        <S.DateOfOrder>
          <FormattedMessage defaultMessage="Date" />
        </S.DateOfOrder>
        <S.Value>
          <FormattedMessage defaultMessage="Total" />
        </S.Value>
        <S.Status>
          <FormattedMessage defaultMessage="Order Status" />
        </S.Status>
      </>
    )}
    <S.Status>
      <FormattedMessage defaultMessage="Payment Status" />
    </S.Status>
  </S.HeaderRow>
);

export const OrderTable: React.FC<IProps> = ({ orders, isGuest }: IProps) => {
  const theme = React.useContext(ThemeContext);
  const intl = useIntl();

  return (
    <S.Wrapper>
      <Media
        query={{
          minWidth: theme.breakpoints.largeScreen,
        }}
      >
        {(matches: boolean) => {
          return (
            <>
              <S.Row>{header(matches)}</S.Row>
              {orders.map(
                ({
                  created,
                  token,
                  number,
                  lines,
                  total,
                  status,
                  paymentStatus,
                }) => {
                  const date = new Date(created);
                  return (
                    <Link
                      href={generatePath(
                        isGuest
                          ? paths.guestOrderDetail
                          : paths.accountOrderDetail,
                        { token }
                      )}
                      key={number!}
                    >
                      <S.Row
                        data-test="orderEntry"
                        data-test-id={number!}
                        key={number!}
                      >
                        <S.IndexNumber>#{number!}</S.IndexNumber>
                        {matches ? (
                          <>
                            <S.ProductsOrdered>
                              {lines.slice(0, 1).map(line => (
                                <p key={line!.variant!.product.id}>
                                  {line?.variant?.product.name}
                                </p>
                              ))}
                            </S.ProductsOrdered>
                            <S.DateOfOrder>
                              <FormattedDate value={date} />
                            </S.DateOfOrder>
                            <S.Value>
                              <TaxedMoney taxedMoney={total} />
                            </S.Value>
                            <S.Status>
                              <StatusLabel
                                status={getOrderStatusCode(status)}
                                label={translateOrderStatusCode(status, intl)}
                              />
                            </S.Status>
                          </>
                        ) : (
                          ""
                        )}
                        <S.Status>
                          <StatusLabel
                            status={getPaymentStatusCode(paymentStatus)}
                            label={translatePaymentStatusCode(
                              paymentStatus,
                              intl
                            )}
                          />
                        </S.Status>
                      </S.Row>
                    </Link>
                  );
                }
              )}
            </>
          );
        }}
      </Media>
    </S.Wrapper>
  );
};
