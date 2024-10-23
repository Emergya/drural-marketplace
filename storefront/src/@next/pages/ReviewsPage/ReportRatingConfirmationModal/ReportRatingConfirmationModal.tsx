import * as React from "react";
import { FormattedMessage } from "react-intl";
import ReactSVG from "react-svg";

import { Overlay } from "@components/organisms";

import ratingIllustration from "../../../../images/dRuralImages/Rating_confirmation.svg";
import * as S from "./styles";

export interface ModalFormProps {
  hide: () => void;
}

const ReportRatingConfirmationModal: React.FC<ModalFormProps> = ({ hide }) => {
  return (
    <Overlay
      testingContext="modal-confirmation"
      duration={0}
      show
      hide={hide}
      position="notification"
    >
      <S.Div>
        <S.CloseIconRestyled onClose={hide} />
        <S.Content>
          <h2>
            <FormattedMessage defaultMessage="The review has been reported" />
          </h2>
          <S.Image className="service-buy">
            <ReactSVG path={ratingIllustration} />
          </S.Image>
          <S.Text>
            <FormattedMessage defaultMessage="Thank you for leaving your feedback.  Your report will be reviewed by a dRural administrator." />
          </S.Text>
        </S.Content>
      </S.Div>
    </Overlay>
  );
};

export default ReportRatingConfirmationModal;