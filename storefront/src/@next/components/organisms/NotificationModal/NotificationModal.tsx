import * as React from "react";

import { Button } from "@components/atoms";
import { Overlay } from "@components/organisms";

import * as S from "./styles";
import { IProps } from "./types";

export const NotificationModal: React.FC<IProps> = ({
  title,
  text,
  onClick,
  hide,
  buttonText,
}) => {
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
            <p>{text}</p>
          </S.ServiceInfo>

          <Button testingContext="notification-modal" onClick={onClick}>
            {buttonText}
          </Button>
        </S.Content>
      </S.Div>
    </Overlay>
  );
};
