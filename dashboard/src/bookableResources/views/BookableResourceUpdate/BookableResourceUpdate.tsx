import { makeStyles } from "@drural/macaw-ui";
import { DialogContentText } from "@material-ui/core";
import BookableResourceUpdatePage from "@saleor/bookableResources/components/BookableResourceUpdatePage";
import { BookableResourceFormData } from "@saleor/bookableResources/forms/types";
import {
  usebookableResourceDeleteMutation,
  useBookableResourceUpdateMutation
} from "@saleor/bookableResources/mutations";
import { useBookableResourceDetailsQuery } from "@saleor/bookableResources/queries";
import ActionDialog from "@saleor/components/ActionDialog";
import NotFoundPage from "@saleor/components/NotFoundPage";
import { WindowTitle } from "@saleor/components/WindowTitle";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import { commonMessages } from "@saleor/intl";
import { getMutationState } from "@saleor/misc";
import getBookableResourceErrorMessage from "@saleor/utils/errors/bookableResource";
import createDialogActionHandlers from "@saleor/utils/handlers/dialogActionHandlers";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useIntl } from "react-intl";

import {
  bookableResourceUrl,
  BookableResourceUrlDialog,
  BookableResourceUrlQueryParams,
  resourceListUrl
} from "../../urls";
import { getMutationData } from "./utils";

const useStyles = makeStyles(
  () => ({
    textAlignCenter: {
      textAlign: "center"
    }
  }),
  { name: "BookableResourceUpdate" }
);

interface BookableResourceUpdateProps {
  id: string;
  params: BookableResourceUrlQueryParams;
}

export const BookableResourceUpdate: React.FC<BookableResourceUpdateProps> = ({
  id,
  params
}) => {
  const classes = useStyles();
  const intl = useIntl();
  const notify = useNotifier();
  const navigate = useNavigator();

  const { data, loading } = useBookableResourceDetailsQuery({
    displayLoader: true,
    variables: { id }
  });
  const bookableResource = data?.bookableResource;

  const [
    updateBookableResource,
    updateBookableResourceOpts
  ] = useBookableResourceUpdateMutation({
    onCompleted: data => {
      const { errors } = data.bookableResourceUpdate;

      if (errors.length) {
        errors.map(error =>
          notify({
            status: "error",
            text: getBookableResourceErrorMessage(error, intl)
          })
        );
      } else {
        notify({
          status: "success",
          text: intl.formatMessage(commonMessages.savedChanges)
        });
      }
    }
  });

  const [
    deleteBookableResource,
    deleteBookableResourceOpts
  ] = usebookableResourceDeleteMutation({
    onCompleted: data => {
      const { errors } = data.bookableResourceDelete;

      if (errors.length) {
        notify({
          status: "error",
          text: intl.formatMessage({
            defaultMessage: "Unable to delete resource"
          })
        });
      } else {
        notify({
          status: "success",
          text: intl.formatMessage({
            defaultMessage: "Bookable resource removed"
          })
        });
        navigate(resourceListUrl());
      }
    }
  });

  const [openModal, closeModal] = createDialogActionHandlers<
    BookableResourceUrlDialog,
    BookableResourceUrlQueryParams
  >(navigate, params => bookableResourceUrl(id, params), params);

  const handleBack = () => navigate(resourceListUrl());

  const handleSubmit = (formData: BookableResourceFormData) => {
    updateBookableResource({
      variables: {
        id: bookableResource?.id,
        input: getMutationData(formData)
      }
    });
  };

  const disableFormSave =
    deleteBookableResourceOpts.loading ||
    updateBookableResourceOpts.loading ||
    loading;

  const formTransitionState = getMutationState(
    updateBookableResourceOpts.called,
    updateBookableResourceOpts.loading,
    updateBookableResourceOpts.data?.bookableResourceUpdate.errors
  );

  const errors = [
    ...(updateBookableResourceOpts.data?.bookableResourceUpdate.errors || [])
  ];

  if (bookableResource === null) {
    return <NotFoundPage onBack={handleBack} />;
  }

  return (
    <>
      <WindowTitle title={bookableResource?.name} />
      <BookableResourceUpdatePage
        bookableResource={bookableResource}
        errors={errors}
        loading={disableFormSave}
        saveButtonBarState={formTransitionState}
        onBack={handleBack}
        onDelete={() => openModal("remove")}
        onSubmit={handleSubmit}
      />
      <ActionDialog
        open={params.action === "remove"}
        onClose={closeModal}
        confirmButtonState={deleteBookableResourceOpts.status}
        onConfirm={() => deleteBookableResource({ variables: { id } })}
        variant="default"
        title={intl.formatMessage({
          defaultMessage: "Delete bookable resource"
        })}
      >
        <DialogContentText className={classes.textAlignCenter}>
          <FormattedMessage
            defaultMessage="Are you sure you want to delete {name}?"
            values={{ name: <strong>{bookableResource?.name}</strong> }}
          />
        </DialogContentText>
      </ActionDialog>
    </>
  );
};
export default BookableResourceUpdate;
