import { useAuth } from "@drural/sdk";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { FormattedMessage } from "react-intl";
import { StringParam, useQueryParams } from "use-query-params";

import {
  NotificationTemplate,
  PageBottomSpacing,
  PageTopSpacing,
} from "@components/atoms";
import { Container } from "@components/templates";
import { paths } from "@paths";

import { TypedAccountDeleteMutation } from "./queries";
import * as S from "./styles";

export const AccountDeleteConfirm: NextPage = () => {
  const [query] = useQueryParams({ token: StringParam });
  const { push } = useRouter();
  const { signOut } = useAuth();

  const [tokenError, setTokenError] = React.useState("");

  const { token } = query;

  if (!token) {
    push(paths.home);
  }

  const handleSignOut = () => signOut();

  return (
    <>
      <Container>
        <PageTopSpacing />
        <S.Wrapper>
          <S.Title className="email-title">
            <FormattedMessage defaultMessage="Confirm deletion" />
          </S.Title>

          <S.TextWrapper>
            <S.Text>
              <FormattedMessage defaultMessage="Atention! this will remove your account data permanently, if you wish to continue the process please click the confirm button below." />
            </S.Text>
          </S.TextWrapper>

          <TypedAccountDeleteMutation
            onCompleted={data => {
              const dataErrors = data.accountDelete?.accountErrors;

              if (dataErrors?.length !== 0) {
                setTokenError(
                  "Something went worng, it seems that token for delete account is not valid anymore."
                );
              } else {
                handleSignOut();
                push(paths.accountDeleteSuccess);
              }
            }}
            onError={error => {
              if (error) {
                setTokenError(
                  "It seems that token for delete account is not valid anymore."
                );
              }
            }}
          >
            {(accountDelete, { loading, data }) => (
              <S.StyledButton
                onClick={() => {
                  if (token) {
                    accountDelete({
                      variables: {
                        token,
                      },
                    });
                  }
                }}
                testingContext="confirmDeleteAccountButton"
              >
                <FormattedMessage defaultMessage="Confirm delete account" />
              </S.StyledButton>
            )}
          </TypedAccountDeleteMutation>
        </S.Wrapper>
        <PageBottomSpacing />
      </Container>
      {tokenError && (
        <NotificationTemplate
          id="accountDeleteConfirmNotification"
          close={() => setTokenError("")}
          message={{ title: "Token error", content: tokenError }}
          options={{ type: "error" }}
          style={{}}
        />
      )}
    </>
  );
};
