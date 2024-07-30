import { OrderStatus, useAuth } from "@drural/sdk";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { generatePath } from "react-router";
import { UrlObject } from "url";

import { ThankYou } from "@components/organisms";
import { paths } from "@paths";
import NotFound from "@temp/components/NotFound";

import { IProps } from "./types";

export const ThankYouPage: NextPage<IProps> = (
  {
    // query: { orderNumber, token, orderStatus },
  }
) => {
  const {
    query: { orderNumber, token, orderStatus },
    push,
  } = useRouter();

  const { user } = useAuth();

  const onButtonClick = (url: string | UrlObject) => {
    if (url) {
      push(url);
    }
  };

  return token && orderNumber && orderStatus ? (
    <ThankYou
      continueShoppingUrl={paths.home}
      orderNumber={orderNumber as string}
      orderDetailsUrl={generatePath(
        user ? paths.accountOrderDetail : paths.guestOrderDetail,
        { token: token as string }
      )}
      orderStatus={orderStatus as OrderStatus}
      onButtonClick={onButtonClick}
    />
  ) : (
    <NotFound />
  );
};
