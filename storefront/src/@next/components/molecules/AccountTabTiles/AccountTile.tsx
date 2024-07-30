import { useAccountUpdate, useAuth } from "@drural/sdk";
import { UilEdit } from "@iconscout/react-unicons";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { Attribute, IconButtonDrural, Tile } from "@components/atoms";
import { AccountAvatar } from "@components/atoms/AccountAvatar";
import { commonMessages } from "@temp/intl";

import { AccountUpdateForm } from "./AccountUpdateForm";
import * as S from "./styles";
import { IProps } from "./types";

export const AccountTile: React.FC<IProps> = ({
  avatarURL,
  updateAvatar,
  deleteAvatar,
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [setAccountUpdate, { data, error }] = useAccountUpdate();
  const intl = useIntl();
  const { user } = useAuth();

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
            <FormattedMessage defaultMessage="Personal data" />
            {!isEditing && (
              <IconButtonDrural
                color="primary"
                onClick={() => setIsEditing(isEditing => !isEditing)}
                testingContext="editDetailsButton"
              >
                <UilEdit size="24" color="#fff" />
              </IconButtonDrural>
            )}
          </S.Header>
          <S.Content>
            <S.ContentWithAvatar>
              <S.HeaderSmall>
                <FormattedMessage defaultMessage="Personal details" />
              </S.HeaderSmall>
              <AccountAvatar
                source={avatarURL}
                imageUpload={updateAvatar}
                imageDelete={deleteAvatar}
              />
            </S.ContentWithAvatar>

            <S.ContentWithoutAvatar>
              {isEditing ? (
                <AccountUpdateForm
                  initialValues={{
                    firstName: (user && user.firstName) || "",
                    lastName: (user && user.lastName) || "",
                  }}
                  handleSubmit={data => {
                    setAccountUpdate({ input: data });
                  }}
                  hide={() => {
                    setIsEditing(false);
                  }}
                />
              ) : (
                <S.ContentOneLine data-test="personalDetailsSection">
                  <Attribute
                    description={intl.formatMessage(commonMessages.firstName)}
                    attributeValue={(user && user.firstName) || "-"}
                    testingContext="firstNameText"
                  />
                  <Attribute
                    description={intl.formatMessage(commonMessages.lastName)}
                    attributeValue={(user && user.lastName) || "-"}
                    testingContext="lastNameText"
                  />
                </S.ContentOneLine>
              )}
            </S.ContentWithoutAvatar>
          </S.Content>
        </S.Wrapper>
      </Tile>
    </S.TileWrapper>
  );
};
