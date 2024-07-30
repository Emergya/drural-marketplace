import { UilAngleDown } from "@iconscout/react-unicons";
import Link from "next/link";
import React from "react";
import { useIntl } from "react-intl";

import { useHandlerWhenClickedOutside } from "@hooks";
import { paths } from "@paths";
import { dRuralTheme } from "@styles";
import { commonMessages } from "@temp/intl";

import * as S from "./styles";
import { IProps } from "./types";

export const AccountMenuMobile: React.FC<IProps> = ({
  links,
  active,
  asPath,
}: IProps) => {
  const [showMenu, setShowMenu] = React.useState(false);
  const intl = useIntl();

  const { setElementRef } = useHandlerWhenClickedOutside(() => {
    setShowMenu(false);
  });

  const linkToMenuItem = (link: string) =>
    ({
      [paths.account]: intl.formatMessage(commonMessages.personalData),
      [paths.accountConfiguration]: intl.formatMessage(
        commonMessages.configuration
      ),
      [paths.accountOrderHistory]: intl.formatMessage(
        commonMessages.orderHistory
      ),
      [paths.accountAddressBook]: intl.formatMessage(commonMessages.myAdresses),
    }[link]);

  return (
    <S.Wrapper
      onClick={() => {
        setShowMenu(!showMenu);
      }}
      ref={setElementRef()}
    >
      <UilAngleDown size={24} color={dRuralTheme.colors.druralGray_400} />
      {showMenu && (
        <S.Overlay>
          {links.map(link => (
            <div
              onClick={evt => {
                evt.stopPropagation();
                setShowMenu(false);
              }}
              key={link}
            >
              <Link href={link}>
                <a>
                  <S.MenuItem active={active === link || asPath === link}>
                    {linkToMenuItem(link)}
                  </S.MenuItem>
                </a>
              </Link>
            </div>
          ))}
        </S.Overlay>
      )}
    </S.Wrapper>
  );
};
