import { ApolloQueryResult } from "apollo-client";
import { Formik } from "formik";
import * as React from "react";
import { useAlert } from "react-alert";
import { useMutation } from "react-apollo";
import { useIntl } from "react-intl";
import * as Yup from "yup";

import { TextField } from "@components/molecules";
import { ModalNavButtons } from "@components/molecules/ModalNavButtons";
import { Overlay } from "@components/organisms";
import {
  WishLists,
  WishListsVariables,
} from "@pages/WishList/gqlTypes/WishLists";
import { commonMessages } from "@temp/intl";

import {
  WishListAddService,
  WishListAddServiceVariables,
} from "../WishListModalNotification/gqlTypes/WishListAddService";
import { addServiceWishListMutation } from "../WishListModalNotification/queries";
import {
  WishListCreate,
  WishListCreateVariables,
} from "./gqlTypes/WishListCreate";
import {
  WishListUpdate,
  WishListUpdateVariables,
} from "./gqlTypes/WishListUpdate";
import { createWishListMutation, updateWishListMutation } from "./queries";
import * as S from "./styles";

export interface ModalFormProps {
  content: {
    title: string;
    placeholderText?: string;
    buttonConfirmText: string;
    modalFormType: "create" | "edit";
    buttonCancelText: string;
    listUpdateId?: string;
    initialText: string;
    serviceToNewList?: {
      serviceId: string;
      serviceName: string;
      serviceImage: string;
    };
  };
  hide: () => void;
  refetchUserWishLists?: (
    variables?: WishListsVariables | undefined
  ) => Promise<ApolloQueryResult<WishLists>>;
  showSuccessAddedServiceModal?: (listName: string) => void;
  updateListName?: (listName: string) => void;
}

const WishListModalForm: React.FC<ModalFormProps> = ({
  content: {
    buttonConfirmText,
    modalFormType,
    buttonCancelText,
    placeholderText,
    title,
    listUpdateId,
    initialText,
    serviceToNewList,
  },
  hide,
  refetchUserWishLists,
  showSuccessAddedServiceModal,
  updateListName,
}) => {
  const alert = useAlert();
  const intl = useIntl();
  const [newListName, setNewListName] = React.useState("");
  const displayQueryMutationError = () => {
    alert.show(
      {
        content: intl.formatMessage(commonMessages.mutationError),
        title: "Error",
      },
      { type: "error", timeout: 5000 }
    );
  };

  const [createWishList] = useMutation<WishListCreate, WishListCreateVariables>(
    createWishListMutation,
    {
      onCompleted(data) {
        // TODO: error handling UI not yet defined
        if (data.wishlistCreate!.errors?.length > 0) {
          alert.show(
            {
              content: intl.formatMessage(commonMessages.mutationError),
              title: "Error",
            },
            { type: "error", timeout: 5000 }
          );
        } else if (refetchUserWishLists) {
          refetchUserWishLists({
            first: 30,
          });
        }
        if (serviceToNewList) {
          setNewListName(data.wishlistCreate?.wishlist?.name!);
          addServiceWishList({
            variables: {
              wishlistId: data.wishlistCreate?.wishlist?.id!,
              variantId: serviceToNewList.serviceId,
            },
          });
        }
        hide();
      },
      onError() {
        displayQueryMutationError();
        hide();
      },
    }
  );

  const [updateWishList] = useMutation<WishListUpdate, WishListUpdateVariables>(
    updateWishListMutation,
    {
      onCompleted(data) {
        // TODO: error handling UI not yet defined
        if (data.wishlistUpdate!.errors?.length > 0) {
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
        setNewListName(data.wishlistUpdate?.wishlist?.name!);
        if (updateListName) {
          updateListName(data.wishlistUpdate?.wishlist?.name!);
        }
        hide();
      },
      onError() {
        displayQueryMutationError();
        hide();
      },
    }
  );

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
      } else if (showSuccessAddedServiceModal) {
        showSuccessAddedServiceModal(newListName);
      }
    },
    onError() {
      displayQueryMutationError();
    },
  });

  return (
    <Overlay
      testingContext="modalForm"
      duration={0}
      show
      hide={hide}
      position="notification"
    >
      <Formik
        initialValues={{ listName: initialText }}
        onSubmit={(values, { setSubmitting }) => {
          if (modalFormType === "create") {
            createWishList({ variables: { name: values.listName } });
          }
          if (modalFormType === "edit") {
            updateWishList({
              variables: { id: listUpdateId!, name: values.listName },
            });
          }

          setSubmitting(false);
        }}
        validationSchema={Yup.object({
          listName: Yup.string()
            .max(15, "Max. 15 characters")
            .test(
              "is-not-equal-to-initial",
              "List name is the same as before",
              value => value !== initialText
            )
            .required("Required"),
        })}
      >
        {({
          handleChange,
          handleSubmit,
          handleBlur,
          values,
          errors,
          touched,
          isSubmitting,
          isValid,
        }) => {
          return (
            <S.Div>
              <S.CloseIconRestyled onClose={hide} />
              <S.Form onSubmit={handleSubmit}>
                <h2>{title}</h2>
                <TextField
                  name="listName"
                  label={placeholderText}
                  type="text"
                  value={values.listName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  errors={
                    touched.listName && errors.listName
                      ? [{ message: errors.listName }]
                      : undefined
                  }
                />

                <ModalNavButtons
                  textNext={buttonConfirmText}
                  textBack={buttonCancelText}
                  type="submit"
                  onBack={hide}
                />
              </S.Form>
            </S.Div>
          );
        }}
      </Formik>
    </Overlay>
  );
};

export default WishListModalForm;
