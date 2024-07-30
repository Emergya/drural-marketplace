import Link from "next/link";
import React from "react";
import { /* FormattedMessage, */ useIntl } from "react-intl";

import { paths } from "@paths";
import { commonMessages } from "@temp/intl";

import * as S from "./styles";
import { IProps } from "./types";

export const AccountMenu: React.FC<IProps> = ({
  links,
  active,
  asPath,
}: IProps) => {
  const intl = useIntl();
  return (
    <S.Wrapper>
      {links.map(link => {
        const text = {
          [paths.account]: intl.formatMessage(commonMessages.personalData),
          [paths.accountConfiguration]: intl.formatMessage(
            commonMessages.configuration
          ),
          [paths.accountOrderHistory]: intl.formatMessage(
            commonMessages.orderHistory
          ),
          [paths.accountAddressBook]: intl.formatMessage(
            commonMessages.myAdresses
          ),
        }[link];

        return (
          <Link
            href={link}
            key={link}
            data-test="accountMenuLink"
            data-test-id={link}
          >
            <a>
              <S.MenuItem active={active === link || asPath === link}>
                {text}
              </S.MenuItem>
            </a>
          </Link>
        );
      })}
    </S.Wrapper>
  );
};
