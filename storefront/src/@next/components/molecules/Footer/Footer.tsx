// import { UilPlus } from "@iconscout/react-unicons";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { generatePath } from "react-router";

import { NavLink } from "@components/atoms";
import { LanguageSelect } from "@components/atoms/LanguageSelect";
import {
  getLanguageObject,
  mapLocalesWithLanguage,
} from "@components/atoms/LanguageSelect/utils";
import { paths } from "@paths";
import { availableLanguages } from "@temp/components/Locale/constants";

// import { smallScreen } from "@styles/constants";
import { UserPreferredLocaleContext } from "../../../../components/Locale/LocaleContext";
import euFlag from "../../../../images/dRuralImages/eu-flag.jpg";
import * as S from "./styles";
import { IProps } from "./types";

export const Footer: React.FC<IProps> = ({ logo, menu, policyLinks }) => {
  const intl = useIntl();

  const { locale, locales, push } = useRouter();
  const { setUserPreferredLocale } = useContext(UserPreferredLocaleContext);

  const setLanguage = React.useCallback(
    (locale: string | undefined) => {
      if (locale && locale in availableLanguages) {
        if (setUserPreferredLocale) {
          setUserPreferredLocale(locale);
        }
      }
    },
    [setUserPreferredLocale]
  );

  return (
    <S.Container>
      <S.ContainerInner className="container">
        {/* Row 1: logo */}

        <S.RowLogo>
          <S.Logo>{logo}</S.Logo>
          <S.EuFlag
            source={{
              thumbnail: {
                alt: "euFlag",
                url: euFlag || "",
              },
            }}
          />
        </S.RowLogo>

        {/* Row 2: consortium */}

        <S.RowConsorcium>
          <S.ConsorciumParragraph>
            <FormattedMessage defaultMessage="This project has received funding from the European Union’s Horizon 2020 research and innovation programme under grant agreement No. 101017304." />
          </S.ConsorciumParragraph>
        </S.RowConsorcium>

        {/* Row 3: menu */}

        {menu?.items && (
          <S.RowLinks>
            {menu.items.map(
              item =>
                item && (
                  <S.LinksColumn
                    colsNum={menu.items?.length || 4}
                    key={item.id}
                  >
                    <S.LinkTitle>
                      <NavLink item={item} />
                    </S.LinkTitle>
                    <S.LinksContent>
                      {item.children &&
                        item.children.map(
                          subItem =>
                            subItem && (
                              <S.Link key={subItem.id}>
                                <NavLink item={subItem} />
                              </S.Link>
                            )
                        )}
                    </S.LinksContent>
                  </S.LinksColumn>
                )
            )}
          </S.RowLinks>
        )}

        {/* Row 4: others */}

        <S.RowOthers>
          <S.LanguageSelectorColumn>
            <LanguageSelect
              value={getLanguageObject(locale, intl)}
              onChange={locale => setLanguage(locale)}
              {...mapLocalesWithLanguage(locales, intl)}
            />
          </S.LanguageSelectorColumn>
          <S.PolicyLinksColumn>
            {policyLinks.map(({ name, slug }) => (
              <S.PolicyLink
                key={slug}
                onClick={() => push(generatePath(paths.page, { slug }))}
              >
                {name}
              </S.PolicyLink>
            ))}
          </S.PolicyLinksColumn>
          <S.CopyrightColumn>
            <S.Copyright>
              <FormattedMessage defaultMessage="dRural © 2022" />
            </S.Copyright>
          </S.CopyrightColumn>
        </S.RowOthers>
      </S.ContainerInner>
    </S.Container>
  );
};
