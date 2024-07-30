import { useAuth } from "@drural/sdk";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useIntl } from "react-intl";
import Media from "react-responsive";

import { PageBottomSpacing, Redirect } from "@components/atoms";
import { AccountMenu, AccountMenuMobile } from "@components/molecules";
import { AccountConfiguration, AccountTab, OrdersHistory } from "@pages";
import { paths } from "@paths";
import { largeScreen } from "@styles/constants";
import { commonMessages } from "@temp/intl";

import AddressBook from "../../account/AddressBook/AddressBook";
import { Breadcrumbs, Loader } from "../../components";

import "./scss/index.scss";

const returnTab: any = (path: string, userDetails) => {
  let tabContent = <></>;
  switch (path) {
    case paths.account: {
      tabContent = <AccountTab />;
      break;
    }
    case paths.accountConfiguration: {
      tabContent = <AccountConfiguration />;
      break;
    }
    case paths.accountOrderHistory: {
      tabContent = <OrdersHistory />;
      break;
    }
    case paths.accountAddressBook: {
      tabContent = <AddressBook user={userDetails} />;
      break;
    }
    default:
      tabContent = <AccountTab />;
      break;
  }
  return tabContent;
};

export const AccountView: NextPage = () => {
  const intl = useIntl();
  const { user, loaded } = useAuth();
  const { asPath, pathname } = useRouter();
  const links = [
    paths.account,
    paths.accountConfiguration,
    paths.accountOrderHistory,
    paths.accountAddressBook,
  ];

  if (!user) {
    return <Redirect url={paths.home} />;
  }
  return loaded ? (
    <div className="container">
      <Breadcrumbs
        breadcrumbs={[
          {
            link: asPath,
            value: intl.formatMessage(commonMessages.myAccount),
          },
        ]}
      />
      <Media minWidth={largeScreen + 1}>
        <div className="title-account">
          <h2>{intl.formatMessage(commonMessages.myAccount)}</h2>
        </div>
      </Media>

      <div className="account">
        <Media minWidth={largeScreen + 1}>
          <div className="account__menu">
            <AccountMenu links={links} active={pathname} asPath={asPath} />
          </div>
        </Media>
        <Media maxWidth={largeScreen}>
          <div className="account__menu_mobile">
            <AccountMenuMobile
              links={links}
              active={pathname}
              asPath={asPath}
            />
          </div>
        </Media>
        <div className="account__content">
          {user && returnTab(pathname, user)}
        </div>
      </div>
      <PageBottomSpacing />
    </div>
  ) : (
    <Loader />
  );
};
