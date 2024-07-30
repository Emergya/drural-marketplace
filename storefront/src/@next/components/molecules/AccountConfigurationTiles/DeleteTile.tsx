import { UilTrashAlt } from "@iconscout/react-unicons";
import { useRouter } from "next/router";
import React from "react";
import { FormattedMessage } from "react-intl";

import {
  Button,
  Checkbox,
  IconButtonDrural,
  NotificationTemplate,
  Tile,
} from "@components/atoms";
import { paths } from "@paths";
import { commonMessages } from "@temp/intl";

import { TypedAccountRequestDeletionMutation } from "./queries";
import * as S from "./styles";

export const DeleteTile: React.FC = () => {
  const { push } = useRouter();

  const [isEditing, setIsEditing] = React.useState(false);
  const [isAbleToDelete, setIsAbleToDelete] = React.useState(false);
  const [formError, setFormError] = React.useState("");

  return (
    <>
      <S.TileWrapper>
        <Tile>
          <S.Header marginTop="1rem">
            <S.Title>
              <FormattedMessage {...commonMessages.deleteAccount} />
            </S.Title>
            {!isEditing && (
              <IconButtonDrural
                color="primary"
                onClick={() => setIsEditing(isEditing => !isEditing)}
                testingContext="deleteAccountButton"
              >
                <UilTrashAlt size="24" color="#fff" />
              </IconButtonDrural>
            )}
          </S.Header>
          {!isEditing ? (
            <S.SubtitleSmall>
              <FormattedMessage defaultMessage="Click the edit button if you wish to delete your account." />
            </S.SubtitleSmall>
          ) : (
            <>
              <S.SubtitleSmall marginBottom="22px">
                <FormattedMessage defaultMessage="¿Are you sure you want to delete your account?" />
              </S.SubtitleSmall>
              <Checkbox
                name="delete-accout-checkbox"
                checked={isAbleToDelete}
                onChange={() => {
                  setIsAbleToDelete(!isAbleToDelete);
                }}
              >
                <p>
                  <FormattedMessage defaultMessage="Yes, I want to delete my account in dRural." />
                </p>
              </Checkbox>
              <TypedAccountRequestDeletionMutation
                onCompleted={data => {
                  const dataErrors = data.accountRequestDeletion?.accountErrors;

                  if (dataErrors?.length !== 0) {
                    setFormError("Unable to sent delete account request.");
                  } else {
                    push(paths.accountDeleteMessageSent);
                  }
                }}
                onError={error => {
                  if (error) {
                    setFormError("Unable to sent delete account request.");
                  }
                }}
              >
                {(accountRequestDeletion, { loading, data }) => (
                  <S.ButtonsWrapper>
                    <Button
                      testingContext="cancelButton"
                      type="button"
                      color="labelOnly"
                      onClick={() => {
                        setIsEditing(false);
                        setIsAbleToDelete(false);
                      }}
                    >
                      <FormattedMessage {...commonMessages.cancel} />
                    </Button>
                    <Button
                      testingContext="submit"
                      type="submit"
                      disabled={!isAbleToDelete}
                      onClick={() => {
                        accountRequestDeletion({
                          variables: {
                            redirectUrl: `${location.origin}${paths.accountDeleteConfirm}`,
                          },
                        });
                      }}
                    >
                      <FormattedMessage defaultMessage="Delete account" />
                    </Button>
                  </S.ButtonsWrapper>
                )}
              </TypedAccountRequestDeletionMutation>
            </>
          )}
        </Tile>
      </S.TileWrapper>
      {formError && (
        <NotificationTemplate
          id="accountDeleteTileNotification"
          close={() => setFormError("")}
          message={{ title: "Error", content: formError }}
          options={{ type: "error" }}
          style={{}}
        />
      )}
    </>
  );
};
