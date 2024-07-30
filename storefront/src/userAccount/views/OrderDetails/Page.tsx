import { UilEllipsisV } from "@iconscout/react-unicons";
import { useRouter } from "next/router";
import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import {
  DropdownMenu,
  IconButtonDrural,
  PageBottomSpacing,
  PageTitle,
  StatusLabel,
  Tile,
} from "@components/atoms";
import { MenuItem } from "@components/atoms/DropdownMenu/types";
import { momentSetStaticTz } from "@components/atoms/Moment/utils";
import { TaxedMoney } from "@components/containers";
import { AddressSummary, BackLink, BookingTable } from "@components/molecules";
import { Container } from "@components/templates";
import { paths } from "@paths";
import {
  checkoutMessages,
  commonMessages,
  translateOrderStatusCode,
  translatePaymentStatusCode,
} from "@temp/intl";
import { getOrderStatusCode } from "@utils/orders/getOrderStatusCode";
import { getPaymentStatusCode } from "@utils/orders/getPaymentStatusCode";

import { SidebarTile } from "../../../@next/components/molecules/SidebarTile/SidebarTile";
import { CartTable, NotFound } from "../../../components";
import * as S from "./styles";
import { IPageProps } from "./types";
import {
  extractOrderLines,
  getShouldDownloadInvoice,
  getShouldOrderCancel,
} from "./utils";

const Page: React.FC<IPageProps> = ({
  order,
  downloadInvoice,
  orderCancel,
}) => {
  const intl = useIntl();
  const { push } = useRouter();
  const { booking } = order || {};

  const shouldOrderCancel = getShouldOrderCancel(order);
  const shouldDownloadInvoice = getShouldDownloadInvoice(order);

  const getMenuItems = (): MenuItem[] => {
    const menuItems: MenuItem[] = [];

    if (shouldOrderCancel) {
      menuItems.push({
        onClick: orderCancel,
        content: (
          <span>
            <FormattedMessage
              defaultMessage="Cancel order"
              description="action in popup menu in order view"
            />
          </span>
        ),
      });
    }

    if (shouldDownloadInvoice) {
      menuItems.push({
        onClick: downloadInvoice,
        content: (
          <span>
            <FormattedMessage
              defaultMessage="Download invoice"
              description="action in popup menu in order view"
            />
          </span>
        ),
      });
    }

    return menuItems;
  };

  return order ? (
    <Container>
      <BackLink onClick={() => push(paths.accountOrderHistory)}>
        <FormattedMessage defaultMessage="Go back to Order History" />
      </BackLink>

      <S.HeaderWrapper>
        <PageTitle title={intl.formatMessage(commonMessages.orderDetails)} />
        {(shouldOrderCancel || shouldDownloadInvoice) && (
          <S.HeaderMenu>
            <S.DropdownMenuWrapper>
              <DropdownMenu
                type="clickable"
                header={
                  <IconButtonDrural
                    color="primary"
                    testingContext="expandButton"
                  >
                    <UilEllipsisV size="24" color="#fff" />
                  </IconButtonDrural>
                }
                items={getMenuItems()}
              />
            </S.DropdownMenuWrapper>
          </S.HeaderMenu>
        )}
      </S.HeaderWrapper>

      <S.ContentWrapper>
        <SidebarTile
          title={intl.formatMessage(commonMessages.orderDetails)}
          itemName={intl.formatMessage(
            { defaultMessage: "Order number: #{orderNum}" },
            { orderNum: <strong key={order.number}>{order.number}</strong> }
          )}
          padding="24px"
        >
          <S.StatusLabelsWrapper>
            <StatusLabel
              status={getOrderStatusCode(order.status)}
              label={translateOrderStatusCode(order.status, intl)}
            />
            <StatusLabel
              status={getPaymentStatusCode(order.paymentStatus)}
              label={translatePaymentStatusCode(order.paymentStatus, intl)}
            />
          </S.StatusLabelsWrapper>
        </SidebarTile>

        <S.MainWrapper>
          <div>
            <S.CardWrapper>
              <CartTable
                lines={extractOrderLines(order.lines)}
                totalCost={<TaxedMoney taxedMoney={order.total} />}
                deliveryCost={<TaxedMoney taxedMoney={order.shippingPrice} />}
                subtotal={<TaxedMoney taxedMoney={order.subtotal} />}
              />
            </S.CardWrapper>

            {booking && (
              <>
                <S.Spacer />
                <S.CardWrapper>
                  <BookingTable
                    bookableResourceName={booking.bookableResource.name}
                    bookingReference={booking.bookingReference}
                    endDate={momentSetStaticTz(booking.endDate).locale(
                      intl.locale
                    )}
                    startDate={momentSetStaticTz(booking.startDate).locale(
                      intl.locale
                    )}
                  />
                </S.CardWrapper>
              </>
            )}

            <S.Spacer />
            <S.CardWrapper>
              <Tile>
                <S.Title>
                  <FormattedMessage {...checkoutMessages.billingAddress} />
                </S.Title>
                <S.AddressWrapper>
                  <AddressSummary
                    address={order.billingAddress}
                    email={order.userEmail}
                  />
                </S.AddressWrapper>
              </Tile>
            </S.CardWrapper>
          </div>
        </S.MainWrapper>
      </S.ContentWrapper>
      <PageBottomSpacing />
    </Container>
  ) : (
    <NotFound />
  );
};
export default Page;
