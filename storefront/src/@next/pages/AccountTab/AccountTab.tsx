import { useAuth } from "@drural/sdk";
import React from "react";
import { useAlert } from "react-alert";
import { useMutation } from "react-apollo";
import { useIntl } from "react-intl";

import { AccountTabTiles } from "@components/molecules";
import { commonMessages } from "@temp/intl";

import { AvatarDelete } from "./gqlTypes/AvatarDelete";
import { AvatarUpdate, AvatarUpdateVariables } from "./gqlTypes/AvatarUpdate";
import { avatarDeleteMutation, avatarUpdateMutation } from "./mutations";
import * as S from "./styles";

export const AccountTab: React.FC = () => {
  const alert = useAlert();
  const intl = useIntl();
  const { user, refreshUserData } = useAuth();
  const displayQueryMutationError = () => {
    alert.show(
      {
        content: intl.formatMessage(commonMessages.mutationError),
        title: "Error",
      },
      { type: "error", timeout: 5000 }
    );
  };
  const [updateAvatar] = useMutation<AvatarUpdate, AvatarUpdateVariables>(
    avatarUpdateMutation,
    {
      onCompleted(data) {
        // TODO: error handling UI not yet defined
        if (data.userAvatarUpdate!.errors?.length > 0) {
          alert.show(
            {
              content: intl.formatMessage(commonMessages.mutationError),
              title: "Error",
            },
            { type: "error", timeout: 5000 }
          );
        }
        refreshUserData();
      },
      onError() {
        displayQueryMutationError();
      },
    }
  );
  const [deleteAvatar] = useMutation<AvatarDelete>(avatarDeleteMutation, {
    onCompleted(data) {
      // TODO: error handling UI not yet defined
      if (data.userAvatarDelete!.errors?.length > 0) {
        alert.show(
          {
            content: intl.formatMessage(commonMessages.mutationError),
            title: "Error",
          },
          { type: "error", timeout: 5000 }
        );
      }
      refreshUserData();
    },
    onError() {
      displayQueryMutationError();
    },
  });

  const handleUpdateAvatar = (file: File) => {
    updateAvatar({
      variables: {
        image: file,
      },
    });
  };

  const handleDeleteAvatar = () => {
    deleteAvatar();
  };
  return (
    <S.Wrapper>
      <AccountTabTiles
        avatarURL={user?.avatar?.url}
        updateAvatar={handleUpdateAvatar}
        deleteAvatar={handleDeleteAvatar}
      />
    </S.Wrapper>
  );
};
