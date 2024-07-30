import BookableResourceCreatePage from "@saleor/bookableResources/components/BookableResourceCreatePage";
import { BookableResourceFormData } from "@saleor/bookableResources/forms/types";
import { useBookableResourceCreateMutation } from "@saleor/bookableResources/mutations";
import { BookableResourceCreate_bookableResourceCreate_errors } from "@saleor/bookableResources/types/BookableResourceCreate";
import { BusinessContext } from "@saleor/components/BusinessProvider";
import { WindowTitle } from "@saleor/components/WindowTitle";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import getBookableResourceErrorMessage from "@saleor/utils/errors/bookableResource";
import React from "react";
import { useIntl } from "react-intl";

import {
  BookableResourceCreateUrlQueryParams,
  bookableResourceUrl,
  resourceListUrl
} from "../../urls";
import { getMutationData } from "./utils";

interface BookableResourceCreateProps {
  params: BookableResourceCreateUrlQueryParams;
}

export const BookableResourceCreate: React.FC<BookableResourceCreateProps> = () => {
  const intl = useIntl();
  const navigate = useNavigator();
  const notify = useNotifier();

  // Business data
  const { activeBusiness } = React.useContext(BusinessContext);

  const [
    bookableResourceCreate,
    bookableResourceCreateOpts
  ] = useBookableResourceCreateMutation({
    onCompleted: data => {
      const { errors } = data.bookableResourceCreate;

      if (errors.length) {
        handleErrors(errors);
      } else {
        const { id } = data.bookableResourceCreate.bookableResource;
        handleSuccess(id);
      }
    },
    onError: error => {
      notify({
        status: "error",
        text: error.message
      });
    }
  });

  const handleErrors = (
    errors: BookableResourceCreate_bookableResourceCreate_errors[]
  ) => {
    errors.map(error =>
      notify({
        status: "error",
        text: getBookableResourceErrorMessage(error, intl)
      })
    );
  };

  const handleSuccess = (id: string) => {
    notify({
      status: "success",
      text: intl.formatMessage({
        defaultMessage: "Bookable resource created"
      })
    });
    navigate(bookableResourceUrl(id));
  };

  const handleBack = () => navigate(resourceListUrl());

  const handleSubmit = (formData: BookableResourceFormData) => {
    bookableResourceCreate({
      variables: getMutationData(activeBusiness?.active.node.id, formData)
    });
  };

  return (
    <>
      <WindowTitle
        title={intl.formatMessage({
          defaultMessage: "Create bookable resource",
          description: "window title"
        })}
      />
      <BookableResourceCreatePage
        errors={[
          ...(bookableResourceCreateOpts.data?.bookableResourceCreate.errors ||
            [])
        ]}
        header={intl.formatMessage({
          defaultMessage: "New Resource",
          description: "page header"
        })}
        loading={bookableResourceCreateOpts.loading}
        saveButtonBarState={bookableResourceCreateOpts.status}
        onBack={handleBack}
        onSubmit={handleSubmit}
      />
    </>
  );
};
export default BookableResourceCreate;
