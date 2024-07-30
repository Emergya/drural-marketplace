import { Backlink, ConfirmButtonTransitionState } from "@drural/macaw-ui";
import { Grid } from "@material-ui/core";
import { BookableResourceFormData } from "@saleor/bookableResources/forms/types";
import { BookableResourceDetails_bookableResource } from "@saleor/bookableResources/types/BookableResourceDetails";
import { BookableResourceUpdate_bookableResourceUpdate_errors } from "@saleor/bookableResources/types/BookableResourceUpdate";
import Container from "@saleor/components/Container";
import FormSpacer from "@saleor/components/FormSpacer";
import PageHeader from "@saleor/components/PageHeader";
import Savebar from "@saleor/components/Savebar";
import { sectionNames } from "@saleor/intl";
import React from "react";
import { useIntl } from "react-intl";

import BookableResourceUpdateForm from "../../forms/BookableResourceUpdateForm/";
import BookableResourceCalendar from "../BookableResourceCalendar";
import BookableResourceDetailsForm from "../BookableResourceDetailsForm";
import Title from "./Title";

interface ProductUpdatePageProps {
  bookableResource: BookableResourceDetails_bookableResource;
  errors: BookableResourceUpdate_bookableResourceUpdate_errors[];
  header?: string;
  loading: boolean;
  saveButtonBarState: ConfirmButtonTransitionState;
  onBack();
  onDelete();
  onSubmit(formData: BookableResourceFormData);
}

export const BookableResourceUpdatePage: React.FC<ProductUpdatePageProps> = ({
  bookableResource,
  errors,
  loading,
  saveButtonBarState,
  onBack,
  onDelete,
  onSubmit
}) => {
  const intl = useIntl();

  return (
    <BookableResourceUpdateForm
      bookableResource={bookableResource}
      onSubmit={onSubmit}
    >
      {({
        change,
        data,
        disabled: formDisabled,
        handlers,
        hasChanged,
        submit
      }) => (
        <Container>
          <Backlink onClick={onBack}>
            {intl.formatMessage(sectionNames.bookableResources)}
          </Backlink>
          <PageHeader
            title={<Title bookableResource={bookableResource} />}
            inline
          />
          <Grid>
            <div>
              <BookableResourceDetailsForm
                data={data}
                disabled={loading}
                errors={errors}
                onChange={change}
              />
            </div>
            <FormSpacer />
            <div>
              <BookableResourceCalendar
                data={data}
                disabled={loading}
                onChange={change}
                onDayChange={handlers.changeDay}
                onSlotAdd={handlers.addSlot}
                onSlotChange={handlers.changeSlot}
                onSlotCopy={handlers.copySlot}
                onSlotDelete={handlers.deleteSlot}
                toggleAllDays={handlers.toggleAllDays}
              />
            </div>
          </Grid>
          <Savebar
            onCancel={onBack}
            onDelete={onDelete}
            onSubmit={submit}
            state={saveButtonBarState}
            disabled={loading || !onSubmit || formDisabled || !hasChanged}
          />
        </Container>
      )}
    </BookableResourceUpdateForm>
  );
};
export default BookableResourceUpdatePage;
