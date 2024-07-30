import { UilShop, UilSignout } from "@iconscout/react-unicons";
import Link from "next/link";
import React from "react";
import { FormattedMessage } from "react-intl";

import { paths } from "@paths";
import { dashboardUrl } from "@temp/constants";
import { commonMessages } from "@temp/intl";

import * as S from "./styles";
import { IProps } from "./types";

export const UserMenu: React.FC<IProps> = ({
  name,
  messages,
  notifications,
  handleSignOut,
}: IProps) => {
  return (
    <S.Wrapper>
      <S.SelectTitle>
        <FormattedMessage defaultMessage="Hello, {name}" values={{ name }} />
      </S.SelectTitle>
      <S.ItemList>
        <S.MenuItem>
          <Link href={paths.account}>
            <a>
              <FormattedMessage {...commonMessages.myAccount} />
            </a>
          </Link>
        </S.MenuItem>
        <S.MenuItem>
          <Link href={paths.accountOrderHistory}>
            <a>
              <FormattedMessage {...commonMessages.orderHistory} />
            </a>
          </Link>
        </S.MenuItem>
        <S.MenuItem>
          <Link href={paths.wishlist}>
            <a>
              <FormattedMessage {...commonMessages.myWishLists} />
            </a>
          </Link>
        </S.MenuItem>
        <S.MenuItem>
          <Link href="/">
            <a>
              <FormattedMessage {...commonMessages.messages} />
              <S.Notifications>{messages}</S.Notifications>
            </a>
          </Link>
        </S.MenuItem>
        <S.MenuItem>
          <Link href="/">
            <a>
              <FormattedMessage {...commonMessages.notifications} />
              <S.Notifications>{notifications}</S.Notifications>
            </a>
          </Link>
        </S.MenuItem>
        <S.MenuItem>
          <Link href={dashboardUrl || "/"}>
            <a>
              <S.ShopItem>
                <UilShop size={24} color="#000" />
                <FormattedMessage {...commonMessages.shopManager} />
              </S.ShopItem>
            </a>
          </Link>
        </S.MenuItem>
      </S.ItemList>
      <S.Logout onClick={handleSignOut}>
        <UilSignout size={24} color="#FFF" />
        <FormattedMessage defaultMessage="Log out" />
      </S.Logout>
    </S.Wrapper>
  );
};
