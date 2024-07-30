import { useAuth } from "@drural/sdk";
import { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useMediaPredicate } from "react-media-hook";
import { StringParam, useQueryParam } from "use-query-params";

import { PageBottomSpacing } from "@components/atoms";
import { HeaderWithButton } from "@components/molecules/HeaderWithButton";
import { WishListGeneralList } from "@components/molecules/WishListGeneralList";
import { WishListServices } from "@components/molecules/WishListServices";
import { Container } from "@components/templates";
import { mediumScreen } from "@styles/constants-drural";
import { Breadcrumbs, NotFound } from "@temp/components";
import { commonMessages } from "@temp/intl";

import { WishLists } from "./gqlTypes/WishLists";
import { getUserWishListsQuery, getWishListServicesQuery } from "./queries";
import * as S from "./styles";
import WishListModalForm from "./WishListModalForm";
import WishListModalNotification from "./WishListModalNotification";

export interface ServiceSelected {
  serviceId: string;
  serviceImageUrl: string;
  serviceName: string;
}

export interface ListSelected {
  listId?: string;
  listImageUrl: string;
  listName: string;
}

export const WishList: NextPage = () => {
  const intl = useIntl();
  const { user } = useAuth();
  const { asPath } = useRouter();
  const [list, setList] = useQueryParam("wishlist", StringParam);
  const [showModalCreate, setShowModalCreate] = React.useState(false);
  const [showModalEdit, setShowModalEdit] = React.useState(false);
  const [showDeleteServiceModal, setShowDeleteServiceModal] = React.useState(
    false
  );
  const [showDeleteListModal, setShowDeleteListModal] = React.useState(false);
  const [selectedListName, setSelectedListName] = React.useState<ListSelected>({
    listImageUrl: "",
    listName: "",
  });
  const [selectedService, setSelectedService] = React.useState<ServiceSelected>(
    { serviceId: "", serviceImageUrl: "", serviceName: "" }
  );
  const [listToDelete, setListToDelete] = React.useState<ListSelected>({
    listId: "",
    listImageUrl: "",
    listName: "",
  });

  const setFirstWishList = (data: WishLists) => {
    // Sets the ID of the first wishlist when we first load the page in desktop mode
    // so that it appears selected in the wishlist list.
    if (data.me?.wishlists?.edges[0] && !isMobile && !list) {
      setList(data.me?.wishlists?.edges[0].node.id);
      setSelectedListName({
        listImageUrl: data.me?.wishlists?.edges[0].node.imageUrl
          ? data.me?.wishlists?.edges[0].node.imageUrl
          : "",
        listName: data.me?.wishlists?.edges[0].node.name,
      });
    }
  };

  const isMobile = useMediaPredicate(`(max-width: ${mediumScreen}px)`);

  const { data: dataList, refetch } = getUserWishListsQuery(
    {
      first: 30,
    },
    setFirstWishList
  );

  const {
    data: listSelected,
    refetch: refetchListDetails,
  } = getWishListServicesQuery(
    {
      id: list || "",
    },
    !user || !list
  );

  const handleClick = (listId: string, listName: string, listImage: string) => {
    setList(listId);
    setSelectedListName({ listImageUrl: listImage, listName });
  };

  if (!user) {
    return <NotFound />;
  }

  return (
    <>
      <Container>
        {!isMobile && (
          <Breadcrumbs
            breadcrumbs={[
              {
                link: asPath,
                value: intl.formatMessage(commonMessages.myWishLists),
              },
            ]}
          />
        )}
        {((isMobile && !list) || !isMobile) && (
          <HeaderWithButton
            title={intl.formatMessage({ defaultMessage: "My wish lists" })}
            buttonText={intl.formatMessage({
              defaultMessage: "New wish list",
            })}
            onPress={() => setShowModalCreate(true)}
          />
        )}
        {isMobile && list && (
          // Sets the list id to undefined
          // because on mobile no highlighted list is shown
          <S.BackToListsLink onClick={() => setList(undefined)}>
            <FormattedMessage defaultMessage="Back to my wish lists" />
          </S.BackToListsLink>
        )}
        <S.ListsContainer>
          {(!isMobile || (isMobile && !list)) && (
            <WishListGeneralList
              active={list || ""}
              wishlists={
                dataList?.me?.wishlists
                  ? dataList.me?.wishlists.edges.map(edge => edge.node)
                  : []
              }
              handleClick={handleClick}
              showDeleteListModal={setShowDeleteListModal}
              setListToDelete={setListToDelete}
            />
          )}
          {(!isMobile || (isMobile && list)) && (
            <WishListServices
              listName={selectedListName}
              services={
                listSelected?.wishlist?.items
                  ? listSelected.wishlist.items.edges.map(
                      edge => edge.node.variant!
                    )
                  : undefined
              }
              editList={setShowModalEdit}
              showDeleteServiceModal={setShowDeleteServiceModal}
              setServiceToDelete={setSelectedService}
            />
          )}
        </S.ListsContainer>
        <PageBottomSpacing />
      </Container>
      {showModalCreate && (
        <WishListModalForm
          content={{
            title: intl.formatMessage({
              defaultMessage: "Create new wishlist",
            }),
            placeholderText: intl.formatMessage({
              defaultMessage: "List name",
            }),
            buttonConfirmText: intl.formatMessage({
              defaultMessage: "Create list",
            }),

            buttonCancelText: intl.formatMessage({
              defaultMessage: "Cancel",
            }),
            modalFormType: "create",
            initialText: "",
          }}
          hide={() => setShowModalCreate(false)}
          refetchUserWishLists={refetch}
        />
      )}
      {showModalEdit && (
        <WishListModalForm
          content={{
            title: intl.formatMessage({
              defaultMessage: "Edit wishlist name",
            }),
            placeholderText: intl.formatMessage({
              defaultMessage: "Edit list name",
            }),
            buttonConfirmText: intl.formatMessage({
              defaultMessage: "Save",
            }),

            buttonCancelText: intl.formatMessage({
              defaultMessage: "Cancel",
            }),
            modalFormType: "edit",
            initialText: selectedListName.listName,
            listUpdateId: list,
          }}
          hide={() => setShowModalEdit(false)}
          refetchUserWishLists={refetch}
          updateListName={(listname: string) =>
            setSelectedListName({ ...selectedListName, listName: listname })
          }
        />
      )}
      {showDeleteServiceModal && (
        <WishListModalNotification
          content={{
            title: intl.formatMessage({
              defaultMessage: "Delete service from wish list",
            }),
            text: intl.formatMessage(
              {
                defaultMessage:
                  "Are you sure you want to delete the service {serviceName} from the wish list {listName}? ",
              },
              {
                serviceName: selectedService.serviceName,
                listName: selectedListName.listName,
              }
            ),
            buttonConfirmText: intl.formatMessage({
              defaultMessage: "Delete service",
            }),

            buttonCancelText: intl.formatMessage({
              defaultMessage: "Cancel",
            }),
            modalFormType: "deleteService",
            deleteListId: list!,
            addDeleteService: selectedService,
            thumbnail: selectedService.serviceImageUrl,
          }}
          hide={() => setShowDeleteServiceModal(false)}
          refetchUserWishLists={refetch}
          refetchservicesWishlist={refetchListDetails}
        />
      )}
      {showDeleteListModal && (
        <WishListModalNotification
          content={{
            title: intl.formatMessage({
              defaultMessage: "Delete wish list",
            }),
            text: intl.formatMessage(
              {
                defaultMessage:
                  "Are you sure you want to delete the wishlist {listName}?",
              },
              {
                listName: listToDelete.listName,
              }
            ),
            buttonConfirmText: intl.formatMessage({
              defaultMessage: "Delete list",
            }),

            buttonCancelText: intl.formatMessage({
              defaultMessage: "Cancel",
            }),
            modalFormType: "deleteList",
            deleteListId: listToDelete.listId!,
            thumbnail: listToDelete.listImageUrl,
          }}
          hide={() => setShowDeleteListModal(false)}
          refetchUserWishLists={refetch}
          resetList={() => setList("")}
        />
      )}
    </>
  );
};
