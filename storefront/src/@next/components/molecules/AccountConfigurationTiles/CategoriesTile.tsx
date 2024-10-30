import { UilEdit } from "@iconscout/react-unicons";
import React from "react";
import { FormattedMessage } from "react-intl";

import {
  Button,
  IconButtonDrural,
  Loader,
  NotificationTemplate,
  Tile,
} from "@components/atoms";
import { CategoryIconList } from "@components/organisms";
import { CATEGORIES_PER_VIEW } from "@temp/core/config";
import { commonMessages } from "@temp/intl";

import { CategoryOverlay } from "./CategoryOverlay";
import { GetUserCategories_me } from "./gqlTypes/GetUserCategories";
import { useAllCategoriesQuery, useUserCategoriesQuery } from "./queries";
import * as S from "./styles";
import { FormStatus } from "./types";
import { getFormStatusMessage, getListCategoriesPreferences } from "./utils";

export const CategoriesTile: React.FC = () => {
  // 1. State
  const [isEditing, setIsEditing] = React.useState(false);
  const [formStatus, setFormStatus] = React.useState<FormStatus>({
    success: false,
    error: false,
  });

  // 2. Queries
  const {
    data: categoriesData,
    loading: loadingCategories,
  } = useAllCategoriesQuery({
    first: 100,
  });
  const {
    data: userCategoriesData,
    loadMore: loadMoreUserCategories,
    loading: loadingUserCategories,
    refetch: refetchUserCategories,
  } = useUserCategoriesQuery({
    first: CATEGORIES_PER_VIEW,
  });

  const {
    data: userCategoriesAllData,
    loading: loadingUserCategoriesAll,
    refetch: refetchUserCategoriesAll,
  } = useUserCategoriesQuery({
    first: 100,
  });

  // 3. Varaibles
  const [categories] = React.useMemo(
    () => [categoriesData?.categories?.edges.map(e => e.node) || []],
    [categoriesData]
  );
  const [
    userCategories,
    userCategoriesPageInfo,
    userCategoriesTotalCount,
  ] = React.useMemo(
    () => [
      userCategoriesData?.me?.categories?.edges.map(e => e.node) || [],
      userCategoriesData?.me?.categories?.pageInfo,
      userCategoriesData?.me?.categories?.totalCount || 0,
    ],
    [userCategoriesData]
  );
  const [userCategoriesAll] = React.useMemo(
    () => [userCategoriesAllData?.me?.categories?.edges.map(e => e.node) || []],
    [userCategoriesAllData]
  );

  // 4. Events
  const handleLoadMoreUserCategories = () =>
    loadMoreUserCategories(
      (prev, next) => ({
        me: {
          ...prev.me,
          categories: {
            ...prev.me?.categories,
            edges: [
              ...(prev.me?.categories?.edges || []),
              ...(next.me?.categories?.edges || []),
            ],
            pageInfo: next.me?.categories?.pageInfo,
          },
        } as GetUserCategories_me,
      }),
      userCategoriesPageInfo?.endCursor!
    );
  const handleRefetchUserCategories = () => {
    refetchUserCategories();
    refetchUserCategoriesAll();
  };

  // 5. Render
  return (
    <>
      <S.TileWrapper>
        <Tile id="myaccount__configuration__categories_preferences">
          <S.Header>
            <S.Title>
              <FormattedMessage {...commonMessages.categoriesPreferences} />
            </S.Title>
            {!isEditing && (
              <IconButtonDrural
                color="primary"
                onClick={() => setIsEditing(isEditing => !isEditing)}
                testingContext="editCategoriesButton"
              >
                <UilEdit size="24" color="#fff" />
              </IconButtonDrural>
            )}
          </S.Header>
          {userCategories.length > 0 ? (
            <>
              {loadingUserCategories ? (
                <Loader />
              ) : (
                <>
                  <CategoryIconList
                    categories={getListCategoriesPreferences(userCategories)}
                  />
                  <S.LoaderWrapper>
                    <S.SubtitleSmall>
                      <FormattedMessage
                        defaultMessage="Showing {userCategoriesCount} of {userCategoriesTotalCount}"
                        values={{
                          userCategoriesCount: userCategories.length,
                          userCategoriesTotalCount,
                        }}
                      />
                    </S.SubtitleSmall>
                    {userCategoriesPageInfo?.hasNextPage && (
                      <Button
                        testingContext="loadMoreProductsButton"
                        color="secondary"
                        onClick={handleLoadMoreUserCategories}
                      >
                        <FormattedMessage defaultMessage="Show +" />
                      </Button>
                    )}
                  </S.LoaderWrapper>
                </>
              )}
            </>
          ) : (
            <FormattedMessage defaultMessage="You have no categories selected. Please click the edit button to start selecting." />
          )}
        </Tile>
        {isEditing && (
          <CategoryOverlay
            categories={categories}
            loadingCategories={loadingCategories || loadingUserCategoriesAll}
            userCategories={userCategoriesAll}
            hide={() => setIsEditing(false)}
            refetchUserCategories={handleRefetchUserCategories}
            setFormStatus={status => setFormStatus(status)}
          />
        )}
      </S.TileWrapper>
      {(formStatus.error || formStatus.success) && (
        <NotificationTemplate
          id="userCategoriesPreferencesFormNotification"
          close={() => {
            if (formStatus.error) {
              setFormStatus({
                ...formStatus,
                error: false,
              });
            } else {
              setFormStatus({
                ...formStatus,
                success: false,
              });
            }
          }}
          message={getFormStatusMessage("Categories", formStatus.error)}
          options={{ type: formStatus.error ? "error" : "success" }}
          style={{}}
        />
      )}
    </>
  );
};
