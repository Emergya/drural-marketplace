import { ApolloQueryResult } from "apollo-client";
import * as React from "react";
import { useAlert } from "react-alert";
import { useMutation } from "react-apollo";
import { useIntl } from "react-intl";

import { ModalNavButtons } from "@components/molecules/ModalNavButtons";
import { Thumbnail } from "@components/molecules/Thumbnail";
import { Overlay } from "@components/organisms";
import { commonMessages } from "@temp/intl";

import defaultImage from "../../../../images/dRuralImages/default-image-square.svg";
import { Wishlist, WishlistVariables } from "../gqlTypes/Wishlist";
import { WishLists, WishListsVariables } from "../gqlTypes/WishLists";
import { ServiceSelected } from "../WishListPage";
import {
  WishListAddService,
  WishListAddServiceVariables,
} from "./gqlTypes/WishListAddService";
import {
  WishListDelete,
  WishListDeleteVariables,
} from "./gqlTypes/WishListDelete";
import {
  WishListDeleteService,
  WishListDeleteServiceVariables,
} from "./gqlTypes/WishListDeleteService";
import {
  addServiceWishListMutation,
  deleteServiceWishListMutation,
  deleteWishListMutation,
} from "./queries";
import * as S from "./styles";

export interface ModalFormProps {
  content: {
    title: string;
    text: string;
    buttonConfirmText: string;
    modalFormType: "addService" | "deleteList" | "deleteService";
    buttonCancelText: string;
    deleteListId: string;
    thumbnail?: string;
    addDeleteService?: ServiceSelected;
  };
  hide: () => void;
  refetchUserWishLists?: (
    variables?: WishListsVariables | undefined
  ) => Promise<ApolloQueryResult<WishLists>>;
  refetchservicesWishlist?: (
    variables?: WishlistVariables | undefined
  ) => Promise<ApolloQueryResult<Wishlist>>;
  resetList?: () => void;
}

const WishListModalNotification: React.FC<ModalFormProps> = ({
  content: {
    buttonConfirmText,
    modalFormType,
    buttonCancelText,
    text,
    title,
    deleteListId,
    addDeleteService,
    thumbnail,
  },
  hide,
  refetchUserWishLists,
  refetchservicesWishlist,
  resetList,
}) => {
  const alert = useAlert();
  const intl = useIntl();

  const displayQueryMutationError = (GraphQLErrorMessage?: string) => {
    if (GraphQLErrorMessage) {
      alert.show(
        {
          content: intl.formatMessage(
            {
              defaultMessage: "{error} ",
            },
            {
              error: GraphQLErrorMessage,
            }
          ),
          title: "Error",
        },
        { type: "error", timeout: 5000 }
      );
    } else {
      alert.show(
        {
          content: intl.formatMessage(commonMessages.mutationError),
          title: "Error",
        },
        { type: "error", timeout: 5000 }
      );
    }
  };
  const [deleteWishList] = useMutation<WishListDelete, WishListDeleteVariables>(
    deleteWishListMutation,
    {
      onCompleted(data) {
        // TODO: error handling UI not yet defined
        if (data.wishlistDelete!.errors?.length > 0) {
          alert.show(
            {
              content: intl.formatMessage(commonMessages.mutationError),
              title: "Error",
            },
            { type: "error", timeout: 5000 }
          );
        }
        if (refetchUserWishLists) {
          refetchUserWishLists({
            first: 30,
          });
        }
        if (resetList) {
          resetList();
        }
        hide();
      },
      onError(error) {
        displayQueryMutationError(error.message);
        hide();
      },
    }
  );

  const [deleteServiceWishList] = useMutation<
    WishListDeleteService,
    WishListDeleteServiceVariables
  >(deleteServiceWishListMutation, {
    onCompleted(data) {
      // TODO: error handling UI not yet defined
      if (data.wishlistRemoveVariant!.errors?.length > 0) {
        alert.show(
          {
            content: intl.formatMessage(commonMessages.mutationError),
            title: "Error",
          },
          { type: "error", timeout: 5000 }
        );
      }
      if (refetchUserWishLists) {
        refetchUserWishLists({
          first: 30,
        });
      }
      if (refetchservicesWishlist) {
        refetchservicesWishlist();
      }
      hide();
    },
    onError(error) {
      displayQueryMutationError(error.message);
      hide();
    },
  });

  const [addServiceWishList] = useMutation<
    WishListAddService,
    WishListAddServiceVariables
  >(addServiceWishListMutation, {
    onCompleted(data) {
      // TODO: error handling UI not yet defined
      if (data.wishlistAddVariant!.errors?.length > 0) {
        alert.show(
          {
            content: intl.formatMessage(commonMessages.mutationError),
            title: "Error",
          },
          { type: "error", timeout: 5000 }
        );
      }
      if (refetchUserWishLists) {
        refetchUserWishLists({
          first: 30,
        });
      }
      if (refetchservicesWishlist) {
        refetchservicesWishlist();
      }
      hide();
    },
    onError(error) {
      displayQueryMutationError(error.message);
      hide();
    },
  });

  const handleClick = () => {
    if (modalFormType === "deleteService" && addDeleteService?.serviceId) {
      deleteServiceWishList({
        variables: {
          wishlistId: deleteListId,
          variantId: addDeleteService.serviceId,
        },
      });
    }
    if (modalFormType === "deleteList") {
      deleteWishList({
        variables: { id: deleteListId },
      });
    }
    if (modalFormType === "addService" && addDeleteService?.serviceId) {
      addServiceWishList({
        variables: {
          wishlistId: deleteListId,
          variantId: addDeleteService.serviceId,
        },
      });
    }
  };

  return (
    <Overlay
      testingContext="modalForm"
      duration={0}
      show
      hide={hide}
      position="notification"
    >
      <S.Div>
        <S.CloseIconRestyled onClose={hide} />
        <S.Content>
          <h2>{title}</h2>
          <S.ServiceInfo>
            <S.Image>
              <Thumbnail
                source={{
                  thumbnail: {
                    url: thumbnail || defaultImage,
                    alt: "image-service",
                  },
                }}
              />
            </S.Image>
            <p>{text}</p>
          </S.ServiceInfo>

          <ModalNavButtons
            textNext={buttonConfirmText}
            textBack={buttonCancelText}
            onNext={handleClick}
            onBack={hide}
          />
        </S.Content>
      </S.Div>
    </Overlay>
  );
};

export default WishListModalNotification;
