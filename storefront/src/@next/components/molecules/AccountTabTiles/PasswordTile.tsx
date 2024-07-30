import { usePasswordChange } from "@drural/sdk";
import { UilEdit } from "@iconscout/react-unicons";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { Attribute, IconButtonDrural, Tile } from "@components/atoms";
import { commonMessages } from "@temp/intl";

import { PasswordChangeForm } from "./PasswordChangeForm";
import * as S from "./styles";

export const PasswordTile: React.FC = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [setPasswordChange, { data, error }] = usePasswordChange();
  const intl = useIntl();

  React.useEffect(() => {
    if (data && !error) {
      setIsEditing(false);
    }
  }, [data, error]);
  return (
    <S.TileWrapper>
      <Tile>
        <S.Wrapper>
          <S.Header>
            <FormattedMessage defaultMessage="My password" />
            {!isEditing && (
              <IconButtonDrural
                color="primary"
                onClick={() => setIsEditing(isEditing => !isEditing)}
                testingContext="editPasswordButton"
              >
                <UilEdit size="24" color="#fff" />
              </IconButtonDrural>
            )}
          </S.Header>
          <S.Content>
            {isEditing ? (
              <S.ContentEdit>
                <PasswordChangeForm
                  handleSubmit={data => {
                    setPasswordChange(data);
                  }}
                  hide={() => {
                    setIsEditing(false);
                  }}
                  error={error ? error!.extraInfo?.userInputErrors : []}
                />
              </S.ContentEdit>
            ) : (
              <Attribute
                description={intl.formatMessage(commonMessages.password)}
                attributeValue="**************"
                testingContext="passwordText"
              />
            )}
          </S.Content>
        </S.Wrapper>
      </Tile>
    </S.TileWrapper>
  );
};
