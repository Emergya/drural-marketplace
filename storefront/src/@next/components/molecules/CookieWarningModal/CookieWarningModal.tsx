import React, { FC, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { SwitchInput } from "@components/atoms";
import { Modal } from "@components/organisms";
import {
  CookieEnum,
  CookieGroupEnum,
} from "@components/organisms/CookieWarning/types";
import { commonMessages } from "@temp/intl";

import { messages } from "./messages";
import * as S from "./styles";
import { IProps, Preferences } from "./types";
import {
  cookiesToStateAdapter,
  getCookieGroupList,
  getCookieGroupMessages,
  getCookieLabel,
  isStrictlyNecessary,
  stateToCookiesAdapter,
} from "./utils";

export const CookieWarningModal: FC<IProps> = ({
  cookies,
  show,
  onHide,
  onSubmit,
}) => {
  const intl = useIntl();

  const inicialState = cookiesToStateAdapter(cookies);
  const [preferences, setPreferences] = useState<Preferences>(inicialState);

  const toggleCookieGroup = (group: CookieGroupEnum, checked: boolean) => {
    const newArr = preferences[group].cookies.map(cookie => {
      cookie.isEnabled = checked;
      return cookie;
    });

    setPreferences({
      ...preferences,
      [group]: {
        selectAll: checked,
        cookies: newArr,
      },
    });
  };

  const toggleCookie = (group: CookieGroupEnum, code: CookieEnum) => {
    const newArr = [...preferences[group].cookies];
    const index = newArr.findIndex(cookie => cookie.code === code);
    newArr[index].isEnabled = !newArr[index].isEnabled;

    setPreferences({
      ...preferences,
      [group]: {
        ...preferences[group],
        cookies: newArr,
      },
    });
  };

  return (
    <Modal
      contentStyles={S.contentStyles}
      disabled={false}
      lightboxStyles={S.lightboxStyles}
      show={show}
      submitButtonTestingContext="cookieWarningModalButton"
      submitBtnText={intl.formatMessage(commonMessages.accept)}
      testingContext="cookieWarningModal"
      title={intl.formatMessage(commonMessages.yourPrivacy)}
      hide={onHide}
      onSubmit={() => onSubmit(stateToCookiesAdapter(preferences))}
    >
      <S.ContentWrapper>
        <S.GroupWrapper>
          <S.Description>
            <FormattedMessage {...messages.modalDescription} />
          </S.Description>
        </S.GroupWrapper>
        {getCookieGroupList(cookies).map(group => {
          const { title, description } =
            getCookieGroupMessages(group, intl) || {};
          const allSelected = preferences[group].selectAll;
          const disabled = isStrictlyNecessary(group);

          return (
            <S.GroupWrapper key={group}>
              <S.Title>{title}</S.Title>
              <S.Description>{description}</S.Description>
              <S.Table>
                <S.THead>
                  <tr>
                    <S.Th>
                      {allSelected ? (
                        <FormattedMessage {...messages.disableAll} />
                      ) : (
                        <FormattedMessage {...messages.activateAll} />
                      )}
                    </S.Th>
                    <S.SwitchTh>
                      <S.StyledSwitchInput>
                        <SwitchInput
                          checked={allSelected}
                          disabled={disabled}
                          onChange={checked =>
                            toggleCookieGroup(group, checked)
                          }
                        />
                      </S.StyledSwitchInput>
                    </S.SwitchTh>
                  </tr>
                </S.THead>
                <S.TBody>
                  {cookies[group].map(({ code }) => (
                    <tr key={code}>
                      <S.Td>{getCookieLabel(code, intl)}</S.Td>
                      <S.SwitchTd>
                        <S.StyledSwitchInput>
                          <SwitchInput
                            checked={
                              preferences[group].cookies.find(
                                cookie => cookie.code === code
                              )?.isEnabled
                            }
                            disabled={disabled}
                            onChange={() => toggleCookie(group, code)}
                          />
                        </S.StyledSwitchInput>
                      </S.SwitchTd>
                    </tr>
                  ))}
                </S.TBody>
              </S.Table>
            </S.GroupWrapper>
          );
        })}
      </S.ContentWrapper>
    </Modal>
  );
};
