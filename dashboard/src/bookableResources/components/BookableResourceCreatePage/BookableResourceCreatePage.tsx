import { Backlink, ConfirmButtonTransitionState } from "@drural/macaw-ui";
import { Grid } from "@material-ui/core";
import BookableResourceCreateFrom from "@saleor/bookableResources/forms/BookableResourceCreateForm";
import { BookableResourceFormData } from "@saleor/bookableResources/forms/types";
import { BookableResourceCreate_bookableResourceCreate_errors } from "@saleor/bookableResources/types/BookableResourceCreate";
import Container from "@saleor/components/Container";
import FormSpacer from "@saleor/components/FormSpacer";
import PageHeader from "@saleor/components/PageHeader";
import Savebar from "@saleor/components/Savebar";
import { sectionNames } from "@saleor/intl";
import React from "react";
import { useIntl } from "react-intl";

import BookableResourceCalendar from "../BookableResourceCalendar";
import BookableResourceDetailsForm from "../BookableResourceDetailsForm";

interface ProductCreatePageProps {
  errors: BookableResourceCreate_bookableResourceCreate_errors[];
  header: string;
  loading: boolean;
  saveButtonBarState: ConfirmButtonTransitionState;
  onBack();
  onSubmit(formData: BookableResourceFormData);
}

export const BookableResourceCreatePage: React.FC<ProductCreatePageProps> = ({
  errors,
  header,
  loading,
  saveButtonBarState,
  onBack,
  onSubmit
}) => {
  const intl = useIntl();

  return (
    <BookableResourceCreateFrom onSubmit={onSubmit}>
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
          <PageHeader title={header} />
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
            onSubmit={submit}
            state={saveButtonBarState}
            disabled={loading || !onSubmit || formDisabled || !hasChanged}
          />
        </Container>
      )}
    </BookableResourceCreateFrom>
  );
};
export default BookableResourceCreatePage;
