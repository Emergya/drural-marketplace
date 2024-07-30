import * as React from "react";
import { useAlert } from "react-alert";
import { useMutation } from "react-apollo";
import { FormattedMessage, useIntl } from "react-intl";

import { ModalNavButtons } from "@components/molecules/ModalNavButtons";
import { Overlay } from "@components/organisms";
import { commonMessages } from "@temp/intl";

import {
  ProductDeleteMyRating,
  ProductDeleteMyRatingVariables,
} from "./gqlTypes/ProductDeleteMyRating";
import { productDeleteMyRating } from "./queries";
import * as S from "./styles";

export interface ModalFormProps {
  ratingID: string;
  hide: () => void;
  refetch: () => void;
}

const RatingDeleteModal: React.FC<ModalFormProps> = ({
  ratingID,
  hide,
  refetch,
}) => {
  const alert = useAlert();
  const intl = useIntl();

  const displayQueryMutationError = () => {
    alert.show(
      {
        content: intl.formatMessage(commonMessages.mutationError),
        title: "Error",
      },
      { type: "error", timeout: 5000 }
    );
  };
  const [deleteMyReview] = useMutation<
    ProductDeleteMyRating,
    ProductDeleteMyRatingVariables
  >(productDeleteMyRating, {
    onCompleted(data) {
      // TODO: error handling UI not yet defined
      if (data.productRatingDelete!.errors?.length > 0) {
        alert.show(
          {
            content: intl.formatMessage(commonMessages.mutationError),
            title: "Error",
          },
          { type: "error", timeout: 5000 }
        );
      }
      refetch();
      hide();
    },
    onError() {
      displayQueryMutationError();
      hide();
    },
  });

  const handleClick = () => {
    deleteMyReview({
      variables: { id: ratingID },
    });
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
          <h2>
            <FormattedMessage defaultMessage="Delete review?" />
          </h2>
          <S.ServiceInfo>
            <p>
              <FormattedMessage defaultMessage="Are you sure you want to delete your review?" />
            </p>
          </S.ServiceInfo>

          <ModalNavButtons
            textNext={intl.formatMessage({ defaultMessage: "Delete review" })}
            textBack={intl.formatMessage({ defaultMessage: "Cancel" })}
            onNext={handleClick}
            onBack={hide}
          />
        </S.Content>
      </S.Div>
    </Overlay>
  );
};

export default RatingDeleteModal;
